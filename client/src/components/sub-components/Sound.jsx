import React, { useRef } from "react";
import { FaPlayCircle, FaPauseCircle, FaRegStopCircle } from "react-icons/fa";
import "../../styles/sub-styles/sounds.css";

function Sound({ soundSrc }) {
  const audioRef = useRef(null);

  const handlePlaySound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    }
  };

  const handlePauseSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleStopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div>
      <div className="audio-controls">
        <button onClick={handlePlaySound}>
          <FaPlayCircle />
        </button>
        <button onClick={handlePauseSound}>
          <FaPauseCircle />
        </button>
        <button onClick={handleStopSound}>
          <FaRegStopCircle />
        </button>
      </div>
      <audio ref={audioRef} src={soundSrc} />
    </div>
  );
}

export default Sound;
