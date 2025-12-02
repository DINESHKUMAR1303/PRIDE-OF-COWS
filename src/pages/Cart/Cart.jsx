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

// ⭐ DELIVERY ICON (ADD YOUR NEW ICON HERE)
import deliveryIcon from "./images/deliveryboy.svg";

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
  const cartList = Object.keys(cartItems).filter(
    (id) => cartProducts.find((p) => p.id === Number(id))
  );

  // GLOBAL AMOUNTS
  const itemTotal = cartList.reduce((sum, id) => {
    const item = cartProducts.find((p) => p.id === Number(id));
    return sum + item.price * cartItems[id];
  }, 0);

  const itemCount = cartList.reduce((sum, id) => sum + cartItems[id], 0);

  // AUTO DELIVERY DATE (Tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [selectedDate, setSelectedDate] = useState(tomorrow);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  // ADDRESS MODAL
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
    if (!addressForm.name || !addressForm.line1 || !addressForm.city || !addressForm.pincode)
      return;

    setAddress({ ...addressForm });
    setIsAddressModalOpen(false);
  };

  const handleEditAddress = () => {
    setAddressForm({ ...address });
    setIsAddressModalOpen(true);
  };

  const deliveryDateLabel = selectedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  // EMPTY CART
  if (cartList.length === 0) {
    return (
      <div className="empty-cart-container">
        <p className="empty-breadcrumb">
          <Link to="/" className="crumb-link">Home</Link> / 
          <Link to="/shop/all" className="crumb-link"> Shop</Link> / 
          <strong className="crumb-active"> Checkout</strong>
        </p>

        <div className="empty-cart-content">
          <img src={emptyCartImg} alt="Empty cart" className="empty-cart-img" />

          <h2 className="empty-title">Your cart’s empty, and so is the ride.</h2>
          <p className="empty-subtitle">Let’s fill it with something farm-fresh and fabulous.</p>

          <Link to="/shop/all">
            <button className="browse-btn">Browse Products</button>
          </Link>
        </div>
      </div>
    );
  }

  // MAIN CART PAGE
  return (
    <>
      <div className="checkout-wrapper">

        {/* LEFT SECTION */}
        <div className="checkout-left">

          {/* Breadcrumb */}
          <p className="checkout-breadcrumb">
            <Link to="/" className="crumb-link">Home</Link> / 
            <Link to="/shop/all" className="crumb-link"> Shop</Link> / 
            <strong className="crumb-active"> Checkout</strong>
          </p>

          {/* Address Section */}
          <div className="address-section">
            <h2>Delivery Address:</h2>

            {!address ? (
              <button className="add-address-btn" onClick={() => setIsAddressModalOpen(true)}>
                Add Address
              </button>
            ) : (
              <button className="add-address-btn" onClick={handleEditAddress}>
                Edit Address
              </button>
            )}
          </div>

          {/* Address Card */}
          {address && (
            <div className="address-card">
              <div className="address-card-header">
                <span className="address-label">{address.label}</span>
              </div>
              <p className="address-name">{address.name}</p>
              <p className="address-line">
                {address.line1} {address.line2 && `, ${address.line2}`}
              </p>
              <p className="address-line">
                {address.city} - {address.pincode}
              </p>
            </div>
          )}

          {/* Product List Title */}
          <h3 className="section-title">Products</h3>

          {/* PRODUCT ROWS */}
          {cartList.map((id) => {
            const item = cartProducts.find((p) => p.id === Number(id));
            const qty = cartItems[id];

            return (
              <div key={id} className="checkout-product-row">

                {/* Product Image */}
                <div className="cp-img-box">
                  <img src={item.img} alt={item.title} className="cp-img" />
                </div>

                {/* Middle Info Section */}
                <div className="cp-info">
                  <p className="cp-title">{item.title}</p>
                  <p className="cp-size">{item.weight}</p>
                  <p className="cp-price">₹{item.price}</p>

                  {/* Delivery Box EXACT LIKE DESIGN */}
                  <div className="cp-delivery-box">
                    <img src={deliveryIcon} alt="delivery" className="cp-delivery-icon" />
                    <div>
                      <p className="cp-delivery-text">Expected Delivery Date:</p>
                      <p className="cp-delivery-date">{deliveryDateLabel}</p>
                    </div>
                  </div>
                </div>

                {/* RIGHT QTY + CHANGE DATE */}
                <div className="cp-qty-section">
                  <div className="cp-qty-box">
                    <button className="cp-qty-btn" onClick={() => decreaseItem(item.id)}>–</button>
                    <span className="cp-qty-value">{qty}</span>
                    <button className="cp-qty-btn" onClick={() => increaseItem(item.id)}>+</button>
                  </div>

                  <button className="cp-change-btn" onClick={() => setIsDateModalOpen(true)}>
                    Change Date
                  </button>
                </div>

              </div>
            );
          })}

        </div>

        {/* RIGHT SECTION */}
        <div className="checkout-right">

          {/* Offers */}
          <div className="offer-box">
            <p className="offer-title">Available Offers</p>
            <p className="offer-apply">+ Apply Coupon</p>
          </div>

          {/* Summary */}
          <div className="order-summary">
            <h3>
              Order Details 
              <span className="order-items-count">
                ({itemCount} item{itemCount > 1 ? "s" : ""})
              </span>
            </h3>

            <div className="order-row"><span>Item Total</span><span>₹{itemTotal}</span></div>
            <div className="order-row"><span>Tax Included</span><span>₹0</span></div>
            <div className="order-row"><span>Handling Fee</span><span>₹0</span></div>

            <div className="order-row total">
              <span>Total Amount</span>
              <span>₹{itemTotal}</span>
            </div>
          </div>

          {/* Payment */}
          <div className="pay-box">
            <div className="amount-to-pay">
              <p>Amount to be paid</p>
              <h2>₹{itemTotal}</h2>
            </div>

            <button className="pay-btn">Proceed To Pay</button>
          </div>

        </div>
      </div>

      {/* ADDRESS MODAL */}
      {isAddressModalOpen && (
        <div className="modal-overlay-cart">
          <div className="address-modal">
            <div className="modal-header">
              <h3>{address ? "Edit Address" : "Add Address"}</h3>
              <button className="modal-close-btn" onClick={() => setIsAddressModalOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="address-form">
              <input
                type="text"
                placeholder="Full Name"
                value={addressForm.name}
                onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="House / Flat / Building"
                value={addressForm.line1}
                onChange={(e) => setAddressForm({ ...addressForm, line1: e.target.value })}
              />
              <input
                type="text"
                placeholder="Street / Area (optional)"
                value={addressForm.line2}
                onChange={(e) => setAddressForm({ ...addressForm, line2: e.target.value })}
              />
              <input
                type="text"
                placeholder="City"
                value={addressForm.city}
                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="Pincode"
                value={addressForm.pincode}
                onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
              />
              <select
                value={addressForm.label}
                onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Other">Other</option>
              </select>

              <button type="submit" className="save-address-btn">Save Address</button>
            </form>
          </div>
        </div>
      )}

      {/* DATE PICKER MODAL */}
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
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(
    "en-IN",
    { month: "long" }
  );

  const goPrevMonth = () => {
    const newDate = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(newDate.getFullYear());
    setViewMonth(newDate.getMonth());
  };

  const goNextMonth = () => {
    const newDate = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(newDate.getFullYear());
    setViewMonth(newDate.getMonth());
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);

  const clear = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const todayClear = clear(today);

  const isSameDate = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return (
    <div className="date-modal-overlay">
      <div className="date-modal">

        <div className="date-modal-header">
          <button className="nav-circle" onClick={goPrevMonth}>‹</button>

          <div className="month-year">
            <span className="month-name">{monthLabel}</span>
            <span className="year-name">{viewYear}</span>
          </div>

          <button className="nav-circle" onClick={goNextMonth}>›</button>
        </div>

        <div className="calendar-weekdays">
          <span>Sun</span><span>Mon</span><span>Tue</span>
          <span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>

        <div className="calendar-grid">
          {cells.map((day, idx) => {
            if (!day) return <div key={idx} className="day-cell empty" />;

            const thisDate = new Date(viewYear, viewMonth, day);
            const isPast = clear(thisDate) < todayClear;
            const isSelected = isSameDate(thisDate, selectedDate);
            const isToday = isSameDate(thisDate, todayClear);

            return (
              <button
                key={idx}
                className={`day-cell ${isPast ? "disabled" : ""} ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
                onClick={() => !isPast && onSelectDate(thisDate)}
                disabled={isPast}
              >
                <span className="day-number">{day}</span>
                {isToday && <span className="day-tag">Today</span>}
              </button>
            );
          })}
        </div>

        <div className="date-modal-footer">
          <button className="close-date-btn" onClick={onClose}>Close</button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
