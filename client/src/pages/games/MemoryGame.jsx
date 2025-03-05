import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { practicesAdultsData } from "../../data/practicesAdultsData.js";
import { shuffleArray } from "../../hooks/helpers.js";
import {
  playSound,
  playlevelpassed,
  playclickButton,
  playnotification2,
} from "../../hooks/handleSoundEffects.js";
import "../../styles/games-styles/memory-game.css";
import { FaSmileBeam, FaRocket, FaStar } from "react-icons/fa";

export default function MemoryGame() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState([]);
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState([]);
  const [count, setCount] = useState(0);
  const [levelPassed, setLevelPassed] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    let rawData = practicesAdultsData["practice_adults_" + id][0].data;
    if (rawData.length > 5) {
      rawData = shuffleArray(rawData).slice(0, 5);
    }
    let __cards = [];
    rawData.forEach((card) => {
      __cards.push({ ...card, num: 1 });
      __cards.push({ ...card, num: 2 });
    });

    setCards(shuffleArray(__cards));
    setSolved(new Array(__cards.length).fill(false));
    setIsFlipped(new Array(__cards.length).fill(true));

    setTimeout(() => {
      setIsFlipped(new Array(__cards.length).fill(false));
      playnotification2();
    }, 2000);

    setLevelPassed(false);
    setCount(0);
  };

  const handleFlip = (index) => {
    setCount((prev) => prev + 1);
    if (cards[index].sound) {
      playSound(cards[index].sound);
    }

    setIsFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });

    if (selected === null) {
      setSelected({ ...cards[index], index });
    } else {
      if (selected.cardid === cards[index].cardid) {
        let __solved = [...solved];
        __solved[index] = true;
        __solved[selected.index] = true;
        setSolved(__solved);
      }

      setSelected(null);
      setTimeout(() => {
        setIsFlipped(new Array(cards.length).fill(false));
        playclickButton();
      }, 1000);
    }
  };

  useEffect(() => {
    if (solved.length > 0 && solved.every((s) => s)) {
      playlevelpassed();
      setTimeout(() => {
        setLevelPassed(true);
      }, 1000);
    }
  }, [solved]);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="card-game-nav">
        <div className="card-game-title score">count {count}</div>
        <div className="card-game-title">Card Game {id}</div>
        <button
          className="card-game-exit-button"
          onClick={() => navigate("/menu-lingo-practice")}
        >
          Exit
        </button>
      </nav>

      {/* Game Cards */}
      <div className="card-game-container">
        {cards.map((card, cardIndex) => (
          <div
            className="card-content-game"
            key={cardIndex}
            onClick={() =>
              (selected === null || selected.index !== cardIndex) &&
              !solved[cardIndex] &&
              handleFlip(cardIndex)
            }
          >
            <div
              className={`flashcard-game ${
                isFlipped[cardIndex] ? "flipped" : ""
              }`}
            >
              <div className="flashcard-game-inner">
                <div
                  className={`flashcard-game-front ${
                    solved[cardIndex] ? "solved" : ""
                  }`}
                >
                  {solved[cardIndex] ? (
                    <h3>{card.back}</h3>
                  ) : (
                    <FaSmileBeam
                      style={{
                        height: "50px",
                        width: "50px",
                        color: "var(--color-dark)",
                      }}
                    />
                  )}
                </div>
                <div className="flashcard-game-back">
                  {card.num === 1 ? (
                    card.picture ? (
                      <img
                        className="card-icon"
                        src={card.picture}
                        alt={card.tag}
                      />
                    ) : (
                      <h3>{card.tag}</h3>
                    )
                  ) : (
                    <h2>{card.back}</h2>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overlay for Level Completion */}
      {levelPassed && (
        <div className="overlay-card-game">
          <div className="overlay-card-game-content">
            <h1>
              HOOORAW
              <FaRocket style={{ color: "orange", marginLeft: "10px" }} />
              <FaStar style={{ color: "yellow", marginLeft: "5px" }} />
            </h1>
            <button className="overlay-button-replay" onClick={startGame}>
              Replay
            </button>
          </div>
        </div>
      )}
    </>
  );
}
