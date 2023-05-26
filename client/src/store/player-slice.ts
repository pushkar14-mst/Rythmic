import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  play: boolean;
  pause: boolean;
  volume: number;
}

const initialState: PlayerState = {
  play: false,
  pause: false,
  volume: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    play(state, action) {
      state.play = true;
      state.pause = false;
    },
    pause(state, action) {
      state.play = false;
      state.pause = true;
    },
    incrementVolume(state, action: PayloadAction<any>) {
      state.volume = state.volume + action.payload.volume;
    },
    decrementVolume(state, action: PayloadAction<any>) {
      state.volume = state.volume - action.payload.volume!;
    },
  },
});

export const playerActions = playerSlice.actions;
export const playerReducers = playerSlice.reducer;
