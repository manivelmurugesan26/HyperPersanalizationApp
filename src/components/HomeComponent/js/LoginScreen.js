import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/HomeScreen.css";
import logoImage from '../../../assets/images/logo.png';
import { FaFacebookF, FaApple, FcGoogle } from '../../../assets/icons';
import { API_URL } from '../../../utils/constants';
import { showToast, handleApiError } from '../../../utils/helpers';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const validateLogin = useCallback(() => {
    if (!formData.email.trim()) {
      showToast("Email is required");
      return false;
    }
    if (!formData.password) {
      showToast("Password is required");
      return false;
    }
    return true;
  }, [formData]);

  const handleLogin = useCallback(async () => {
    if (!validateLogin()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      showToast("Login Successful!", 'success');
      setTimeout(() => navigate("/explore"), 2000);
    } catch (error) {
      showToast(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateLogin, navigate]);

  const handleSignup = useCallback(() => navigate("/signup"), [navigate]);
  const handleSocialLogin = useCallback((platform) => console.log(`${platform} login clicked`), []);

  return (
    <div className="signin-container">
      <div className="signup-link" onClick={handleSignup}>Already haven't an account? Sign Up</div>

      <div className="signin-card">
        <div className="logo-container">
          <img src={logoImage} alt="Areta360 Logo" className="logo" />
        </div>

        <h2>Signin</h2>
        
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
          placeholder="**********"
          className="input-field"
          value={formData.password}
          onChange={handleInputChange}
          disabled={isLoading}
        />

        <p className="terms">
          By Continuing, I agree to the <a href="#">Terms of services</a> and <a href="#">acknowledge the conditions</a>
        </p>

        <button 
          className="login-button" 
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
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

export default React.memo(LoginScreen); 