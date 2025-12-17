import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

/* ===== ADMIN PAGES ===== */
import AdminLogin from "./AdminLogin/AdminLogin";
import Dashboard from "./Dashboard/Dashboard";

/* ===== USER MODULE PAGES ===== */
// import Users from "./Users/Users";          // Manage Users
import AddUser from "./Users/AddUser";      // Add User

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
      {/* ================= ADMIN LOGIN ================= */}
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

      {/* ================= DASHBOARD ================= */}
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

      {/* ================= USER MODULE ================= */}
      {/* <Route
        path="users"
        element={
          isLoggedIn ? <Users /> : <Navigate to="/admin" replace />
        }
      /> */}

      <Route
        path="users/add"
        element={
          isLoggedIn ? <AddUser /> : <Navigate to="/admin" replace />
        }
      />
    </Routes>
  );
};

export default Admin;
