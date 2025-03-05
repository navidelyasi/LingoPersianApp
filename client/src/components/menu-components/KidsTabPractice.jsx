import React from "react";
import { useNavigate } from "react-router-dom";
import Broom from "../sub-components/Broom.jsx";
import "../../styles/pages-styles/menu-lingo-practice.css";

export default function KidsTabPractice() {
  const navigate = useNavigate();

  function handleClick(id, type) {
    if (type === "memory") {
      navigate(`/memory-game/${id}`);
    } else if (type === "halloween") {
      navigate(`/local-halloween-game/${id}`);
    }
  }

  return (
    <div className="quiz-buttons">
      <div className="flying-broom">
        <Broom style={{ scale: "2" }} />
      </div>
      <div className="title-text">Kids:</div>
      {[1, 2, 3, 4, 5].map((id) => (
        <div key={"kids_" + id} className="unit-card">
          unit {id}
          <div className="menu-button-group">
            <button
              className="menu-button practice-button top-button"
              key={"memory_" + id}
              onClick={() => handleClick(id, "memory")}
            >
              Memory Game
            </button>
            <button
              className={`menu-button bottom-button`}
              key={"halloween_" + id}
              onClick={() => handleClick(id, "halloween")}
            >
              <div className="menu-button-content">Halloween Game</div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
