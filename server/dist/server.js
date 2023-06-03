"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var dotenv = require("dotenv");
const querystring = require("node:querystring");
dotenv.config();
const app = (0, express_1.default)();
const port = 8000;
var redirect_uri = "http://127.0.0.1:5173/";
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
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
