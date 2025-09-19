import React, { useState, useEffect } from "react";
import "./Homebanner.css";

// Import banner images (replace with your actual images)
import banner1 from "../../images/powerpackedpanner.jpg";
import banner2 from "../../images/0fact.jpg";
import banner3 from "../../images/curdtheway.jpg";
import banner4 from "../../images/earnindulge.jpg";
import banner5 from "../../images/farmfreshmilk.jpg";
import banner6 from "../../images/fromourform.jpg";
import banner7 from "../../images/notjustghee.png";
import banner8 from "../../images/proteinwaffer.jpg";
import banner9 from "../../images/singleorginpanner.jpg";
import banner10 from "../../images/takethetaste.jpg";
import banner11 from "../../images/wholesomegoodness.jpg";

const banners = [
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
  banner7,
  banner8,
  banner9,
  banner10,
  banner11,
];

const Homebanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="homebanner-wrapper">
      <section className="carousel">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((img, index) => (
            <div key={index} className="carousel-item">
              <img src={img} alt={`banner-${index}`} />
            </div>
          ))}
        </div>
      </section>

      <div className="carousel-controls">
        <button
          className="arrow-button"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ←
        </button>
        <div className="line"></div>
        <button
          className="arrow-button"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Homebanner;