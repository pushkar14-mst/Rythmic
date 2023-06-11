import HomePage from "./pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import AlbumPage from "./pages/AlbumPage/AlbumPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PlaylistPage from "./pages/PlaylistPage/PlaylistPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/album" element={<AlbumPage />} />
      <Route path="/profile/my-playlists/:id" element={<PlaylistPage />} />
    </Routes>
  );
}

export default App;
