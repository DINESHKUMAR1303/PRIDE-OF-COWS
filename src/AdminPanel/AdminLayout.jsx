import React, { useState, useEffect } from "react";
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
  Menu, // Hamburger icon
  X,    // Close icon
} from "lucide-react";

import AdminNavbar from "./AdminNavbar/AdminNavbar";

import "./AdminLayout.css";
import logo from "./Dashboard/images/logo.png";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // User Module submenu state
  const [userMenuOpen, setUserMenuOpen] = useState(
    location.pathname.includes("/admin/users")
  );

  // Mobile sidebar toggle state
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // ✅ AUTO-CLOSE SIDEBAR ON ROUTE CHANGE (FIX)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);


  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin", { replace: true });
    setSidebarOpen(false); // Close sidebar on logout
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-wrapper">



        {/* Sidebar with mobile open/close */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          {/* Close button for mobile (inside sidebar) */}
          <button className="mobile-close-btn" onClick={closeSidebar}>
            <X size={24} />
          </button>

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
              className={`nav-item ${location.pathname === "/admin/dashboard" ? "active" : ""}`}
              onClick={() => { navigate("/admin/dashboard"); closeSidebar(); }}
            >
              <LayoutGrid size={20} />
              <span>Dashboard</span>
            </button>

            {/* User Module */}
            <div className={`user-module ${userMenuOpen ? "open" : ""}`}>
              <button
                className={`nav-item user-module-btn ${location.pathname.includes("/admin/users") ? "active" : ""}`}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="user-module-left">
                  <Users size={20} />
                  <span>User Module</span>
                </div>
                <ChevronRight size={18} className="chevron" />
              </button>

              {userMenuOpen && (
                <div className="user-submenu">
                  <button
                    className={`submenu-item ${location.pathname === "/admin/users/add" ? "active" : ""}`}
                    onClick={() => { navigate("/admin/users/add"); closeSidebar(); }}
                  >
                    <UserPlus size={16} />
                    <span>Add User</span>
                  </button>
                  <button
                    className={`submenu-item ${location.pathname === "/admin/users/manage" ? "active" : ""}`}
                    onClick={() => { navigate("/admin/users/manage"); closeSidebar(); }}
                  >
                    <UserCog size={16} />
                    <span>Manage User</span>
                  </button>

                </div>
              )}
            </div>

            {/* Product */}
            <button
              className={`nav-item ${location.pathname.includes("/admin/products") ? "active" : ""}`}
              onClick={() => { navigate("/admin/products"); closeSidebar(); }}
            >
              <Package size={20} />
              <span>Product</span>
            </button>

            {/* Customers */}
            <button
              className={`nav-item ${location.pathname.includes("/admin/customers") ? "active" : ""}`}
              onClick={() => { navigate("/admin/customers"); closeSidebar(); }}
            >
              <UserCheck size={20} />
              <span>Customers</span>
            </button>

            {/* Booking */}
            <button
              className={`nav-item ${location.pathname.includes("/admin/booking") ? "active" : ""}`}
              onClick={() => { navigate("/admin/booking"); closeSidebar(); }}
            >
              <CalendarCheck size={20} />
              <span>Booking</span>
            </button>

            {/* Reports */}
            <button
              className={`nav-item ${location.pathname.includes("/admin/reports") ? "active" : ""}`}
              onClick={() => { navigate("/admin/reports"); closeSidebar(); }}
            >
              <BarChart3 size={20} />
              <span>Reports</span>
            </button>

            {/* Settings */}
            <button
              className={`nav-item ${location.pathname.includes("/admin/settings") ? "active" : ""}`}
              onClick={() => { navigate("/admin/settings"); closeSidebar(); }}
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

        {/* Overlay when sidebar is open on mobile */}
        <div
          className={`mobile-overlay ${sidebarOpen ? "active" : ""}`}
          onClick={closeSidebar}
        />



        {/* ✅ ADMIN NAVBAR — OUTSIDE SCROLL CONTAINER */}
        <AdminNavbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          isSidebarOpen={sidebarOpen}
        />

        {/* ✅ ONLY CONTENT SCROLLS */}
        <main className="main-content">
          <div className="main-content-inner">
            <Outlet />
          </div>
        </main>


      </div>
    </div>
  );
};

export default AdminLayout;