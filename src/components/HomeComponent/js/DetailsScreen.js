import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/DetailsScreen.css";
import {
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
  FiHeart,
  MdOutlineArrowBackIos
} from '../../../assets/icons';
import bodyImage from '../../../assets/images/body.png';
import Header from "../../Header/Header";

const slides = [
  {
    id: 1,
    title: "Men's\nSmall sizes",
    europeSize: "40",
    international: "S",
  },
  {
    id: 2,
    title: "Men's\nMedium sizes",
    europeSize: "42",
    international: "M",
  },
  {
    id: 3,
    title: "Men's\nLarge sizes",
    europeSize: "44",
    international: "L",
  }
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
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const toggleLike = (slideId) => {
    setLikedSlides((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(slideId)) {
        newSet.delete(slideId);
        toast.success('Removed from favorites');
      } else {
        newSet.add(slideId);
        toast.success('Added to favorites');
      }
      return newSet;
    });
  };

  const isFirstCard = currentIndex === 0;
  const isLastCard = currentIndex === slides.length - 1;

  return (
    <div className="details-container">
      <Header />
      <button className="back-button" onClick={handleBack}>
        <MdOutlineArrowBackIos className="back-icon" />
        <span className="back-text">Back</span>
      </button>

      <div className="card-stack">
        {slides.map((slide, index) => (
          <Card
            key={slide.id}
            slide={slide}
            isActive={index === currentIndex}
            isPrevious={index === currentIndex - 1}
            isNext={index === currentIndex + 1}
            isLiked={likedSlides.has(slide.id)}
            onLike={() => toggleLike(slide.id)}
          />
        ))}

        {!isFirstCard && (
          <button className="arrow-btn left-arrow" onClick={handlePrevious}>
            <IoIosArrowRoundBack className="arrow-icon" />
          </button>
        )}
        {!isLastCard && (
          <button className="arrow-btn right-arrow" onClick={handleNext}>
            <IoIosArrowRoundForward className="arrow-icon" />
          </button>
        )}
      </div>
    </div>
  );
}
