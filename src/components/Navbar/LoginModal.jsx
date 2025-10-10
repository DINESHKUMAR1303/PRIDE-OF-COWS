import React, { useEffect, useState } from "react";
import "./LoginModal.css";
import logo from "./images/logo.png";
import milkPour from "./images/registerimage.jpg";

const LoginModal = ({ onClose }) => {
  const [closing, setClosing] = useState(false);

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
        <div className="register__close" onClick={handleClose}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="10" fill="#F2F2F2" stroke="#919191" />
            <path
              d="M14.3327 14.3332L7.66602 7.6665M14.3327 7.6665L7.66602 14.3332"
              stroke="#919191"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Image Section */}
        <div className="image-container">
          <img src={milkPour} alt="Pouring milk" className="background-image" />
          <img src={logo} alt="Pride of Cows Logo" className="overlay-logo" />
        </div>

        {/* Body */}
        <div className="login-modal-body">
          <h2>Welcome to the Pride of Cows Family.</h2>

          <label className="label">Phone number</label>
          <input
            type="text"
            placeholder="Enter valid 10-digit phone number"
            className="login-input"
          />

          <button className="send-otp-btn">Send OTP</button>

          <p className="terms">
            <input type="checkbox" /> By signing in you agree to our{" "}
            <a href="#">Terms & Conditions</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
