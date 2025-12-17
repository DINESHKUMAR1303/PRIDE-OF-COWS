import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/admin";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import logo from "./images/logo.png";

/* ===== ICONS (lucide-react) ===== */
import {
  LayoutGrid,
  ShoppingCart,
  Package,
  Users,
  Settings,
  DollarSign,
  UserPlus,
  TrendingUp,
  Filter,
  Download,
  LogOut,
  Calendar,
  Clock,
  User,
  QrCode,
  ChevronRight,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 86,
    orders: 1245,
    revenue: 45230,
    todayOrders: 12,
  });
  const [loading, setLoading] = useState(true);

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        const data = await getDashboardStats();
        setStats({
          users: data?.users ?? 86,
          orders: data?.orders ?? 1245,
          revenue: data?.revenue ?? 45230,
          todayOrders: data?.todayOrders ?? 12,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };
    loadDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin", { replace: true });
  };

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        <div className="loader"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-wrapper">
        {/* ================= SIDEBAR (Desktop) ================= */}
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
            <button className="nav-item active">
              <LayoutGrid size={20} />
              <span>Dashboard</span>
            </button>
          


{/* ===== USER MODULE ===== */}
<div className={`user-module ${userMenuOpen ? "open" : ""}`}>
  <button
    className={`nav-item user-module-btn ${userMenuOpen ? "active" : ""}`}
    onClick={() => setUserMenuOpen(!userMenuOpen)}
  >
    <Users size={20} />
    <span>User Module</span>
    <ChevronRight size={16} className="chevron" />
  </button>

  <div className="user-submenu">
    <button
      className="submenu-item"
      onClick={() => navigate("/admin/users/add")}
    >
      New User
    </button>

    <button
      className="submenu-item active"
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
            <button onClick={handleLogout} className="logout-btn" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="main-content">
          <header className="page-header">
            <div>
              <h2>Dashboard Overview</h2>
              <p>Welcome back! Here's what's happening today.</p>
            </div>
            <div className="header-actions">
              <button className="btn-secondary">
                <Filter size={16} />
                Filter
              </button>
              <button className="btn-primary">
                <Download size={16} />
                Export Report
              </button>
            </div>
          </header>

          {/* ================= KEY METRICS ================= */}
          <section className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon total-orders">
                <ShoppingCart size={24} />
              </div>
              <div className="metric-info">
                <p>Total Orders</p>
                <h3>{stats.orders.toLocaleString()}</h3>
                <span className="trend up">
                  <TrendingUp size={14} /> +12.5%
                </span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon revenue">
                <DollarSign size={24} />
              </div>
              <div className="metric-info">
                <p>Total Revenue</p>
                <h3>₹{stats.revenue.toLocaleString()}</h3>
                <span className="trend up">
                  <TrendingUp size={14} /> +8.2%
                </span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon new-customers">
                <UserPlus size={24} />
              </div>
              <div className="metric-info">
                <p>New Customers</p>
                <h3>{stats.users}</h3>
                <span className="trend up">
                  <TrendingUp size={14} /> +4.7%
                </span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon today-orders">
                <Calendar size={24} />
              </div>
              <div className="metric-info">
                <p>Today's Orders</p>
                <h3>{stats.todayOrders}</h3>
                <span className="trend up">
                  <TrendingUp size={14} /> +3 new
                </span>
              </div>
            </div>
          </section>

          {/* ================= MAIN GRID ================= */}
          <section className="content-grid">
            {/* Sales Activity Chart */}
            <div className="chart-card">
              <div className="card-header">
                <div>
                  <h3>Sales Activity</h3>
                  <p className="subtitle">Revenue trend over the last 7 days</p>
                </div>
                <div className="legend">
                  <span className="dot"></span>
                  <small>This Week</small>
                </div>
              </div>

              <div className="chart-container">
                <svg
                  viewBox="0 0 900 320"
                  className="sales-chart"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16c784" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#16c784" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  <path
                    d="M0 250 
                       C120 180 200 100 300 140 
                       C400 220 480 180 550 130 
                       C650 80 750 120 850 100 
                       C900 90 900 320 900 320 L0 320 Z"
                    fill="url(#gradientFill)"
                  />

                  <path
                    d="M0 250 
                       C120 180 200 100 300 140 
                       C400 220 480 180 550 130 
                       C650 80 750 120 850 100 
                       C900 90 900 90 900 90"
                    fill="none"
                    stroke="#16c784"
                    strokeWidth="5"
                    strokeLinecap="round"
                    filter="url(#glow)"
                  />

                  {[300, 550, 850].map((x, i) => (
                    <circle
                      key={i}
                      cx={x}
                      cy={[140, 130, 100][i]}
                      r="8"
                      fill="#ffffff"
                      stroke="#16c784"
                      strokeWidth="4"
                    />
                  ))}
                </svg>

                <div className="chart-labels">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="recent-orders-card">
              <div className="card-header">
                <h3>Recent Orders</h3>
                <button className="view-all-btn">View All →</button>
              </div>
              <ul className="orders-list">
                <li>
                  <div>
                    <strong>#1024</strong>
                    <small><Clock size={12} /> 2 hours ago</small>
                  </div>
                  <strong className="amount">₹120.00</strong>
                </li>
                <li>
                  <div>
                    <strong>#1023</strong>
                    <small><Clock size={12} /> 5 hours ago</small>
                  </div>
                  <strong className="amount">₹85.50</strong>
                </li>
                <li>
                  <div>
                    <strong>#1022</strong>
                    <small><Clock size={12} /> Yesterday</small>
                  </div>
                  <strong className="amount">₹210.00</strong>
                </li>
                <li>
                  <div>
                    <strong>#1021</strong>
                    <small><Clock size={12} /> Yesterday</small>
                  </div>
                  <strong className="amount">₹1,200.00</strong>
                </li>
              </ul>
            </div>
          </section>
        </main>

        {/* ================= MOBILE BOTTOM NAVIGATION ================= */}
        <nav className="mobile-bottom-nav">
          <div className="mobile-nav-items">
            <button className="mobile-nav-item">
              <User size={24} />
            </button>

            <button className="mobile-nav-item">
              <ShoppingCart size={24} />
            </button>

            <button className="mobile-nav-item highlight">
              <QrCode size={28} />
            </button>

            <button className="mobile-nav-item">
              <Package size={24} />
            </button>

            <button className="mobile-nav-item">
              <Settings size={24} />
            </button>
          </div>

          {/* Floating Arrow Button */}
          <button className="mobile-floating-arrow">
            <ChevronRight size={28} />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;