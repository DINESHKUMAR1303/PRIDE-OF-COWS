import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import "./Cart.css";

// === PRODUCT IMAGES ===
import prod1 from "../../components/ProductCarousel/images/onelitermilk.png";
import prod2 from "../../components/ProductCarousel/images/purecurd.png";
import prod3 from "../../components/ProductCarousel/images/ghee.png";
import prod4 from "../../components/ProductCarousel/images/panner.png";
import prod5 from "../../components/ProductCarousel/images/proteinbar.png";
import prod6 from "../../components/ProductCarousel/images/proteinbarpack.png";

// === EMPTY CART IMAGE ===
import emptyCartImg from "./images/emptycart.svg";

// === CART PRODUCT LIST ===
const cartProducts = [
  { id: 1, title: "Milk", weight: "1L", price: 120, img: prod1 },
  { id: 2, title: "Curd", weight: "320g", price: 95, img: prod2 },
  { id: 3, title: "Ghee", weight: "200ml", price: 495, img: prod3 },
  { id: 4, title: "Paneer", weight: "200g", price: 195, img: prod4 },
  { id: 5, title: "Protein Wafer Bar", weight: "40g", price: 60, img: prod5 },
  { id: 6, title: "Protein Box Pack", weight: "320g", price: 475, img: prod6 },
];

const Cart = () => {
  const { cartItems, increaseItem, decreaseItem } = useCart();
  const cartList = Object.keys(cartItems);

  // ===== AUTO DELIVERY DATE (Tomorrow) =====
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const deliveryDate = tomorrow.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  // ============================
  // 🛒 EMPTY CART UI
  // ============================
  if (cartList.length === 0) {
    return (
      <div className="empty-cart-container">

        {/* Breadcrumb */}
        <p className="empty-breadcrumb">
          <Link to="/" className="crumb-link">Home</Link> /
          <Link to="/shop/all" className="crumb-link"> Shop</Link> /
          <strong className="crumb-active"> Checkout</strong>
        </p>

        <div className="empty-cart-content">
          <img src={emptyCartImg} alt="Empty cart" className="empty-cart-img" />

          <h2 className="empty-title">Your cart’s empty, and so is the ride.</h2>

          <p className="empty-subtitle">
            Let’s fill it with something farm-fresh and fabulous.
          </p>

          <Link to="/shop/all">
            <button className="browse-btn">Browse Products</button>
          </Link>
        </div>

      </div>
    );
  }

  // ============================
  // 🛒 CHECKOUT PAGE UI
  // ============================
  return (
    <div className="checkout-wrapper">

      {/* LEFT SIDE */}
      <div className="checkout-left">

        {/* Breadcrumb */}
        <p className="checkout-breadcrumb">
          <Link to="/" className="crumb-link">Home</Link> /
          <Link to="/shop/all" className="crumb-link"> Shop</Link> /
          <strong className="crumb-active"> Checkout</strong>
        </p>

        {/* Address */}
        <div className="address-section">
          <h2>Delivery Address</h2>
          <button className="add-address-btn">+ Add Address</button>
        </div>

        {/* Products List */}
        <h3 className="section-title">Products</h3>

        {cartList.map((id) => {
          const item = cartProducts.find((p) => p.id === Number(id));
          const qty = cartItems[id];

          return (
            <div key={id} className="checkout-product-box">

              <img src={item.img} alt={item.title} className="checkout-product-img" />

              <div className="checkout-product-info">
                <p className="p-title">{item.title}</p>
                <p className="p-qty">{item.weight}</p>
                <p className="p-price">₹{item.price}</p>

                {/* Delivery Date */}
                <div className="delivery-box">
                  <span className="delivery-icon">🛵</span>
                  <div>
                    <p className="d-text">Expected Delivery Date:</p>
                    <p className="d-date">{deliveryDate}</p>
                  </div>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="qty-box-right">
                <button className="qty-btn" onClick={() => decreaseItem(item.id)}>–</button>
                <span className="qty-value">{qty}</span>
                <button className="qty-btn" onClick={() => increaseItem(item.id)}>+</button>
                <button className="change-date-btn">Change Date</button>
              </div>

            </div>
          );
        })}

      </div>

      {/* RIGHT SIDE */}
      <div className="checkout-right">

        {/* Offer Box */}
        <div className="offer-box">
          <p className="offer-title">Available Offers</p>
          <p className="offer-apply">+ Apply Coupon</p>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Details</h3>

          <div className="order-row">
            <span>Item Total</span>
            <span>
              ₹
              {cartList.reduce((sum, id) => {
                const item = cartProducts.find((p) => p.id === Number(id));
                return sum + item.price * cartItems[id];
              }, 0)}
            </span>
          </div>

          <div className="order-row">
            <span>Tax Included</span>
            <span>₹0</span>
          </div>

          <div className="order-row">
            <span>Handling Fee</span>
            <span>₹0</span>
          </div>

          <div className="order-row total">
            <span>Total Amount</span>
            <span>
              ₹
              {cartList.reduce((sum, id) => {
                const item = cartProducts.find((p) => p.id === Number(id));
                return sum + item.price * cartItems[id];
              }, 0)}
            </span>
          </div>
        </div>

        {/* Payment Box */}
        <div className="pay-box">
          <div className="amount-to-pay">
            <p>Amount to be paid</p>
            <h2>
              ₹
              {cartList.reduce((sum, id) => {
                const item = cartProducts.find((p) => p.id === Number(id));
                return sum + item.price * cartItems[id];
              }, 0)}
            </h2>
          </div>

          <button className="pay-btn">Proceed to Pay</button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
