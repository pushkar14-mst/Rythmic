import { configureStore } from "@reduxjs/toolkit";
import { playerReducers } from "./player-slice";

const store = configureStore({
  reducer: {
    player: playerReducers,
  },
});
export default store;
