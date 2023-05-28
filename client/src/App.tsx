import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import AlbumPage from "./pages/AlbumPage/AlbumPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/album" element={<AlbumPage />} />
    </Routes>
  );
}

export default App;
