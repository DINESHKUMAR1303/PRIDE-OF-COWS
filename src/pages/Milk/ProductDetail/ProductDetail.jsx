import React, { useState } from "react";
import "./ProductDetail.css";

// === PRODUCT IMAGES ===
import img1 from "./images/image1.png";
import img2 from "./images/image2.jpg";
import img3 from "./images/image3.png";

// === ICONS ===
import deliveryIcon from "./images/delivery_vehicle.png";
import calendarIcon from "./images/calender.png";
import crownIcon from "./images/crow.svg";

const ProductDetail = () => {
  const images = [img1, img2, img3];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="pd-wrapper">
      <div className="pd-container">

        {/* LEFT SIDE */}
        <div className="pd-left">

          {/* Thumbnails */}
          <div className="pd-thumbnails">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImage(img)}
                className={`pd-thumbnail ${selectedImage === img ? "active-thumb" : ""}`}
              />
            ))}
          </div>

          {/* MAIN IMAGE BOX WITH BORDER */}
          <div className="pd-main-image-box">
            <img src={selectedImage} alt="Main" className="pd-main-img" />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="pd-right">
          <h1 className="pd-title">Milk (1 lit)</h1>

          <h3 className="pd-subtitle">Product Description</h3>
          <p className="pd-desc">
            Pride of Cows is the best cow milk in every way - bottled and delivered
            fresh, chilled to 4 °C, to your doorstep through a process that is
            completely mechanised from start to finish. This ensures that you reap
            all the benefits of milk.
          </p>

          {/* <p className="pd-read-more">Read More</p> */}

          <p className="pd-price">MRP : ₹120</p>
          <p className="pd-price-note">(Price inclusive of all taxes)</p>

          {/* Crown Points */}
          <p className="pd-crown">
            <img src={crownIcon} alt="crown" className="pd-crown-icon" />
            You will earn 1 crown with this product
          </p>

          {/* Quantity */}
          <div className="pd-qty-box">
            <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          {/* Action Buttons */}
          <div className="pd-buttons">
            <button className="pd-buy-now">Buy Now</button>
            <button className="pd-subscribe">Subscribe</button>
          </div>

          {/* Delivery Box */}
          <div className="pd-delivery-box">
            <div className="pd-delivery-left">
              <p className="pd-delivery-title">
                <img src={deliveryIcon} alt="delivery" className="pd-icon" />
                Get Delivered in 1 Day!
              </p>

              <p className="pd-delivery-date">
                Expected Delivery : <strong>30/11/2025</strong>
              </p>
            </div>

            <button className="pd-change-date-btn">
              <img src={calendarIcon} alt="calendar" className="pd-icon" />
              Change Delivery Date?
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductDetail;
