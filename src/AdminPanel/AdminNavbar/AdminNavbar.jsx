// src/AdminPanel/AdminNavbar/AdminNavbar.jsx
import React from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import "./AdminNavbar.css";

const AdminNavbar = ({ onMenuToggle, isSidebarOpen }) => {
  return (
    <header className="admin-navbar">
      <div className="navbar-content">

        {/* LEFT — Hamburger */}
        <button
          className="mobile-menu-toggle"
          onClick={onMenuToggle}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* CENTER — TITLE */}
        <h1 className="navbar-title">Pride of Cows Admin Panel</h1>

        {/* RIGHT — PROFILE */}
        <div className="admin-profile-section">
          <div className="admin-avatar">A</div>

          <div className="admin-info">
            <span className="admin-name">Admin User</span>
            <span className="admin-role">Super Admin</span>
          </div>

          <ChevronDown size={16} className="dropdown-arrow" />
        </div>

      </div>
    </header>
  );
};

export default AdminNavbar;
