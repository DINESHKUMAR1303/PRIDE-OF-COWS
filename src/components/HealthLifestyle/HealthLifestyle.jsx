import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSwipeable } from "react-swipeable";
import "./HealthLifestyle.css";

import img1 from "./images/milk1.jpg";
import img2 from "./images/milk2.jpg";
import img3 from "./images/milk3.jpg";
import img4 from "./images/milk4.jpg";
import img5 from "./images/milk5.jpg";

const cards = [
  { img: img1, text: "The Standard of Milk" },
  {
    img: img2,
    text:
      "Savour the essence: Pride of cows redefines luxury with pure, Single-origin milk",
  },
  {
    img: img3,
    text:
      "From farm to Glass: The story of single-origin milk and its benefits",
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
  const getItemsToShow = () => {
    const w = window.innerWidth;
    if (w < 768) return 1;  
    if (w < 992) return 2;  
    if (w < 1440) return 3; 
    if (w < 1920) return 4; 
    return 5;             
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsToShow());
  const total = cards.length;

  const extendedCards = useMemo(() => [...cards, ...cards, ...cards], []);

  const [current, setCurrent] = useState(total);
  const transitionRef = useRef(true);

  const cardRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(350);

  const calculateSlideWidth = () => {
    if (!cardRef.current) return;

    const screen = window.innerWidth;

    // MOBILE 320px
    if (screen < 768) {
      setSlideWidth(320 + 20);
      return;
    }

    // TABLET
    if (screen < 992) {
      const gap = 24;
      const totalPadding = 80;
      const cardW = (screen - totalPadding - gap) / 2;
      setSlideWidth(cardW + gap);
      return;
    }

    // LAPTOP + DESKTOP
    const cardW = cardRef.current.offsetWidth;
    setSlideWidth(cardW + 24);
  };

  useEffect(() => {
    calculateSlideWidth();
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
      calculateSlideWidth();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setTimeout(calculateSlideWidth, 150);
  }, []);

  // INFINITE LOOP
  useEffect(() => {
    if (!transitionRef.current) return;

    if (current >= total * 2) {
      transitionRef.current = false;
      setTimeout(() => {
        setCurrent(total);
        transitionRef.current = true;
      }, 300);
    } else if (current < total) {
      transitionRef.current = false;
      setTimeout(() => {
        setCurrent(total * 2 - 1);
        transitionRef.current = true;
      }, 300);
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
    <section className="health-outer">
      <h2 className="health-title">Health Is A Lifestyle</h2>

      {/* ====== Carousel Wrapper ====== */}
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
            >
              <img src={card.img} alt="milk" loading="lazy" />
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ====== Controls ====== */}
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

      <button className="view-all">VIEW ALL</button>
    </section>
  );
};

export default HealthLifestyle;
