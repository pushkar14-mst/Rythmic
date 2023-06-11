import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Playlist {
  id: string;
  name: string;
  accessToken: string;
  description: string;
}

const initialState: Playlist = {
  id: "",
  name: "",
  accessToken: "",
  description: "",
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState: initialState,
  reducers: {
    setPlaylist(state, action: PayloadAction<any>) {
      state.id = action.payload!.id;
      state.name = action.payload!.name;
      state.accessToken = action.payload.access_token;
      state.description = action.payload.description;
    },
  },
});

export const playlistActions = playlistSlice.actions;
export const playlistReducers = playlistSlice.reducer;
