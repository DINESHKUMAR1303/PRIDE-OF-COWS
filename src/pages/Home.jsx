import React from "react";
import NotificationBar from "../components/NotificationBar/NotificationBar";
import Navbar from "../components/Navbar/Navbar";
import Homebanner from "../components/Homebanner/Homebanner";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";
import ContactSection from "../components/ContactSection/ContactSection";
const Home = () => {
  return (
    <>
      <NotificationBar />
      <Navbar />
      <Homebanner />
      <ProductCarousel />
      <ContactSection/>
    </>
  );
};

export default Home;
