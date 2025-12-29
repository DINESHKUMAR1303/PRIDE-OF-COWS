// src/AdminPanel/AdminNavbar/AdminNavbar.jsx
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import "./AdminNavbar.css";

const AdminNavbar = ({ onMenuToggle, isSidebarOpen }) => {
  const [isSticky, setIsSticky] = useState(false);

  // ✅ Detect WINDOW scroll (same as your website navbar)
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        admin-navbar
        ${isSticky ? "sticky" : ""}
        ${isSidebarOpen ? "navbar-hidden" : ""}
      `}
    >
      <div className="navbar-content">
        {/* LEFT — HAMBURGER */}
        <button
          className="mobile-menu-toggle"
          onClick={onMenuToggle}
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        {/* CENTER — TITLE */}
        <h1 className="navbar-title">Pride of Cows</h1>

        {/* RIGHT — SPACER */}
        <div style={{ width: 32 }} />
      </div>
    </header>
  );
};

export default AdminNavbar;
