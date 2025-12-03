import React, { useEffect, useState } from "react";
import "./LoginModal.css";

import logo from "./images/logo.png";
import sideImage from "./images/milk.webp";

const LoginModal = ({ onClose }) => {
  const [closing, setClosing] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  
  // Form states
  const [loginData, setLoginData] = useState({ identifier: "", password: "" });
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    country: "India", // Default to India for the brand context
    state: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = (e) => {
    e?.preventDefault();
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., API call)
    console.log("Login:", loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Basic validation example
    const newErrors = {};
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!registerData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }
    // Add more validations as needed
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Add your register logic here (e.g., API call)
      console.log("Register:", registerData);
    }
  };

  // Sample country options (premium: sorted, common ones)
  const countries = [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Other"
  ];

  // Sample state options (focusing on India for brand, with US as fallback; in production, make dynamic)
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];

  // For simplicity, using Indian states; enhance with conditional logic based on country in production

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
          <img src={sideImage} className="left-image" alt="Premium Milk" />
          <img src={logo} className="left-logo" alt="Pride of Cows" />
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
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <h2 className="title">Welcome to Pride of Cows Family</h2>

              <label htmlFor="identifier">Email or Phone Number</label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="Enter your phone or email"
                value={loginData.identifier}
                onChange={handleLoginChange}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />

              <button type="submit" className="primary-btn">Login</button>

              <p className="small-text">
                By logging in, you agree to our <a href="#">Terms</a>.
              </p>
            </form>
          )}

          {/* REGISTER FORM */}
          {activeTab === "register" && (
            <form className="register-form" onSubmit={handleRegisterSubmit}>
              <h2 className="title">Create Premium Account</h2>

              <div className="two-inputs">
                <div>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={registerData.firstName}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={registerData.lastName}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <label htmlFor="email">E-Mail</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
              {errors.email && <p className="error-text">{errors.email}</p>}

              <label htmlFor="phone">Telephone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={registerData.phone}
                onChange={handleRegisterChange}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />

              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter Password"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Address Line"
                value={registerData.address}
                onChange={handleRegisterChange}
                required
              />

              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="City"
                value={registerData.city}
                onChange={handleRegisterChange}
                required
              />

              <div className="two-inputs">
                <div>
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={registerData.country}
                    onChange={handleRegisterChange}
                    required
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="state">Region / State</label>
                  <select
                    id="state"
                    name="state"
                    value={registerData.state}
                    onChange={handleRegisterChange}
                    required
                  >
                    <option value="">Select State</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="primary-btn">Register</button>

              <p className="small-text">
                By creating an account, you accept our <a href="#">Terms</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;