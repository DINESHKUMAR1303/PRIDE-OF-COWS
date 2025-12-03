import React, { useEffect, useState } from "react";
import "./LoginModal.css";

import logo from "./images/logo.png";
import sideImage from "./images/milk.webp";

const LoginModal = ({ onClose }) => {
  const [closing, setClosing] = useState(false);
  const [activeTab, setActiveTab] = useState("login"); // "login" | "register"

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <div className="login-modal-overlay" onClick={handleClose}>
      <div
        className={`login-modal ${closing ? "slide-out" : "slide-in"}`}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}
        <button className="modal-close-btn" onClick={handleClose}>✕</button>

        {/* LEFT IMAGE PANEL */}
        <div className="login-left">
          <img src={sideImage} className="left-image" alt="Milk" />
          <img src={logo} className="left-logo" alt="Brand" />
        </div>

        {/* RIGHT PANEL */}
        <div className="login-right">

          {/* TAB BUTTONS */}
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>

            <button
              className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {/* LOGIN FORM */}
          {activeTab === "login" && (
            <div className="login-form">
              <h2 className="title">Welcome to Pride of Cows Family</h2>

              <label> Email or Phone Number </label>
              <input type="text" placeholder="Enter your phone or email" />

              <label>Password</label>
              <input type="password" placeholder="Enter your password" />

              <button className="primary-btn">Login</button>

              <p className="small-text">
                By logging in, you agree to our <a href="#">Terms</a>.
              </p>
            </div>
          )}

          {/* REGISTER FORM */}
          {activeTab === "register" && (
            <div className="register-form">
              <h2 className="title">Create Account</h2>

              <div className="two-inputs">
                <div>
                  <label>First Name</label>
                  <input type="text" placeholder="First Name" />
                </div>
                <div>
                  <label>Last Name</label>
                  <input type="text" placeholder="Last Name" />
                </div>
              </div>

              <label>E-Mail</label>
              <input type="email" placeholder="Email" />

              <label>Telephone</label>
              <input type="text" placeholder="Phone Number" />

              <label>Password</label>
              <input type="password" placeholder="Password" />

              <label>Confirm Password</label>
              <input type="password" placeholder="Re-enter Password" />

              <label>Address</label>
              <input type="text" placeholder="Address Line" />

              <label>City</label>
              <input type="text" placeholder="City" />

              <div className="two-inputs">
                <div>
                  <label>Country</label>
                  <input type="text" placeholder="Country" />
                </div>
                <div>
                  <label>Region / State</label>
                  <input type="text" placeholder="State" />
                </div>
              </div>

              <button className="primary-btn">Register</button>

              <p className="small-text">
                By creating an account, you accept our <a href="#">Terms</a>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
