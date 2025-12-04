import React, { useEffect, useState } from "react";
import "./LoginModal.css";

import logo from "./images/logo.png";
import sideImage from "./images/milk.webp";

import { registerUser, loginUser } from "../../api/auth";

// ⭐ Auth Context
import { useAuth } from "../../context/AuthContext";

const LoginModal = ({ onClose }) => {
  const [closing, setClosing] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const { setUser } = useAuth();

  // ========================
  // LOGIN STATES
  // ========================
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });

  const [loginErrors, setLoginErrors] = useState({});

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

  // Disable background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 400);
  };

  // ============================
  // HANDLE INPUT CHANGES
  // ============================
  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleRegisterChange = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  // ============================
  // LOGIN VALIDATION
  // ============================
  const validateLogin = () => {
    let newErrors = {};

    if (!loginData.login.trim())
      newErrors.login = "Enter email or phone";

    if (!loginData.password.trim())
      newErrors.password = "Enter your password";

    return newErrors;
  };

  // ========================
  // LOGIN SUBMIT
  // ========================
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setLoginErrors({});

    const validationErrors = validateLogin();
    setLoginErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await loginUser(loginData);

      localStorage.setItem("poc_token", res.token);
      localStorage.setItem("poc_user", JSON.stringify(res.user));
      setUser(res.user);

      handleClose();
      window.location.reload();
    } catch (err) {
      const msg = err.message || "Login failed";

      // 🎯 Backend mapping
      if (msg.includes("Email") || msg.includes("Phone")) {
        setLoginErrors({ login: "Invalid email or phone" });
        return;
      }
      if (msg.includes("Password")) {
        setLoginErrors({ password: "Incorrect password" });
        return;
      }

      // ❗ unknown → popup
      setApiError(msg);
    }
  };

  // ============================
  // REGISTER VALIDATION
  // ============================
  const validateRegister = () => {
    let newErrors = {};

    if (!registerData.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!registerData.lastName.trim())
      newErrors.lastName = "Last name is required";

    if (!/^\S+@\S+\.\S+$/.test(registerData.email))
      newErrors.email = "Enter a valid email";

    if (!/^\d{10}$/.test(registerData.telephone))
      newErrors.telephone = "Enter valid 10-digit number";

    if (registerData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (registerData.password !== registerData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!registerData.address.trim())
      newErrors.address = "Address required";

    if (!registerData.city.trim())
      newErrors.city = "City required";

    if (!registerData.state.trim())
      newErrors.state = "Select a state";

    return newErrors;
  };

  // ========================
  // REGISTER SUBMIT
  // ========================
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setErrors({});

    const validationErrors = validateRegister();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await registerUser(registerData);
    } catch (err) {
      const msg = err.message || "Registration failed";

      if (msg.includes("Email"))
        return setErrors({ email: "Email already registered" });

      if (msg.includes("Phone"))
        return setErrors({ telephone: "Phone already registered" });

      return setApiError(msg);
    }

    // auto login
    try {
      const loginRes = await loginUser({
        login: registerData.email,
        password: registerData.password,
      });

      localStorage.setItem("poc_token", loginRes.token);
      localStorage.setItem("poc_user", JSON.stringify(loginRes.user));
      setUser(loginRes.user);

      handleClose();
      window.location.reload();
    } catch (err) {
      setApiError(err.message || "Login failed after registration");
    }
  };

  // Dropdowns
  const countries = ["India", "United States", "United Kingdom", "Canada"];
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
        {/* CLOSE BUTTON */}
        <button className="modal-close-btn" onClick={handleClose}>✕</button>

        {/* LEFT IMAGE */}
        <div className="login-left">
          <img src={sideImage} className="left-image" alt="Milk" />
          <img src={logo} className="left-logo" alt="Brand" />
        </div>

        {/* RIGHT PANEL */}
        <div className="login-right">
          {/* TABS */}
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
              onClick={() => {
                setApiError("");
                setLoginErrors({});
                setActiveTab("login");
              }}
            >
              Login
            </button>

            <button
              className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
              onClick={() => {
                setApiError("");
                setErrors({});
                setActiveTab("register");
              }}
            >
              Register
            </button>
          </div>

          {/* POPUP ERROR */}
          {apiError && <div className="popup-error">{apiError}</div>}

          {/* ============================
              LOGIN FORM
          ============================ */}
          {activeTab === "login" && (
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <h2 className="title">Welcome to Pride of Cows </h2>

              <label>Email or Phone</label>
              <input
                name="login"
                value={loginData.login}
                onChange={handleLoginChange}
                className={loginErrors.login ? "input-error shake" : ""}
              />
              {loginErrors.login && (
                <p className="error-text">{loginErrors.login}</p>
              )}

              <label>Password</label>
              <input
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className={loginErrors.password ? "input-error shake" : ""}
              />
              {loginErrors.password && (
                <p className="error-text">{loginErrors.password}</p>
              )}

              <button className="primary-btn" type="submit">
                Login
              </button>
            </form>
          )}

          {/* ============================
              REGISTER FORM
          ============================ */}
          {activeTab === "register" && (
            <form className="register-form" onSubmit={handleRegisterSubmit}>
              <h2 className="title">Create Your Account</h2>

              <div className="two-inputs">
                {/* FIRST NAME */}
                <div>
                  <label>First Name</label>
                  <input
                    name="firstName"
                    value={registerData.firstName}
                    onChange={handleRegisterChange}
                    className={errors.firstName ? "input-error shake" : ""}
                  />
                  {errors.firstName && (
                    <p className="error-text">{errors.firstName}</p>
                  )}
                </div>

                {/* LAST NAME */}
                <div>
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    value={registerData.lastName}
                    onChange={handleRegisterChange}
                    className={errors.lastName ? "input-error shake" : ""}
                  />
                  {errors.lastName && (
                    <p className="error-text">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* EMAIL */}
              <label>Email</label>
              <input
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className={errors.email ? "input-error shake" : ""}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}

              {/* PHONE */}
              <label>Telephone</label>
              <input
                name="telephone"
                value={registerData.telephone}
                onChange={handleRegisterChange}
                className={errors.telephone ? "input-error shake" : ""}
              />
              {errors.telephone && (
                <p className="error-text">{errors.telephone}</p>
              )}

              {/* PASSWORD */}
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                className={errors.password ? "input-error shake" : ""}
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}

              {/* CONFIRM */}
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                className={errors.confirmPassword ? "input-error shake" : ""}
              />
              {errors.confirmPassword && (
                <p className="error-text">{errors.confirmPassword}</p>
              )}

              {/* ADDRESS */}
              <label>Address</label>
              <input
                name="address"
                value={registerData.address}
                onChange={handleRegisterChange}
                className={errors.address ? "input-error shake" : ""}
              />
              {errors.address && (
                <p className="error-text">{errors.address}</p>
              )}

              {/* CITY */}
              <label>City</label>
              <input
                name="city"
                value={registerData.city}
                onChange={handleRegisterChange}
                className={errors.city ? "input-error shake" : ""}
              />
              {errors.city && <p className="error-text">{errors.city}</p>}

              {/* COUNTRY + STATE */}
              <div className="two-inputs">
                <div>
                  <label>Country</label>
                  <select
                    name="country"
                    value={registerData.country}
                    onChange={handleRegisterChange}
                  >
                    {countries.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>State</label>
                  <select
                    name="state"
                    value={registerData.state}
                    onChange={handleRegisterChange}
                    className={errors.state ? "input-error shake" : ""}
                  >
                    <option value="">Select State</option>
                    {indianStates.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="error-text">{errors.state}</p>
                  )}
                </div>
              </div>

              <button className="primary-btn" type="submit">
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
