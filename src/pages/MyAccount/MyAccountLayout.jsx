import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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

  // If user is not logged in
  if (!user)
    return (
      <h2 style={{ textAlign: "center", marginTop: 80 }}>
        Please login first.
      </h2>
    );

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

            <p className="phone-number">{user.telephone}</p>
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
            <li>
              <img src={paymentIcon} alt="Payment History" /> Payment History
            </li>
            <li>
              <img src={giftIcon} alt="Gift Card" /> Gift Card
            </li>
          </ul>
        </div>

        {/* ---- LOGOUT ---- */}
        <div className="sidebar-section">
          <p className="section-title">Other</p>

          <ul>
            <li
              className="logout-item"
              onClick={() => {
                localStorage.removeItem("poc_user");
                localStorage.removeItem("poc_token");
                setUser(null);
                window.location.href = "/";
              }}
            >
              <img src={logoutIcon} alt="Logout" /> Log Out
            </li>
          </ul>
        </div>

      </aside>

      {/* ---------------- RIGHT CONTENT AREA ---------------- */}
      <main className="account-content">
        <Outlet />
      </main>

    </div>
  );
};

export default MyAccountLayout;
