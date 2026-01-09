import React, { useState, useRef, useEffect, useMemo } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import "./ProductCarousel.css";
import { fetchProducts } from "../../api/product";

// === IMPORT GLOBAL CART CONTEXT ===
import { useCart } from "../../context/CartContext";

// === SINGLE ORIGIN IMAGES ===
import logo from "./images/singleoriginlogo.png";
import unmatched from "./images/unmatched.png";
import sourced from "./images/sourcrd.png";
import innovation from "./images/innovation.png";
import healthier from "./images/healthier.png";

// === PRODUCT IMAGES (Fallback) ===
import prod1 from "./images/onelitermilk.png";
import prod2 from "./images/purecurd.png";
import prod3 from "./images/ghee.png";
import prod4 from "./images/panner.png";
import prod5 from "./images/proteinbar.png";
import prod6 from "./images/proteinbarpack.png";

// === DEFAULT PRODUCTS (Fallback) ===
const DEFAULT_PRODUCTS = [
  { _id: "1", productName: "Milk", price: 120, weight: "1L", image: prod1 },
  { _id: "2", productName: "Curd", price: 95, weight: "320g", image: prod2 },
  { _id: "3", productName: "Ghee", price: 495, weight: "200ml", mrp: 550, image: prod3 },
  { _id: "4", productName: "Paneer", price: 195, weight: "200g", image: prod4 },
  { _id: "5", productName: "Protein Wafer Bar", price: 60, weight: "40g", image: prod5 },
  { _id: "6", productName: "Protein Box Pack", price: 475, weight: "320g", image: prod6 },
];

// === FEATURE DATA ===
const features = [
  { icon: unmatched, text: "Unmatched Premium Single Origin Milk", alt: "Premium milk" },
  { icon: sourced, text: "Sourced from picturesque Bhagyalaxmi Dairy Farm", alt: "Farm sourcing" },
  { icon: innovation, text: "Innovative & Advanced Techniques", alt: "Innovation" },
  { icon: healthier, text: "Healthier Family & A Healthier You", alt: "Healthy family" },
];

const ProductCarousel = () => {

  const navigate = useNavigate();
  const { cartItems, increaseItem, decreaseItem } = useCart();

  // State to hold dynamic products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchProducts();
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        } else {
          setProducts(DEFAULT_PRODUCTS);
        }
      } catch (err) {
        console.error("Failed to load carousel products, using default", err);
        setProducts(DEFAULT_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getItemsToShow = () => {
    const w = window.innerWidth;
    if (w < 768) return 1;
    if (w < 992) return 2;
    if (w < 1440) return 3;
    if (w < 2560) return 5;
    return 6;
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsToShow());

  const extendedProducts = useMemo(() => {
    if (products.length === 0) return [];
    return [...products, ...products, ...products];
  }, [products]);

  const total = products.length;
  const [current, setCurrent] = useState(total);
  const transitionRef = useRef(true);

  useEffect(() => {
    if (products.length > 0) setCurrent(products.length);
  }, [products]);

  useEffect(() => {
    const handleResize = () => setItemsToShow(getItemsToShow());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      {/* ================= PRODUCT CAROUSEL ================= */}
      <section className="product-section">
        <p className="product-subtitle">FARM TO TABLE</p>
        <h2 className="product-heading">From Our Pride Of Cows Family To Yours</h2>
        <p className="product-sub">
          Our Promise — Holistic cow care and fresh delivery within 24 hours of milking.
        </p>

        {loading ? (
          <div style={{ textAlign: "center", padding: "30px" }}>Loading products...</div>
        ) : (
          <div className="product-carousel-wrapper" {...handlers}>
            <div
              className="product-carousel-inner"
              style={{
                transform: `translateX(-${current * (100 / itemsToShow)}%)`,
                transition: transitionRef.current ? "transform 0.5s ease-in-out" : "none",
              }}
            >
              {extendedProducts.map((prod, index) => {
                const qty = cartItems[prod._id] || 0;

                // Image logic
                const isLocalImage = !prod.image.startsWith("/uploads");
                const imgSrc = isLocalImage ? prod.image : `http://localhost:5000${prod.image}`;

                return (
                  <div key={`${prod._id}-${index}`} className="product-carousel-item">

                    <div
                      className="product-card-inner"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="product-image-wrap">
                        <img
                          src={imgSrc}
                          alt={prod.productName}
                          loading="lazy"
                          onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                        />
                      </div>

                      <div className="product-meta">
                        <span className="product-weight">{prod.weight}</span>
                        <span className="product-price">
                          ₹{prod.price}{" "}
                          {prod.mrp && <span className="old-price">₹{prod.mrp}</span>}
                        </span>
                      </div>

                      <p className="product-title">{prod.productName}</p>

                      {/* ⭐ buttons */}
                      {qty === 0 ? (
                        <button
                          className="product-cta"
                          onClick={(e) => {
                            e.stopPropagation();
                            increaseItem(prod._id);
                          }}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div
                          className="qty-box"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button className="qty-btn" onClick={() => decreaseItem(prod._id)}>–</button>
                          <span className="qty-value">{qty}</span>
                          <button className="qty-btn" onClick={() => increaseItem(prod._id)}>+</button>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

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

      {/* ================= SINGLE ORIGIN SECTION ================= */}
      <section className="single-origin-section" aria-labelledby="origin-heading">
        <div className="logo-wrapper">
          <img src={logo} alt="Single Origin Farm to Home logo" className="origin-logo" />
        </div>

        <h2 className="origin-title">Be A Part Of Our</h2>
        <h1 id="origin-heading" className="origin-heading">Single Origin Milk Story</h1>

        <div className="origin-features">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <img src={f.icon} alt={f.alt} className="feature-img" />
              <p className="feature-text">{f.text}</p>
            </div>
          ))}
        </div>

        <button className="know-more-btn">KNOW MORE</button>
      </section>
    </>
  );
};

export default ProductCarousel;
