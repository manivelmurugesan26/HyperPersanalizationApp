import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import { PiMagicWand } from "react-icons/pi";
import "./DetailsScreen.css";
import bodyImage from "../Image/body.png";

const slides = [
  {
    id: 1,
    title: "Men's\nMedium sizes",
    europeSize: "42",
    international: "M",
  },
  {
    id: 2,
    title: "MenN's\nLarge sizes",
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

const Card = ({ slide, isActive, isLiked, onLike }) => (
  <div className={`card ${isActive ? "active" : "inactive"}`}>
    <button className={`like-button ${isLiked ? "liked" : ""}`} onClick={onLike}>
      <FaHeart />
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
      <div className="header-bar">
        <h2 className="header-title">Choose your body type</h2>
        <button className="help-button" onClick={() => alert("Need Help?")}>
          Need Help <PiMagicWand />
        </button>
      </div>

      <div className="card-stack">
        {slides.map((slide, index) => (
          <Card
            key={slide.id}
            slide={slide}
            isActive={index === currentIndex}
            isLiked={likedSlides.has(slide.id)}
            onLike={() => toggleLike(slide.id)}
          />
        ))}

        <button className="arrow-btn left-arrow" onClick={handlePrevious}>
          <FaArrowLeft className="arrow-icon" />
        </button>
        <button className="arrow-btn right-arrow" onClick={handleNext}>
          <FaArrowRight className="arrow-icon" />
        </button>
      </div>

      <div className="button-container">
        <button className="explore-btn" onClick={() => navigate("/video")}>
          Go to Explore
        </button>
      </div>
    </div>
  );
}
