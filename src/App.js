import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import Explore from "./screens/Explore";
import Signup from "./screens/Signup";
import VideoScreen from "./screens/VideoScreen";
import SplaseScreen from "./screens/SplaseScreen";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SplaseScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/details" element={<DetailsScreen />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/video" element={<VideoScreen />} />
      </Routes>
    </>
  );
}
