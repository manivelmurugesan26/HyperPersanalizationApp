
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";  
import "./SplaseScreen.css";
import logo from "../Image/logo.png"; 

const SplaceScreen = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container">
      
      <div className="background"></div>

     
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

    
      <div className="footer-text" >
        Design Smarter, Faster, Easier - All in One!

      </div>
    </div>
  );
};

export default SplaceScreen;
