import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";  
import "../css/SplaseScreen.css";
import Footer from "../../Footer/Footer";
import logo from "../../../assets/images/logo.png";

const SplaseScreen = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container">
      <div className="background"></div>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <Footer />
    </div>
  );
};

export default SplaseScreen;
