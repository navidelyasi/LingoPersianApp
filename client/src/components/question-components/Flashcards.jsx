import React, { useState } from "react";
import Sound from "../sub-components/Sound";
import { playSound } from "../../hooks/handleSoundEffects";
import "../../styles/questions-styles/flashcards.css";

// _____ quizId _____ is like "adults_3"
// _____ questionData _____ is the question object
function Flashcards({ questionData }) {
  const [isFlipped, setIsFlipped] = useState(
    new Array(questionData.data.length).fill(false)
  );

  const handleFlip = (index) => {
    if (questionData.data[index].sound) {
      playSound(questionData.data[index].sound);
    }
    setIsFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return (
    <div className="card-question-container">
      <div className="card-question-title">{questionData.title}</div>
      {questionData.sound && <Sound soundSrc={questionData.sound} />}
      {questionData.data.map((card, cardIndex) => (
        <div
          className="card-content"
          key={card.tag}
          onClick={() => handleFlip(cardIndex)}
        >
          <div className={`flashcard ${isFlipped[cardIndex] ? "flipped" : ""}`}>
            <div className="flashcard-inner">
              <div className="flashcard-front">
                {card.picture ? (
                  <img src={card.picture} alt={card.tag} />
                ) : (
                  <h3>{card.tag}</h3>
                )}
              </div>
              <div className="flashcard-back">
                <h2>{card.back}</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default React.memo(Flashcards);
