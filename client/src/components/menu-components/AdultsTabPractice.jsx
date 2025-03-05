import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages-styles/menu-lingo-practice.css";

export default function AdultsTabPractice() {
  const navigate = useNavigate();

  function handleQuizClick(id, type) {
    if (type === "quiz_adults") {
      navigate(`/lingo-practice/quiz_adults_${id}`);
    } else if (type === "practice_adults") {
      navigate(`/lingo-practice/practice_adults_${id}`);
    }
  }

  return (
    <div className="quiz-buttons">
      <div className="title-text">Adults:</div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
        <div key={"adults_" + id} className="unit-card">
          unit {id}
          <div className="menu-button-group">
            <button
              className="menu-button practice-button top-button"
              key={"practice_" + id}
              onClick={() => handleQuizClick(id, "practice_adults")}
            >
              Practice
            </button>
            <button
              className={`menu-button bottom-button`}
              key={"quiz_" + id}
              onClick={() => handleQuizClick(id, "quiz_adults")}
            >
              <div className="menu-button-content">Quiz</div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
