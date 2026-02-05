import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import { useAuth } from "../../context/AuthContext";
import { useLogin } from "../../context/LoginContext/LoginContext";
import { MapPin, Home, Briefcase, Edit2 } from "lucide-react";


import "./Cart.css";
import DatePicker from "../../components/DatePicker/DatePicker";

import deliveryIcon from "./images/deliveryboy.svg";
import emptyCartImg from "./images/emptycart.svg";
import { LOGO_BASE64 } from "../../constants/logoConstant"; // Import Base64 Crown SVG 

import { createOrder, checkoutOrder } from "../../api/order";
import { getUserProfile } from "../../api/user";
import { fetchProducts } from "../../api/product"; // ⭐ Import fetchProducts


const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, increaseItem, decreaseItem, clearCart, removeFromCart } = useCart();

  const { user } = useAuth();
  const isLoggedIn = !!user;
  const { setLoginOpen } = useLogin();

  // ⭐ Dynamic Products State
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // ⭐ Fetch Products on Mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts(true); // active only
        if (res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error("Failed to load products for cart:", err);
      } finally {
        setLoadingProducts(false);
      }
    };
    loadProducts();
  }, []);

  // ⭐ Auto-Clean Orphan Items (Active Cleaning)
  useEffect(() => {
    if (!loadingProducts && products.length > 0) {
      const validIds = new Set(products.map(p => p._id));
      Object.keys(cartItems).forEach(cartId => {
        // If item in cart matches NO active product, remove it
        if (!validIds.has(cartId)) {
          console.log("Removing orphan cart item:", cartId);
          removeFromCart(cartId);
        }
      });
    }
  }, [loadingProducts, products, cartItems, removeFromCart]);

  // ⭐ Filter cart items based on fetched products
  const cartList = products.filter((p) => cartItems[p._id]);

  const itemTotal = cartList.reduce((sum, p) => {
    return sum + (p.price || 0) * (cartItems[p._id] || 0);
  }, 0);

  const itemCount = cartList.reduce((sum, p) => sum + (cartItems[p._id] || 0), 0);

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
      // 1. Create Razorpay Order
      const { data: { order, key } } = await checkoutOrder(itemTotal);

      // 2. Open Razorpay Options
      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Pride of Cows",
        description: "Premium Dairy Products",
        image: LOGO_BASE64, // Crown SVG
        order_id: order.id,
        handler: async function (response) {
          console.log("RAZORPAY SUCCESS. Image used:", LOGO_BASE64 ? "Yes(Length=" + LOGO_BASE64.length + ")" : "No");
          try {
            console.log("PAYMENT SUCCESS, Logo used was length:", LOGO_BASE64?.length);
            // 3. Payment Success -> Create Order in DB
            const token = localStorage.getItem("poc_token");

            const orderData = {
              items: cartList.map((p) => ({
                productId: p._id,
                name: p.productName,
                quantity: cartItems[p._id],
                price: p.price
              })),
              address: `${address.name}, ${address.fullAddress}, ${address.city} - ${address.pincode}`,
              deliveryDate: selectedDate,
              totalAmount: itemTotal,
              // Payment Data
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            };

            const dbOrderRes = await createOrder(orderData, token);

            if (dbOrderRes.data && dbOrderRes.data.success) {
              setOrderSuccess(true);
              clearCart();

              setTimeout(() => {
                setOrderSuccess(false);
                navigate("/myaccount/orders");
              }, 2000);
            } else {
              alert("Payment successful but order creation failed.");
            }

          } catch (err) {
            console.error("Order Creation Failed:", err);
            alert("Order failed after payment.");
          }
        },
        prefill: {
          name: address.name,
          email: user?.email || "",
          contact: user?.mobile || ""
        },
        theme: {
          color: "#695fc2ff" // Gold matching Crown
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert("Payment Failed: " + response.error.description);
      });
      rzp1.open();

    } catch (err) {
      console.error("CHECKOUT ERROR:", err);
      alert("Failed to initiate payment. Check console.");
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

  if (!loadingProducts && cartList.length === 0 && !orderSuccess) {
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




  const getAddressIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "home": return <Home size={18} />;
      case "work": return <Briefcase size={18} />;
      case "office": return <Briefcase size={18} />;
      default: return <MapPin size={18} />;
    }
  };

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

            {!address && (
              <button className="add-address-btn" onClick={handleAddAddressClick}>
                Add Address
              </button>
            )}
          </div>

          {address && (
            <div className="cart-address-card">
              {/* LEFT: ICON */}
              <div className="cart-address-icon-box">
                {getAddressIcon(address.label)}
              </div>

              {/* MIDDLE: INFO */}
              <div className="cart-address-info-content">
                <div className="cart-address-row-header">
                  <span className="cart-address-holder-name">{address.name}</span>
                  <span className="cart-address-tag-label">{address.label || "Home"}</span>
                </div>
                <p className="cart-address-detailed-text">
                  {address.fullAddress}
                  {address.city ? `, ${address.city}` : ""}
                  {address.pincode ? ` - ${address.pincode}` : ""}
                </p>
              </div>

              {/* RIGHT: ACTION */}
              <button
                className="cart-icon-action-btn edit"
                onClick={() => setIsAddressModalOpen(true)}
                title="Edit Address"
              >
                <Edit2 size={16} />
              </button>
            </div>
          )}

          {/* PRODUCTS */}
          <h3 className="section-title">Products</h3>

          {loadingProducts ? (
            <p>Loading Cart Items...</p>
          ) : (
            cartList.map((p) => {
              const qty = cartItems[p._id];
              // Image Handling
              const isLocalImage = !p.image.startsWith("/uploads");
              const imgSrc = isLocalImage ? p.image : `http://localhost:5000${p.image}`;

              return (
                <div key={p._id} className="checkout-product-row">

                  <div className="cp-img-box">
                    <img
                      src={imgSrc}
                      alt={p.productName}
                      className="cp-img"
                      onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                    />
                  </div>

                  <div className="cp-info">
                    <p className="cp-title">{p.productName}</p>
                    <p className="cp-size">{p.weight}</p>
                    <p className="cp-price">₹{p.price}</p>

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
                      <button className="cp-qty-btn" onClick={() => decreaseItem(p._id)}>–</button>
                      <span className="cp-qty-value">{qty}</span>
                      <button className="cp-qty-btn" onClick={() => increaseItem(p._id)}>+</button>
                    </div>

                    <button className="cp-change-btn" onClick={() => setIsDateModalOpen(true)}>
                      Change Date
                    </button>
                  </div>

                </div>
              );
            })
          )}
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