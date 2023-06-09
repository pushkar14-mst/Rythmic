import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MusicPlayer.css";
import playImg from "../../assets/icons/play.png";
import pauseImg from "../../assets/icons/pause.png";
import rewind from "../../assets/icons/rewind.png";
import volume from "../../assets/icons/volume.png";
import musicQueue from "../../assets/icons/list-music.png";
import axios from "axios";
import { playerActions } from "../../store/player-slice";
interface Props {
  accessToken: string;
}
const MusicPlayer = ({ accessToken }: Props) => {
  const [playingState, setPlayingState] = useState<boolean>(false);
  const [player, setPlayer] = useState();
  const [progress, setProgress] = useState<any>();
  const [deviceId, setDeviceId] = useState<string>("");
  const [openQueue, setOpenQueue] = useState<boolean>(false);
  const [songEnd, setSongEnd] = useState<boolean>(false);
  const album = useSelector((state: any) => state!.player.album);
  const playingQueue = useSelector((state: any) => state!.player.queue);

  const dispatch = useDispatch();
  console.log("current playing queue: ", playingQueue);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Rythmic",
        getOAuthToken: (cb: any) => {
          cb(accessToken);
        },
        volume: 0.5,
      });
      setPlayer(player);
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });
      player.getCurrentState().then((state: any) => {
        console.log(state);
      });

      player.connect();
    };
  }, []);

  const play = (deviceId: any) => {
    setSongEnd(false);
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ uris: [album.trackId] }),
    })
      .then((response) => {
        if (response.status === 204) {
          console.log("Playback started");
        } else {
          console.error("Failed to start playback");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const pause = (deviceId: any) => {
    fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ uris: [album.trackId] }),
    })
      .then((response) => {
        if (response.status === 204) {
          console.log("Playback started");
        } else {
          console.error("Failed to start playback");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getCurrentState = async () => {
    await axios
      .get("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setProgress(response.data.progress_ms);
      });
  };
  const minutes = Math.floor(progress / 60000);
  const seconds = Math.floor((progress % 60000) / 1000);
  const totalMinutes = Math.floor(album.duration / 60000);
  const totalSeconds = Math.floor((album.duration % 60000) / 1000);
  useEffect(() => {
    play(deviceId);
  }, [album]);
  useEffect(() => {
    if (playingState === false) {
      pause(deviceId);
    } else {
      play(deviceId);
    }
  }, [playingState]);
  useEffect(() => {
    getCurrentState();
    const intervalId = setInterval(getCurrentState, 1000);
    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, []);
  console.log(
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
    album.duration
  );

  useEffect(() => {
    if (
      playingQueue.length > 0 &&
      minutes === totalMinutes &&
      seconds === totalSeconds
    ) {
      let albumImg = playingQueue[0].albumImg;
      let albumName = playingQueue[0].albumName;
      let artist = playingQueue[0].artists;
      let trackId = playingQueue[0].trackId;
      let duration = playingQueue[0].duration;
      dispatch(
        playerActions.setTrack({
          albumImg: albumImg,
          albumName: albumName,
          artists: artist,
          trackId: trackId,
          duration: duration,
        })
      );
      dispatch(playerActions.removeFromListeningQueue());
    }
  }, [play]);

  return (
    <>
      {openQueue && (
        <div className="playing-queue">
          <ul>
            <h3>Playing Queue</h3>
            {playingQueue.map((track: any) => {
              return (
                <li>
                  <div className="queue-track" draggable>
                    <img src={track.albumImg} alt="album-img" />
                    <h4>{track.albumName}</h4>
                    <h5>
                      {track.artists!.map((artist: any) => {
                        return (
                          artist.name +
                          `${track.artists!.length < 2 ? "" : ", "}`
                        );
                      })}
                    </h5>
                    <h2
                      style={{ marginLeft: "auto", cursor: "pointer" }}
                      onClick={() => {
                        dispatch(playerActions.removeFromListeningQueue());
                      }}
                    >
                      -
                    </h2>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="music-player">
        <div className="current-playing-album">
          <img src={album && album!.albumImg} alt="album-img" />
          <div className="track-info">
            <h5>{album && album!.albumName}</h5>
            <h6 style={{ fontWeight: "normal" }}>
              {typeof album!.artists !== "undefined" &&
                album!.artists!.map((artist: any) => {
                  return artist.name;
                })}
            </h6>
          </div>
        </div>

        <div className="controls">
          <div className="playing-states">
            <img src={rewind} alt="rewind" />
            <img
              src={playingState ? pauseImg : playImg}
              alt="play"
              onClick={() => setPlayingState(!playingState)}
            />
            <img src={rewind} alt="rewind" style={{ rotate: "180deg" }} />
            <img
              src={musicQueue}
              alt="queue"
              onClick={() => setOpenQueue(!openQueue)}
            />
          </div>
          <div className="track-progress">
            <p>{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</p>
            <div className="seek">
              <div
                className="progress-bar"
                style={{
                  width: progress
                    ? `${(progress / album.duration) * 500}px`
                    : `0`,
                }}
              />
              <div className="seek-bar" />
            </div>

            <p>
              {`${totalMinutes}:${totalSeconds < 10 ? "0" : ""}${totalSeconds}`}
            </p>
          </div>
        </div>

        <div className="volume">
          <img src={volume} alt="volume" />
          <div className="volume-bar"></div>
        </div>
      </div>
    </>
  );
};
export default MusicPlayer;
