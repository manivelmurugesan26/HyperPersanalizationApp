import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/Signup.css";
import { FaFacebookF, FaApple, FcGoogle } from '../../../assets/icons';
import { showToast, handleApiError, saveUserData, validateEmail, validatePassword } from "../../../utils/helpers";
import { signUp } from "../../../api/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const validateSignup = useCallback(() => {
    if (!formData.username.trim()) {
      showToast("Username is required");
      return false;
    }
    if (!formData.email.trim()) {
      showToast("Email is required");
      return false;
    }
    if (!validateEmail(formData.email)) {
      showToast("Invalid email format");
      return false;
    }
    if (!formData.password) {
      showToast("Password is required");
      return false;
    }
    if (!validatePassword(formData.password)) {
      showToast("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match");
      return false;
    }
    return true;
  }, [formData]);

  const handleSignup = useCallback(async () => {
    if (!validateSignup()) return;
    
    setIsLoading(true);
    try {
      const data = await signUp({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      saveUserData(data);
      showToast("Signup Successful!", 'success');
      setTimeout(() => navigate("/explore"), 2000);
    } catch (error) {
      showToast(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateSignup, navigate]);

  const handleLogin = useCallback(() => navigate("/login"), [navigate]);
  const handleSocialLogin = useCallback((platform) => console.log(`${platform} login clicked`), []);

  return (
    <div className="signin-container">
      <div className="signup-link" onClick={handleLogin}>Already have an account? Login</div>

      <div className="signin-card">
        <div className="welcome-container">
          <h1 className="welcome-heading">Welcome to Areta360</h1>
          <p className="welcome-subheading">Create an Account and unlock your personalised shopping experience</p>
        </div>

        <h2 className="signup-title">Sign Up</h2>
        
        <input
          type="text"
          name="username"
          placeholder="John Wick"
          className="input-field"
          value={formData.username}
          onChange={handleInputChange}
          disabled={isLoading}
        />

        <input
          type="email"
          name="email"
          placeholder="johnwick@example.com"
          className="input-field"
          value={formData.email}
          onChange={handleInputChange}
          disabled={isLoading}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="input-field"
          value={formData.password}
          onChange={handleInputChange}
          disabled={isLoading}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input-field"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          disabled={isLoading}
        />

        <p className="terms">
          By Continuing, I agree to the <a href="#">Terms of services</a> and <a href="#">acknowledge the conditions</a>
        </p>

        <button 
          className="login-button" 
          onClick={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
        <div className="or-divider">
          <span></span> OR <span></span>
        </div>

        <div className="social-login">
          <button className="social-icon google" onClick={() => handleSocialLogin("Google")} disabled={isLoading}>
            <FcGoogle style={{ color: "#DB4437" }} />
          </button>

          <button className="social-icon facebook" onClick={() => handleSocialLogin("Facebook")} disabled={isLoading}>
            <FaFacebookF />
          </button>

          <button className="social-icon apple" onClick={() => handleSocialLogin("Apple")} disabled={isLoading}>
            <FaApple />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Signup);