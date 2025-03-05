import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePage from "./ProfilePage.jsx";
import "../styles/pages-styles/index-page.css";
import "../styles/sub-styles/navbar-styles.css";
import "../styles/games-styles/game-tab-practice.css";
import quizAppIcon from "/app-icon.svg";
import { FaSignOutAlt } from "react-icons/fa";
export default function IndexPage() {
  const navigate = useNavigate();
  const [activeIndexTab, setActiveIndexTab] = useState(
    localStorage.getItem("activeIndexTab") || "projects"
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const changeIndexTab = (tab) => {
    setActiveIndexTab(tab);
    localStorage.setItem("activeIndexTab", tab);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user-token");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="index-container">
      <nav className="menu-nav">
        {user && <div className="nav-text">Welcome, {user.name}!</div>}
        <button
          className={`menu-nav-button ${
            activeIndexTab === "projects" ? "active" : ""
          }`}
          onClick={() => changeIndexTab("projects")}
        >
          Projects
        </button>
        <button
          className={`menu-nav-button ${
            activeIndexTab === "profile" ? "active" : ""
          }`}
          onClick={() => changeIndexTab("profile")}
        >
          About Me
        </button>
        {user && (
          <button className="logout-button-nav" onClick={logOut}>
            <div className="menu-button-content">
              <FaSignOutAlt style={{ marginRight: "5px" }} />
              Logout
            </div>
          </button>
        )}
      </nav>

      {activeIndexTab === "projects" && (
        <div className="game-menu-content">
          <button
            onClick={() => {
              if (user) {
                navigate(`/menu-lingo-game`);
              } else {
                localStorage.setItem("afterLogin", "/menu-lingo-game");
                navigate("/login");
              }
            }}
          >
            Lingo Game
            <div className="game-menu-button-img">
              <img
                src="/pictures/general/halloween/broom/broom-body.png"
                alt="broom-body"
                className="broom-body-menu"
              />

              <img
                src="/pictures/general/halloween/broom/broom-hat.png"
                alt="broom-hat"
                className="broom-hat-menu"
              />
              <img
                src="/pictures/general/halloween/broom/broom-tail.png"
                alt="broom-tail"
                className="broom-tail-menu"
              />

              <img
                src="/pictures/general/halloween/pumpkin-1.png"
                alt="pumpkin1"
                className="shaking-pumpkin-menu"
              />
            </div>
          </button>

          <button
            className=""
            onClick={() => {
              if (user) {
                navigate("/menu-lingo-practice");
              } else {
                localStorage.setItem("afterLogin", "/menu-lingo-practice");
                navigate("/login");
              }
            }}
          >
            Lingo Practice
            <img src={quizAppIcon} className="logo" alt="quiz-app-icon" />
            <div className="index-button-content">
              <div style={{ textAlign: "left" }}>
                - practice persian language
              </div>
              <div style={{ textAlign: "left" }}>- have free account</div>
              <div style={{ textAlign: "left" }}>- take quiz</div>
              <div style={{ textAlign: "left" }}>- submit your answers</div>
            </div>
          </button>
        </div>
      )}

      {activeIndexTab === "profile" && <ProfilePage />}
    </div>
  );
}
