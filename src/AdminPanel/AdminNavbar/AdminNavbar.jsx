import React, { useState, useRef, useEffect } from "react";
import { Menu, LogOut, User } from "lucide-react";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="admin-navbar">
      {/* Left */}
      <div className="navbar-left">
        <button className="menu-btn">
          <Menu size={22} />
        </button>
        <h2 className="brand">Nschool</h2>
      </div>

      {/* Right */}
      <div className="navbar-right" ref={dropdownRef}>
        <button className="profile-btn" onClick={() => setOpen(!open)}>
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="avatar-img"
          />
          <div className="profile-text">
            <span className="name">User Name</span>
            <span className="role">Admin</span>
          </div>
        </button>

        {open && (
          <div className="profile-dropdown">
            <div className="dropdown-user">
              <img
                src="https://i.pravatar.cc/48"
                alt="User"
                className="avatar-img"
              />
              <div>
                <strong>User Name</strong>
                <p>Admin</p>
              </div>
            </div>

            <button className="dropdown-item">
              <User size={16} />
              Profile
            </button>

            <button className="dropdown-item logout">
              <LogOut size={16} />
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminNavbar;
