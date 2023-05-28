import React, { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import { useDispatch } from "react-redux";
import { playerActions } from "../../store/player-slice";
import { Link } from "react-router-dom";
const HomePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [popTracks, setPopTracks] = useState<any>([]);
  const [newReleases, setNewReleases] = useState<any>([]);
  const token = window.location.hash;
  const dispatch = useDispatch();
  const access_token = token
    .substring(1)
    .split("&")
    .find((elem) => elem.startsWith("access_token"))
    .split("=")[1];

  //console.log(access_token);

  const clientId: string = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

  const getTracksByGerne = async (genre: string) => {
    await axios
      .get("https://api.spotify.com/v1/search/", {
        headers: {
          Authorization: "Bearer " + access_token,
        },
        params: {
          q: 'genre:"' + genre + '"',
          type: "track",
          limit: 8, // Number of tracks to retrieve
        },
      })
      .then((res) => {
        console.log(res.data);
        setPopTracks(res.data.tracks.items);
      });
  };

  const getNewReleases = async () => {
    await axios
      .get("https://api.spotify.com/v1/browse/new-releases", {
        headers: {
          Authorization: "Bearer " + access_token,
        },
        params: {
          limit: 8,
        },
      })
      .then((res) => {
        setNewReleases(res.data.albums.items);
      });
  };
  useEffect(() => {
    getTracksByGerne("pop");
    getNewReleases();
  }, []);
  useEffect(() => {
    fetchProfile(access_token).then((res) => {
      setProfile(res);
    });
  }, [access_token]);

  async function fetchProfile(token: string): Promise<any> {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await result.json();
    return data;
  }
  console.log(newReleases);

  return (
    <>
      <h1 className="logo">Rythmic</h1>
      <div className="home-page-container">
        {profile && <h2>Good Day, {profile.display_name}</h2>}
        <h1>New Releases</h1>
        <div className="gerne-row">
          {newReleases.map((albums: any) => {
            return (
              <Link
                to={`/album`}
                state={{
                  album: {
                    albumId: albums.id,
                    name: albums.name,
                    artists: albums.artists,
                    image: albums.images[0].url,
                  },
                  access_token: access_token,
                }}
              >
                <div className="album-cover">
                  <img src={albums.images[0].url} alt="album cover" />
                  <h3>{albums.name}</h3>
                  <h5>
                    {albums.artists!.map((artist: any) => {
                      return (
                        artist.name +
                        `${albums.artists!.length < 2 ? "" : ", "}`
                      );
                    })}
                  </h5>
                </div>
              </Link>
            );
          })}
        </div>
        <h1>Pop</h1>
        <div className="gerne-row">
          {popTracks.map((tracks: any) => {
            return (
              <div
                className="album-cover"
                onClick={() => {
                  dispatch(
                    playerActions.setTrack({
                      albumImg: tracks.album.images[0].url,
                      albumName: tracks.album.name,
                      artists: tracks.artists,
                      trackId: tracks.uri,
                    })
                  );
                }}
              >
                <img src={tracks.album.images[0].url} alt="album cover" />
                <h3>{tracks.album.name}</h3>
                <h5>
                  {tracks.artists!.map((artist: any) => {
                    return (
                      artist.name + `${tracks.artists!.length < 2 ? "" : ", "}`
                    );
                  })}
                </h5>
              </div>
            );
          })}
        </div>
      </div>
      <MusicPlayer accessToken={access_token} />
    </>
  );
};
export default HomePage;
