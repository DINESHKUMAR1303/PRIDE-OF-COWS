import React, { useState, useRef, useEffect, useMemo } from "react";
import { useSwipeable } from "react-swipeable";
import "./ProductCarousel.css";

// === SINGLE ORIGIN IMAGES ===
import logo from "./images/singleoriginlogo.png";
import unmatched from "./images/unmatched.png";
import sourced from "./images/sourcrd.png";
import innovation from "./images/innovation.png";
import healthier from "./images/healthier.png";

// === PRODUCT IMAGES ===
import prod1 from "./images/onelitermilk.png";
import prod2 from "./images/purecurd.png";
import prod3 from "./images/ghee.png";
import prod4 from "./images/panner.png";
import prod5 from "./images/proteinbar.png";
import prod6 from "./images/proteinbarpack.png";

// === DATA ===
const products = [
  { id: 1, img: prod1, title: "Milk", price: "₹120", weight: "1L" },
  { id: 2, img: prod2, title: "Curd", price: "₹95", weight: "320g" },
  { id: 3, img: prod3, title: "Ghee", price: "₹495", weight: "200ml", oldPrice: "₹550" },
  { id: 4, img: prod4, title: "Paneer", price: "₹195", weight: "200g" },
  { id: 5, img: prod5, title: "Protein Wafer Bar", price: "₹60", weight: "40g" },
  { id: 6, img: prod6, title: "Protein Box Pack", price: "₹475", weight: "320g" },
];

const features = [
  { icon: unmatched, line1: "Unmatched Premium", line2: "Single Origin Milk", alt: "Premium milk" },
  { icon: sourced,   line1: "Sourced from picturesque", line2: "Bhagyalaxmi Dairy Farm", alt: "Farm sourcing" },
  { icon: innovation,line1: "Innovative & Advanced", line2: "Techniques", alt: "Innovation" },
  { icon: healthier, line1: "Healthier Family & A", line2: "Healthier You", alt: "Healthy family" },
];

const ProductCarousel = () => {
  // === CAROUSEL LOGIC (100% UNCHANGED) ===
  const getItemsToShow = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 992) return 2;
    return 4;
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsToShow());
  const total = products.length;
  const extendedProducts = useMemo(() => [...products, ...products, ...products], []);
  const [current, setCurrent] = useState(total);
  const transitionRef = useRef(true);

  useEffect(() => {
    const handleResize = () => setItemsToShow(getItemsToShow());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!transitionRef.current) return;

    if (current >= total * 2) {
      transitionRef.current = false;
      setTimeout(() => {
        setCurrent(total);
        transitionRef.current = true;
      }, 500);
    } else if (current < total) {
      transitionRef.current = false;
      setTimeout(() => {
        setCurrent(total * 2 - 1);
        transitionRef.current = true;
      }, 500);
    }
  }, [current, total]);

  const nextSlide = () => setCurrent((prev) => prev + 1);
  const prevSlide = () => setCurrent((prev) => prev - 1);

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <>
      {/* ====== PRODUCT CAROUSEL – FIRST (ON TOP) ====== */}
      <section className="product-section">
        <p className="product-subtitle">FARM TO TABLE</p>
        <h2 className="product-heading">From Our Pride Of Cows Family To Yours</h2>
        <p className="product-sub">
          Our Promise - Holistic cow care with a round-the-clock system maintenance,
          our Single Origin pure milk is delivered fresh, nutritious,
          and creamy within 24 hours of milking.
        </p>

        <div className="product-carousel-wrapper" {...handlers} role="region" aria-label="Product carousel">
          <div
            className="product-carousel-inner"
            style={{
              transform: `translateX(-${current * (100 / itemsToShow)}%)`,
              transition: transitionRef.current ? "transform 0.5s ease-in-out" : "none",
            }}
          >
            {extendedProducts.map((prod) => (
              <div key={`${prod.id}-${prod.title}`} className="product-carousel-item">
                <div className="product-card-inner">
                  <div className="product-image-wrap">
                    <img src={prod.img} alt={prod.title} loading="lazy" />
                  </div>
                  <div className="product-meta">
                    <span className="product-weight">{prod.weight}</span>
                    <span className="product-price">
                      {prod.price} {prod.oldPrice && <span className="old-price">{prod.oldPrice}</span>}
                    </span>
                  </div>
                  <p className="product-title">{prod.title}</p>
                  <button
                    className="product-cta"
                    onClick={() => console.log(`Shop ${prod.title}`)}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-controls">
          <button
            className="arrow-button"
            onClick={prevSlide}
            aria-label="Previous slide"
            disabled={!transitionRef.current}
          >
            <svg width="27" height="13" viewBox="0 0 27 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 1L1 6.5L6 12" stroke="#193B61" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="1" y1="6.5" x2="26" y2="6.5" stroke="#193B61" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </button>

          <div className="line"></div>

          <button
            className="arrow-button"
            onClick={nextSlide}
            aria-label="Next slide"
            disabled={!transitionRef.current}
          >
            <svg width="27" height="13" viewBox="0 0 27 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 1L26 6.5L21 12" stroke="#193B61" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="1" y1="6.5" x2="26" y2="6.5" stroke="#193B61" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </section>

      {/* ====== SINGLE ORIGIN SECTION – BELOW ====== */}
      <section className="single-origin-section" aria-labelledby="origin-heading">
        <div className="logo-wrapper">
          <img
            src={logo}
            alt="Single Origin Farm to Home logo - Established 2011"
            className="origin-logo"
            loading="lazy"
          />
        </div>

        <h2 className="origin-title">Be A Part Of Our</h2>
        <h1 id="origin-heading" className="origin-heading">Single Origin Milk Story</h1>

        <div className="origin-features">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <img src={f.icon} alt={f.alt} className="feature-img" loading="lazy" />
              <p className="feature-text">
                <span>{f.line1}</span>
                <span>{f.line2}</span>
              </p>
            </div>
          ))}
        </div>

        <button className="know-more-btn" type="button">
          KNOW MORE
        </button>
      </section>
    </>
  );
};

export default ProductCarousel;