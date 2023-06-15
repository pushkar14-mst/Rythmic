import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Playlist {
  name: string;
  description: string;
  tracks: any[];
}

const initialState: Playlist = {
  name: "",
  description: "",
  tracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState: initialState,
  reducers: {
    setPlaylist(state, action: PayloadAction<any>) {
      state.name = action.payload!.name;
      state.description = action.payload.description;
    },
    addSongs(state, action: PayloadAction<any>) {
      state.tracks = [...state.tracks, action.payload.tracks];
      console.log(state.tracks);
    },
  },
});

export const playlistActions = playlistSlice.actions;
export const playlistReducers = playlistSlice.reducer;
