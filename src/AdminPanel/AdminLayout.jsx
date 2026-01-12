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

  const [adminUser, setAdminUser] = useState({
    name: "Admin User",
    designation: "Super Admin",
    departments: [],
    profileImage: ""
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure departments is an array (handle potential stringified JSON from DB)
        if (typeof parsed.departments === 'string') {
          parsed.departments = JSON.parse(parsed.departments);
        }
        setAdminUser(parsed);
      }
    } catch (err) {
      console.error("Failed to load admin user", err);
    }
  }, []);

  // Check permissions
  const hasPermission = (dept) => {
    // ⭐ BYPASS: If user is "Administrator" or "Super Admin", give full access
    if (adminUser.designation === "Administrator" || adminUser.designation === "Super Admin") {
      return true;
    }

    // Otherwise, check strict permissions
    if (!adminUser.departments || adminUser.departments.length === 0) return false;
    return adminUser.departments.includes(dept);
  };

  // User Module submenu state
  const [userMenuOpen, setUserMenuOpen] = useState(
    location.pathname.includes("/admin/users")
  );

  // Product Module submenu state
  const [productMenuOpen, setProductMenuOpen] = useState(
    location.pathname.includes("/admin/products")
  );

  // Mobile sidebar toggle state
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // ✅ AUTO-CLOSE SIDEBAR ON ROUTE CHANGE (FIX)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);


  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
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
            {hasPermission("Dashboard") && (
              <button
                className={`nav-item ${location.pathname === "/admin/dashboard" ? "active" : ""}`}
                onClick={() => { navigate("/admin/dashboard"); closeSidebar(); }}
              >
                <LayoutGrid size={20} />
                <span>Dashboard</span>
              </button>
            )}

            {/* User Module */}
            {hasPermission("User Module") && (
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
            )}

            {/* Product Module */}
            {hasPermission("Product") && (
              <div className={`user-module ${productMenuOpen ? "open" : ""}`}>
                <button
                  className={`nav-item user-module-btn ${location.pathname.includes("/admin/products") ? "active" : ""}`}
                  onClick={() => setProductMenuOpen(!productMenuOpen)}
                >
                  <div className="user-module-left">
                    <Package size={20} />
                    <span>Product</span>
                  </div>
                  <ChevronRight size={18} className="chevron" />
                </button>

                {productMenuOpen && (
                  <div className="user-submenu">
                    <button
                      className={`submenu-item ${location.pathname === "/admin/products/add" ? "active" : ""}`}
                      onClick={() => { navigate("/admin/products/add"); closeSidebar(); }}
                    >
                      <Package size={16} />
                      <span>Add Product</span>
                    </button>
                    <button
                      className={`submenu-item ${location.pathname === "/admin/products/manage" ? "active" : ""}`}
                      onClick={() => { navigate("/admin/products/manage"); closeSidebar(); }}
                    >
                      <Folder size={16} />
                      <span>Manage Product</span>
                    </button>
                  </div>
                )}
              </div>
            )}


            {/* Booking */}
            {hasPermission("Booking") && (
              <button
                className={`nav-item ${location.pathname.includes("/admin/booking") ? "active" : ""}`}
                onClick={() => { navigate("/admin/booking"); closeSidebar(); }}
              >
                <CalendarCheck size={20} />
                <span>Booking</span>
              </button>
            )}

            {/* Customers */}
            {hasPermission("Customers") && (
              <button
                className={`nav-item ${location.pathname.includes("/admin/customers") ? "active" : ""}`}
                onClick={() => { navigate("/admin/customers"); closeSidebar(); }}
              >
                <UserCheck size={20} />
                <span>Customers</span>
              </button>
            )}


            {/* Reports */}
            {hasPermission("Reports") && (
              <button
                className={`nav-item ${location.pathname.includes("/admin/reports") ? "active" : ""}`}
                onClick={() => { navigate("/admin/reports"); closeSidebar(); }}
              >
                <BarChart3 size={20} />
                <span>Reports</span>
              </button>
            )}

            {/* Settings */}
            {hasPermission("Settings") && (
              <button
                className={`nav-item ${location.pathname.includes("/admin/settings") ? "active" : ""}`}
                onClick={() => { navigate("/admin/settings"); closeSidebar(); }}
              >
                <Settings size={20} />
                <span>Settings</span>
              </button>
            )}
          </nav>

          {/* Footer */}
          <div className="sidebar-footer">
            <div className="admin-profile">
              {adminUser.profileImage ? (
                <img
                  src={`http://localhost:5000${adminUser.profileImage}`}
                  alt="Profile"
                  className="avatar-img"
                  style={{ width: 40, height: 40, borderRadius: "12px", objectFit: "cover" }}
                />
              ) : (
                <div className="avatar">{adminUser.name?.charAt(0) || "A"}</div>
              )}

              <div className="admin-profile-info">
                <strong>{adminUser.name}</strong>
                <p>{adminUser.designation}</p>
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