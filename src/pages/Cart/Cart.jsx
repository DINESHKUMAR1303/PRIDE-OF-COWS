import React, { useState } from "react";
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

  // ===== GLOBAL AMOUNTS =====
  const itemTotal = cartList.reduce((sum, id) => {
    const item = cartProducts.find((p) => p.id === Number(id));
    if (!item) return sum;
    return sum + item.price * cartItems[id];
  }, 0);
  const itemCount = cartList.reduce((sum, id) => sum + cartItems[id], 0);

  // ===== AUTO DELIVERY DATE (Tomorrow by default) =====
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [selectedDate, setSelectedDate] = useState(tomorrow);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  // ===== ADDRESS STATE / MODAL =====
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [address, setAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    pincode: "",
    label: "Home",
  });

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addressForm.name || !addressForm.line1 || !addressForm.city || !addressForm.pincode) {
      return; // you can show validation later if you want
    }
    setAddress({ ...addressForm });
    setIsAddressModalOpen(false);
  };

  const handleEditAddress = () => {
    // open modal with existing data
    if (address) setAddressForm({ ...address });
    setIsAddressModalOpen(true);
  };

  // Format date like "28 Nov"
  const deliveryDateLabel = selectedDate.toLocaleDateString("en-IN", {
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
          <Link to="/" className="crumb-link">
            Home
          </Link>{" "}
          /
          <Link to="/shop/all" className="crumb-link">
            {" "}
            Shop
          </Link>{" "}
          /
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
    <>
      <div className="checkout-wrapper">
        {/* LEFT SIDE */}
        <div className="checkout-left">
          {/* Breadcrumb */}
          <p className="checkout-breadcrumb">
            <Link to="/" className="crumb-link">
              Home
            </Link>{" "}
            /
            <Link to="/shop/all" className="crumb-link">
              {" "}
              Shop
            </Link>{" "}
            /
            <strong className="crumb-active"> Checkout</strong>
          </p>

          {/* Address */}
          <div className="address-section">
            <h2>Delivery Address</h2>

            {!address ? (
              <button
                className="add-address-btn"
                onClick={() => {
                  setAddressForm({
                    name: "",
                    line1: "",
                    line2: "",
                    city: "",
                    pincode: "",
                    label: "Home",
                  });
                  setIsAddressModalOpen(true);
                }}
              >
                + Add Address
              </button>
            ) : (
              <button className="add-address-btn" onClick={handleEditAddress}>
                Edit Address
              </button>
            )}
          </div>

          {address && (
            <div className="address-card">
              <div className="address-card-header">
                <span className="address-label">{address.label}</span>
              </div>
              <p className="address-name">{address.name}</p>
              <p className="address-line">
                {address.line1}
                {address.line2 && `, ${address.line2}`}
              </p>
              <p className="address-line">
                {address.city} - {address.pincode}
              </p>
            </div>
          )}

          {/* Products List */}
          <h3 className="section-title">Products</h3>

          {cartList.map((id) => {
            const item = cartProducts.find((p) => p.id === Number(id));
            const qty = cartItems[id];
            if (!item) return null;

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
                      <p className="d-date">{deliveryDateLabel}</p>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="qty-box-right">
                  <div className="qty-inline">
                    <button
                      className="qty-btn"
                      onClick={() => decreaseItem(item.id)}
                    >
                      –
                    </button>
                    <span className="qty-value">{qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => increaseItem(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="change-date-btn"
                    type="button"
                    onClick={() => setIsDateModalOpen(true)}
                  >
                    Change Date
                  </button>
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
            <h3>
              Order Details{" "}
              <span className="order-items-count">({itemCount} item{itemCount > 1 ? "s" : ""})</span>
            </h3>

            <div className="order-row">
              <span>Item Total</span>
              <span>₹{itemTotal}</span>
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
              <span>₹{itemTotal}</span>
            </div>
          </div>

          {/* Payment Box */}
          <div className="pay-box">
            <div className="amount-to-pay">
              <p>Amount to be paid</p>
              <h2>₹{itemTotal}</h2>
            </div>

            <button className="pay-btn">Proceed to Pay</button>
          </div>
        </div>
      </div>

      {/* ===== ADDRESS MODAL ===== */}
      {isAddressModalOpen && (
        <div className="modal-overlay-cart">
          <div className="address-modal">
            <div className="modal-header">
              <h3>{address ? "Edit Address" : "Add Address"}</h3>
              <button
                className="modal-close-btn"
                onClick={() => setIsAddressModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="address-form">
              <input
                type="text"
                placeholder="Full Name"
                value={addressForm.name}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="House / Flat / Building"
                value={addressForm.line1}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, line1: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Street / Area (optional)"
                value={addressForm.line2}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, line2: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="City"
                value={addressForm.city}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, city: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Pincode"
                value={addressForm.pincode}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, pincode: e.target.value })
                }
              />
              <select
                value={addressForm.label}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, label: e.target.value })
                }
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Other">Other</option>
              </select>

              <button type="submit" className="save-address-btn">
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===== DATE PICKER MODAL ===== */}
      {isDateModalOpen && (
        <DatePickerModal
          selectedDate={selectedDate}
          onClose={() => setIsDateModalOpen(false)}
          onSelectDate={(date) => {
            setSelectedDate(date);
            setIsDateModalOpen(false);
          }}
        />
      )}
    </>
  );
};

/* =========================
   DATE PICKER MODAL COMPONENT
   ========================= */

const DatePickerModal = ({ selectedDate, onClose, onSelectDate }) => {
  const today = new Date();

  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth()); // 0-11

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(
    "en-IN",
    { month: "long" }
  );

  const goPrevMonth = () => {
    const d = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const goNextMonth = () => {
    const d = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  const handleSelectDay = (day) => {
    if (!day) return;
    const date = new Date(viewYear, viewMonth, day);

    // disable past dates
    const clearTime = (dt) =>
      new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    if (clearTime(date) < clearTime(today)) return;

    onSelectDate(date);
  };

  const isSameDate = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const clearToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div className="date-modal-overlay">
      <div className="date-modal">
        <div className="date-modal-header">
          <button className="nav-circle" onClick={goPrevMonth}>
            ‹
          </button>

          <div className="month-year">
            <span className="month-name">{monthLabel}</span>
            <span className="year-name">{viewYear}</span>
          </div>

          <button className="nav-circle" onClick={goNextMonth}>
            ›
          </button>
        </div>

        {/* Weekday row */}
        <div className="calendar-weekdays">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Dates grid */}
        <div className="calendar-grid">
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={idx} className="day-cell empty" />;
            }

            const thisDate = new Date(viewYear, viewMonth, day);
            const isPast = thisDate < clearToday;
            const isSelected = isSameDate(thisDate, selectedDate);
            const isToday = isSameDate(thisDate, clearToday);

            let className = "day-cell";
            if (isPast) className += " disabled";
            if (isSelected) className += " selected";
            if (isToday) className += " today";

            return (
              <button
                key={idx}
                className={className}
                type="button"
                onClick={() => handleSelectDay(day)}
                disabled={isPast}
              >
                <span className="day-number">{day}</span>
                {isToday && <span className="day-tag">Today</span>}
              </button>
            );
          })}
        </div>

        <div className="date-modal-footer">
          <button className="close-date-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
