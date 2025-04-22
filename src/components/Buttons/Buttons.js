import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdOutlineArrowBackIos,
  IoIosArrowRoundBack, 
  IoIosArrowRoundForward,
  FiHeart,
  FaFacebookF, 
  FaApple,
  FcGoogle
} from '../../../assets/icons';
import './Buttons.css';

// Back Button Component
export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button className="back-button" onClick={handleBack}>
      <MdOutlineArrowBackIos />
      <span>Back</span>
    </button>
  );
};

// Continue Button Component
export const ContinueButton = ({ to, text = "Continue" }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(to);
  };

  return (
    <button className="continue-button" onClick={handleContinue}>
      {text}
    </button>
  );
};

// Menu Button Component
export const MenuButton = ({ icon: Icon, text, onClick }) => {
  return (
    <button className="menu-button" onClick={onClick}>
      {Icon && <Icon />} {text}
    </button>
  );
};

// Like Button Component
export const LikeButton = ({ isLiked, onClick }) => {
  return (
    <button 
      className={`like-button ${isLiked ? 'liked' : ''}`} 
      onClick={onClick}
    >
      <FiHeart />
    </button>
  );
};

// Arrow Button Component
export const ArrowButton = ({ direction = 'right', onClick }) => {
  const Icon = direction === 'left' ? IoIosArrowRoundBack : IoIosArrowRoundForward;
  
  return (
    <button 
      className={`arrow-btn ${direction}-arrow`} 
      onClick={onClick}
    >
      <Icon className="arrow-icon" />
    </button>
  );
};

// Social Button Component
export const SocialButton = ({ provider, onClick, disabled }) => {
  const getIcon = () => {
    switch (provider.toLowerCase()) {
      case 'google':
        return <FcGoogle style={{ color: "#DB4437" }} />;
      case 'facebook':
        return <FaFacebookF />;
      case 'apple':
        return <FaApple />;
      default:
        return null;
    }
  };

  return (
    <button 
      className={`social-icon ${provider.toLowerCase()}`}
      onClick={onClick}
      disabled={disabled}
    >
      {getIcon()}
    </button>
  );
}; 