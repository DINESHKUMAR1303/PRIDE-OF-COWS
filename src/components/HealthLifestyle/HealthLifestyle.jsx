import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSwipeable } from "react-swipeable";
import "./HealthLifestyle.css";

// === IMAGES ===
import img1 from "./images/milk1.jpg";
import img2 from "./images/milk2.jpg";
import img3 from "./images/milk3.jpg";
import img4 from "./images/milk4.jpg";
import img5 from "./images/milk5.jpg";

// === CARD DATA ===
const cards = [
  { img: img1, text: "The standard of milk" },
  {
    img: img2,
    text:
      "Savour the essence: Pride of cows redefines luxury with pure, Single-origin milk",
  },
  {
    img: img3,
    text: "From farm to Glass: The story of single-origin milk and its benefits",
  },
  {
    img: img4,
    text:
      "Discover the Pure Taste of Single-Origin Milk: A Journey to the Source",
  },
  {
    img: img5,
    text:
      "FSSAI Debunks the A2 and A2 Milk Myths: Purity Wins Over Gimmicks!",
  },
];

const HealthLifestyle = () => {
  // Responsive visible items
  const getItemsToShow = () => {
    const w = window.innerWidth;
    if (w < 768) return 1;
    if (w < 992) return 2;
    if (w < 1440) return 3;
    return 4;
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsToShow());
  const total = cards.length;

  // Clone cards for infinite effect
  const extendedCards = useMemo(() => [...cards, ...cards, ...cards], []);

  // Current index
  const [current, setCurrent] = useState(total);

  const transitionRef = useRef(true);
  const cardRef = useRef(null);

  // Slide width state
  const [slideWidth, setSlideWidth] = useState(300);

  // Calculate slide width correctly
  const calculateSlideWidth = () => {
    if (!cardRef.current) return;

    const el = cardRef.current;
    const style = window.getComputedStyle(el);
    const marginRight = parseInt(style.marginRight || "40");
    let w = el.offsetWidth + marginRight;

    // === MOBILE FIX ===
    if (window.innerWidth < 768) {
      w = el.offsetWidth + 25; // PERFECT GAP for centered card
    }

    setSlideWidth(w);
  };

  // Resize listener
  useEffect(() => {
    const resizeHandler = () => {
      setItemsToShow(getItemsToShow());
      calculateSlideWidth();
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  // First render
  useEffect(() => {
    setTimeout(() => calculateSlideWidth(), 50);
  }, []);

  // Infinite loop
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
    <section className="health-outer" aria-label="Health lifestyle carousel">
      <h2 className="health-title">Health Is A Lifestyle</h2>

      {/* ==== Carousel Wrapper ==== */}
      <div className="health-cards-wrapper" {...handlers}>
        <div
          className="health-cards-inner"
          style={{
            transform: `translateX(-${current * slideWidth}px)`,
            transition: transitionRef.current
              ? "transform 0.5s ease-in-out"
              : "none",
          }}
        >
          {extendedCards.map((card, index) => (
            <div
              className="health-card"
              key={`${index}-${card.text}`}
              ref={index === 0 ? cardRef : null}
              style={{
                // === MOBILE CENTER FIX ===
                margin: window.innerWidth < 768 ? "0 auto" : "0",
              }}
            >
              <img src={card.img} alt={`Milk ${index + 1}`} loading="lazy" />
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ==== Controls ==== */}
      <div className="carousel-controls">
        <button className="arrow-button" onClick={prevSlide}>
          <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
            <path d="M6 12L1 6.5L6 1" stroke="#193B61" strokeWidth="1" />
            <line x1="1" y1="6.5" x2="26" y2="6.5" stroke="#193B61" strokeWidth="1" />
          </svg>
        </button>

        <div className="line"></div>

        <button className="arrow-button" onClick={nextSlide}>
          <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
            <path d="M21 1L26 6.5L21 12" stroke="#193B61" strokeWidth="1" />
            <line x1="1" y1="6.5" x2="26" y2="6.5" stroke="#193B61" strokeWidth="1" />
          </svg>
        </button>
      </div>

      {/* View All */}
      <button className="view-all">VIEW ALL</button>
    </section>
  );
};

export default HealthLifestyle;
