import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gameMenuAPI } from "../hooks/gameMenuAPI";
import "../styles/home-page.css";
import "../styles/game-page.css";

function GamePage({ socket }) {
  const navigate = useNavigate();
  const { gameid } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [activePlayer, setActivePlayer] = useState(0);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getGameById();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("activePlayerChanged", ({ gameId, activePlayerIndex }) => {
      console.log(
        "activePlayerChanged event received: ",
        gameId,
        activePlayerIndex
      );
      setActivePlayer(activePlayerIndex);
    });
  }, [socket]);

  async function getGameById() {
    const response = await gameMenuAPI.getGameById(gameid);
    setPlayers(response.game.players);
  }

  async function playTurn() {
    let updatedActivePlayer = 0;
    if (activePlayer < players.length - 1) {
      updatedActivePlayer = activePlayer + 1;
    } else {
      updatedActivePlayer = 0;
    }

    try {
      await gameMenuAPI.updateActivePlayer(gameid, updatedActivePlayer);
      console.log("updatedActivePlayer: ", updatedActivePlayer);
      socket.emit("updateActivePlayer", gameid, updatedActivePlayer);
    } catch (error) {
      console.error("Error updating active player: ", error);
    }
  }

  return (
    <div className="main-menu-container">
      {/*   ____     Navbar   ____     */}
      <nav className="menu-nav">
        {/* _______________________ logout _______________________ */}
        <button className="logout-button" onClick={() => navigate("/home")}>
          Exit the GAME
        </button>
      </nav>

      <div className="welcome-text">GamePage {gameid}</div>
      <div className="welcome-text">Welcome {user.name}</div>
      {players.length > 0 && (
        <>
          <div className="welcome-text">
            active player is {players[activePlayer].name}
          </div>
          <button
            className="primary-button"
            onClick={() => playTurn()}
            disabled={players[activePlayer].name !== user.name}
          >
            Do your turn
          </button>
        </>
      )}
    </div>
  );
}

export default GamePage;
