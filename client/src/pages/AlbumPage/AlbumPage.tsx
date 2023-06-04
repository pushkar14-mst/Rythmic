import React, { useEffect, useRef, useState } from "react";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import "./AlbumPage.css";
import { useLocation } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { playerActions } from "../../store/player-slice";
import menuIcon from "../../assets/icons/menu-dots.png";
const AlbumPage: React.FC = () => {
  const [tracks, setTracks] = useState<any>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [trackId, setTrackId] = useState<any>("");
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(location.state);
  const album = location.state.album;
  const access_token = location.state.access_token;
  const albumId = album.albumId;
  const retrieveTracks = async () => {
    await axios
      .get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const tracks = response.data.items;
        setTracks(tracks);
      })
      .catch((error) => {
        console.error("Error fetching album tracks:", error);
      });
  };
  console.log("album tracks", tracks);

  useEffect(() => {
    retrieveTracks();
  }, []);
  return (
    <>
      <h1 className="logo">Rythmic</h1>
      <div className="album-page-container">
        <div className="albumPage-cover">
          <img src={album.image} />
          <h1>{album.name}</h1>
          <p>
            {typeof album!.artists !== "undefined" &&
              album
                .artists!.map((artist: any) => {
                  return artist.name;
                })
                .join("," + "")}
          </p>
        </div>
        <div className="albumPage-tracks">
          <h1>Tracks</h1>
          {tracks.map((track: any) => {
            let duration = track.duration_ms;
            const totalMinutes = Math.floor(duration / 60000);
            const totalSeconds = Math.floor((duration % 60000) / 1000);
            return (
              <>
                <div className="album-track">
                  <p
                    onClick={() => {
                      dispatch(
                        playerActions.setTrack({
                          albumImg: album.image,
                          albumName: track.name,
                          artists: track.artists,
                          trackId: track.uri,
                          duration: duration,
                        })
                      );
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {track.name}
                  </p>

                  <p style={{ marginLeft: "auto" }}>
                    {`${totalMinutes}:${
                      totalSeconds < 10 ? "0" : ""
                    }${totalSeconds}`}
                  </p>
                  <div className="track-menu" key={track.id}>
                    <img
                      src={menuIcon}
                      onClick={() => {
                        setShowMenu(!showMenu);
                        setTrackId(track.id);
                      }}
                    />
                    {showMenu && trackId === track.id && (
                      <>
                        <div className="track-menu-box">
                          <ul>
                            <li
                              onClick={() => {
                                dispatch(
                                  playerActions.addToListeningQueue({
                                    albumImg: album.image,
                                    albumName: track.name,
                                    artists: track.artists,
                                    trackId: track.uri,
                                    duration: duration,
                                  })
                                );
                              }}
                            >
                              Add to Queue
                            </li>
                            <li>Add to playlist</li>
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <MusicPlayer accessToken={access_token} />
    </>
  );
};

export default AlbumPage;
