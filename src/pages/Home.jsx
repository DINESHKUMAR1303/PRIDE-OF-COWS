import React from "react";
import NotificationBar from "../components/NotificationBar/NotificationBar";
import Navbar from "../components/Navbar/Navbar";
import Homebanner from "../components/Homebanner/Homebanner";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";
// import SingleOrigin from "../components/SingleOrgin/SingleOrgin";
const Home = () => {
  return (
    <>
      <NotificationBar />
      <Navbar />
      <Homebanner />
      <ProductCarousel />
      {/* <SingleOrigin/> */}
    </>
  );
};

export default Home;
