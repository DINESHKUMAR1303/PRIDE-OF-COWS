import React from "react";
import NotificationBar from "../components/NotificationBar/NotificationBar";
import Navbar from "../components/Navbar/Navbar";
import Homebanner from "../components/Homebanner/Homebanner";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";

const Home = () => {
  return (
    <>
      <NotificationBar />
      <Navbar />
      <Homebanner />
      <ProductCarousel />
    </>
  );
};

export default Home;
