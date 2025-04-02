import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../screens/Explore.css";
import bodyImage from "../Image/3DBody.png";

export default function ExplorePage() {
  const navigate = useNavigate(); 

 
  const handleNavigate = () => {
    navigate("/details"); 
  };

  return (
    <div className="explore-container">
    
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
  );
}
