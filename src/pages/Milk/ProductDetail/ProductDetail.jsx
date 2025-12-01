import React, { useState, useEffect } from "react";
import "./ProductDetail.css";
import { useCart } from "../../../context/CartContext";

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

  const productData = {
    id: 1,
    title: "Milk",
    price: 120,
    img: selectedImage,
  };

  const inCartQty = cartItems[productData.id] || 0;
  const isInCart = inCartQty > 0;

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isInCart) {
      setQuantity(inCartQty);
    }
  }, [inCartQty, isInCart]);

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
            <h1 className="pd-title">{productData.title} (1 lit)</h1>

            <h3 className="pd-subtitle">Product Description</h3>

            <p className="pd-desc">
              Pride of Cows milk is bottled and delivered fresh, chilled to 4°C,
              from farm to your doorstep using a fully mechanised process.
            </p>

            <p className="pd-price">MRP : ₹{productData.price}</p>
            <p className="pd-price-note">(Price inclusive of all taxes)</p>

            <p className="pd-crown">
              <img src={crownIcon} alt="crown" className="pd-crown-icon" />
              You will earn 1 crown with this product
            </p>

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
