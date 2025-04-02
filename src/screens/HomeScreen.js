import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./HomeScreen.css";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import logo from "../Image/logo.png"; 

const HomeScreen = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateLogin = () => {
    if (!formData.username.trim()) {
      setError("Username or email is required.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (validateLogin()) {
      setError("");
      const isMobile = window.innerWidth <= 768;
      toast.success("Login Successful!", {
        position: isMobile ? "bottom-center" : "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "#2A2A2A",
          color: "#FFFFFF",
          borderRadius: "25px",
          padding: "12px 24px",
          fontSize: "16px",
          textAlign: "center",
          width: "auto",
          minWidth: "200px",
          maxWidth: "90%",
          margin: "0 auto 20px auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        },
        icon: false
      });
      setTimeout(() => {
        navigate("/explore");
      }, 2000);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleSocialLogin = (platform) => {
    console.log(`${platform} login clicked`);
  };

  return (
    <div className="signin-container">
      <div className="signup-link" onClick={handleSignup}>Already haven't an account? Sign Up</div>

      <div className="signin-card">
        <div className="logo-container">
          <img src={logo} alt="Areta360 Logo" className="logo" />
        </div>

        <h2>Signin</h2>
        
        <input
          type="text"
          name="username"
          placeholder="John wick"
          className="input-field"
          value={formData.username}
          onChange={handleInputChange}
        />

        <input
          type="password"
          name="password"
          placeholder="**********"
          className="input-field"
          value={formData.password}
          onChange={handleInputChange}
        />

        {error && <p className="error-message">{error}</p>}

        <p className="terms">
          By Continuing, I agree to the <a href="#">Terms of services</a> and <a href="#">acknowledge the conditions</a>
        </p>

        <button className="login-button" onClick={handleLogin}>Login</button>

        <div className="or-divider">
          <span></span> OR <span></span>
        </div>

        <div className="social-login">
          <button className="social-icon google" onClick={() => handleSocialLogin("Google")}>
            <FcGoogle style={{ color: "#DB4437" }} />
          </button>

          <button className="social-icon facebook" onClick={() => handleSocialLogin("Facebook")}>
            <FaFacebookF />
          </button>

          <button className="social-icon apple" onClick={() => handleSocialLogin("Apple")}>
            <FaApple />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
