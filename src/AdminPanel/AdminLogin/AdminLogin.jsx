import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

// Replace these with your actual image paths
import loginBg from "./images/admin.png";
import crownIcon from "./images/crown.svg";

const AdminLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);

    // Temporary mock login
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin123") {
        onLoginSuccess("fake-admin-token-2025");
      } else {
        setError("Invalid email or password");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="pride-admin-login">
      <div className="pride-login-container">
        <div className="pride-login-card">

          {/* Left: Brand Panel */}
          <div className="pride-brand-panel">
            <img src={loginBg} alt="Farm background" className="pride-bg-image" />

            <div className="pride-brand-overlay">
              <div className="pride-logo-section">
                <div className="pride-logo-circle">
                  <img src={crownIcon} alt="Crown" />
                </div>
                <span className="pride-brand-title">Pride of Cows</span>
              </div>

              <div className="pride-tagline-section">
                <h1 className="pride-tagline">
                  Farm to Home,<br />
                  Pure & Fresh.
                </h1>
                <p className="pride-description">
                  Manage orders, inventory, and customer relationships<br />
                  from one central hub.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Login Form */}
          <div className="pride-form-panel">
            <div className="pride-form-box">
              <h2 className="pride-form-heading">Admin Portal</h2>
              <p className="pride-form-subheading">
                Welcome back! Please enter your details.
              </p>

              {error && <div className="pride-error-message">{error}</div>}

              <form onSubmit={handleLogin} className="pride-login-form">
                <div className="pride-input-group">
                  <label htmlFor="admin-email">Email Address</label>
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@prideofcows.com"
                    required
                  />
                </div>

                <div className="pride-input-group">
                  <div className="pride-password-label">
                    <label htmlFor="admin-password">Password</label>
                    <span className="pride-forgot-link">Forgot Password?</span>
                  </div>

                  <div className="pride-password-input">
                    <input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="pride-toggle-eye"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="pride-login-btn"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </form>

              <div
                className="pride-return-link"
                onClick={() => navigate("/")}
              >
                ← Return to Store
              </div>
            </div>
          </div>
        </div>

        <footer className="pride-login-footer">
          © 2026 Pride of Cows. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminLogin;