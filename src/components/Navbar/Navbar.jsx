import React, { useState, useEffect } from "react";
import "./Navbar.css"; 

// ✅ Logo & Main Icons
import logo from "../../images/icons/logo.png";
import loginIcon from "../../images/icons/user.svg";
import cartIcon from "../../images/icons/cart.svg";
import locationIcon from "../../images/icons/location.svg";

// ✅ Section Icons
import enquiryIcon from "../../images/icons/enquiry.svg";
import helpIcon from "../../images/icons/help.svg";
import contactIcon from "../../images/icons/contact.svg";
import faqIcon from "../../images/icons/faq.svg";
import aboutIcon from "../../images/icons/about.svg";
import lifestyleIcon from "../../images/icons/lifestyle.svg";
import recipesIcon from "../../images/icons/recipies.svg";

// ✅ Footer Icons
import appstoreIcon from "../../images/icons/appstore.svg";
import playstoreIcon from "../../images/icons/playstore.svg";
import instagramIcon from "../../images/icons/instagram.svg";
import facebookIcon from "../../images/icons/facebook.svg";
import twitterIcon from "../../images/icons/twitter.svg";
import youtubeIcon from "../../images/icons/youtube.svg";

import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [location, setLocation] = useState("ENTER A PINCODE");
  const [pincode, setPincode] = useState("");
  const [place, setPlace] = useState("");

  // ✅ Load from localStorage
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) setLocation(savedLocation);
  }, []);

  const handleSaveLocation = () => {
    const selected = place || pincode;
    if (selected) {
      setLocation(selected);
      localStorage.setItem("userLocation", selected);
      setModalOpen(false);
      setPincode("");
      setPlace("");
    }
  };

  return (
    <>
      {/* ================== NAVBAR ================== */}
      <nav className="navbar">
        {/* Left Section */}
        <div className="navbar-left">
          <img src={logo} alt="Pride of Cows" className="logo" />
          <button className="pincode-btn" onClick={() => setModalOpen(true)}>
            <img src={locationIcon} alt="Location" className="location-icon" />
            {location}
          </button>
        </div>

        {/* Center Menu */}
        <ul className="menu">
          <li>Shop ▾</li>
          <li>Learn ▾</li>
          <li>Blog ▾</li>
          <li>Gift card</li>
        </ul>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Login */}
          <div className="vertical-item login">
            <img src={loginIcon} alt="login" className="right-icon" />
            <span className="login-text">LOGIN</span>
          </div>

          {/* Cart */}
          <div className="vertical-item cart">
            <div className="cart-wrapper">
              <img src={cartIcon} alt="cart" className="right-icon" />
              <span className="cart-count">0</span>
            </div>
            <span className="cart-text">CART</span>
          </div>

          {/* Toggle (mobile only) */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* ================== SIDEBAR / MOBILE MENU ================== */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-header">
          {/* Login */}
          <div className="vertical-item login">
            <img src={loginIcon} alt="login" className="right-icon" />
            <span className="login-text">LOGIN</span>
          </div>

          {/* Cart */}
          <div className="vertical-item cart">
            <div className="cart-wrapper">
              <img src={cartIcon} alt="cart" className="right-icon" />
              <span className="cart-count">0</span>
            </div>
            <span className="cart-text">CART</span>
          </div>

          {/* Close Button */}
          <button className="close-btn" onClick={() => setMenuOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* Menu Links with Icons */}
        <ul className="mobile-links">
          <li><span>Shop ▾</span></li>

          <li className="section-title">Support</li>
          <li><img src={enquiryIcon} alt="enquiry" className="right-icon" /> Enquiry</li>
          <li><img src={helpIcon} alt="help" className="right-icon" /> Help</li>
          <li><img src={contactIcon} alt="contact" className="right-icon" /> Contact</li>
          <li><img src={faqIcon} alt="faq" className="right-icon" /> FAQ</li>

          <li className="section-title">Learn More</li>
          <li><img src={aboutIcon} alt="about" className="right-icon" /> About Us</li>
          <li><img src={lifestyleIcon} alt="lifestyle" className="right-icon" /> Life Style</li>
          <li><img src={recipesIcon} alt="recipes" className="right-icon" /> Recipes</li>
        </ul>

        {/* ================== FOOTER ================== */}
        <div className="mobile-footer">
          <p>Get The App</p>
          <div className="app-icons">
            <img src={appstoreIcon} alt="App Store" />
            <img src={playstoreIcon} alt="Google Play" />
          </div>

          <p>Follow Us</p>
          <div className="social-icons">
            <img src={instagramIcon} alt="Instagram" />
            <img src={facebookIcon} alt="Facebook" />
            <img src={twitterIcon} alt="Twitter" />
            <img src={youtubeIcon} alt="YouTube" />
          </div>
        </div>
      </div>

      {/* ================== MODAL ================== */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
            <input
              type="text"
              placeholder="PINCODE"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search for a place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
            <button className="continue-btn" onClick={handleSaveLocation}>
              CONTINUE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
