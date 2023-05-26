import { useState } from "react";
import "./MusicPlayer.css";
import play from "../../assets/icons/play.png";
import pause from "../../assets/icons/pause.png";
import rewind from "../../assets/icons/rewind.png";
import volume from "../../assets/icons/volume.png";
const MusicPlayer = () => {
  const [playingState, setPlayingState] = useState<boolean>(false);
  return (
    <>
      <div className="music-player">
        <div className="controls">
          <div className="playing-states">
            <img src={rewind} alt="rewind" />
            <img
              src={playingState ? play : pause}
              alt="play"
              onClick={() => setPlayingState(!playingState)}
            />
            <img src={rewind} alt="rewind" style={{ rotate: "180deg" }} />
          </div>
          <div className="seek-bar"></div>
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
