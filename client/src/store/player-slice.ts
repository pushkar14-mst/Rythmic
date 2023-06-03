import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  play: boolean;
  pause: boolean;
  volume: number;
  album: object;
  queue: any[];
}

const initialState: PlayerState = {
  play: false,
  pause: false,
  volume: 0,
  album: {},
  queue: [],
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
    setTrack(state, action: PayloadAction<any>) {
      state.album = action.payload;
    },
    addToListeningQueue(state, action: PayloadAction<any>) {
      state.queue.push(action.payload);
    },
    removeFromListeningQueue(state, action: PayloadAction<any>) {
      state.queue.splice(action.payload, 1);
    },
  },
});

export const playerActions = playerSlice.actions;
export const playerReducers = playerSlice.reducer;
