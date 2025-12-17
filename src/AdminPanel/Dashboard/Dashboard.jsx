import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-layout">

      {/* ========== SIDEBAR ========== */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-circle" />
          <div>
            <h1>Pride of Cows</h1>
            <p>Admin Panel</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a className="nav-item active">Dashboard</a>
          <a className="nav-item">Bookings</a>
          <a className="nav-item">Users</a>
          <a className="nav-item">Revenue</a>
          <a className="nav-item">Logistics</a>
          <a className="nav-item">Support</a>
          <a className="nav-item">Settings</a>
        </nav>

        <div className="sidebar-footer">
          <strong>Admin User</strong>
          <span>Super Admin</span>
        </div>
      </aside>

      {/* ========== MAIN ========== */}
      <main className="main">

        {/* HEADER */}
        <header className="header">
          <h2>Overview</h2>
          <input className="search" placeholder="Search orders, users..." />
        </header>

        {/* CONTENT */}
        <section className="content">

          {/* STATS */}
          <div className="stats">
            <div className="stat-card">
              <p>Total Bookings Today</p>
              <h3>1,240</h3>
            </div>
            <div className="stat-card">
              <p>Revenue This Week</p>
              <h3>₹12,450</h3>
            </div>
            <div className="stat-card">
              <p>Pending Approvals</p>
              <h3>12</h3>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-card">
            <h3>Pending Actions</h3>

            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Requester</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>New Vendor</td>
                  <td>Green Farms Ltd</td>
                  <td className="pending">Pending</td>
                  <td><button>Review</button></td>
                </tr>
                <tr>
                  <td>Refund Request</td>
                  <td>John Doe</td>
                  <td className="alert">Alert</td>
                  <td><button className="danger">Resolve</button></td>
                </tr>
              </tbody>
            </table>
          </div>

        </section>
      </main>
    </div>
  );
};

export default Dashboard;
