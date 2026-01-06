import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

/* ===== AUTH ===== */
import AdminLogin from "./AdminLogin/AdminLogin";

/* ===== LAYOUT ===== */
import AdminLayout from "./AdminLayout";

/* ===== PAGES ===== */
import Dashboard from "./Dashboard/Dashboard";
import AddUser from "./Users/AddUser";
import ManageUser from "./ManageUser/ManageUser"; // ✅ ADD THIS

const Admin = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("admin_token");

  const handleLoginSuccess = (token) => {
    localStorage.setItem("admin_token", token);
    navigate("/admin/dashboard", { replace: true });
  };

  return (
    <Routes>
      {/* ================= LOGIN ================= */}
      <Route
        index
        element={
          isLoggedIn ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <AdminLogin onLoginSuccess={handleLoginSuccess} />
          )
        }
      />

      {/* ================= PROTECTED ADMIN ================= */}
      <Route
        element={
          isLoggedIn ? <AdminLayout /> : <Navigate to="/admin" replace />
        }
      >
        {/* Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* User Module */}
        <Route path="users/add" element={<AddUser />} />
        <Route path="users/manage" element={<ManageUser />} /> {/* ✅ NEW */}

      </Route>
    </Routes>
  );
};

export default Admin;
