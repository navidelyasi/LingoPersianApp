import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdultsTabPractice from "../components/menu-components/AdultsTabPractice";
import KidsTabPractice from "../components/menu-components/KidsTabPractice";
import "../styles/pages-styles/menu-lingo-practice.css";
import "../styles/sub-styles/navbar-styles.css";
import { FaSignOutAlt, FaUser, FaStar } from "react-icons/fa";

export default function MenuLingoPractice() {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTabLingoPractice") || "adults"
  );
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const changeTab = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTabLingoPractice", tab);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user-token");
    localStorage.removeItem("afterLogin");
    navigate("/");
  };

  return (
    <div className="main-menu-container">
      {/* Navbar */}
      <nav className="menu-nav">
        <button
          className="title-button-nav"
          onClick={() => navigate("/menu-lingo-game")}
        >
          go to Lingo Game
        </button>
        <button
          className={`menu-nav-button ${
            activeTab === "adults" ? "active" : ""
          }`}
          onClick={() => changeTab("adults")}
        >
          Adults
        </button>
        <button
          className={`menu-nav-button ${activeTab === "kids" ? "active" : ""}`}
          onClick={() => changeTab("kids")}
        >
          Kids
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
      </div>

      {/* ___________________ Render the selected tab ___________________ */}
      <div className="tab-content">
        {activeTab === "adults" && <AdultsTabPractice />}
        {activeTab === "kids" && <KidsTabPractice />}
      </div>
    </div>
  );
}
