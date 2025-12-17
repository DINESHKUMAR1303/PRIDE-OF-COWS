import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import AdminLogin from "./AdminLogin/AdminLogin";
import Dashboard from "./Dashboard/Dashboard";

const Admin = () => {
  const navigate = useNavigate();

  // ✅ Check admin login status
  const isLoggedIn = !!localStorage.getItem("admin_token");

  // ✅ When login succeeds
  const handleLoginSuccess = (token) => {
    localStorage.setItem("admin_token", token);
    navigate("/admin/dashboard", { replace: true });
  };

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin", { replace: true });
  };

  return (
    <Routes>
      {/* /admin → Admin Login */}
      <Route
        index
        element={
          isLoggedIn ? (
            <Navigate to="dashboard" replace />
          ) : (
            <AdminLogin onLoginSuccess={handleLoginSuccess} />
          )
        }
      />

      {/* /admin/dashboard → Dashboard */}
      <Route
        path="dashboard"
        element={
          isLoggedIn ? (
            <Dashboard onLogout={handleLogout} />
          ) : (
            <Navigate to="/admin" replace />
          )
        }
      />
    </Routes>
  );
};

export default Admin;
