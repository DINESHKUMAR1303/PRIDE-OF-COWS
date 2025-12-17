import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/admin";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    revenue: 0,
    todayOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboardStats();
        setStats({
          users: data?.users ?? 0,
          orders: data?.orders ?? 0,
          revenue: data?.revenue ?? 0,
          todayOrders: data?.todayOrders ?? 0,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin", { replace: true });
  };

  if (loading) {
    return <div className="admin-dashboard-loading">Loading dashboard…</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-wrapper">

        {/* ================= SIDEBAR ================= */}
        <aside className="sidebar">
          <div className="sidebar-top">
            <div className="logo-box">🐄</div>
            <div>
              <h3>Pride of Cows</h3>
              <span>Admin Panel</span>
            </div>
          </div>

          <nav className="sidebar-menu">
            <button className="active">Dashboard</button>
            <button>Orders</button>
            <button>Products</button>
            <button>Customers</button>
            <button>Settings</button>
          </nav>

          <div className="sidebar-bottom">
            <div className="admin-info">
              <strong>Admin User</strong>
              <span>Super Admin</span>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="main-area">

          <header className="topbar">
            <div>
              <h2>Hello, Admin 👋</h2>
              <p>Here’s what’s happening today</p>
            </div>

            <input
              className="search-input"
              placeholder="Search anything..."
            />
          </header>

          {/* ================= STATS ================= */}
          <section className="stats-grid">
            <div className="stat-card">
              <span>Total Orders</span>
              <h3>{stats.orders}</h3>
              <small className="positive">+12%</small>
            </div>

            <div className="stat-card">
              <span>Total Revenue</span>
              <h3>₹{stats.revenue}</h3>
              <small className="positive">+5%</small>
            </div>

            <div className="stat-card">
              <span>New Customers</span>
              <h3>{stats.users}</h3>
              <small className="positive">+2%</small>
            </div>

            <div className="stat-card">
              <span>Today Orders</span>
              <h3>{stats.todayOrders}</h3>
            </div>
          </section>

          {/* ================= CONTENT ================= */}
          <section className="content-grid">

            <div className="card large">
              <h3>Sales Activity</h3>
              <p className="muted">Revenue performance over time</p>

              <div className="chart-placeholder">
                <div className="chart-line" />
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Recent Orders</h3>
                <button className="view-all">View All</button>
              </div>

              <ul className="order-list">
                <li><span>#1024</span><strong>₹120.00</strong></li>
                <li><span>#1023</span><strong>₹85.50</strong></li>
                <li><span>#1022</span><strong>₹210.00</strong></li>
                <li><span>#1021</span><strong>₹1200.00</strong></li>
              </ul>
            </div>

          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
