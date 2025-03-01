import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { halloweenData } from "../data/gamesData.js";
import Dice from "../components/sub-components/Dice";
import HalloweenBoard from "../components/sub-components/HalloweenBoard";
import {
  playdiceroll,
  playsuccess2,
  playhalloweenimpact,
  playlevelpassed,
  playnotification2,
  playwronganswer,
} from "../hooks/handleSoundEffects.js";
import spookywiththunder from "../data/sounds/spooky-with-thunder.mp3";
import knockingOnBoard from "../data/sounds/knocking-on-board.mp3";
import "../styles/halloween-game.css";
import {
  FaRegSmileBeam,
  FaRegSmile,
  FaHandPaper,
  FaRocket,
  FaStar,
} from "react-icons/fa";

const upPositions = [7, 14, 21, 28, 35, 42, 49, 56, 63, 70];
const pumpkinsPositions = [5, 13, 26, 37, 40, 51, 58, 59, 73];
const pumpkinsNumbersBasedOnPositions = [9, 6, 5, 7, 4, 8, 2, 3, 1];

export default function LocalHalloweenGame() {
  const navigate = useNavigate();
  const questionsData = halloweenData[0];
  const screenWidthSmall = window.innerWidth <= 430;
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const spookySoundRef = useRef(null);
  const username = currentUser?.name || "";
  const levelPassedRef = useRef(0);
  const [numPlayers, setNumPlayers] = useState(null);
  const [activePlayer, setActivePlayer] = useState(1);
  const movingIntervalRef = useRef(null);
  const playersPositionsRef = useRef(null);
  const [, forceUpdate] = useState(0);
  const [moving, setMoving] = useState(false);

  const [diceNumber, setDiceNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [questionOverlay, setQuestionOverlay] = useState(false);
  const selectedQuestionRef = useRef(0);

  const [playersBlinking, setPlayersBlinking] = useState([]);
  const [playersWaving, setPlayersWaving] = useState(false);
  const pumpkinOrBroomNumber = useRef(0);

  // Set background sound
  useEffect(() => {
    spookySoundRef.current = new Audio(spookywiththunder);
    spookySoundRef.current.loop = true;
    spookySoundRef.current
      .play()
      .catch((err) => console.error("Audio error:", err));

    return () => {
      if (spookySoundRef.current) {
        spookySoundRef.current.pause();
        spookySoundRef.current.currentTime = 0;
      }
    };
  }, []);

  // Set player waving
  useEffect(() => {
    setTimeout(() => {
      setPlayersWaving(true);
    }, 1000);

    setTimeout(() => {
      setPlayersWaving(false);
    }, 2000);
  }, [activePlayer]);

  // set number of players and give them initial position
  const startGame = (num) => {
    setNumPlayers(num);
    playnotification2();

    // initialize positions
    let init = [];
    if (screenWidthSmall) {
      init = [
        { left: 2, top: 424, position: 1 },
        { left: 25, top: 440, position: 1 },
        { left: 25, top: 424, position: 1 },
        { left: 2, top: 440, position: 1 },
      ];
    } else {
      init = [
        { left: 4, top: 525, position: 1 },
        { left: 30, top: 547, position: 1 },
        { left: 30, top: 525, position: 1 },
        { left: 4, top: 547, position: 1 },
      ];
    }
    playersPositionsRef.current = init.slice(0, num);

    // Initialize blinking states for each player
    // blink: true or false
    // every: shows howmany seconds each time the player should blink
    let blinkingStates = [];
    for (let i = 0; i < num; i++) {
      blinkingStates.push({
        blinks: false,
        blinksEvery: Math.floor(Math.random() * 6) + 4,
      });
    }
    setPlayersBlinking(blinkingStates);

    // set intervals for blinking and waving
    for (let i = 0; i < num; i++) {
      // set interval for blinking each player
      setInterval(() => {
        setPlayersBlinking((prev) => {
          let newBlinkingStates = [...prev];
          newBlinkingStates[i].blinks = true;
          return newBlinkingStates;
        });

        // set timeout for end blinking
        setTimeout(() => {
          setPlayersBlinking((prev) => {
            let newBlinkingStates = [...prev];
            newBlinkingStates[i].blinks = false;
            return newBlinkingStates;
          });
        }, 500);
      }, blinkingStates[i].blinksEvery * 1000);
    }
  };

  const rollDice = () => {
    if (levelPassedRef.current > 0) return;
    playdiceroll();
    setIsRolling(true);
    setMoving(true);

    // dice roll
    setTimeout(() => {
      const newNumber = Math.floor(Math.random() * 6) + 1;
      setDiceNumber(newNumber);
      setIsRolling(false);

      let newPositions = [...playersPositionsRef.current];
      let { position } = newPositions[activePlayer - 1];

      if (position + newNumber > 77) {
        // player passes finish line
        playhalloweenimpact();
        setMoving(false);
        setActivePlayer((prev) => (prev === numPlayers ? 1 : prev + 1));
      } else {
        // Move player based on dice number
        movePlayerForwardDiceNumber(newNumber);
      }
    }, 1000);
  };

  // move player based on Dice number
  function movePlayerForwardDiceNumber(diceNumber) {
    let stepCount = 0;
    movingIntervalRef.current = setInterval(() => {
      movePlayerForward();
      stepCount++;
      if (stepCount >= diceNumber) {
        clearInterval(movingIntervalRef.current);
        movingIntervalRef.current = null;
        if (levelPassedRef.current > 0) return;
        checkLadder();
        checkPumpkin();
      }
    }, 500);
  }

  // just move forward, and check if player reached finish
  function movePlayerForward() {
    let newPositions = [...playersPositionsRef.current];
    let { left, top, position } = newPositions[activePlayer - 1];

    // should go up ?
    if (upPositions.includes(position)) {
      top -= screenWidthSmall ? 42 : 52;
    } else if (Math.floor(position / 7) % 2 === 1) {
      // need go to left
      left -= screenWidthSmall ? 50 : 62;
    } else {
      left += screenWidthSmall ? 50 : 62;
    }
    position += 1;

    const stepSound = new Audio(knockingOnBoard);
    stepSound.play();

    // Update ref value instantly
    newPositions[activePlayer - 1] = { left, top, position };
    playersPositionsRef.current = newPositions;

    // check if player reached finish
    if (position === 77) {
      levelPassedRef.current = activePlayer;
      playlevelpassed();
    }

    // Force UI update after movement
    forceUpdate((prev) => prev + 1);
  }

  function checkLadder() {
    let newPositions = [...playersPositionsRef.current];
    let { left, top, position } = newPositions[activePlayer - 1];

    if (position === 3) {
      left += screenWidthSmall ? 50 : 62;
      top -= screenWidthSmall ? 84 : 104;
      position = 18;

      setBroomAnimation(13);

      newPositions[activePlayer - 1] = { left, top, position };
      playersPositionsRef.current = newPositions;

      forceUpdate((prev) => prev + 1);
      playsuccess2();
    } else if (position === 23) {
      left -= screenWidthSmall ? 50 : 62;
      top -= screenWidthSmall ? 84 : 104;
      position = 38;

      setBroomAnimation(14);

      newPositions[activePlayer - 1] = { left, top, position };
      playersPositionsRef.current = newPositions;

      forceUpdate((prev) => prev + 1);
      playsuccess2();
    } else if (position === 42) {
      left += screenWidthSmall ? 50 : 62;
      top -= screenWidthSmall ? 84 : 104;
      position = 55;

      setBroomAnimation(11);

      newPositions[activePlayer - 1] = { left, top, position };
      playersPositionsRef.current = newPositions;

      forceUpdate((prev) => prev + 1);
      playsuccess2();
    } else if (position === 53) {
      left += screenWidthSmall ? 50 : 62;
      top -= screenWidthSmall ? 84 : 104;
      position = 66;

      setBroomAnimation(12);

      newPositions[activePlayer - 1] = { left, top, position };
      playersPositionsRef.current = newPositions;

      forceUpdate((prev) => prev + 1);
      playsuccess2();
    }
  }

  function checkPumpkin() {
    let newPositions = [...playersPositionsRef.current];
    let { position } = newPositions[activePlayer - 1];

    if (pumpkinsPositions.includes(position)) {
      selectedQuestionRef.current = Math.floor(
        Math.random() * questionsData.length
      );

      pumpkinOrBroomNumber.current =
        pumpkinsNumbersBasedOnPositions[pumpkinsPositions.indexOf(position)];

      setQuestionOverlay(true);
      playhalloweenimpact();
    } else {
      setMoving(false);
      setActivePlayer((prev) => (prev === numPlayers ? 1 : prev + 1));
    }
  }

  function submitAnswer(answer) {
    setQuestionOverlay(false);
    pumpkinOrBroomNumber.current = 0;
    if (
      answer === questionsData[selectedQuestionRef.current].correct ||
      answer === 100
    ) {
      setMoving(false);
      playlevelpassed();
    } else {
      setMoving(false);
      playwronganswer();
      setActivePlayer((prev) => (prev === numPlayers ? 1 : prev + 1));
    }
  }

  function setBroomAnimation(broomNum) {
    pumpkinOrBroomNumber.current = broomNum;

    setTimeout(() => {
      pumpkinOrBroomNumber.current = 0;
    }, 1000);
  }

  return (
    <div className="halloween-container-main">
      {/* Navigation Bar */}
      <nav className="halloween-game-nav">
        <div className="halloween-game-title">Local Halloween Game</div>
        <button
          className="halloween-game-exit-button"
          onClick={() => navigate("/")}
        >
          Exit
        </button>
      </nav>

      <div className="halloween-game-container">
        {/*       _________       GAME Board             ______    */}
        <div className="halloween-game-column">
          <div className="halloween-board-container">
            <HalloweenBoard
              pumpkinOrBroomNumber={pumpkinOrBroomNumber.current}
            />
            {/*       _________       Players             ______    */}
            {numPlayers &&
              [...Array(numPlayers)].map((_, index) => (
                <div
                  key={index}
                  className="player-token"
                  style={{
                    left: `${playersPositionsRef.current[index].left}px`,
                    top: `${playersPositionsRef.current[index].top}px`,
                    backgroundColor:
                      index === 0
                        ? "var(--color-primary)"
                        : index === 1
                        ? "var(--color-success)"
                        : index === 2
                        ? "var(--color-red)"
                        : "var(--color-light)",
                  }}
                >
                  {playersBlinking[index].blinks ? (
                    <FaRegSmileBeam className="smily-face" />
                  ) : (
                    <FaRegSmile className="smily-face" />
                  )}

                  {playersWaving && index + 1 === activePlayer && (
                    <FaHandPaper className="waving-hand" />
                  )}
                </div>
              ))}
          </div>
        </div>

        <div className="halloween-game-column">
          <h1 className="active-player-text">
            active player is {activePlayer}
          </h1>
          {/*    _______    MOVE buttons    _________     */}
          {numPlayers && (
            <div className="players-info-container">
              {Array(numPlayers)
                .fill()
                .map((_, index) => (
                  <button
                    key={index}
                    className={`move-button
                    ${
                      index === 0
                        ? "one"
                        : index === 1
                        ? "two"
                        : index === 2
                        ? "three"
                        : "four"
                    }
                    `}
                    disabled={activePlayer !== index + 1 || moving}
                    onClick={() => rollDice()}
                  >
                    player {index + 1}
                    <div
                      className="player-token"
                      style={{
                        position: "relative",
                        marginLeft: "5px",
                        backgroundColor:
                          index === 0
                            ? "var(--color-primary)"
                            : index === 1
                            ? "var(--color-success)"
                            : index === 2
                            ? "var(--color-red)"
                            : "var(--color-light)",
                      }}
                    >
                      <FaRegSmile
                        style={{
                          color: "var(--color-xdark)",
                          width: "26px",
                          height: "26px",
                        }}
                      />
                    </div>
                  </button>
                ))}
            </div>
          )}
          {/*     _________         Dice           ______ */}
          <Dice
            diceNumber={diceNumber}
            isRolling={isRolling}
            rollDice={rollDice}
            moving={moving}
          />
        </div>
      </div>

      {/*  ___    Overlay        ___     Question                     ______ */}
      {questionOverlay && (
        <div className="overlay-halloween-game">
          <div className="overlay-halloween-game-content">
            {username === "azadehabedini93@gmail.com" ? (
              <>
                <h1>آیا درست جواب دادم؟</h1>
                <button
                  className="overlay-halloween-button"
                  onClick={() => submitAnswer(100)}
                >
                  بله
                </button>
                <button
                  className="overlay-halloween-button"
                  onClick={() => submitAnswer(99)}
                >
                  خیر
                </button>
              </>
            ) : (
              <>
                <h1>{questionsData[selectedQuestionRef.current].question}</h1>
                {questionsData[selectedQuestionRef.current].answers.map(
                  (q, i) => (
                    <button
                      key={i}
                      className="overlay-halloween-button"
                      onClick={() => submitAnswer(i)}
                    >
                      {q}
                    </button>
                  )
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/*  ___    Overlay        ___     starting GAME ___ get players number */}
      {numPlayers === null && (
        <div className="overlay-halloween-game">
          <div className="overlay-halloween-game-content">
            <h1>Select Number of Players</h1>
            {[2, 3, 4].map((num) => (
              <button
                key={num}
                className="overlay-halloween-button"
                onClick={() => startGame(num)}
              >
                {num} Players
              </button>
            ))}
          </div>
        </div>
      )}

      {/*  ___    Overlay        ___     GAME is Finished        ____________ */}
      {levelPassedRef.current > 0 && (
        <div className="overlay-halloween-game">
          <div className="overlay-halloween-game-content">
            <h1>
              player {activePlayer} won the game
              <FaRocket style={{ color: "orange", marginLeft: "10px" }} />
              <FaStar style={{ color: "yellow", marginLeft: "5px" }} />
            </h1>
            <button
              className="overlay-halloween-button"
              onClick={() => {
                levelPassedRef.current = 0;
                setNumPlayers(null);
                setActivePlayer(1);
                setDiceNumber(1);
                setMoving(false);
                playersPositionsRef.current = null;
              }}
            >
              Replay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
