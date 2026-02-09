import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../../api/product";
import "./Products.css";

// === GLOBAL CART CONTEXT ===
import { useCart } from "../../../context/CartContext";

// === IMAGES ===
import unmatched from "./images/unmatched.png";
import sourced from "./images/sourcrd.png";
import innovation from "./images/innovation.png";
import healthier from "./images/healthier.png";

// Import Real Product Images for Default State
import milkImg from "../ProductDetail/images/image1.png";
import gheeImg from "../../Ghee/images/Ghee.png";
import curdImg from "../../Curd/images/curd.png";
import paneerImg from "../../Paneer/images/panner.png";
import yogurtImg from "../../Yogurt/images/blueberry.png";
import milkPowderImg from "../../Milk Powder/images/Milk Powder.png";
import proteinBarImg from "../../Protein Bar/images/protein bar.png";

const DEFAULT_PRODUCTS = [
  {
    _id: "default_milk",
    productName: "Pride of Cows Milk",
    weight: "1 L",
    price: 120,
    mrp: 140,
    image: milkImg
  },
  {
    _id: "default_ghee",
    productName: "Pride of Cows Ghee",
    weight: "1 L",
    price: 2190,
    mrp: 2500,
    image: gheeImg
  },
  {
    _id: "default_curd",
    productName: "Pride of Cows Curd",
    weight: "400g",
    price: 80,
    mrp: 90,
    image: curdImg
  },
  {
    _id: "default_paneer",
    productName: "Pride of Cows Paneer",
    weight: "200g",
    price: 150,
    mrp: 180,
    image: paneerImg
  },
  {
    _id: "default_yogurt",
    productName: "Blueberry Yogurt",
    weight: "120g",
    price: 95,
    mrp: 122,
    image: yogurtImg
  },
  {
    _id: "default_milk_powder",
    productName: "Milk Powder",
    weight: "500g",
    price: 440,
    mrp: 500,
    image: milkPowderImg
  },
  {
    _id: "default_protein_bar",
    productName: "Protein Bar",
    weight: "50g",
    price: 120,
    mrp: 150,
    image: proteinBarImg
  }
];

const Products = () => {
  const navigate = useNavigate();
  // Using direct cart context like ProductCarousel
  const { cartItems, increaseItem, decreaseItem } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // === FETCH PRODUCTS ===
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const res = await fetchProducts(true); // Fetch active only
        if (isMounted) {
          if (res.data && res.data.length > 0) {
            // Optional: Deduplicate if needed, similar to ProductCarousel
            const uniqueProducts = Array.from(
              new Map(res.data.map((item) => [item._id, item])).values()
            );
            setProducts(uniqueProducts);
          } else {
            setProducts(DEFAULT_PRODUCTS);
          }
        }
      } catch (err) {
        console.error("Failed to load products", err);
        if (isMounted) setProducts(DEFAULT_PRODUCTS);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, []);

  // Helper for navigation (Synced with ProductCarousel)
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

  // === ITEMS TO SHOW LOGIC ===
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

  // Resize Handler
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
      setCurrent(0); // Reset on resize
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === CAROUSEL LOGIC ===
  const maxScroll = Math.max(0, products.length - itemsToShow);

  const nextSlide = () => {
    if (current < maxScroll) {
      setCurrent((prev) => prev + 1);
    } else {
      setCurrent(0); // Cycle back to start
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    } else {
      setCurrent(maxScroll); // Cycle to end
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Loading products...</div>;
  }

  // Not returning null immediately to keep layout stable if empty, or render empty message
  if (products.length === 0) {
    return null;
  }

  return (
    <>
      <section className="product-section">
        <p className="product-subtitle">FARM TO TABLE</p>
        <h2 className="product-heading">From Our Pride Of Cows Family To Yours</h2>
        <p className="product-sub">
          Our Promise — Holistic cow care and fresh delivery within 24 hours of milking.
        </p>

        {/* Carousel Wrapper */}
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

              // Image Logic (Backend vs Local)
              const isLocalImage = !prod.image.startsWith("/uploads");
              const imgSrc = isLocalImage ? prod.image : `http://localhost:5000${prod.image}`;

              return (
                <div key={`${prod._id}-${index}`} className="product-carousel-item">
                  <div
                    className="product-card-inner"
                    onClick={() => handleProductClick(prod.productName, prod._id)}
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

                    <p className="product-title">{prod.productName}</p>

                    <div className="product-meta">
                      <span className="product-weight">{prod.weight}</span>
                      <span className="carousel-product-price">
                        <span>₹{prod.price}</span>
                        {prod.mrp && <span className="old-price">MRP: ₹{prod.mrp}</span>}
                      </span>
                    </div>

                    {/* CTA Buttons */}
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

        {/* Controls */}
        {products.length > itemsToShow && (
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
        )}
      </section>
    </>
  );
};

export default Products;
