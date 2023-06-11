import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";

import "./ProfilePage.css";
import createIcon from "../../assets/icons/add.png";
import { useDispatch } from "react-redux";
import { playlistActions } from "../../store/playlist-slice";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [modal, setModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [playlists, setPlaylists] = useState<any>([]);
  const modalRef: HTMLDialogElement | any = useRef();
  const location = useLocation();
  const profile = location.state.profile;
  const access_token = location.state!.access_token;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(profile);

  const logoutHandler = () => {
    localStorage.removeItem("access_token");
    navigate("/", { replace: true });
  };
  //   dispatch(
  //     playlistActions.setPlaylist({
  //       name: playlistName,
  //       description: playlistDescription,
  //       access_token: access_token,
  //     })
  //   );
  return (
    <>
      <h1 className="logo">Rythmic</h1>
      <div className="profile-page-container">
        <h1>Your Profile</h1>
        <div className="profile-page-details">
          <div className="progile-info">
            <h2> {profile.display_name}</h2>
            <h4>{profile.product!.toUpperCase()}</h4>
            <h3> {profile.email}</h3>
            <button
              className="logout-btn"
              onClick={() => {
                logoutHandler();
              }}
            >
              Logout
            </button>
          </div>

          <img
            src={profile.images[0].url}
            alt="profile"
            className="profile-image"
          />
        </div>
        <dialog ref={modalRef} open={modal} className="create-playlist-dialog">
          <h1>Create a new playlist</h1>
          <div className="playlist-form">
            <input
              type="text"
              placeholder="Enter your Playlist Name"
              id="playlist-name"
              onChange={(e) => {
                setPlaylistName(e.target.value);
              }}
            />
            <textarea
              rows={5}
              id="playlist-description"
              placeholder="Enter your description"
              onChange={(e) => {
                setPlaylistDescription(e.target.value);
              }}
            />
          </div>
          <button
            onClick={() => {
              setModal(false);
            }}
          >
            Cancel
          </button>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              setPlaylists([
                { name: playlistName, description: playlistDescription },
              ]);
              setModal(false);
            }}
          >
            Create
          </button>
        </dialog>
        <div className="profile-playlists">
          <h1>Your Playlists</h1>
          <div className="gerne-row">
            <div
              className="playlist-card"
              onClick={() => {
                setModal(true);
              }}
            >
              <h1 id="create-icon">+</h1>
              <h3 style={{ margin: "0" }}>Create a new playlist</h3>
            </div>
            {playlists.map((playlist) => {
              return (
                <Link
                  to={`/profile/my-playlists/${playlist.name}`}
                  state={{
                    playlistName: playlist.name,
                    description: playlist.description,
                    access_token: access_token,
                  }}
                >
                  <div className="playlist-card">
                    <h3>{playlist.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
