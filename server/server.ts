import express, { Express, Request, Response, query } from "express";
var dotenv = require("dotenv");
const querystring = require("node:querystring");
dotenv.config();
const app: Express = express();
const port = 8000;

var redirect_uri = "http://127.0.0.1:5173/";

app.get("/", (req: Request, res: Response) => {
  var code = req.query.code || null;
  var state = req.query.state || null;
  console.log(code);
});

app.get("/login", (req: Request, res: Response) => {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "token",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        redirect_uri: redirect_uri,
      })
  );
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});