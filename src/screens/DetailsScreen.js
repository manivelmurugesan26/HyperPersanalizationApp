import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import { BiHelpCircle } from "react-icons/bi";
import { PiMagicWand } from "react-icons/pi";
import "./DetailsScreen.css";
import bodyImage from "../Image/body.png";
import logo from "../Image/logo.png";

const slides = [
  {
    id: 1,
    title: "Men's\nMedium sizes",
    europeSize: "42",
    international: "M",
  },
  {
    id: 2,
    title: "Men's\nLarge sizes",
    europeSize: "44",
    international: "L",
  },
  {
    id: 3,
    title: "Men's\nSmall sizes",
    europeSize: "40",
    international: "S",
  },
];

const Card = ({ slide, isActive, isPrevious, isNext, isLiked, onLike }) => (
  <div className={`card ${isActive ? "active" : ""} ${isPrevious ? "previous" : ""} ${isNext ? "next" : ""} ${!isActive && !isPrevious && !isNext ? "inactive" : ""}`}>
    <button className={`like-button ${isLiked ? "liked" : ""}`} onClick={onLike}>
      <FiHeart />
    </button>

    <h2 className="title">
      {slide.title.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </h2>

    <div className="size-info">
      <span className="size-text">
        Europe (DE/AT/NL/SE/DK): <strong>{slide.europeSize}</strong>
      </span>
      <span className="intl-text">
        International: <strong>{slide.international}</strong>
      </span>
    </div>

    <img src={bodyImage} alt="Body Measurement" className="body-image" />

    <p className="note">
      Please be aware that these categories are approximations.
    </p>
  </div>
);

export default function DetailsScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedSlides, setLikedSlides] = useState(new Set());
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleHelp = () => {
    alert("Need help? Contact our support team!");
  };

  const handleLanguageChange = (e) => {
    console.log("Language changed to:", e.target.value);
  };

  const toggleLike = (slideId) => {
    setLikedSlides((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(slideId)) {
        newLiked.delete(slideId);
      } else {
        newLiked.add(slideId);
      }
      return newLiked;
    });
  };

  return (
    <div className="details-container">
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

      <div className="card-stack">
        {slides.map((slide, index) => (
          <Card
            key={slide.id}
            slide={slide}
            isActive={index === currentIndex}
            isPrevious={index === (currentIndex - 1 + slides.length) % slides.length}
            isNext={index === (currentIndex + 1) % slides.length}
            isLiked={likedSlides.has(slide.id)}
            onLike={() => toggleLike(slide.id)}
          />
        ))}

        <button className="arrow-btn left-arrow" onClick={handlePrevious}>
          <IoIosArrowRoundBack className="arrow-icon" />
        </button>
        <button className="arrow-btn right-arrow" onClick={handleNext}>
          <IoIosArrowRoundForward className="arrow-icon" />
        </button>
      </div>
    </div>
  );
}
