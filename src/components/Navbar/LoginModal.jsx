import React, { useEffect, useState } from "react";
import "./LoginModal.css";

import logo from "./images/logo.png";
import sideImage from "./images/milk.webp";
import { registerUser, loginUser } from "../../api/auth";

// ⭐ NEW: Auth Context
import { useAuth } from "../../context/AuthContext";

const LoginModal = ({ onClose }) => {
  const [closing, setClosing] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  // ⭐ GET setUser from AuthContext
  const { setUser } = useAuth();

  // ========================
  // LOGIN STATES
  // ========================
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });

  // ========================
  // REGISTER STATES
  // ========================
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    country: "India",
    state: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  // Lock scroll when modal opens
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 400);
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  // ========================
  // LOGIN SUBMIT (UPDATED)
  // ========================
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    try {
      const res = await loginUser({
        login: loginData.login,
        password: loginData.password,
      });

      // ⭐ Save JWT token + user info
      localStorage.setItem("poc_token", res.token);
      localStorage.setItem("poc_user", JSON.stringify(res.user));

      // ⭐ Update global auth state
      setUser(res.user);

      alert("Login successful!");
      handleClose();

      // ⭐ Refresh UI so navbar updates
      window.location.reload();
    } catch (err) {
      setApiError(err.message || "Login failed");
    }
  };

  // ========================
  // REGISTER SUBMIT
  // ========================
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const newErrors = {};

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!registerData.email.includes("@")) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await registerUser(registerData);

      alert("Registration successful!");
      handleClose();
    } catch (err) {
      setApiError(err.message || "Registration failed");
    }
  };

  // Dropdown data
  const countries = [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
  ];

  const indianStates = [
    "Andhra Pradesh",
    "Bihar",
    "Delhi",
    "Gujarat",
    "Haryana",
    "Karnataka",
    "Kerala",
    "Maharashtra",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "West Bengal",
  ];

  return (
    <div className="login-modal-overlay" onClick={handleClose}>
      <div
        className={`login-modal ${closing ? "slide-out" : "slide-in"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close-btn" onClick={handleClose}>✕</button>

        {/* LEFT IMAGE SECTION */}
        <div className="login-left">
          <img src={sideImage} className="left-image" alt="Milk" />
          <img src={logo} className="left-logo" alt="Brand Logo" />
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="login-right">

          {/* TAB SWITCHER */}
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
              onClick={() => {
                setApiError("");
                setActiveTab("login");
              }}
            >
              Login
            </button>

            <button
              className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
              onClick={() => {
                setApiError("");
                setActiveTab("register");
              }}
            >
              Register
            </button>
          </div>

          {/* ERROR MESSAGE */}
          {apiError && <p className="api-error">{apiError}</p>}

          {/* LOGIN FORM */}
          {activeTab === "login" && (
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <h2 className="title">Welcome Back</h2>

              <label>Email or Phone Number</label>
              <input
                name="login"
                type="text"
                placeholder="Enter email or phone"
                value={loginData.login}
                onChange={handleLoginChange}
                required
              />

              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />

              <button type="submit" className="primary-btn">
                Login
              </button>

              <p className="small-text">
                By logging in, you agree to our <a href="#">Terms</a>.
              </p>
            </form>
          )}

          {/* REGISTER FORM */}
          {activeTab === "register" && (
            <form className="register-form" onSubmit={handleRegisterSubmit}>
              <h2 className="title">Create Your Account</h2>

              <div className="two-inputs">
                <div>
                  <label>First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    value={registerData.firstName}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div>
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    value={registerData.lastName}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <label>E-Mail</label>
              <input
                name="email"
                type="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
              {errors.email && <p className="error-text">{errors.email}</p>}

              <label>Telephone</label>
              <input
                name="telephone"
                type="text"
                value={registerData.telephone}
                onChange={handleRegisterChange}
                required
              />

              <label>Password</label>
              <input
                name="password"
                type="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />

              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
              />
              {errors.confirmPassword && (
                <p className="error-text">{errors.confirmPassword}</p>
              )}

              <label>Address</label>
              <input
                name="address"
                type="text"
                value={registerData.address}
                onChange={handleRegisterChange}
                required
              />

              <label>City</label>
              <input
                name="city"
                type="text"
                value={registerData.city}
                onChange={handleRegisterChange}
                required
              />

              <div className="two-inputs">
                <div>
                  <label>Country</label>
                  <select
                    name="country"
                    value={registerData.country}
                    onChange={handleRegisterChange}
                    required
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>State / Region</label>
                  <select
                    name="state"
                    value={registerData.state}
                    onChange={handleRegisterChange}
                    required
                  >
                    <option value="">Select State</option>
                    {indianStates.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="primary-btn">
                Register
              </button>

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
