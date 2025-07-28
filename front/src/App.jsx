// src/App.jsx
import React, { useState, useEffect } from 'react'; // Corrected this line
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Login from './pages/login';
import Signup from './pages/signup';
import MainHomePage from './pages/MainHomePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("App.jsx - isLoggedIn state changed to:", isLoggedIn);
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    console.log("App.jsx - Login successful, navigating to homepage.");
    navigate('/');
  };

  const handleLogout = () => {
    console.log("App.jsx - Logout button clicked! Setting isLoggedIn to false.");
    setIsLoggedIn(false);
    localStorage.removeItem('userEmail'); // Clear the simulated session from frontend
    console.log("App.jsx - Navigating to homepage after logout.");
    navigate('/');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<MainHomePage isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
      />
      <Route
        path="/login"
        element={<Login onLoginSuccess={handleLoginSuccess} />}
      />
      <Route
        path="/signup"
        element={<Signup />}
      />
    </Routes>
  );
}

function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default RootApp;