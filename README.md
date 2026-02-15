# Rythmic

A full-stack music streaming web application built with React and Express that integrates with the Spotify Web API. Users can browse music, create custom playlists, and play tracks directly in the browser using the Spotify Web Playback SDK.

## Features

- Spotify OAuth login
- Browse tracks by genre (pop, rock) and view new releases
- Search tracks via the Spotify catalog
- Create and manage custom playlists stored in MongoDB
- Play, pause, and skip tracks with a built-in music player
- Volume control and seek/progress bar
- Playback queue with auto-advance to next track
- Album page with full track listing
- User profile page

## Tech Stack

**Frontend:** React 18, TypeScript, Redux Toolkit, React Router v6, Axios, Vite

**Backend:** Node.js, Express, TypeScript, Mongoose

**Database:** MongoDB Atlas

**External APIs:** Spotify Web API, Spotify Web Playback SDK

## Project Structure

```
Rythmic/
├── client/
│   ├── src/
│   │   ├── assets/icons/          # UI icons
│   │   ├── components/
│   │   │   ├── MusicPlayer/       # Playback controls, progress bar, queue
│   │   │   └── SearchBar/         # Track search for adding to playlists
│   │   ├── pages/
│   │   │   ├── HomePage/          # Genre browsing, new releases
│   │   │   ├── ProfilePage/       # User info, playlist management
│   │   │   ├── PlaylistPage/      # Playlist view with track search
│   │   │   └── AlbumPage/         # Album track listing
│   │   ├── store/                 # Redux slices (player, playlist)
│   │   ├── App.tsx                # Routing setup
│   │   └── main.tsx               # Entry point
│   ├── vite.config.ts
│   └── package.json
├── server/
│   ├── server.ts                  # Express server with all API routes
│   ├── .env                       # Spotify and MongoDB credentials
│   └── package.json
```

## Prerequisites

- Node.js
- A Spotify Developer account with a registered application
- A MongoDB Atlas cluster (or local MongoDB instance)

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd Rythmic
```

### 2. Configure environment variables

Create a `.env` file in the `server/` directory:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
MONGO_ATLAS_URL=your_mongodb_connection_string
```

Set the Spotify client ID for the frontend by creating a `.env.local` file in the `client/` directory:

```
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
```

### 3. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 4. Run the application

Start the backend server:

```bash
cd server
npm run dev
```

Start the frontend dev server:

```bash
cd client
npm run dev
```

The client runs at `http://127.0.0.1:5173` and the server runs at `http://127.0.0.1:8000`.

## API Endpoints

| Method | Endpoint                    | Description                  |
| ------ | --------------------------- | ---------------------------- |
| GET    | `/`                         | Health check                 |
| GET    | `/login`                    | Spotify OAuth redirect       |
| POST   | `/add-user`                 | Create a new user            |
| POST   | `/add-playlist`             | Create a new playlist        |
| POST   | `/add-song-to-playlist`     | Add a track to a playlist    |
| GET    | `/load-playlists/:username` | Get all playlists for a user |

## How It Works

1. The user logs in through Spotify OAuth (implicit grant flow). An access token is returned in the URL hash.
2. The token is used for all Spotify API calls -- searching tracks, fetching albums, controlling playback.
3. On first login, a user record is created in MongoDB.
4. Users can create playlists and add tracks to them. Playlist data is stored in MongoDB.
5. Music playback is handled by the Spotify Web Playback SDK, which streams audio directly in the browser.
6. Redux manages client-side state for the music player (current track, queue, volume) and the active playlist.
