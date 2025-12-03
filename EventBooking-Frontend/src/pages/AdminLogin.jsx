import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Check credentials
    if (credentials.username === "admin" && credentials.password === "admin@12345") {
      // Store admin session
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminLoginTime", new Date().getTime());
      
      // Redirect to dashboard
      navigate("/administrator/dashboard");
    } else {
      setError("Invalid username or password");
      setCredentials({ username: "", password: "" });
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <div className="admin-login-box">
          <div className="admin-login-header">
            <i className="fa fa-shield"></i>
            <h2>Administrator Login</h2>
            <p>Please enter your credentials to access the admin panel</p>
          </div>

          {error && (
            <div className="admin-error-message">
              <i className="fa fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="username">
                <i className="fa fa-user"></i>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <i className="fa fa-lock"></i>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="admin-login-btn">
              <i className="fa fa-sign-in"></i>
              Login
            </button>
          </form>

          <div className="admin-login-footer">
            <a href="/">
              <i className="fa fa-home"></i>
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
