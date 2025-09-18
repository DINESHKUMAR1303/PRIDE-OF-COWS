import React, { useState, useEffect } from "react";
import "./Homebanner.css";  // Keep CSS inside the same folder (not App.css)

// Import banner images (relative to src/images)
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

// Banner list
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

  // Auto slide every 5s
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
    <section className="carousel">
      {/* Left Arrow */}
      <button className="arrow left" onClick={prevSlide}>
        ◀
      </button>

      {/* Banner Slides */}
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

      {/* Right Arrow */}
      <button className="arrow right" onClick={nextSlide}>
        ▶
      </button>
    </section>
  );
};

export default Homebanner;
