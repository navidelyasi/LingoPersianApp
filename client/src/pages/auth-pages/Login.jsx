import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/pages-styles/auth-page.css";
import "../../styles/pages-styles/index.css";

export default function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const testAccounts = [
    "test1@me.com",
    "test2@me.com",
    "test3@me.com",
    "test4@me.com",
    "test5@me.com",
  ];

  const afterLogin = localStorage.getItem("afterLogin");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/auth/login",
        {
          email: usernameRef.current.value,
          password: passwordRef.current.value,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("user-token", response.data.accessToken);
        if (afterLogin) {
          navigate(afterLogin);
        } else {
          navigate("/menu-lingo-practice");
        }
      } else {
        setError(response.data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error(
        "Login Failed:",
        error.response ? error.response.data : error.message
      );
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  function loginWithTestAccount(account) {
    usernameRef.current.value = account;
    passwordRef.current.value = "test123";
    handleSubmit({ preventDefault: () => {} });
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login Page</h1>
      <div className="test-accounts-container">
        <div className="login-info">
          for testing purposes use one of the follwong test accounts to login
        </div>
        <div className="test-accounts">
          {testAccounts.map((account) => (
            <button
              key={account}
              onClick={() => {
                loginWithTestAccount(account);
              }}
            >
              {account}
            </button>
          ))}
        </div>
      </div>
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
