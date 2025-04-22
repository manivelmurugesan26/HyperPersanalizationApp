import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import LoginScreen from "./components/HomeComponent/js/LoginScreen";
import DetailsScreen from "./components/HomeComponent/js/DetailsScreen";
import Explore from "./components/HomeComponent/js/Explore";
import Signup from "./components/HomeComponent/js/Signup";
import VideoScreen from "./components/HomeComponent/js/VideoScreen";
import SplaseScreen from "./components/HomeComponent/js/SplaseScreen";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SplaseScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/details" element={<DetailsScreen />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/video" element={<VideoScreen />} />
      </Routes>
    </>
  );
}
