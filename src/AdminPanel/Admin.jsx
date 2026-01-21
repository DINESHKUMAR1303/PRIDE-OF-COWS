import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

/* ===== AUTH ===== */
import AdminLogin from "./AdminLogin/AdminLogin";

/* ===== LAYOUT ===== */
import AdminLayout from "./AdminLayout";

/* ===== PAGES ===== */
import Dashboard from "./Dashboard/Dashboard";
import AddUser from "./Users/AddUser";
import ManageUser from "./ManageUser/ManageUser";
import AddProduct from "./AddProduct/AddProduct";
import ManageProduct from "./ManageProduct/ManageProduct";
import Orders from "./Orders/Orders";

import Customers from "./Customers/Customers";
import Reports from "./Reports/Reports";

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
        <Route path="users/manage" element={<ManageUser />} />
        <Route path="customers" element={<Customers />} />

        {/* Product Module */}
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/manage" element={<ManageProduct />} />

        {/* Orders */}
        <Route path="orders" element={<Orders />} />

        {/* Reports */}
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
};

export default Admin;
