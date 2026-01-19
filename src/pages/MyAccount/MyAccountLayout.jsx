import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { getUserProfile } from "../../api/user";
import { Home, ShoppingBag, Package, MapPin, User } from "lucide-react";

import "./MyAccount.css";

/* Icons */
import profileIcon from "./images/profile.svg";
import orderIcon from "./images/myorder.svg";
import addressIcon from "./images/myadress.svg";
import walletIcon from "./images/wallet.svg";
import loyaltyIcon from "./images/crown.svg";
import referIcon from "./images/bullhorn.svg";
import dealsIcon from "./images/tag.svg";
import paymentIcon from "./images/paymenthistory.svg";
import giftIcon from "./images/giftcard.svg";
import logoutIcon from "./images/logout.svg";

/* NEW bottom nav icons */
import homeIcon from "./images/home.svg";
import shopIcon from "./images/shop.png";
import ordersIcon from "./images/myorder.svg";
import addressNavIcon from "./images/pin.png";
import profileNavIcon from "./images/profile.svg";

const MyAccountLayout = () => {
  const { user, setUser } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [loading, setLoading] = useState(true);

  // ⭐ Scroll to top on route change (Aggressive Reset)
  useEffect(() => {
    const scrollReset = () => {
      const contentArea = document.querySelector(".account-content");
      if (contentArea) {
        contentArea.scrollTo(0, 0);
        contentArea.scrollTop = 0;
      }
      window.scrollTo(0, 0);
    };

    scrollReset();
    // Second pass with a tiny delay to ensure render is complete
    const timer = setTimeout(scrollReset, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  /* ⭐ NEW: Mobile sidebar toggle states */
  const [openMenu, setOpenMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  /* ============================================================
     ⭐ Load profile ONCE
  ============================================================ */
  useEffect(() => {
    const token = localStorage.getItem("poc_token");
    if (!token) {
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (err) {
        console.error("❌ Failed to load profile:", err);
        localStorage.removeItem("poc_user");
        localStorage.removeItem("poc_token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: 80 }}>
        Loading your account...
      </h2>
    );
  }

  if (!user) {
    return (
      <h2 style={{ textAlign: "center", marginTop: 80 }}>
        Please login first.
      </h2>
    );
  }

  const handleLogout = () => {
    clearCart();
    localStorage.removeItem("poc_user");
    localStorage.removeItem("poc_token");
    localStorage.removeItem("poc_cart"); // ⭐ Clear Cart
    setUser(null);
    navigate("/login", { replace: true });
    window.location.reload(); // Ensure clean state
  };

  const isMobile = windowWidth < 768;

  return (
    <div className="account-wrapper">



      {/* ---------------- LEFT SIDEBAR ---------------- */}
      <aside className={`account-sidebar ${openMenu ? "open" : ""}`}>

        {/* ---- USER INFO CARD ---- */}
        <div className="user-card">
          <div className="user-avatar-container">
            <img src={profileIcon} className="user-avatar" alt="User Avatar" />
          </div>

          <div className="user-info">
            <h3>{user.firstName} {user.lastName}</h3>
            <p className="phone-number">{user.telephone || "—"}</p>
          </div>

          <NavLink
            to="/my-account/profile"
            className={({ isActive }) =>
              isActive ? "view-profile active" : "view-profile"
            }
          >
            View Profile
          </NavLink>
        </div>

        {/* ---- QUICK ACTION BUTTONS ---- */}
        <div className="action-buttons">
          <button><img src={walletIcon} alt="Wallet" /> My Wallet</button>
          <button><img src={loyaltyIcon} alt="Loyalty" /> Loyalty</button>
          <button><img src={referIcon} alt="Refer" /> Refer & Earn</button>
          <button><img src={dealsIcon} alt="Deals" /> Deals & Offer</button>
        </div>

        {/* ---- INFORMATION MENU ---- */}
        <div className="sidebar-section">
          <p className="section-title">Information</p>

          <ul>
            <li>
              <NavLink
                to="/my-account/profile"
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                <img src={profileIcon} alt="Account" /> My Account
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/my-account/orders"
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                <img src={orderIcon} alt="Orders" /> My Orders
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/my-account/addresses"
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                <img src={addressIcon} alt="Addresses" /> My Addresses
              </NavLink>
            </li>
          </ul>
        </div>

        {/* ---- PAYMENT MENU ---- */}
        <div className="sidebar-section">
          <p className="section-title">Payment and Credits</p>

          <ul>
            <li><img src={paymentIcon} alt="Payment History" /> Payment History</li>
            <li><img src={giftIcon} alt="Gift Card" /> Gift Card</li>
          </ul>
        </div>

        {/* ---- LOGOUT ---- */}
        <div className="sidebar-section">
          <p className="section-title">Other</p>

          <ul>
            <li className="logout-item" onClick={handleLogout}>
              <img src={logoutIcon} alt="Logout" /> Log Out
            </li>
          </ul>
        </div>

      </aside>


      {/* ---------------- RIGHT CONTENT ---------------- */}
      <main className="account-content">
        <Outlet />
      </main>


      {/* ⭐⭐⭐ NEW BOTTOM MOBILE NAVBAR ⭐⭐⭐ */}
      {isMobile && (
        <div className="mobile-bottom-nav">

          <NavLink to="/" className="mobile-nav-item">
            <Home size={22} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/shop/all" className="mobile-nav-item">
            <ShoppingBag size={22} />
            <span>Shop</span>
          </NavLink>

          <NavLink to="/my-account/orders" className="mobile-nav-item">
            <Package size={22} />
            <span>Orders</span>
          </NavLink>

          <NavLink to="/my-account/addresses" className="mobile-nav-item">
            <MapPin size={22} />
            <span>Addresses</span>
          </NavLink>

          <NavLink to="/my-account/profile" className="mobile-nav-item">
            <User size={22} />
            <span>Profile</span>
          </NavLink>

        </div>
      )}

    </div>
  );
};

export default MyAccountLayout;