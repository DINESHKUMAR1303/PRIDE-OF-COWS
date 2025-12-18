import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./Dashboard/Dashboard.css";

import logo from "./Dashboard/images/logo.png";
import {
  LayoutGrid,
  Users,
  ShoppingCart,
  Package,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(
    location.pathname.includes("/admin/users")
  );

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
            <button
              className={`nav-item ${
                location.pathname === "/admin/dashboard" ? "active" : ""
              }`}
              onClick={() => navigate("/admin/dashboard")}
            >
              <LayoutGrid size={20} />
              <span>Dashboard</span>
            </button>

            {/* USER MODULE */}
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

              <div className="user-submenu">
                <button
                  className={`submenu-item ${
                    location.pathname === "/admin/users/add" ? "active" : ""
                  }`}
                  onClick={() => navigate("/admin/users/add")}
                >
                  Add User
                </button>

                <button
                  className={`submenu-item ${
                    location.pathname === "/admin/users" ? "active" : ""
                  }`}
                  onClick={() => navigate("/admin/users")}
                >
                  Manage User
                </button>
              </div>
            </div>

            <button className="nav-item">
              <ShoppingCart size={20} />
              <span>Orders</span>
            </button>

            <button className="nav-item">
              <Package size={20} />
              <span>Products</span>
            </button>

            <button className="nav-item">
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </nav>

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
