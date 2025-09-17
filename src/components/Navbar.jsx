import React, { useState } from "react";
import logo from "../images/icons/logo.png";
import loginIcon from "../images/icons/user.svg";
import cartIcon from "../images/icons/cart.svg";
import { FaMapMarkerAlt, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        {/* Left Section */}
        <div className="navbar-left">
          <img src={logo} alt="Pride of Cows" className="logo" />
          <button className="pincode-btn">
            <FaMapMarkerAlt className="icon" />
            ENTER A PINCODE
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
          <div className="login">
            <img src={loginIcon} alt="login" className="right-icon" />
            <span className="login-text">LOGIN</span>
          </div>
          <div className="cart">
            <img src={cartIcon} alt="cart" className="right-icon" />
            <span className="cart-text">CART</span>
            <span className="cart-count">0</span>
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

      {/* Sidebar / Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-header">
          <div className="login">
            <img src={loginIcon} alt="login" className="right-icon" />
            <span className="login-text">LOGIN</span>
          </div>
          <button className="close-btn" onClick={() => setMenuOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <ul className="mobile-links">
          <li>Shop ▾</li>
          <li>Support</li>
          <li>Enquiry</li>
          <li>Help</li>
          <li>Contact</li>
          <li>FAQ</li>
          <li>Learn More</li>
          <li>About Us</li>
          <li>Life Style</li>
          <li>Recipes</li>
        </ul>

        {/* Footer inside sidebar */}
        <div className="mobile-footer">
          <p>Get The App</p>
          <div className="app-icons">
            <i className="fab fa-apple"></i>
            <i className="fab fa-google-play"></i>
          </div>

          <p>Follow Us</p>
          <div className="social-icons">
            <i className="fab fa-instagram"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
