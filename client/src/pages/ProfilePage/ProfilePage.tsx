import { useLocation, useNavigate } from "react-router";
import "./ProfilePage.css";
import axios from "axios";
const ProfilePage = () => {
  const location = useLocation();
  const profile = location.state.profile;
  const navigate = useNavigate();
  console.log(profile);

  const logoutHandler = () => {
    localStorage.removeItem("access_token");
    navigate("/", { replace: true });
  };
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
        <div className="profile-playlists">
          <h1>Your Playlists</h1>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
