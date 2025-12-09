import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import "./MyAccount.css";
import { Link } from "react-router-dom";

/* ============================
   FIXED ICON IMPORTS
============================ */
import profileIcon from "./images/profile.svg";
import walletIcon from "./images/wallet.svg";
import loyaltyIcon from "./images/crown.svg";
import referIcon from "./images/bullhorn.svg";
import dealsIcon from "./images/tag.svg";
import giftIcon from "./images/tag.svg";

import helpIcon from "./images/bullhorn.svg";
import contactIcon from "./images/profile.svg";
import faqIcon from "./images/profile.svg";

import aboutIcon from "./images/profile.svg";
import lifeIcon from "./images/profile.svg";
import recipeIcon from "./images/profile.svg";

const MyAccount = () => {
  const { user, setUser } = useAuth();

  if (!user)
    return (
      <h2 style={{ textAlign: "center", marginTop: "80px" }}>
        Please login to access your account.
      </h2>
    );

  return (
    <div className="account-wrapper">

      {/* ================================
          LEFT SIDEBAR
       ================================ */}
      <div className="account-sidebar">

        {/* USER CARD */}
        <div className="user-card">
          <img src={profileIcon} alt="Profile" className="user-avatar" />

          <div className="user-details">
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.phone}</p>
          </div>

          <Link to="/my-account" className="view-profile">
            View Profile
          </Link>
        </div>

        {/* QUICK ACTION BUTTONS */}
        <div className="action-buttons">
          <button><img src={walletIcon} /> My Wallet</button>
          <button><img src={loyaltyIcon} /> Loyalty</button>
          <button><img src={referIcon} /> Refer & Earn</button>
          <button><img src={dealsIcon} /> Deals & Offer</button>
        </div>

        {/* GIFT CARD */}
        <div className="sidebar-section">
          <p className="section-title">Gift Card</p>
          <ul>
            <li><img src={giftIcon} /> Gift Card</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="sidebar-section">
          <p className="section-title">Support</p>
          <ul>
            <li><img src={helpIcon} /> Get Help</li>
            <li><img src={contactIcon} /> Contact Us</li>
            <li><img src={faqIcon} /> FAQ</li>
          </ul>
        </div>

        {/* LEARN MORE */}
        <div className="sidebar-section">
          <p className="section-title">Learn More</p>
          <ul>
            <li><img src={aboutIcon} /> About Us</li>
            <li><img src={lifeIcon} /> Life Style</li>
            <li><img src={recipeIcon} /> Recipes</li>
          </ul>
        </div>

        {/* LOGOUT INSIDE SIDEBAR */}
        <div className="sidebar-section">
          <p className="section-title">Other</p>
          <ul>
            <li
              className="logout-item"
              onClick={() => {
                localStorage.removeItem("poc_token");
                localStorage.removeItem("poc_user");
                setUser(null);
                window.location.reload();
              }}
              style={{ color: "red", cursor: "pointer" }}
            >
              <img src={profileIcon} /> Log Out
            </li>
          </ul>
        </div>
      </div>

      {/* ================================
          RIGHT MAIN CONTENT
       ================================ */}
      <div className="account-content">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          HOME / <span>MY ACCOUNT</span>
        </div>

        <h1 className="page-title">My Profile ✎</h1>

        {/* PROFILE FORM */}
        <form className="profile-form">

          <div className="row">
            <div className="input-group">
              <label>First Name</label>
              <input type="text" value={user.firstName} readOnly />
            </div>

            <div className="input-group">
              <label>Last Name</label>
              <input type="text" value={user.lastName} readOnly />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Phone Number</label>
              <input type="text" value={user.phone} readOnly />
            </div>

            <div className="input-group">
              <label>Gender</label>
              <select defaultValue="Male">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Email</label>
              <input type="text" value={user.email} readOnly />
            </div>

            <div className="input-group">
              <label>Date of Birth</label>
              <input type="text" placeholder="mm/dd/yyyy" />
            </div>
          </div>

          <div className="checkbox-row">
            <input type="checkbox" /> Email me with news and offers
          </div>

        </form>
      </div>
    </div>
  );
};

export default MyAccount;
