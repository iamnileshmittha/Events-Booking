import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./Navbar.css";
import logo from "../assets/logo3.png";


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLogout = async() => {
    await axios.get("http://localhost:8000/api/user/logout", {
      withCredentials: true
    });
    setIsLoggedIn(false);
    setUser(null);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/check-auth", {
          withCredentials: true
        });
  
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
          setUser(response.data.user);
        }
      } catch (err) {
        console.error("Error checking login:", err);
      }
    };
  
    checkLogin();
  }, []);
  

  const toggleMenu = () => setMenuOpen(!menuOpen); // NEW

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-container d-flex align-items-center justify-content-between">
          
          {/* Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={logo} alt="Logo" className="logo me-2" style={{ height: "60px" }} />
          </Link>


          {/* Navigation Links */}
          <div className={`nav-links ${menuOpen ? "show" : ""}`}>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link>

            {/* <Link to="/" onClick={() => setMenuOpen(false)}>Gallery</Link> */}
            <Link to="/consent" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          </div>

          {/* Auth Section */}
          <div className="auth-section">
            {isLoggedIn ? (
              <div className="user-icon-container" onClick={toggleDropdown}>
                {user?.ProfileImage ? (
                  <img 
                    src={`http://localhost:8000/uploads/${user.ProfileImage}`} 
                    alt="Profile" 
                    className="profile-image"
                  />
                ) : (
                  <FaUserCircle className="user-icon" />
                )}
                {dropdownOpen && (
                  <div className="dropdown">
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <button className="login-btn" onClick={() => setShowLoginForm(true)}>
                  Login
                </button>
                <button className="register-btn" onClick={() => setShowRegisterForm(true)}>
                  Register
                </button>
              </div>
            )}
          </div>


          {/* Toggler for Mobile */}
          <div className="mobile-menu-icon d-md-none" onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
          
        </div>
      </nav>

      {/* Modals */}
      {showLoginForm && (
        <LoginForm
          onClose={() => setShowLoginForm(false)}
          onSwitch={() => {
            setShowLoginForm(false);
            setShowRegisterForm(true);
          }}
          onLoginSuccess={async () => {
            setShowLoginForm(false);
            // Refresh user data
            const response = await axios.get("http://localhost:8000/api/user/check-auth", {
              withCredentials: true
            });
            if (response.data.loggedIn) {
              setIsLoggedIn(true);
              setUser(response.data.user);
            }
          }}
        />
      )}
      {showRegisterForm && (
        <RegisterForm
          onClose={() => setShowRegisterForm(false)}
          onBackToLogin={() => {
            setShowRegisterForm(false);
            setShowLoginForm(true);
          }}
        />
      )}
    </>
  );
}

export default Navbar;
