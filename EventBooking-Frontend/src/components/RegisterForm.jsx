import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

import "./Navbar.css";

function RegisterForm({ onClose, onBackToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [serverMessage, setServerMessage] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validatePassword = (password) => {
    // Minimum 6 characters, at least one uppercase, one lowercase, and one number
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return pattern.test(password);
  };

   const handleSubmit = async() => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required.";

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (!validatePassword(form.password)) {
      newErrors.password =
        "Password must be at least 6 characters, include uppercase, lowercase, and a number.";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const formData = new FormData();
        formData.append("FullName", form.name);
        formData.append("Email", form.email);
        formData.append("Password", form.password);
        if (profileImage) {
          formData.append("ProfileImage", profileImage);
        }

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/register`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        setServerMessage({
          type: response.data.success ? "success" : "error",
          text: response.data.message,
        });

        if (response.data.success) {
          setTimeout(() => {
            onBackToLogin();
          }, 3000);
        } 
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Server error during registration.");
      }
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-box">
        <div className="form-header">
              {serverMessage.text && (
        <div className={`custom-alert ${serverMessage.type}`}>
          {serverMessage.text}
        </div>
      )}
          <button className="back-btn" onClick={onBackToLogin}>
            <FaArrowLeft />
          </button>
          <h2>Register</h2>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <div className="profile-image-upload">
          <label htmlFor="profileImage" className="image-upload-label">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            ) : (
              <div className="upload-placeholder">
                <i className="fa fa-camera"></i>
                <p>Upload Profile Picture</p>
              </div>
            )}
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}

        <button className="btn" onClick={handleSubmit}>
          Create Account
        </button>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;
