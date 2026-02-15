"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importStar(require("mongoose"));
var dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const querystring = require("node:querystring");
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors({ origin: "http://127.0.0.1:5173" }));
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8000;
var redirect_uri = "http://127.0.0.1:5173/";
const mongoAtlasUrl = process.env.MONGO_ATLAS_URL;
mongoose_1.default.connect(`${mongoAtlasUrl}`).then(() => {
    console.log("Connected to MongoDB");
});
const userSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    playlists: { type: [] },
});
const User = (0, mongoose_1.model)("User", userSchema);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.post("/add-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const userId = req.body.userId;
    console.log(username, userId);
    const checkUser = yield User.findOne({ userId: userId });
    if (!checkUser) {
        const user = new User({
            username: username,
            userId: userId,
            playlists: [],
        });
        yield user.save();
        console.log("User Created");
        res.json({ alert: "User Created" });
    }
    else {
        console.log("User already exists");
        res.json({
            alert: "User Already Exists",
        });
    }
}));
app.get("/login", (req, res) => {
    var scope = "streaming \
  user-read-email \
  user-read-private \
  user-read-playback-state";
    res.redirect("https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: "token",
            scope: scope,
            client_id: process.env.SPOTIFY_CLIENT_ID,
            redirect_uri: redirect_uri,
        }));
});
app.post("/add-playlist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const playlistName = req.body.playlistName;
    const playlistDescription = req.body.playlistDescription;
    console.log(username, playlistName, playlistDescription);
    try {
        yield User.updateOne({ username: username }, {
            $push: {
                playlists: {
                    name: playlistName,
                    description: playlistDescription,
                    tracks: [],
                },
            },
        });
    }
    catch (error) {
        console.log(error);
    }
}));
app.post("/add-song-to-playlist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlistName = req.body.playlistName;
    const track = req.body.track;
    try {
        yield User.updateOne({ "playlists.name": playlistName }, { $push: { "playlists.$.tracks": track } }, { new: true });
    }
    catch (error) {
        console.log(error);
    }
}));
app.get("/load-playlists/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.params.username;
    yield User.findOne({ username: username }).then((user) => {
        res.json(user === null || user === void 0 ? void 0 : user.playlists);
    });
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
