import React from "react";
import NotificationBar from "../components/NotificationBar/NotificationBar";
import Navbar from "../components/Navbar/Navbar";
import Homebanner from "../components/Homebanner/Homebanner";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";
import ContactSection from "../components/ContactSection/ContactSection";
import Care from "../components/Care/Care";
import HealthLifestyle from "../components/HealthLifestyle/HealthLifestyle";
import Testimonials from "../components/Testimonials/Testimonials";
const Home = () => {
  return (
    <>
      <NotificationBar />
      <Navbar />
      <Homebanner />
      <ProductCarousel />
      <ContactSection/>
      <Care/>
      <HealthLifestyle/>
      <Testimonials/>
    </>
  );
};

export default Home;
