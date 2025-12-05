import React, { useState } from "react";
import "./Navbar.css";
import axios from "axios";


function LoginForm({ onClose, onSwitch, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showForgot, setShowForgot] = useState(false); // 🌟 toggle state

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const [serverMessage, setServerMessage] = useState({ type: "", text: "" });


  const handleSubmit = async() => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, 
          {
          Email: email,
          Password: password
        },
        {
          withCredentials: true
        }
        );
  
        setServerMessage({
          type: response.data.success ? "success" : "error",
          text: response.data.message,
        });

        if (response.data.success) {

          setTimeout(() => {
               onLoginSuccess();
          }, 3000);
        } 
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Server error during registration.");
      }
    }
  };

  const handleForgotSubmit = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }

    setErrors(newErrors);

    
    if (Object.keys(newErrors).length === 0) {
      alert("Reset link sent to your email.");
      onClose();
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-box">
      {serverMessage.text && (
        <div className={`custom-alert ${serverMessage.type}`}>
          {serverMessage.text}
        </div>
      )}
        <h2>{showForgot ? "Forgot Password" : "Login"}</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        {!showForgot && (
          <>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </>
        )}

        <button className="btn" onClick={showForgot ? handleForgotSubmit : handleSubmit}>
          {showForgot ? "Send Reset Link" : "Login"}
        </button>

        {!showForgot && (
          <p>
            <span className="linkforgot" onClick={() => setShowForgot(true)}>Forgot Password?</span>
          </p>
        )}

        {showForgot && (
          <p>
            <span className="back-btn" onClick={() => setShowForgot(false)}>Back to Login</span>
          </p>
          
        )}

        {!showForgot && (
          <p>
            Don’t have an account?{" "}
            <span onClick={onSwitch} className="link">Register</span>
          </p>
        )}

        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

export default LoginForm;
