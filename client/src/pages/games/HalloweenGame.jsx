import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gameMenuAPI } from "../../hooks/gameMenuAPI";
import { halloweenData } from "../../data/gamesData";
import Dice from "../../components/sub-components/Dice";
import HalloweenBoard from "../../components/sub-components/HalloweenBoard";
import {
  playdiceroll,
  playsuccess2,
  playhalloweenimpact,
  playlevelpassed,
  playnotification2,
  playwronganswer,
} from "../../hooks/handleSoundEffects";
import spookywiththunder from "../../data/sounds/spooky-with-thunder.mp3";
import knockingOnBoard from "../../data/sounds/knocking-on-board.mp3";
import "../../styles/games-styles/halloween-game.css";
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

export default function HalloweenGame({ socket }) {
  const navigate = useNavigate();
  const { gameid } = useParams();
  const questionsData = halloweenData[0];
  const screenWidthSmall = window.innerWidth <= 430;
  const user = JSON.parse(localStorage.getItem("user"));
  const hostNameRef = useRef(null);
  const activePlayerRef = useRef(0);
  const playersRef = useRef([]);
  const spookySoundRef = useRef(null);
  const movingIntervalRef = useRef(null);
  const playersPositionsRef = useRef(null);
  const selectedQuestionRef = useRef(0);
  const pumpkinOrBroomNumber = useRef(0);
  const [, forceUpdate] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [numPlayers, setNumPlayers] = useState(null);
  const [moving, setMoving] = useState(false);
  const [diceNumber, setDiceNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [questionOverlay, setQuestionOverlay] = useState(false);
  const [playersBlinking, setPlayersBlinking] = useState([]);
  const [playersWaving, setPlayersWaving] = useState(false);

  // load the game and set the background sound
  useEffect(() => {
    getGameById();

    // Set background sound
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
  }, [activePlayerRef.current]);

  useEffect(() => {
    if (!socket) return;

    socket.on("activePlayerChanged", ({ gameId, activePlayerIndex }) => {
      activePlayerRef.current = activePlayerIndex;
    });

    socket.on("diceRolled", ({ gameId, number }) => {
      setDiceNumber(number);
      setIsRolling(false);

      let newPositions = [...playersPositionsRef.current];
      let { position } = newPositions[activePlayerRef.current];

      if (position + number > 77) {
        // player passes finish line
        playhalloweenimpact();
        setMoving(false);
        changeActivePlayer();
      } else {
        // Move player based on dice number
        movePlayerForwardDiceNumber(number);
      }
    });

    socket.on("answerSubmitted", ({ gameId, isAnswerCorrect }) => {
      setQuestionOverlay(false);
      setMoving(false);
      pumpkinOrBroomNumber.current = 0;
      if (isAnswerCorrect) {
        playlevelpassed();
      } else {
        playwronganswer();
        changeActivePlayer();
      }
    });

    return () => {
      socket.off("activePlayerChanged");
      socket.off("diceRolled");
      socket.off("answerSubmitted");
    };
  }, [socket]);

  async function getGameById() {
    const response = await gameMenuAPI.getGameById(gameid);
    playersRef.current = response.game.players;
    hostNameRef.current = response.game.host_name;
    startGame(response.game.players.length);
  }

  // set number of players and give them initial position
  function startGame(num) {
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
  }

  function rollDice() {
    playdiceroll();
    setIsRolling(true);
    setMoving(true);

    // dice roll
    setTimeout(() => {
      const newNumber = Math.floor(Math.random() * 6) + 1;
      socket.emit("rollDice", { gameId: gameid, number: newNumber });
    }, 1000);
  }

  // move player based on Dice number
  function movePlayerForwardDiceNumber(diceNumber) {
    let stepCount = 0;
    movingIntervalRef.current = setInterval(() => {
      movePlayerForward();
      stepCount++;
      if (stepCount >= diceNumber) {
        clearInterval(movingIntervalRef.current);
        movingIntervalRef.current = null;
        checkLadder();
        checkPumpkin();
      }
    }, 500);
  }

  // just move forward, and check if player reached finish
  function movePlayerForward() {
    let newPositions = [...playersPositionsRef.current];
    let { left, top, position } = newPositions[activePlayerRef.current];

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
    newPositions[activePlayerRef.current] = { left, top, position };
    playersPositionsRef.current = newPositions;

    // check if player reached finish
    if (position === 77) {
      setGameFinished(true);
      playlevelpassed();
    }

    // Force UI update after movement
    forceUpdate((prev) => prev + 1);
  }

  function checkLadder() {
    let newPositions = [...playersPositionsRef.current];
    let { left, top, position } = newPositions[activePlayerRef.current];

    if (position === 3) {
      left += screenWidthSmall ? 50 : 62;
      top -= screenWidthSmall ? 84 : 104;
      position = 18;

      setBroomAnimation(13);

      newPositions[activePlayerRef.current] = { left, top, position };
      playersPositionsRef.current = newPositions;

      forceUpdate((prev) => prev + 1);
      playsuccess2();
    } else if (position === 23) {
      left -= screenWidthSmall ? 50 : 62;
      top -= screenWidthSmall ? 84 : 104;
      position = 38;

      setBroomAnimation(14);

      newPositions[activePlayerRef.current] = { left, top, position };
      playersPositionsRef.current = newPositions;

      forceUpdate((prev) => prev + 1);
      playsuccess2();
    } else if (position === 42) {
      left += screenWidthSmall ? 50 : 62;
      top -= screenWidthSmall ? 84 : 104;
      position = 55;

      setBroomAnimation(11);

      newPositions[activePlayerRef.current] = { left, top, position };
      playersPositionsRef.current = newPositions;

      forceUpdate((prev) => prev + 1);
      playsuccess2();
    } else if (position === 53) {
      left += screenWidthSmall ? 50 : 62;
      top -= screenWidthSmall ? 84 : 104;
      position = 66;

      setBroomAnimation(12);

      newPositions[activePlayerRef.current] = { left, top, position };
      playersPositionsRef.current = newPositions;

      forceUpdate((prev) => prev + 1);
      playsuccess2();
    }
  }

  function checkPumpkin() {
    let newPositions = [...playersPositionsRef.current];
    let { position } = newPositions[activePlayerRef.current];

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
      changeActivePlayer();
    }
  }

  function submitAnswer(answerId) {
    let isAnswerCorrect = false;
    if (
      answerId === questionsData[selectedQuestionRef.current].correct ||
      answerId === 100
    ) {
      isAnswerCorrect = true;
    }

    socket.emit("submitAnswer", {
      gameId: gameid,
      isAnswerCorrect: isAnswerCorrect,
    });
  }

  function setBroomAnimation(broomNum) {
    pumpkinOrBroomNumber.current = broomNum;

    setTimeout(() => {
      pumpkinOrBroomNumber.current = 0;
    }, 1000);
  }

  async function changeActivePlayer() {
    if (activePlayerRef.current < playersRef.current.length - 1) {
      activePlayerRef.current += 1;
    } else {
      activePlayerRef.current = 0;
    }

    forceUpdate((prev) => prev + 1);

    try {
      await gameMenuAPI.updateActivePlayer(gameid, activePlayerRef.current);
      socket.emit("updateActivePlayer", gameid, activePlayerRef.current);
    } catch (error) {
      console.error("Error updating active player: ", error);
    }
  }

  return (
    <div className="halloween-container-main">
      {/* Navigation Bar */}
      <nav className="halloween-game-nav">
        <button
          className="halloween-game-exit-button"
          onClick={() => navigate("/menu-lingo-game")}
        >
          Exit the GAME
        </button>
      </nav>
      {numPlayers > 0 && (
        <div className="halloween-game-container">
          {/*       _________       GAME Board             ______    */}
          <div className="halloween-game-column">
            <div className="halloween-board-container">
              <HalloweenBoard
                pumpkinOrBroomNumber={pumpkinOrBroomNumber.current}
              />
              {/*       _________       Players             ______    */}
              {playersRef.current.map((player, index) => (
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
                    <FaRegSmileBeam
                      className="smily-face"
                      style={{ scale: "1.2" }}
                    />
                  ) : (
                    <FaRegSmile className="smily-face" />
                  )}

                  {playersWaving && index === activePlayerRef.current && (
                    <FaHandPaper className="waving-hand" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/*       _________       GAME functions             ______    */}
          <div className="halloween-game-column">
            <div className="active-player-text">GamePage {gameid}</div>
            <div className="active-player-text">Welcome {user.name}</div>
            <h1 className="active-player-text">
              active player is{" "}
              {playersRef.current[activePlayerRef.current].name}
            </h1>
            {/*    _______    MOVE buttons    _________     */}

            <div className="players-info-container">
              {playersRef.current.map((player, index) => (
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
                  disabled={
                    playersRef.current[activePlayerRef.current].name !==
                      user.name ||
                    activePlayerRef.current !== index ||
                    moving
                  }
                  onClick={() => rollDice()}
                >
                  {player.name}
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

            {/*     _________         Dice           ______ */}
            {playersRef.current[activePlayerRef.current].name === user.name && (
              <Dice
                diceNumber={diceNumber}
                isRolling={isRolling}
                rollDice={rollDice}
                moving={moving}
              />
            )}
          </div>
        </div>
      )}

      {/*  ___    Overlay        ___     Question                     ______ */}
      {questionOverlay && (
        <div className="overlay-halloween-game">
          <div className="overlay-halloween-game-content">
            {hostNameRef.current === "Azadeh" ? (
              <>
                <h1>آیا درست جواب دادم؟</h1>
                <button
                  className="overlay-halloween-button"
                  onClick={() => submitAnswer(100)}
                  disabled={
                    playersRef.current[activePlayerRef.current].name !==
                    "Azadeh"
                  }
                >
                  بله
                </button>
                <button
                  className="overlay-halloween-button"
                  onClick={() => submitAnswer(99)}
                  disabled={
                    playersRef.current[activePlayerRef.current].name !==
                    "Azadeh"
                  }
                >
                  خیر
                </button>
              </>
            ) : playersRef.current[activePlayerRef.current].name ===
              user.name ? (
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
            ) : (
              <h1>Wait for opponent to answer</h1>
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
      {gameFinished === true && (
        <div className="overlay-halloween-game">
          <div className="overlay-halloween-game-content">
            <h1>
              player {playersRef.current[activePlayerRef.current].name} won the
              game
              <FaRocket style={{ color: "orange", marginLeft: "10px" }} />
              <FaStar style={{ color: "yellow", marginLeft: "5px" }} />
            </h1>
            <button
              className="overlay-halloween-button"
              onClick={() => {
                setGameFinished(false);
                setNumPlayers(null);
                activePlayerRef.current = 0;
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
