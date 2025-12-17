import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

import loginBg from "./images/admin.png";
import brandIcon from "./images/crown.svg";

const AdminLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ======================================
     HANDLE LOGIN (TEMP — UI LEVEL)
  ====================================== */
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);

    // TEMP login check
    setTimeout(() => {
      if (
        email === "admin@prideofcows.com" &&
        password === "admin123"
      ) {
        const fakeAdminToken = "admin_logged_in_token";
        onLoginSuccess(fakeAdminToken);
      } else {
        setError("Invalid email or password");
      }

      setLoading(false);
    }, 600);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-wrapper">
        <div className="admin-login-card">

          {/* ================= LEFT PANEL ================= */}
          <div className="login-image-panel">
            <img src={loginBg} alt="Admin Login Background" />

            <div className="brand-header">
              <div className="brand-icon">
                <img src={brandIcon} alt="Brand Logo" />
              </div>
              <span className="brand-name">Pride of Cows</span>
            </div>

            <div className="brand-content">
              <h2>
                Farm to Home,<br />Pure & Fresh.
              </h2>
              <p>
                Manage orders, inventory, and customer relationships
                from one central hub.
              </p>
            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="login-form-panel">
            <div className="login-form-container">
              <h2 className="form-title">Admin Portal</h2>
              <p className="form-subtitle">
                Welcome back! Please enter your details.
              </p>

              {error && <p className="error-text">{error}</p>}

              <form className="login-form" onSubmit={handleLogin}>
                {/* EMAIL */}
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@prideofcows.com"
                    autoComplete="username"
                  />
                </div>

                {/* PASSWORD */}
                <div className="form-group">
                  <div className="password-header">
                    <label>Password</label>
                    <span className="forgot">Forgot Password?</span>
                  </div>

                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••"
                      autoComplete="current-password"
                    />
                    <span
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      role="button"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="login-button"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </form>

              {/* RETURN TO STORE */}
              <div
                className="return-store clickable"
                onClick={() => navigate("/")}
              >
                 Return to Store
              </div>
            </div>
          </div>

        </div>

        <div className="login-footer">
          © 2025 Pride of Cows. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
