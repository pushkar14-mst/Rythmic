import { configureStore } from "@reduxjs/toolkit";
import { playerReducers } from "./player-slice";
import { playlistReducers } from "./playlist-slice";

const store = configureStore({
  reducer: {
    player: playerReducers,
    playlist: playlistReducers,
  },
});
export default store;
