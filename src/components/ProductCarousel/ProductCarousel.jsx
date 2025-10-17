import React, { useState, useRef, useEffect } from "react";
import "./ProductCarousel.css";

import prod1 from "./images/onelitermilk.png";
import prod2 from "./images/purecurd.png";
import prod3 from "./images/ghee.png";
import prod4 from "./images/panner.png";
import prod5 from "./images/proteinbar.png";
import prod6 from "./images/proteinbarpack.png";

const products = [
  { img: prod1, title: "Milk", price: "₹120", weight: "1L" },
  { img: prod2, title: "Curd", price: "₹95", weight: "320g" },
  { img: prod3, title: "Ghee", price: "₹495", weight: "200ml", oldPrice: "₹550" },
  { img: prod4, title: "Paneer", price: "₹195", weight: "200g" },
  { img: prod5, title: "Protein Wafer Bar", price: "₹60", weight: "40g" },
  { img: prod6, title: "Protein Box Pack", price: "₹475", weight: "320g" },
];

const ProductCarousel = () => {
  const itemsToShow = 5;
  const total = products.length;

  // Triple array for infinite illusion
  const extendedProducts = [...products, ...products, ...products];

  const [current, setCurrent] = useState(total); // Start from middle copy
  const transitionRef = useRef(true);

  const nextSlide = () => setCurrent((prev) => prev + 1);
  const prevSlide = () => setCurrent((prev) => prev - 1);

  // Handle infinite loop without jump
  useEffect(() => {
    if (!transitionRef.current) return;

    if (current >= total * 2) {
      transitionRef.current = false;
      setTimeout(() => {
        setCurrent(total);
        transitionRef.current = true;
      }, 50);
    } else if (current < total) {
      transitionRef.current = false;
      setTimeout(() => {
        setCurrent(total * 2 - 1);
        transitionRef.current = true;
      }, 50);
    }
  }, [current, total]);

  return (
    <section className="product-section">
      <p className="product-subtitle">FARM TO TABLE</p>
      <h2 className="product-heading">From Our Pride Of Cows Family To Yours</h2>
      <p className="product-sub">
        Our Promise - Holistic cow care with a round-the-clock system maintenance,
        our Single Origin pure milk is delivered fresh, nutritious,
        and creamy within 24 hours of milking.
      </p>

      <div className="product-carousel-wrapper">
        <div
          className="product-carousel-inner"
          style={{
            transform: `translateX(-${current * (100 / itemsToShow)}%)`,
            transition: transitionRef.current ? "transform 0.5s ease-in-out" : "none",
          }}
        >
          {extendedProducts.map((prod, index) => (
            <div key={index} className="product-carousel-item">
              <div className="product-card-inner">
                <div className="product-image-wrap">
                  <img src={prod.img} alt={prod.title} />
                </div>
                <div className="product-meta">
                  <span className="product-weight">{prod.weight}</span>
                  <span className="product-price">
                    {prod.price} {prod.oldPrice && <span className="old-price">{prod.oldPrice}</span>}
                  </span>
                </div>
                <p className="product-title">{prod.title}</p>
                <button className="product-cta">Shop Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="product-carousel-controls">
        <button className="product-arrow left" onClick={prevSlide}>←</button>
        <div className="product-line"></div>
        <button className="product-arrow right" onClick={nextSlide}>→</button>
      </div>
    </section>
  );
};

export default ProductCarousel;
