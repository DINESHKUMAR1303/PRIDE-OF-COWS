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
  // ⭐ Includes postal fields
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
    pincode: "",
    country: "India",
    state: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 400);
  };

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleRegisterChange = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  // LOGIN VALIDATION
  const validateLogin = () => {
    let newErrors = {};
    if (!loginData.login.trim()) newErrors.login = "Enter email or phone";
    if (!loginData.password.trim()) newErrors.password = "Enter password";
    return newErrors;
  };

  // LOGIN SUBMIT
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setLoginErrors({});

    const validationErrors = validateLogin();
    setLoginErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await loginUser(loginData);

      // ⭐ Correctly save nested address object
      const formattedUser = {
        id: res.user._id || res.user.id,
        name: `${res.user.firstName} ${res.user.lastName}`,
        firstName: res.user.firstName,
        lastName: res.user.lastName,
        email: res.user.email,
        phone: res.user.telephone || res.user.phone,

        // ⭐ Save normalized address
        address: {
          name: res.user.address?.name || `${res.user.firstName} ${res.user.lastName}`,
          type: res.user.address?.type || res.user.type || "Home",
          fullAddress: res.user.address?.fullAddress || res.user.address || res.user.fullAddress || "",
          city: res.user.address?.city || res.user.city || "",
          state: res.user.address?.state || res.user.state || "",
          country: res.user.address?.country || res.user.country || "India",
          pincode: res.user.address?.pincode || res.user.pincode || "",
        }
      };

      // Also keep flat copies for legacy if needed, but address is primary
      formattedUser.city = formattedUser.address.city;
      formattedUser.pincode = formattedUser.address.pincode;

      localStorage.setItem("poc_token", res.token);
      localStorage.setItem("poc_user", JSON.stringify(formattedUser));

      setUser(formattedUser);
      handleClose();
    } catch (err) {
      const msg = err.message || "Login failed";

      if (msg.includes("Email") || msg.includes("Phone"))
        return setLoginErrors({ login: "Invalid email or phone" });

      if (msg.includes("Password"))
        return setLoginErrors({ password: "Incorrect password" });

      setApiError(msg);
    }
  };

  // REGISTER VALIDATION
  const validateRegister = () => {
    let newErrors = {};

    if (!registerData.firstName.trim())
      newErrors.firstName = "First name required";

    if (!registerData.lastName.trim())
      newErrors.lastName = "Last name required";

    if (!/^\S+@\S+\.\S+$/.test(registerData.email))
      newErrors.email = "Enter valid email";

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

    if (!/^\d{6}$/.test(registerData.pincode))
      newErrors.pincode = "Enter valid 6-digit pincode";

    if (!registerData.state.trim())
      newErrors.state = "Select a state";

    return newErrors;
  };

  // REGISTER SUBMIT
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError("");

    const validationErrors = validateRegister();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    console.log("REGISTER DATA SENT:", registerData);

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

    // AUTO LOGIN AFTER REGISTER
    try {
      const loginRes = await loginUser({
        login: registerData.email,
        password: registerData.password,
      });

      const formattedUser = {
        id: loginRes.user._id || loginRes.user.id,
        name: `${loginRes.user.firstName} ${loginRes.user.lastName}`,
        firstName: loginRes.user.firstName,
        lastName: loginRes.user.lastName,
        email: loginRes.user.email,
        phone: loginRes.user.telephone || loginRes.user.phone,

        // ⭐ Save normalized address
        address: {
          name: loginRes.user.address?.name || `${loginRes.user.firstName} ${loginRes.user.lastName}`,
          type: loginRes.user.address?.type || loginRes.user.type || "Home",
          fullAddress: loginRes.user.address?.fullAddress || loginRes.user.address || loginRes.user.fullAddress || "",
          city: loginRes.user.address?.city || loginRes.user.city || "",
          state: loginRes.user.address?.state || loginRes.user.state || "",
          country: loginRes.user.address?.country || loginRes.user.country || "India",
          pincode: loginRes.user.address?.pincode || loginRes.user.pincode || "",
        }
      };

      // Also keep flat copies for legacy
      formattedUser.city = formattedUser.address.city;
      formattedUser.pincode = formattedUser.address.pincode;

      localStorage.setItem("poc_token", loginRes.token);
      localStorage.setItem("poc_user", JSON.stringify(formattedUser));

      setUser(formattedUser);
      handleClose();
    } catch (err) {
      setApiError(err.message || "Login failed after registration");
    }
  };

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

        <div className="login-left">
          <img src={sideImage} className="left-image" alt="Milk" />
          <img src={logo} className="left-logo" alt="Brand" />
        </div>

        <div className="login-right">

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

          {apiError && <div className="popup-error">{apiError}</div>}

          {/* LOGIN FORM */}
          {activeTab === "login" && (
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <h2 className="title">Welcome to Pride of Cows</h2>

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

              <button className="primary-btn" type="submit">Login</button>
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
                    value={registerData.firstName}
                    onChange={handleRegisterChange}
                    className={errors.firstName ? "input-error shake" : ""}
                  />
                  {errors.firstName && (
                    <p className="error-text">{errors.firstName}</p>
                  )}
                </div>

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

              <label>Email</label>
              <input
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className={errors.email ? "input-error shake" : ""}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}

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

              <label>Password</label>
              <input
                name="password"
                type="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                className={errors.password ? "input-error shake" : ""}
              />
              {errors.password && <p className="error-text">{errors.password}</p>}

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

              <label>Address</label>
              <input
                name="address"
                value={registerData.address}
                onChange={handleRegisterChange}
                className={errors.address ? "input-error shake" : ""}
              />
              {errors.address && <p className="error-text">{errors.address}</p>}

              <label>City</label>
              <input
                name="city"
                value={registerData.city}
                onChange={handleRegisterChange}
                className={errors.city ? "input-error shake" : ""}
              />
              {errors.city && <p className="error-text">{errors.city}</p>}

              <label>Pincode</label>
              <input
                name="pincode"
                value={registerData.pincode}
                onChange={handleRegisterChange}
                className={errors.pincode ? "input-error shake" : ""}
              />
              {errors.pincode && (
                <p className="error-text">{errors.pincode}</p>
              )}

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