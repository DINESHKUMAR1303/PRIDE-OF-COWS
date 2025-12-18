import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  UserPlus,
  UserCog,
  Folder,
  Package,
  UserCheck,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  CalendarCheck,
} from "lucide-react";

import "./AdminLayout.css";   // ✅ CORRECT
import logo from "./Dashboard/images/logo.png";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ CLOSED BY DEFAULT
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin", { replace: true });
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-wrapper">

        {/* ========== SIDEBAR ========== */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <img src={logo} alt="Pride of Cows" className="brand-logo" />
              <div>
                <h1>Pride of Cows</h1>
                <span>Admin Panel</span>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {/* Dashboard */}
            <button
              className={`nav-item ${
                location.pathname === "/admin/dashboard" ? "active" : ""
              }`}
              onClick={() => navigate("/admin/dashboard")}
            >
              <LayoutGrid size={20} />
              <span>Dashboard</span>
            </button>

            {/* ================= USER MODULE ================= */}
            <div className={`user-module ${userMenuOpen ? "open" : ""}`}>
              <button
                className={`nav-item user-module-btn ${
                  location.pathname.includes("/admin/users") ? "active" : ""
                }`}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="user-module-left">
                  <Users size={20} />
                  <span>User Module</span>
                </div>
                <ChevronRight size={18} className="chevron" />
              </button>

              {/* SHOW ONLY WHEN OPEN */}
              {userMenuOpen && (
<div className="user-submenu">
  <button
    className={`submenu-item ${
      location.pathname === "/admin/users/add" ? "active" : ""
    }`}
    onClick={() => navigate("/admin/users/add")}
  >
    <UserPlus size={16} />
    <span>Add User</span>
  </button>

  <button
    className={`submenu-item ${
      location.pathname === "/admin/users" ? "active" : ""
    }`}
    onClick={() => navigate("/admin/users")}
  >
    <UserCog size={16} />
    <span>Manage User</span>
  </button>
</div>

              )}
            </div>

            {/* Category */}
            <button
              className={`nav-item ${
                location.pathname.includes("/admin/categories") ? "active" : ""
              }`}
              onClick={() => navigate("/admin/categories")}
            >
              <Folder size={20} />
              <span>Category</span>
            </button>

            {/* Product */}
            <button
              className={`nav-item ${
                location.pathname.includes("/admin/products") ? "active" : ""
              }`}
              onClick={() => navigate("/admin/products")}
            >
              <Package size={20} />
              <span>Product</span>
            </button>

            {/* Customers */}
            <button
              className={`nav-item ${
                location.pathname.includes("/admin/customers") ? "active" : ""
              }`}
              onClick={() => navigate("/admin/customers")}
            >
              <UserCheck size={20} />
              <span>Customers</span>
            </button>

            {/* Booking */}
            <button
              className={`nav-item ${
                location.pathname.includes("/admin/booking") ? "active" : ""
              }`}
              onClick={() => navigate("/admin/booking")}
            >
              <CalendarCheck size={20} />
              <span>Booking</span>
            </button>

            {/* Reports */}
            <button
              className={`nav-item ${
                location.pathname.includes("/admin/reports") ? "active" : ""
              }`}
              onClick={() => navigate("/admin/reports")}
            >
              <BarChart3 size={20} />
              <span>Reports</span>
            </button>

            {/* Settings */}
            <button
              className={`nav-item ${
                location.pathname.includes("/admin/settings") ? "active" : ""
              }`}
              onClick={() => navigate("/admin/settings")}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </nav>

          {/* Footer */}
          <div className="sidebar-footer">
            <div className="admin-profile">
              <div className="avatar">A</div>
              <div>
                <strong>Admin User</strong>
                <p>Super Admin</p>
              </div>
            </div>

            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} />
            </button>
          </div>
        </aside>

        {/* ========== PAGE CONTENT ========== */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
