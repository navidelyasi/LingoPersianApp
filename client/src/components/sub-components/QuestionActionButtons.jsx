import React from "react";
import "../../styles/sub-styles/question-action-buttons.css";
import {
  playlevelpassed,
  playwronganswer,
  playinterface12,
} from "../../hooks/handleSoundEffects";

export default function QuestionActionButtons({
  submitted,
  questionLength,
  getScore,
  handleSubmitOneQuestion,
}) {
  return (
    <>
      {/* __________ score display __________ */}
      {submitted !== "" && (
        <div className="score-display">
          Score: {getScore()} out of {questionLength}
        </div>
      )}

      {/* __________ actions __________ */}
      <div className="multi-actions">
        {submitted === "" ? (
          <button
            className="submit-button"
            onClick={() => {
              const score = getScore();
              if (score === questionLength) {
                playlevelpassed();
              } else {
                playwronganswer();
              }
              handleSubmitOneQuestion("submit");
            }}
          >
            Submit
          </button>
        ) : (
          <div className="post-submit-buttons">
            <button
              className="retry-button"
              onClick={() => {
                handleSubmitOneQuestion("retry");
                playinterface12();
              }}
            >
              Retry
            </button>
            {submitted === "submitted" && (
              <button
                className="show-answers-button"
                onClick={() => {
                  playinterface12();
                  handleSubmitOneQuestion("show-answers");
                }}
              >
                Show Correct Answers
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
