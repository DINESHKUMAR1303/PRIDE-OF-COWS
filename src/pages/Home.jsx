import React from "react";
import NotificationBar from "../components/NotificationBar/NotificationBar";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/Homebanner/Homebanner";

const Home = () => {
  return (
    <>
      <NotificationBar />
      <Navbar />
      <HeroSection />
    </>
  );
};

export default Home;
