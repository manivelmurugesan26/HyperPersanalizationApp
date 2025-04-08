import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../screens/Explore.css";
import bodyImage from "../Image/3DBody.png";
import logo from "../Image/logo.png";
import { PiMagicWand } from "react-icons/pi";
import { BiHelpCircle } from "react-icons/bi";

export default function ExplorePage() {
  const navigate = useNavigate(); 

  const handleNavigate = () => {
    navigate("/details"); 
  };

  const handleHelp = () => {
    // Add help functionality here
    alert("Need help? Contact our support team!");
  };

  const handleLanguageChange = (e) => {
    // Add language change functionality here
    console.log("Language changed to:", e.target.value);
  };

  return (
    <div className="explore-container">
      <div className="logo-wrapper">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>

      <div className="top-right-menu">
        <button className="help-button" onClick={handleHelp}>
          <BiHelpCircle /> Help
        </button>
        <select className="language-select" onChange={handleLanguageChange} defaultValue="en">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
      </div>

      <div className="content-box">
        <h1 className="title">Scan under a Minute</h1>
        
        <div className="image-container">
          <img src={bodyImage} alt="3D Body" className="body-image" />
        </div>
        
        <div className="button-container">
          <button className="explore-btn" onClick={handleNavigate}>
            By Myself
          </button>
          <div className="friend-link" onClick={() => {}}>
            With a Friend
          </div>
        </div>
      </div>
    </div>
  );
}
