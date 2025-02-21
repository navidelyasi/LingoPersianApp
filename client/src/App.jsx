import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth-pages/Login.jsx";
import Signup from "./pages/auth-pages/Signup.jsx";
import Index from "./pages/Index.jsx";
import Home from "./pages/Home.jsx";
import axios from "axios";

function App() {
  const [data, setData] = useState("");

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:3000/api");
    console.log("result is ", response.data.names);
    setData(response.data.names);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
