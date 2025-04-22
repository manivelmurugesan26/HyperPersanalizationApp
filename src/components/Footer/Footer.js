import React from 'react';
import './Footer.css';

const Footer = ({ text = "Design Smarter, Faster, Easier - All in One!" }) => {
  return (
    <div className="footer-text">
      {text}
    </div>
  );
};

export default Footer; 