import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { gameMenuAPI } from "../hooks/gameMenuAPI";
import "../styles/home-page.css";
import { FaUser, FaSignOutAlt, FaStar, FaPlus } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

function Home({ socket }) {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "multi-player"
  );
  const navigate = useNavigate();
  const [availableGames, setAvailableGames] = useState([]);
  const [addedToGame, setAddedToGame] = useState(null);

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
      navigate(`/game/${gameId}`);
    });

    return () => {
      socket.off("gameCreated");
      socket.off("gameRemoved");
      socket.off("playerJoined");
      socket.off("playerLeft");
      socket.off("gameStarted");
    };
  }, [socket]);

  const user = JSON.parse(localStorage.getItem("user"));

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user-token");
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
          className={`menu-nav-button ${
            activeTab === "multi-player" ? "active" : ""
          }`}
          onClick={() => {
            setActiveTab("multi-player");
            localStorage.setItem("activeTab", "multi-player");
          }}
        >
          Multi Player
        </button>
        <button
          className={`menu-nav-button ${
            activeTab === "single-player" ? "active" : ""
          }`}
          onClick={() => {
            setActiveTab("single-player");
            localStorage.setItem("activeTab", "single-player");
          }}
        >
          Single Player
        </button>
        {/* _______________________ logout _______________________ */}
        <button className="logout-button" onClick={logOut}>
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
      </div>

      {/*   ____     Main Area    _____     */}
      <div className="games-cards-container">
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
    </div>
  );
}

export default Home;
