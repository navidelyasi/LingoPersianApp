import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth-page.css";
import "../styles/index.css";

function Index() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h1 className="login-title">Index Page</h1>
      <button className="login-button" onClick={() => navigate("/login")}>
        Go to Login
      </button>
      <button className="login-button" onClick={() => navigate("/signup")}>
        Go to Signup
      </button>
    </div>
  );
}

export default Index;
