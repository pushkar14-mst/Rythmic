import { useLocation, useParams } from "react-router";
import "./PlatlistPage.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { playerActions } from "../../store/player-slice";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";

const PlaylistPage: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const { id } = params;
  const addedTracks = useSelector((state) => state!.playlist!.tracks);
  const playlistName = useSelector((state) => state!.playlist!.name);
  const playlistsTracks = location.state.playlistTracks;
  const dispatch = useDispatch();
  console.log("added tracks: ", addedTracks);
  const access_token = location.state.access_token;

  console.log("playlist tracks", location.state.playlistTracks);
  const addSong = async (song: any) => {
    await axios.post("http://localhost:8000/add-song-to-playlist", {
      playlistName: location.state.playlistName,
      track: song,
    });
  };
  return (
    <>
      <h1 className="logo">Rythmic</h1>
      <div className="playlist-container">
        <div className="playlist-cover">
          <h1
            style={{ color: "#242424", textAlign: "center", fontSize: "5rem" }}
          >
            {location.state!.playlistName}
          </h1>
          <h3
            style={{
              color: "#ffffffde",
              opacity: "0.663",
              textAlign: "center",
              fontSize: "2rem",
            }}
          >
            Add a song to your playlist
          </h3>
          <SearchBar
            access_token={access_token}
            addSong={addSong}
            playlistName={location.state!.playlistName}
          />
        </div>
        <div className="playlist">
          {playlistsTracks!.map((track) => {
            return (
              <>
                <div className="playlist-tile">
                  <img src={track.album.images[0].url} alt="" />
                  <h3>{track.name}</h3>
                </div>
              </>
            );
          })}
          {playlistName === location.state!.playlistName &&
            addedTracks!.map((track) => {
              return (
                <>
                  <div
                    className="playlist-tile"
                    onClick={() => {
                      dispatch(
                        playerActions.setTrack({
                          albumImg: track.album.images[0].url,
                          albumName: track.name,
                          artists: track.artists,
                          trackId: track.uri,
                          duration: track.duration_ms,
                        })
                      );
                    }}
                  >
                    <img src={track.album.images[0].url} alt="" />
                    <h3>{track.name}</h3>
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
export default PlaylistPage;
