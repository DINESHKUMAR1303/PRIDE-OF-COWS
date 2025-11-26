import React from "react";
import Homebanner from "../components/Homebanner/Homebanner";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";
import ContactSection from "../components/ContactSection/ContactSection";
import Care from "../components/Care/Care";
import HealthLifestyle from "../components/HealthLifestyle/HealthLifestyle";
import Testimonials from "../components/Testimonials/Testimonials";

const Home = () => {
  return (
    <>
     
      <Homebanner />
      <ProductCarousel />
      <ContactSection />
      <Care />
      <HealthLifestyle />
      <Testimonials />
    </>
  );
};

export default Home;
