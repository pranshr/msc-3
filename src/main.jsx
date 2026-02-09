import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Pages/Login";
import Home from "./Components/Pages/Home";
import Dashboard from "./Components/Pages/Dashboard";
import Notes from "./Components/Pages/Notes";
import PasswordGenerator from "./Components/Pages/PasswordGenerator";
import ToDo from "./Components/Pages/ToDo";
import UnitConverter from "./Components/Pages/UnitConverter";
import URLShortener from "./Components/Pages/URLShortener";
import Weather from "./Components/Pages/Weather";
import NotFound from "./Components/Pages/NotFound";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state here
  const [username, setUsername] = useState("Guest"); // Default to "Guest"

  // Log out handler
  const handleLogout = () => {
    setIsLoggedIn(false);  // Set login state to false
    setUsername("Guest");  // Reset username to "Guest"
  };

  // Log in handler
  const handleLogin = (userName) => {
    setIsLoggedIn(true);   // Set login state to true
    setUsername(userName); // Set username when logged in
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login page - standalone */}
        <Route path="/login" element={<Login setIsLoggedIn={handleLogin} />} />

        {/* Wrap all routes except /login with Navbar */}
        <Route
          element={<Navbar isLoggedIn={isLoggedIn} username={username} setIsLoggedIn={handleLogout} />}
        >
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/password-generator" element={<PasswordGenerator />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/unit-converter" element={<UnitConverter />} />
          <Route path="/url-shortener" element={<URLShortener />} />
          <Route path="/weather" element={<Weather />} />
        </Route>

        {/* Catch-all route for 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
