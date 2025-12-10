import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile } from "../../api/user";

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

const MyAccountLayout = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // For loading state (prevents showing "Please login first" early)
  const [loading, setLoading] = useState(true);

  /* ============================================================
     ⭐ Load profile ONCE (only if localStorage has token)
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
        setUser(profile); // store fresh backend profile
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
    // eslint-disable-next-line
  }, []); // ✔ Runs only once — never again, fixes double API calls

  /* ============================================================
     ⭐ While profile is loading
  ============================================================ */
  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: 80 }}>
        Loading your account...
      </h2>
    );
  }

  /* ============================================================
     ⭐ Redirect if NOT logged in
  ============================================================ */
  if (!user) {
    return (
      <h2 style={{ textAlign: "center", marginTop: 80 }}>
        Please login first.
      </h2>
    );
  }

  /* ============================================================
     ⭐ Logout Function
  ============================================================ */
  const handleLogout = () => {
    localStorage.removeItem("poc_user");
    localStorage.removeItem("poc_token");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <div className="account-wrapper">

      {/* ---------------- LEFT SIDEBAR ---------------- */}
      <aside className="account-sidebar">

        {/* ---- USER INFO CARD ---- */}
        <div className="user-card">
          <img src={profileIcon} className="user-avatar" alt="User Avatar" />

          <div className="user-info">
            <div className="name-row">
              <h3>{user.firstName} {user.lastName}</h3>

              <NavLink
                to="/my-account/profile"
                className={({ isActive }) =>
                  isActive ? "view-profile active" : "view-profile"
                }
              >
                View Profile
              </NavLink>
            </div>

            <p className="phone-number">{user.telephone || "—"}</p>
          </div>
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

    </div>
  );
};

export default MyAccountLayout;
