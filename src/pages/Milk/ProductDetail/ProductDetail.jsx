import React, { useState, useEffect } from "react";
import "./ProductDetail.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { fetchProducts } from "../../../api/product";
import Loader from "../../../components/Loader/Loader";
import { MOCK_PRODUCTS } from "../../../api/mockData";

// Import your DatePicker component
import DatePicker from "../../../components/DatePicker/DatePicker";

// Images
import img1 from "./images/image1.png";
import img2 from "./images/image2.jpg";
import img3 from "./images/image3.png";

// Icons
import deliveryIcon from "./images/delivery_vehicle.png";
import calendarIcon from "./images/calender.png";
import crownIcon from "./images/crow.svg";
import addedCartIcon from "./images/delivery_vehicle.png";

const ProductDetail = () => {
  const images = [img1, img2, img3];

  const { cartItems, increaseItem, decreaseItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);

  const [showPopup, setShowPopup] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  // === DATE PICKER ===
  const [showDatePicker, setShowDatePicker] = useState(false);

  // ⬅ AUTO SET TOMORROW DATE (DEFAULT)
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const day = tomorrow.getDate();
    const monthName = tomorrow.toLocaleString("en-US", { month: "long" });
    const year = tomorrow.getFullYear();

    return `${day} ${monthName} ${year}`;
  };

  const [deliveryDate, setDeliveryDate] = useState(getTomorrow());


  // Init with safe defaults
  // --- OPTIMIZATION: Instant Load ---
  const getInitialData = () => {
    const params = new URLSearchParams(window.location.search);
    const urlId = params.get("id");
    let target = null;
    if (urlId) target = MOCK_PRODUCTS.find(p => p._id === urlId);
    if (!target) {
      const matches = MOCK_PRODUCTS.filter(p => p.productName && p.productName.toLowerCase().includes("milk"));
      matches.sort((a, b) => a.productName.length - b.productName.length);
      target = matches[0];
    }
    if (target) {
      return {
        id: target._id,
        title: target.productName,
        price: target.price,
        originalPrice: target.mrp,
        weight: target.weight,
        img: selectedImage
      };
    }
    // Fallback default
    return {
      id: "aaaaaaaabbbbbbbbcccc0001",
      title: "Milk",
      originalPrice: 140,
      price: 120,
      weight: "1 L",
      img: selectedImage,
    };
  };

  const initialData = getInitialData();
  const [productData, setProductData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  // Access URL params
  const location = useLocation();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetchProducts(true);
        const allProducts = res.data || []; // Fix: Access .data

        // 1. Check URL ID first (Highest Priority)
        const params = new URLSearchParams(location.search);
        const urlId = params.get("id");

        let targetProduct = null;

        if (urlId) {
          targetProduct = allProducts.find(p => p._id === urlId);
        }

        if (!targetProduct) {
          // 2. Fallback: Filter all matches for "milk"
          // Safe filtering
          const matches = allProducts.filter(p => p.productName && p.productName.toLowerCase().includes("milk"));

          // Sort by name length
          matches.sort((a, b) => a.productName.length - b.productName.length);
          targetProduct = matches[0];
        }

        if (targetProduct) {
          setProductData({
            id: targetProduct._id,
            title: targetProduct.productName,
            price: targetProduct.price,
            originalPrice: targetProduct.mrp,
            weight: targetProduct.weight,
            img: selectedImage
          });
        }
      } catch (err) {
        console.error("Failed to load product details", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [location.search]);


  const inCartQty = cartItems[productData.id] || 0;
  const isInCart = inCartQty > 0;

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Sync quantity
    setQuantity(inCartQty > 0 ? inCartQty : 1);
  }, [inCartQty]);

  // Quantity
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
    setIsEditing(true);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    setIsEditing(true);
  };

  // Update Cart
  const handleUpdateCart = () => {
    const difference = quantity - inCartQty;

    if (difference > 0) {
      for (let i = 0; i < difference; i++) increaseItem(productData.id);
    } else if (difference < 0) {
      for (let i = 0; i < Math.abs(difference); i++) decreaseItem(productData.id);
    }

    setIsEditing(false);
    setShowPopup(true);
    setAnimateCart(true);

    setTimeout(() => setAnimateCart(false), 800);
    setTimeout(() => setShowPopup(false), 1500);
  };

  const getButtonLabel = () => {
    if (!isInCart) return "Add to Cart";
    if (isInCart && !isEditing) return "Added to Cart";
    if (isEditing) return "Update Cart";
  };

  // === DATE SELECT FROM DATE PICKER ===
  const handleDateSelect = (newDate) => {
    setDeliveryDate(newDate);     // Update delivery
    setShowDatePicker(false);     // Close popup
  };

  if (loading) {
    return <Loader text="Loading Product Details..." />;
  }

  return (
    <>
      {/* CART POPUP */}
      {showPopup && (
        <div className="added-popup">
          <div className="popup-arrow"></div>

          <div className="popup-content">
            <img
              src={addedCartIcon}
              className={`popup-cart-img ${animateCart ? "run-slide" : ""}`}
              alt="cart"
            />
            <span>{isEditing ? "UPDATED CART" : "ADDED TO BAG"}</span>
          </div>
        </div>
      )}

      {/* DATE PICKER POPUP */}
      {showDatePicker && (
        <DatePicker
          onSelect={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {/* PAGE */}
      <section className="pd-wrapper">
        <div className="pd-main-box">

          {/* LEFT */}
          <div className="pd-left">
            <div className="pd-thumbnails">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumb"
                  onClick={() => setSelectedImage(img)}
                  className={`pd-thumbnail ${selectedImage === img ? "active-thumb" : ""}`}
                />
              ))}
            </div>

            <div className="pd-main-image-box">
              <img src={selectedImage} alt="Main" className="pd-main-img" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="pd-right">
            <h1 className="pd-title">
              {productData.title} {productData.weight ? `(${productData.weight})` : ""}
            </h1>

            <h3 className="pd-subtitle">Product Description</h3>

            <p className="pd-desc">
              Pride of Cows milk is bottled and delivered fresh, chilled to 4°C,
              from farm to your doorstep using a fully mechanised process.
            </p>

            <div className="pd-pricing">
              <span className="pd-price">₹{productData.price}</span>
              {productData.originalPrice > productData.price && (
                <>
                  <span className="pd-mrp">MRP: ₹{productData.originalPrice}</span>
                  <span className="pd-discount">
                    {Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>
            {/* <p className="pd-price">MRP : ₹{productData.price}</p> removed old price */}
            <p className="pd-price-note">(Price inclusive of all taxes)</p>



            {/* QUANTITY */}
            <div className="pd-qty-container">
              <span className="qty-left-text">Quantity</span>

              <div className="qty-controls">
                <button onClick={handleDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncrease}>+</button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="pd-buttons">
              <button className="pd-buy-now" onClick={handleUpdateCart}>
                {getButtonLabel()}
              </button>

              <button className="pd-subscribe">Subscribe</button>
            </div>

            {/* DELIVERY BOX */}
            <div className="pd-delivery-box">
              <div className="pd-delivery-left">
                <p className="pd-delivery-title">
                  <img src={deliveryIcon} alt="delivery" className="pd-icon" />
                  Get Delivered in 1 Day!
                </p>

                <p className="pd-delivery-date">
                  Expected Delivery : <strong>{deliveryDate}</strong>
                </p>
              </div>

              <button
                className="pd-change-date-btn"
                onClick={() => setShowDatePicker(true)}
              >
                <img src={calendarIcon} alt="calendar" className="pd-icon" />
                Change Delivery Date?
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;