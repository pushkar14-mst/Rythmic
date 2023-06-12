import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Playlist {
  name: string;
  description: string;
}

const initialState: Playlist = {
  name: "",
  description: "",
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState: initialState,
  reducers: {
    setPlaylist(state, action: PayloadAction<any>) {
      state.name = action.payload!.name;
      state.description = action.payload.description;
    },
  },
});

export const playlistActions = playlistSlice.actions;
export const playlistReducers = playlistSlice.reducer;
