import { useLocation, useParams } from "react-router";
import "./PlatlistPage.css";
import SearchBar from "../../components/SearchBar/SearchBar";

const PlaylistPage: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const { id } = params;
  const access_token = location.state.access_token;
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
          <SearchBar access_token={access_token} />
        </div>
        <div className="playlist">
          <div className="playlist-tile"></div>
        </div>
      </div>
    </>
  );
};
export default PlaylistPage;
