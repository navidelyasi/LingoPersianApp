import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import Login from "./pages/auth-pages/Login.jsx";
import Signup from "./pages/auth-pages/Signup.jsx";
import Index from "./pages/Index.jsx";
import Home from "./pages/Home.jsx";
import GamePage from "./pages/GamePage.jsx";
import ProtectedRoute from "./pages/auth-pages/ProtectedRoute.jsx";
import PublicRoute from "./pages/auth-pages/PublicRoute.jsx";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  if (!socket) return <div>Connecting...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home socket={socket} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game/:gameid"
          element={
            <ProtectedRoute>
              <GamePage socket={socket} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
