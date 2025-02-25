import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/auth-page.css";
import "../../styles/index.css";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("response from sign up :", response.data);

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("user-token", response.data.accessToken);
        navigate("/home");
      } else {
        setError(response.data.message);
      }

      console.log("Login Successful:", response.data);
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

  return (
    <div className="login-container">
      <h1 className="login-title">Signup Page</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="text"
          ref={nameRef}
          placeholder="Enter your name"
        />
        <input
          className="login-input"
          type="email"
          ref={emailRef}
          placeholder="Enter your email"
        />
        <input
          className="login-input"
          type="password"
          ref={passwordRef}
          placeholder="Enter your password"
        />
        <input
          className="login-input"
          type="password"
          ref={confirmPasswordRef}
          placeholder="Confirm your password"
        />
        <button className="login-button" type="submit" disabled={loading}>
          Signup
        </button>
      </form>
      <button
        className="login-button signup"
        onClick={() => navigate("/login")}
        disabled={loading}
      >
        Already have an account? Log In
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
