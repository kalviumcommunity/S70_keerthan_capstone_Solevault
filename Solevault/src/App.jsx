import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import Header from "./components/auth/Header2"; // Ensure this path is correct
import Login from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Header /> {/* Navbar is always visible */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
