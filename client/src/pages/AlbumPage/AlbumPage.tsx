import React, { useEffect, useState } from "react";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import "./AlbumPage.css";
import { useLocation } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { playerActions } from "../../store/player-slice";
const AlbumPage: React.FC = () => {
  const [tracks, setTracks] = useState<any>([]);
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
            let duration = String(Math.round(track.duration_ms / 1000));

            return (
              <>
                <div
                  className="album-track"
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
                >
                  <p>{track.name}</p>

                  <p style={{ marginLeft: "auto" }}>{`${duration.slice(
                    0,
                    1
                  )}:${duration.slice(1)}`}</p>
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
