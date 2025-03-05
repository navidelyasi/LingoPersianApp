import React from "react";
import "../../styles/sub-styles/timer.css";

export default function Timer({
  percentage,
  timeLeft,
  totalTimeSpent,
  formatTime,
}) {
  return (
    <div className="timer-container">
      <div
        className="timer-circle"
        style={{
          background: `conic-gradient(
                  green ${percentage}%, 
                  #ccc ${percentage}%
              )`,
        }}
      >
        <div className="inner-timer">
          <span className="timer-text">{formatTime(timeLeft)}</span>
        </div>
      </div>
      <div className="timer-text">
        <p>Time spent:</p>
        <p>{formatTime(totalTimeSpent)}</p>
      </div>
    </div>
  );
}
