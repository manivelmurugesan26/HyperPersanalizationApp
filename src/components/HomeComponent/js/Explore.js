import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Explore.css";
import body3DImage from '../../../assets/images/3DBody.png';
import { MdOutlineArrowBackIos } from '../../../assets/icons';
import Header from "../../Header/Header";

export default function ExplorePage() {
  const navigate = useNavigate(); 

  const handleNavigate = () => navigate("/details");
  const handleBack = () => navigate(-1);

  return (
    <div className="explore-container">
      <Header />
      <button className="back-button" onClick={handleBack}>
        <MdOutlineArrowBackIos /> Back
      </button>

      <div className="content-box">
        <h1 className="title">Scan under a Minute</h1>
        
        <div className="image-container">
          <img src={body3DImage} alt="3D Body" className="body-image" />
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
