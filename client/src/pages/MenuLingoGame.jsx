import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gameMenuAPI } from "../hooks/gameMenuAPI";
import Broom from "../components/sub-components/Broom";
import "../styles/pages-styles/menu-lingo-game.css";
import "../styles/sub-styles/navbar-styles.css";
import {
  FaUser,
  FaSignOutAlt,
  FaStar,
  FaPlus,
  FaDiceSix,
} from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

export default function MenuHalloween({ socket }) {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "local"
  );
  const navigate = useNavigate();
  const [availableGames, setAvailableGames] = useState([]);
  const [addedToGame, setAddedToGame] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getAvailableGames();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for game created event
    socket.on("gameCreated", ({ gameId, hostId, hostName }) => {
      setAvailableGames((prevGames) => [
        ...prevGames,
        {
          id: gameId,
          host_id: hostId,
          host_name: hostName,
          players: [{ id: hostId, name: hostName }],
        },
      ]);
    });

    // Listen for remove game event
    socket.on("gameRemoved", ({ gameId }) => {
      setAvailableGames((prevGames) =>
        prevGames.filter((game) => game.id !== gameId)
      );
    });

    // Listen for player joined event
    socket.on("playerJoined", ({ gameId, playerId, playerName }) => {
      setAvailableGames((prevGames) =>
        prevGames.map((game) => {
          if (game.id === gameId) {
            return {
              ...game,
              players: [...game.players, { id: playerId, name: playerName }],
            };
          }
          return game;
        })
      );
    });

    // Listen for player left event
    socket.on("playerLeft", ({ gameId, playerId }) => {
      setAvailableGames((prevGames) =>
        prevGames.map((game) => {
          if (game.id === gameId) {
            return {
              ...game,
              players: game.players.filter((player) => player.id !== playerId),
            };
          }
          return game;
        })
      );
    });

    // Listen for game started event
    socket.on("gameStarted", (gameId) => {
      navigate(`/online-halloween-game/${gameId}`);
    });

    return () => {
      socket.off("gameCreated");
      socket.off("gameRemoved");
      socket.off("playerJoined");
      socket.off("playerLeft");
      socket.off("gameStarted");
    };
  }, [socket]);

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user-token");
    localStorage.removeItem("afterLogin");
    navigate("/");
  };

  async function getAvailableGames() {
    try {
      const data = await gameMenuAPI.listGames();
      if (!data.success) navigate("/");
      setAvailableGames(data.gameList);
      data.gameList.forEach((game) => {
        if (game.host_id === user.id) {
          setAddedToGame(game.id);
        }
      });
    } catch (error) {
      console.error("Failed to get games:", error);
    }
  }

  async function addMe(gameid) {
    try {
      const data = await gameMenuAPI.addPlayer(gameid);

      if (data.success) {
        setAddedToGame(gameid);

        // Join socket room for this game
        socket.emit("joinGame", gameid);
      }
    } catch (error) {
      console.error(
        "request failed from add me:",
        error.response ? error.response.data : error.message
      );
    }
  }

  async function removeMe(gameid) {
    try {
      const data = await gameMenuAPI.removePlayer(gameid);

      if (data.success) {
        setAddedToGame(null);

        // Leave the socket room
        socket.emit("leaveGame", gameid);
      }
    } catch (error) {
      console.error(
        "request failed from remove me:",
        error.response ? error.response.data : error.message
      );
    }
  }

  async function createNewGame() {
    try {
      const data = await gameMenuAPI.createGame();

      if (data.success) {
        setAddedToGame(data.newGame.id);
        // Join socket room for the new game
        socket.emit("createGame", data.newGame.id);
      }
    } catch (error) {
      console.error(
        "request failed from create new game:",
        error.response ? error.response.data : error.message
      );
    }
  }

  async function removeGame(gameid) {
    try {
      const data = await gameMenuAPI.removeGame(gameid);

      if (data.success) {
        setAddedToGame(null);
        socket.emit("removeGame", gameid);
      }
    } catch (error) {
      console.error(
        "request failed from create new game:",
        error.response ? error.response.data : error.message
      );
    }
  }

  async function startGame(gameid) {
    try {
      const data = await gameMenuAPI.startGame(gameid);

      if (data.success) {
        // tell the server to remove the game from the list
        // ans send all players in the game to the game page
        socket.emit("startGame", gameid);
      }
    } catch (error) {
      console.error("Failed to start game:", error);
    }
  }

  return (
    <div className="main-menu-container">
      {/*   ____     Navbar   ____     */}
      <nav className="menu-nav">
        <button
          className="title-button-nav"
          onClick={() => navigate("/menu-lingo-practice")}
        >
          go to Lingo Practice
        </button>

        <button
          className={`menu-nav-button ${activeTab === "local" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("local");
            localStorage.setItem("activeTab", "local");
          }}
        >
          Play Locally
        </button>
        <button
          className={`menu-nav-button ${
            activeTab === "online" ? "active" : ""
          }`}
          onClick={() => {
            setActiveTab("online");
            localStorage.setItem("activeTab", "online");
          }}
        >
          Play Online
        </button>
        {/* _______________________ logout _______________________ */}
        <button className="logout-button-nav" onClick={logOut}>
          <div className="menu-button-content">
            <FaSignOutAlt style={{ marginRight: "5px" }} />
            Logout
          </div>
        </button>
      </nav>
      <div className="welcome-text">
        Welcome, {user.name}!
        <FaUser style={{ marginRight: "5px" }} />
        <FaStar style={{ marginRight: "5px", color: "gold" }} />
        {activeTab === "local" && (
          <button
            className="create-game-button"
            onClick={() => navigate(`/local-halloween-game/1`)}
          >
            Start the Game
          </button>
        )}
      </div>
      {/*   ____     Main Area    _____     */}
      {activeTab === "online" ? (
        <div className="games-cards-container">
          {/*   ____     Main Area for online games   _____     */}
          {availableGames.length > 0 && (
            <>
              <div className="container-title-text">Available Games: </div>
              {availableGames.map((game, index) => (
                <div className="game-card" key={index}>
                  <div className="game-card-text">
                    game is created by : {game.host_name}
                  </div>

                  <div className="game-card-buttons-group">
                    List of players:
                    {game.players.map((player, plpayerIndex) => (
                      <div className="game-card-text" key={plpayerIndex}>
                        {player.name}
                      </div>
                    ))}
                    {addedToGame === null && (
                      <button
                        className="menu-button primary-button"
                        onClick={() => addMe(game.id)}
                      >
                        <div className="single-button-contents">
                          add me
                          <FaPlus />
                        </div>
                      </button>
                    )}
                    {addedToGame === game.id ? (
                      game.host_id === user.id ? (
                        <>
                          <button
                            className="menu-button primary-button"
                            onClick={() => startGame(game.id)}
                          >
                            Start The Game
                          </button>
                          <button
                            className="menu-button remove-button"
                            onClick={() => removeGame(game.id)}
                          >
                            <div className="single-button-contents">
                              Remove Game
                            </div>
                          </button>
                        </>
                      ) : (
                        <button
                          className="menu-button remove-button"
                          onClick={() => removeMe(game.id)}
                        >
                          <div className="single-button-contents">
                            Remove Me
                            <FaDeleteLeft />
                          </div>
                        </button>
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}

          {addedToGame === null && (
            <button
              className="create-game-button"
              onClick={() => createNewGame()}
            >
              Create a new Game
            </button>
          )}
        </div>
      ) : (
        <div className="game-card-description-container">
          {/*   ____     Main Area for local games   _____     */}
          <img
            src="/pictures/general/halloween/board-halloween.png"
            alt="halloween-board-menu"
            className="halloween-board-menu"
          />
          <div className="">
            Welcome to the Halloween Board Game, a thrilling multiplayer
            adventure inspired by Snakes and Ladders!
          </div>
          <div className="">🎲 How to Play:</div>
          <div className="description-line">
            🔸 Roll the Dice and move forward.
            <FaDiceSix className="dice-menu" />
          </div>
          <div className="description-line">
            🔸 Land on a Pumpkin? Answer a question! <br />
            🔸 A correct answer lets you roll again, <br />
            🔸 but a wrong one passes the turn.
            <img
              src="/pictures/general/halloween/pumpkin-1.png"
              alt="pumpkin-menu"
              className="pumpkin-menu"
            />
          </div>
          <div className="description-line">
            <div>
              🔸 Step on a Broom? Fly ahead to a higher position. <br />
              🔸 then let the next player go.
            </div>
            <div className="broom-menu">
              <Broom />
            </div>
          </div>
          <div className="description-line">
            🏆 First player to reach the final space wins!
          </div>
        </div>
      )}
    </div>
  );
}
