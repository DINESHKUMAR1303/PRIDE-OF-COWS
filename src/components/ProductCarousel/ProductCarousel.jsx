import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import "./ProductCarousel.css";
import { fetchProducts } from "../../api/product";
import { Truck } from "lucide-react";

// === IMPORT GLOBAL CART CONTEXT ===
import { useCart } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import { MOCK_PRODUCTS } from "../../api/mockData";

// === SINGLE ORIGIN IMAGES ===
import logo from "./images/singleoriginlogo.png";
import unmatched from "./images/unmatched.png";
import sourced from "./images/sourcrd.png";
import innovation from "./images/innovation.png";
import healthier from "./images/healthier.png";

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

  // Helper for navigation
  const handleProductClick = (name, productId) => {
    if (!name) return;
    const lower = name.toLowerCase();

    // Pass ID to ensure exact sync
    if (lower.includes("milk") && lower.includes("powder")) navigate(`/shop/whole-milk-powder?id=${productId}`); // Fixed route
    else if (lower.includes("milk")) navigate(`/shop/milk?id=${productId}`);
    else if (lower.includes("ghee")) navigate(`/shop/ghee?id=${productId}`);
    else if (lower.includes("curd")) navigate(`/shop/curd?id=${productId}`);
    else if (lower.includes("paneer") || lower.includes("panner")) navigate(`/shop/paneer?id=${productId}`); // Added panner variant
    else if (lower.includes("yogurt")) navigate(`/shop/yogurt?id=${productId}`);
    else if (lower.includes("bar")) navigate(`/shop/protein-bar?id=${productId}`);
    else navigate("/shop/all");
  };

  // State to hold dynamic products - Initialize with MOCK_PRODUCTS for instant display
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Helper to trigger toast
  const handleAddToCart = (id) => {
    increaseItem(id);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Fetch from API
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const res = await fetchProducts(true); // Fetch only active products
        console.log("[ProductCarousel] Raw API response:", res);

        if (isMounted) {
          if (res.data && res.data.length > 0) {
            // Deduplicate products by _id
            const uniqueProducts = Array.from(
              new Map(res.data.map((item) => [item._id, item])).values()
            );
            console.log("[ProductCarousel] Unique products:", uniqueProducts.length);
            console.log("[ProductCarousel] Product IDs:", uniqueProducts.map(p => p._id));
            setProducts(uniqueProducts); // Only showing API products
          } else {
            console.log("[ProductCarousel] No active products found.");
            setProducts([]);
          }
        }
      } catch (err) {
        console.error("Failed to load carousel products", err);
        if (isMounted) setProducts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, []);

  const getItemsToShow = () => {
    if (typeof window === "undefined") return 1;
    const w = window.innerWidth;
    if (w < 768) return 1;
    if (w < 992) return 2;
    if (w < 1440) return 3;
    if (w < 2560) return 5;
    return 6;
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsToShow());
  const [current, setCurrent] = useState(0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
      // Reset to 0 on resize to prevent out-of-bounds
      setCurrent(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine max scroll index (start of the last visible page)
  const maxScroll = Math.max(0, products.length - itemsToShow);

  // Slide Handlers with Infinite Loop
  const nextSlide = () => {
    if (current < maxScroll) {
      setCurrent((prev) => prev + 1);
    } else {
      // Loop back to the beginning
      setCurrent(0);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    } else {
      // Loop to the end
      setCurrent(maxScroll);
    }
  };

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
          <Loader text="Loading fresh products..." />
        ) : (
          <div className="product-carousel-wrapper" {...handlers}>
            <div
              className="product-carousel-inner"
              style={{
                transform: `translateX(-${current * (100 / itemsToShow)}%)`,
                transition: "transform 0.5s ease-in-out",
              }}
            >
              {products.map((prod, index) => {
                const qty = cartItems[prod._id] || 0;

                // Image logic
                const isLocalImage = !prod.image.startsWith("/uploads");
                const imgSrc = isLocalImage ? prod.image : `http://localhost:5000${prod.image}`;

                return (
                  <div key={`${prod._id}-${index}`} className="product-carousel-item">

                    <div
                      className="product-card-inner"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleProductClick(prod.productName, prod._id)}
                    >
                      <div className="product-image-wrap">
                        <img
                          src={imgSrc}
                          alt={prod.productName}
                          loading="lazy"
                          onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                        />
                      </div>

                      <p className="product-title">{prod.productName}</p>

                      <div className="product-meta">
                        <span className="product-weight">{prod.weight}</span>
                        <span className="carousel-product-price">
                          <span>₹{prod.price}</span>
                          {prod.mrp && <span className="old-price">MRP: ₹{prod.mrp}</span>}
                        </span>
                      </div>

                      {/* ⭐ buttons */}
                      {qty === 0 ? (
                        <button
                          className="product-cta"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(prod._id);
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

        {/* Controls - Hide if not scrollable */}
        {products.length > itemsToShow && (
          <div className="carousel-controls">
            <button
              type="button"
              className="arrow-button"
              onClick={prevSlide}
            >
              <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
                <path d="M6 1L1 6.5L6 12" stroke="#193B61" />
                <line x1="1" y1="6.5" x2="26" y2="6.5" stroke="#193B61" />
              </svg>
            </button>

            <div className="line"></div>

            <button
              type="button"
              className="arrow-button"
              onClick={nextSlide}
            >
              <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
                <path d="M21 1L26 6.5L21 12" stroke="#193B61" />
                <line x1="1" y1="6.5" x2="26" y2="6.5" stroke="#193B61" />
              </svg>
            </button>
          </div>
        )}

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
