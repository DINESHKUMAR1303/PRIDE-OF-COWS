import React, { useState, useEffect } from "react";
import "../App.css"; 

// Import banner images
import banner1 from "../images/powerpackedpanner.jpg";
import banner2 from "../images/0fact.jpg";
import banner3 from "../images/curdtheway.jpg";
import banner4 from "../images/earnindulge.jpg";
import banner5 from "../images/farmfreshmilk.jpg";
import banner6 from "../images/fromourform.jpg";
import banner7 from "../images/notjustghee.png";
import banner8 from "../images/proteinwaffer.jpg";
import banner9 from "../images/singleorginpanner.jpg";
import banner10 from "../images/takethetaste.jpg";
import banner11 from "../images/wholesomegoodness.jpg";

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
