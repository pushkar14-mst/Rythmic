import React, { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
const HomePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [popTracks, setPopTracks] = useState<any>([]);
  const token = window.location.hash;

  const access_token = token
    .substring(1)
    .split("&")
    .find((elem) => elem.startsWith("access_token"))
    .split("=")[1];

  console.log(access_token);

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
  useEffect(() => {
    getTracksByGerne("pop");
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
  console.log(popTracks);
  return (
    <>
      <h1 className="logo">Rythmic</h1>
      <div className="home-page-container">
        {profile && <h2>Good Day, {profile.display_name}</h2>}
        <h1>Pop</h1>
        <div className="gerne-row">
          {popTracks.map((tracks: any) => {
            return (
              <div className="album-cover">
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
      <MusicPlayer />
    </>
  );
};
export default HomePage;
