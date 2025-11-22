import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSwipeable } from "react-swipeable";
import "./Testimonials.css";

// === AVATARS ===
import avatar1 from "../Testimonials/images/kareena.jpg";
import avatar2 from "../Testimonials/images/sachinanand.jpg";
import avatar3 from "../Testimonials/images/aishwarya.jpg";
import avatar4 from "../Testimonials/images/malvikaraaj.jpg";
import avatar5 from "../Testimonials/images/lata.jpg";

// === DATA ===
const testimonials = [
  {
    id: 1,
    quote: "Pride of Cows ghee is pure and aromatic. It makes every meal special!",
    name: "Kareena Kapoor Khan",
    role: "Actor",
    avatar: avatar1,
  },
  {
    id: 2,
    quote:
      "Taimur loves ghee just like I do! I trust Pride of Cows for its purity and freshness.",
    name: "Sachin Anand",
    role: "Actor",
    avatar: avatar2,
  },
  {
    id: 3,
    quote:
      "Designing Pride of Cows’ 7th-anniversary edition was a joy. It reflects the brand’s premium quality.",
    name: "Gauri Khan",
    role: "Interior Designer",
    avatar: avatar3,
  },
  {
    id: 4,
    quote:
      "Pride of Cows has become a part of our daily routine. The taste and quality are unmatched.",
    name: "Aishwarya Nag",
    role: "Lifestyle Influencer",
    avatar: avatar4,
  },
  {
    id: 5,
    quote:
      "From milk to ghee, every product feels thoughtfully crafted. Truly luxurious and trustworthy.",
    name: "Lata Saberwall",
    role: "Chef",
    avatar: avatar5,
  },
];

const Testimonials = () => {
  const getItemsToShow = () => {
    const w = window.innerWidth;
    if (w < 768) return 1;   // Mobile
    if (w < 992) return 2;   // Tablet
    if (w < 1440) return 3;  // Laptop
    if (w < 1920) return 4;  // Desktop
    return 5;                // Ultra-wide
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsToShow());
  const total = testimonials.length;

  // Triple dataset for infinite loop
  const extendedTestimonials = useMemo(
    () => [...testimonials, ...testimonials, ...testimonials],
    []
  );

  const [current, setCurrent] = useState(total);
  const transitionRef = useRef(true);

  const cardRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(350);

  // ==========================================================
  // FIXED RESPONSIVE WIDTH (MOBILE 100% EXACT CENTERED)
  // ==========================================================
  const calculateSlideWidth = () => {
    if (!cardRef.current) return;

    const screenWidth = window.innerWidth;

    // ⭐ EXACT MOBILE FIX — 320px card width
    if (screenWidth < 768) {
      setSlideWidth(320 + 20); // 20px gap
      return;
    }

    // Tablet — use 2 cards
    if (screenWidth < 992) {
      const padding = 80;
      const gap = 24;
      const cardWidth = (screenWidth - padding - gap) / 2;
      setSlideWidth(cardWidth + gap);
      return;
    }

    // Desktop/Laptop
    setSlideWidth(cardRef.current.offsetWidth + 32);
  };

  useEffect(() => {
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

  // Infinite Loop Reset Logic
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
    <section className="testimonials-outer">
      <p className="testimonials-subtitle">Testimonials</p>
      <h2 className="testimonials-title">Real People, Genuine Feedback</h2>

      <div className="testimonials-cards-wrapper" {...handlers}>
        <div
          className="testimonials-cards-inner"
          style={{
            transform: `translateX(-${current * slideWidth}px)`,
            transition: transitionRef.current
              ? "transform 0.5s ease-in-out"
              : "none",
          }}
        >
          {extendedTestimonials.map((item, index) => (
            <article
              className="testimonial-card"
              key={`${item.id}-${index}`}
              ref={index === 0 ? cardRef : null}
            >
              <p className="testimonial-quote">“{item.quote}”</p>

              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <img src={item.avatar} alt={item.name} />
                </div>
                <div className="testimonial-author-text">
                  <p className="testimonial-name">{item.name}</p>
                  <p className="testimonial-role">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="testimonials-controls">
        <button className="testi-arrow-button" onClick={prevSlide}>
          <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
            <path d="M6 12L1 6.5L6 1" stroke="#193B61" strokeWidth="1" />
            <line x1="1" y1="6.5" x2="26" y2="6.5" stroke="#193B61" strokeWidth="1" />
          </svg>
        </button>

        <div className="testimonials-line"></div>

        <button className="testi-arrow-button" onClick={nextSlide}>
          <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
            <path d="M21 1L26 6.5L21 12" stroke="#193B61" strokeWidth="1" />
            <line x1="1" y1="6.5" x2="26" y2="6.5" stroke="#193B61" strokeWidth="1" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
