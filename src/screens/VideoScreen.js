import React from "react";
import './VedioScreen.css'
export default function VideoScreen() {
  return (
    <div className="video-container">
      <video controls autoPlay className="video-player">
        <source src="/vedio.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
