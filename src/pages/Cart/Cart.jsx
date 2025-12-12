import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import { useAuth } from "../../context/AuthContext";
import { useLogin } from "../../context/LoginContext/LoginContext";

import "./Cart.css";
import DatePicker from "../../components/DatePicker/DatePicker";

import prod1 from "../../components/ProductCarousel/images/onelitermilk.png";
import prod2 from "../../components/ProductCarousel/images/purecurd.png";
import prod3 from "../../components/ProductCarousel/images/ghee.png";
import prod4 from "../../components/ProductCarousel/images/panner.png";
import prod5 from "../../components/ProductCarousel/images/proteinbar.png";
import prod6 from "../../components/ProductCarousel/images/proteinbarpack.png";

import deliveryIcon from "./images/deliveryboy.svg";
import emptyCartImg from "./images/emptycart.svg";

import { createOrder } from "../../api/order";
import { getUserProfile } from "../../api/user";



const cartProducts = [
  { id: 1, title: "Milk", weight: "1L", price: 120, img: prod1 },
  { id: 2, title: "Curd", weight: "320g", price: 95, img: prod2 },
  { id: 3, title: "Ghee", weight: "200ml", price: 495, img: prod3 },
  { id: 4, title: "Paneer", weight: "200g", price: 195, img: prod4 },
  { id: 5, title: "Protein Wafer Bar", weight: "40g", price: 60, img: prod5 },
  { id: 6, title: "Protein Box Pack", weight: "320g", price: 475, img: prod6 },
];

const Cart = () => {
const { cartItems, increaseItem, decreaseItem, clearCart } = useCart();

  const { user } = useAuth();
  const isLoggedIn = !!user;
  const { setLoginOpen } = useLogin();

  const cartList = Object.keys(cartItems).filter((id) =>
    cartProducts.find((p) => p.id === Number(id))
  );

  const itemTotal = cartList.reduce((sum, id) => {
    const item = cartProducts.find((p) => p.id === Number(id));
    return sum + item.price * cartItems[id];
  }, 0);

  const itemCount = cartList.reduce((sum, id) => sum + cartItems[id], 0);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [selectedDate, setSelectedDate] = useState(tomorrow);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

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

  /* ⭐ NEW: ORDER SUCCESS POPUP */
  const [orderSuccess, setOrderSuccess] = useState(false);
  /* ⭐ AUTO-LOAD SAVED ADDRESS WHEN USER LOGS IN */
useEffect(() => {
  const loadSavedAddress = async () => {
    if (!user) return;

    try {
      const profile = await getUserProfile();
      const addr = profile.address;

      if (addr) {
        setAddress({
          name: addr.name || `${profile.firstName} ${profile.lastName}`,
          fullAddress: addr.fullAddress,
          label: addr.type || "Home",
          city: addr.city,
          pincode: addr.pincode,
        });
      }
    } catch (err) {
      console.error("Failed to load saved address:", err);
    }
  };

  loadSavedAddress();
}, [user]);



  
const handleProceedToPay = async () => {
  if (!isLoggedIn) {
    setLoginOpen(true);
    return;
  }

  if (!address) {
    alert("Please add a delivery address before placing the order.");
    return;
  }

  try {
    const token = localStorage.getItem("poc_token");

    const orderData = {
      items: cartList.map((id) => {
        const item = cartProducts.find((p) => p.id === Number(id));
        return {
          productId: item.id,
          name: item.title,
          quantity: cartItems[id],
          price: item.price
        };
      }),
      address: address.fullAddress,
      deliveryDate: selectedDate,
      totalAmount: itemTotal
    };

    console.log("Sending order:", orderData);

    // ⭐ SEND ORDER TO BACKEND
    const res = await createOrder(orderData, token);
    console.log("ORDER RESPONSE:", res);

    // Show success popup
    setOrderSuccess(true);

    // Clear cart
    clearCart();

    // Redirect
    setTimeout(() => {
      setOrderSuccess(false);
      window.location.href = "/myaccount/orders";
    }, 2000);

  } catch (err) {
    console.error("ORDER FAILED:", err);
    alert("Failed to place order. Check console.");
  }
};


  const handleAddAddressClick = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
      return;
    }
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();

    const formatted =
      `${addressForm.line1}` +
      `${addressForm.line2 ? ", " + addressForm.line2 : ""}` +
      `, ${addressForm.city}, ${addressForm.pincode}`;

    setAddress({
      ...addressForm,
      fullAddress: formatted,
    });

    setIsAddressModalOpen(false);
  };

  const deliveryDateLabel = selectedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

 if (cartList.length === 0 && !orderSuccess) {

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

  return (
    <>
      <div className="checkout-wrapper">

        {/* LEFT SECTION */}
        <div className="checkout-left">
          <p className="checkout-breadcrumb">
            <Link to="/" className="crumb-link">Home</Link> /
            <Link to="/shop/all" className="crumb-link"> Shop</Link> /
            <strong className="crumb-active"> Checkout</strong>
          </p>

          <div className="address-section">
            <h2>Delivery Address:</h2>

            {!address ? (
              <button className="add-address-btn" onClick={handleAddAddressClick}>
                Add Address
              </button>
            ) : (
              <button className="add-address-btn" onClick={() => setIsAddressModalOpen(true)}>
                Edit Address
              </button>
            )}
          </div>

          {address && (
            <div className="address-card">
              <div className="address-card-header">
                <p className="address-name">{address.name}</p>
                <span className="address-label">{address.label}</span>
              </div>

              <p className="address-line">{address.fullAddress}</p>
            </div>
          )}

          {/* PRODUCTS */}
          <h3 className="section-title">Products</h3>

          {cartList.map((id) => {
            const item = cartProducts.find((p) => p.id === Number(id));
            const qty = cartItems[id];

            return (
              <div key={id} className="checkout-product-row">

                <div className="cp-img-box">
                  <img src={item.img} alt={item.title} className="cp-img" />
                </div>

                <div className="cp-info">
                  <p className="cp-title">{item.title}</p>
                  <p className="cp-size">{item.weight}</p>
                  <p className="cp-price">₹{item.price}</p>

                  <div className="cp-delivery-box">
                    <img src={deliveryIcon} className="cp-delivery-icon" />
                    <div>
                      <p className="cp-delivery-text">Expected Delivery Date:</p>
                      <p className="cp-delivery-date">{deliveryDateLabel}</p>
                    </div>
                  </div>
                </div>

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

        {/* RIGHT SIDE */}
        <div className="checkout-right">

          <div className="offer-box">
            <p className="offer-title">Available Offers</p>
            <p className="offer-apply">+ Apply Coupon</p>
          </div>

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

          <div className="pay-box">
            <div className="amount-to-pay">
              <p>Amount to be paid</p>
              <h2>₹{itemTotal}</h2>
            </div>

            {/* ⭐ UPDATED BUTTON LOGIC */}
            <button className="pay-btn" onClick={handleProceedToPay}>
              Proceed To Pay
            </button>
          </div>

        </div>
      </div>

      {/* ============================
          ORDER SUCCESS POPUP ⭐ NEW
      ============================ */}
      {orderSuccess && (
        <div className="order-success-overlay">
          <div className="order-success-box">
            <div className="success-circle">
              ✓
            </div>
            <p className="success-text">Order Placed Successfully</p>
          </div>
        </div>
      )}

      {/* ADDRESS MODAL */}
      {isAddressModalOpen && (
        <div className="modal-overlay-cart">
          <div className="address-modal premium-address-modal">

            <div className="modal-header">
              <h3>{address ? "Edit Address" : "Add Address"}</h3>
              <button className="modal-close-btn" onClick={() => setIsAddressModalOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="address-form premium-form">

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={addressForm.name}
                  onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Street / Area </label>
                <input
                  type="text"
                  value={addressForm.line1}
                  onChange={(e) => setAddressForm({ ...addressForm, line1: e.target.value })}
                  required
                />
              </div>

              {/* <div className="form-group">
                <label>Street / Area (optional)</label>
                <input
                  type="text"
                  value={addressForm.line2}
                  onChange={(e) => setAddressForm({ ...addressForm, line2: e.target.value })}
                />
              </div> */}

              <div className="form-row-2">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address Type</label>
                <select
                  value={addressForm.label}
                  onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button type="submit" className="save-address-btn premium-save-btn">
                Save Address
              </button>

            </form>
          </div>
        </div>
      )}

      {isDateModalOpen && (
        <DatePicker
          onClose={() => setIsDateModalOpen(false)}
          onSelect={(formattedString) => {
            const dateObj = new Date(formattedString);
            setSelectedDate(dateObj);
            setIsDateModalOpen(false);
          }}
        />
      )}

    </>
  );
};

export default Cart;