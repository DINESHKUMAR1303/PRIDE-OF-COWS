import React, { useState, useEffect } from "react";
import "../App.css"; // using your global css

// Import banner images
import banner1 from "../images/milkpowder.jpg";
import banner2 from "../images/banner.png";
import banner3 from "../images/banner.png";

const banners = [banner1, banner2, banner3];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Next slide
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  // Prev slide
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="carousel">
      <button className="arrow left" onClick={prevSlide}>
        ◀
      </button>

      <div className="carousel-inner">
        {banners.map((img, index) => (
          <div
            key={index}
            className={`carousel-item ${index === current ? "active" : ""}`}
          >
            <img src={img} alt={`banner-${index}`} />
          </div>
        ))}
      </div>

      <button className="arrow right" onClick={nextSlide}>
        ▶
      </button>
    </section>
  );
};

export default HeroCarousel;
