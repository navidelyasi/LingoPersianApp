import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth-page.css";
import "../../styles/index.css";

export default function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {};

  return (
    <div className="login-container">
      <h1 className="login-title">Login Page</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="email"
          ref={usernameRef}
          placeholder="Enter your email"
        />
        <input
          className="login-input"
          type="password"
          ref={passwordRef}
          placeholder="Enter your password"
        />
        <button className="login-button" type="submit" disabled={loading}>
          Login
        </button>
      </form>
      <button
        className="login-button signup"
        onClick={() => navigate("/signup")}
        disabled={loading}
      >
        Don't have an account? Sign Up
      </button>

      {/* _______________________ loading overlay _______________________ */}
      {loading && (
        <div className="submitting-overlay">
          <div className="submitting-content">
            <div className="spinner"></div>
            <div className="general-text">please wait ...</div>
          </div>
        </div>
      )}
    </div>
  );
}
