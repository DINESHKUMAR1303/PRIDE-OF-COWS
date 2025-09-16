import React from "react";
import logo from "../images/logo.png";        
import loginIcon from "../images/user.svg";  
import cartIcon from "../images/cart.svg";    
import { FaMapMarkerAlt } from "react-icons/fa";

const Navbar = () => {
  return (
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
      </div>
    </nav>
  );
};

export default Navbar;
