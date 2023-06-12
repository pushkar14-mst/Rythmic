import express, { Express, Request, Response } from "express";
import mongoose, { Mongoose, model } from "mongoose";
var dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const querystring = require("node:querystring");
dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5173" }));
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8000;

var redirect_uri = "http://127.0.0.1:5173/";

mongoose.connect("mongodb://localhost:27017/spotifyDB").then(() => {
  console.log("Connected to MongoDB");
});

interface IUser {
  userId: string;
  username: string;
  playlists: any[];
}
const userSchema = new mongoose.Schema<IUser>({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  playlists: { type: [] },
});

const User = model<IUser>("User", userSchema);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/add-user", async (req: Request, res: Response) => {
  const username = req.body.username;
  const userId = req.body.userId;
  console.log(username, userId);

  const checkUser = await User.findOne({ userId: userId });
  if (!checkUser) {
    const user = new User({
      username: username,
      userId: userId,
      playlists: [],
    });
    await user.save();
    console.log("User Created");
    res.json({ alert: "User Created" });
  } else {
    console.log("User already exists");
    res.json({
      alert: "User Already Exists",
    });
  }
});

app.get("/login", (req: Request, res: Response) => {
  var scope =
    "streaming \
  user-read-email \
  user-read-private \
  user-read-playback-state";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "token",
        scope: scope,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        redirect_uri: redirect_uri,
      })
  );
});

app.post("/add-playlist", async (req: Request, res: Response) => {
  const username = req.body.username;
  const playlistName = req.body.playlistName;
  const playlistDescription = req.body.playlistDescription;
  console.log(username, playlistName, playlistDescription);

  try {
    await User.updateOne(
      { username: username },
      {
        $push: {
          playlists: { name: playlistName, description: playlistDescription },
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/load-playlists/:username", async (req: Request, res: Response) => {
  let username = req.params.username;

  await User.findOne({ username: username }).then((user: any) => {
    res.json(user?.playlists);
  });
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
