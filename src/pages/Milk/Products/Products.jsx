import React, { useState, useRef, useEffect, useMemo } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import "./Products.css";

// === GLOBAL CART CONTEXT ===
import { useCart } from "../../../context/CartContext";

// === SINGLE ORIGIN IMAGES ===
import logo from "./images/singleoriginlogo.png";
import unmatched from "./images/unmatched.png";
import sourced from "./images/sourcrd.png";
import innovation from "./images/innovation.png";
import healthier from "./images/healthier.png";

// === PRODUCT IMAGES ===
import milk from "./images/onelitermilk.png";
import curd from "./images/purecurd.png";
import ghee from "./images/ghee.png";
import paneer from "./images/panner.png";
import pbar from "./images/proteinbar.png";
import pbox from "./images/proteinbarpack.png";

// === PRODUCT DATA ===
const products = [
  { id: 1, img: milk, title: "Milk", price: "₹120", weight: "1L", path: "/shop/milk" },
  { id: 2, img: curd, title: "Curd", price: "₹95", weight: "320g", path: "/shop/curd" },
  { id: 3, img: ghee, title: "Ghee", price: "₹495", weight: "200ml", oldPrice: "₹550", path: "/shop/ghee" },
  { id: 4, img: paneer, title: "Paneer", price: "₹195", weight: "200g", path: "/shop/paneer" },
  { id: 5, img: pbar, title: "Protein Wafer Bar", price: "₹60", weight: "40g", path: "/shop/protein-wafer-bar" },
  { id: 6, img: pbox, title: "Protein Box Pack", price: "₹475", weight: "320g", path: "/shop/protein-box" },
];

// === FEATURES ===
const features = [
  { icon: unmatched, text: "Unmatched Premium Single Origin Milk", alt: "Premium milk" },
  { icon: sourced, text: "Sourced from picturesque Bhagyalaxmi Dairy Farm", alt: "Farm sourcing" },
  { icon: innovation, text: "Innovative & Advanced Techniques", alt: "Innovation" },
  { icon: healthier, text: "Healthier Family & A Healthier You", alt: "Healthy family" },
];

const Products = () => {
  const navigate = useNavigate();
  const { cartItems, increaseItem, decreaseItem } = useCart();

  // ITEMS TO SHOW
  const getItemsToShow = () => {
    const w = window.innerWidth;
    if (w < 768) return 1;
    if (w < 992) return 2;
    if (w < 1440) return 3;
    if (w < 2560) return 5;
    return 6;
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsToShow());
  const total = products.length;

  const extendedProducts = useMemo(() => [...products, ...products, ...products], []);
  const [current, setCurrent] = useState(total);
  const transitionRef = useRef(true);

  // Resize handler
  useEffect(() => {
    const handleResize = () => setItemsToShow(getItemsToShow());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slide controls
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
      {/* ========= PRODUCTS SECTION ========= */}
      <section className="product-section">
        <p className="product-subtitle">FARM TO TABLE</p>
        <h2 className="product-heading">From Our Pride Of Cows Family To Yours</h2>
        <p className="product-sub">
          Our Promise — Holistic cow care and fresh delivery within 24 hours of milking.
        </p>

        {/* Carousel */}
        <div className="product-carousel-wrapper" {...handlers}>
          <div
            className="product-carousel-inner"
            style={{
              transform: `translateX(-${current * (100 / itemsToShow)}%)`,
              transition: transitionRef.current ? "transform 0.5s ease-in-out" : "none",
            }}
          >
            {extendedProducts.map((prod, index) => {
              const qty = cartItems[prod.id] || 0;

              return (
                <div key={`${prod.id}-${index}`} className="product-carousel-item">
                  <div
                    className="product-card-inner"
                    onClick={() => navigate(prod.path)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="product-image-wrap">
                      <img src={prod.img} alt={prod.title} loading="lazy" />
                    </div>

                    <div className="product-meta">
                      <span className="product-weight">{prod.weight}</span>
                      <span className="product-price">
                        {prod.price}{" "}
                        {prod.oldPrice && <span className="old-price">{prod.oldPrice}</span>}
                      </span>
                    </div>

                    <p className="product-title">{prod.title}</p>

                    {/* CART BUTTONS (No routing) */}
                    {qty === 0 ? (
                      <button
                        className="product-cta"
                        onClick={(e) => {
                          e.stopPropagation();
                          increaseItem(prod.id);
                        }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div
                        className="qty-box"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button className="qty-btn" onClick={() => decreaseItem(prod.id)}>–</button>
                        <span className="qty-value">{qty}</span>
                        <button className="qty-btn" onClick={() => increaseItem(prod.id)}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="carousel-controls">
          <button className="arrow-button" onClick={prevSlide}>
            <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
              <path d="M6 1L1 6.5L6 12" stroke="#193B61" />
              <line x1="1" y1="6.5" x2="26" y2="6.5" stroke="#193B61" />
            </svg>
          </button>

          <div className="line"></div>

          <button className="arrow-button" onClick={nextSlide}>
            <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
              <path d="M21 1L26 6.5L21 12" stroke="#193B61" />
              <line x1="1" y1="6.5" x2="26" y2="6.5" stroke="#193B61" />
            </svg>
          </button>
        </div>
      </section>

     
    </>
  );
};

export default Products;
