import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import ProtectedRoute from "./pages/auth-pages/ProtectedRoute.jsx";
import PublicRoute from "./pages/auth-pages/PublicRoute.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import Login from "./pages/auth-pages/Login.jsx";
import Signup from "./pages/auth-pages/Signup.jsx";
import MenuLingoGame from "./pages/MenuLingoGame.jsx";
import MenuLingoPractice from "./pages/MenuLingoPractice.jsx";
import HalloweenGame from "./pages/games/HalloweenGame.jsx";
import LocalHalloweenGame from "./pages/games/LocalHalloweenGame.jsx";
import MemoryGame from "./pages/games/MemoryGame.jsx";
import LingoPractice from "./pages/LingoPractice.jsx";
import { LingoPracticeContextProvider } from "./hooks/LingoPracticeContext.jsx";

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
      <LingoPracticeContextProvider>
        <Routes>
          <Route path="/" element={<IndexPage />} />
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
            path="/menu-lingo-game"
            element={
              <ProtectedRoute>
                <MenuLingoGame socket={socket} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/menu-lingo-practice"
            element={
              <ProtectedRoute>
                <MenuLingoPractice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/online-halloween-game/:gameid"
            element={
              <ProtectedRoute>
                <HalloweenGame socket={socket} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/local-halloween-game/:id"
            element={
              <ProtectedRoute>
                <LocalHalloweenGame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/memory-game/:id"
            element={
              <ProtectedRoute>
                <MemoryGame />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lingo-practice/:lingoPracticeId"
            element={
              <ProtectedRoute>
                <LingoPractice />
              </ProtectedRoute>
            }
          />
        </Routes>
      </LingoPracticeContextProvider>
    </Router>
  );
}

export default App;
