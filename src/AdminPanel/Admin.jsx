import React, { useState } from "react";
import AdminLogin from "./AdminLogin/AdminLogin";
import Dashboard from "./Dashboard/Dashboard";

const Admin = () => {
  // ✅ Check login state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("admin_token")
  );

  // ✅ Login success handler
  const handleLoginSuccess = (token) => {
    localStorage.setItem("admin_token", token);
    setIsLoggedIn(true);
  };

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        // 🔐 Admin Login Page
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        // 📊 Admin Dashboard
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  );
};

export default Admin;
