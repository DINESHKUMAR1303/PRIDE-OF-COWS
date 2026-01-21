import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../api/order";
import { fetchAllUsers } from "../../api/user";
import { fetchProducts } from "../../api/product";
import "./Dashboard.css";

/* ===== ICONS (lucide-react) ===== */
import {
  ShoppingCart,
  DollarSign,
  UserPlus,
  TrendingUp,
  Filter,
  Download,
  Calendar,
  Clock,
  ArrowRight,
  Package,
  ClipboardList,
  CheckCircle,
  XCircle,
  Truck,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    users: 0,
    todayOrders: 0,
    recentOrders: [],
    orderMap: { pending: 0, confirmed: 0, shipped: 0, delivered: 0, cancelled: 0 },
    products: { total: 0, active: 0, inactive: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [ordersRes, usersRes, productsRes] = await Promise.all([
          getAllOrders(),
          fetchAllUsers(),
          fetchProducts()
        ]);

        const orders = ordersRes.data.orders || [];
        const users = usersRes.data || usersRes.users || [];
        const products = productsRes.products || productsRes.data || [];

        // 1. Calculate Total Revenue (Confirmed/Delivered)
        const revenue = orders.reduce((acc, order) => {
          const status = order.status?.toLowerCase();
          if (["confirmed", "delivered", "shipped"].includes(status)) {
            return acc + (order.totalAmount || order.totalPrice || 0);
          }
          return acc;
        }, 0);

        // 2. Today's Orders
        const todayStr = new Date().toDateString();
        const todayOrders = orders.filter(
          (o) => new Date(o.createdAt).toDateString() === todayStr
        ).length;

        // 3. Recent Orders (Top 5)
        const recentOrders = [...orders]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        // 4. Order Status map
        const orderMap = { pending: 0, confirmed: 0, shipped: 0, delivered: 0, cancelled: 0 };
        orders.forEach(o => {
          const st = o.status?.toLowerCase();
          if (orderMap[st] !== undefined) orderMap[st]++;
        });

        // 5. Product Stats
        const activeProducts = products.filter(p => p.isActive).length;

        setStats({
          orders: orders.length,
          revenue,
          users: users.length,
          todayOrders,
          recentOrders,
          orderMap,
          products: {
            total: products.length,
            active: activeProducts,
            inactive: products.length - activeProducts
          }
        });
      } catch (err) {
        console.error("Dashboard Data Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading Dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* ================= PAGE HEADER ================= */}
      <header className="page-header">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Welcome back! Here's your store's performance.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Filter size={16} />
            Filter
          </button>
          <button className="btn-primary" onClick={() => navigate("/admin/reports")}>
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
              <TrendingUp size={14} /> +12% vs last month
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
              <TrendingUp size={14} /> +8% vs last month
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon new-customers">
            <UserPlus size={24} />
          </div>
          <div className="metric-info">
            <p>Total Customers</p>
            <h3>{stats.users.toLocaleString()}</h3>
            <span className="trend up">
              <TrendingUp size={14} /> +4% new
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
              <TrendingUp size={14} /> Daily average
            </span>
          </div>
        </div>
      </section>

      {/* ================= MAIN GRID (ROW 1) ================= */}
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
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
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
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                className="chart-line-anim"
              />

              {[300, 550, 850].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={[140, 130, 100][i]}
                  r="6"
                  fill="#ffffff"
                  stroke="#16c784"
                  strokeWidth="3"
                  className="chart-point"
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
            <button className="view-all-btn" onClick={() => navigate("/admin/orders")}>
              View All <ArrowRight size={14} />
            </button>
          </div>
          <ul className="orders-list">
            {stats.recentOrders.length === 0 ? (
              <li className="no-orders">No orders found.</li>
            ) : (
              stats.recentOrders.map((order) => {
                let customerName = "Guest";
                if (order.userId) {
                  customerName =
                    (order.userId.firstName
                      ? `${order.userId.firstName} ${order.userId.lastName}`
                      : order.userId.name) ||
                    (order.userId.email ? order.userId.email.split("@")[0] : "Guest");
                }

                return (
                  <li key={order._id}>
                    <div className="order-item-left">
                      <div className="order-id-badge">#{order._id.substring(0, 6)}</div>
                      <div className="order-details-box">
                        <span className="customer-name-text">{customerName}</span>
                        <small>
                          <Clock size={12} />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                    <div className="order-item-right">
                      <strong className="amount">
                        ₹{order.totalAmount || order.totalPrice}
                      </strong>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </section>

      {/* ================= INSIGHTS GRID (ROW 2) ================= */}
      <section className="insights-grid">
        {/* Order Status Breakdown */}
        <div className="insight-card">
          <div className="card-header">
            <h3>Order Statistics</h3>
            <ClipboardList size={18} className="header-icon-faded" />
          </div>
          <div className="status-bars-container">
            <div className="status-bar-row">
              <div className="status-info">
                <span>Pending</span>
                <strong>{stats.orderMap.pending}</strong>
              </div>
              <div className="progress-bg"><div className="progress-fill pending" style={{ width: `${(stats.orderMap.pending / stats.orders) * 100 || 0}%` }}></div></div>
            </div>
            <div className="status-bar-row">
              <div className="status-info">
                <span>Confirmed</span>
                <strong>{stats.orderMap.confirmed}</strong>
              </div>
              <div className="progress-bg"><div className="progress-fill confirmed" style={{ width: `${(stats.orderMap.confirmed / stats.orders) * 100 || 0}%` }}></div></div>
            </div>
            <div className="status-bar-row">
              <div className="status-info">
                <span>Shipped</span>
                <strong>{stats.orderMap.shipped}</strong>
              </div>
              <div className="progress-bg"><div className="progress-fill shipped" style={{ width: `${(stats.orderMap.shipped / stats.orders) * 100 || 0}%` }}></div></div>
            </div>
            <div className="status-bar-row">
              <div className="status-info">
                <span>Delivered</span>
                <strong>{stats.orderMap.delivered}</strong>
              </div>
              <div className="progress-bg"><div className="progress-fill delivered" style={{ width: `${(stats.orderMap.delivered / stats.orders) * 100 || 0}%` }}></div></div>
            </div>
          </div>
        </div>

        {/* Product Inventory Overview */}
        <div className="insight-card">
          <div className="card-header">
            <h3>Product Overview</h3>
            <Package size={18} className="header-icon-faded" />
          </div>
          <div className="product-stats-box">
            <div className="p-stat-item">
              <div className="p-icon-wrap blue"><Package size={20} /></div>
              <div>
                <h4>{stats.products.total}</h4>
                <p>Total Products</p>
              </div>
            </div>
            <div className="p-stat-item">
              <div className="p-icon-wrap green"><CheckCircle size={20} /></div>
              <div>
                <h4>{stats.products.active}</h4>
                <p>Active</p>
              </div>
            </div>
            <div className="p-stat-item">
              <div className="p-icon-wrap red"><XCircle size={20} /></div>
              <div>
                <h4>{stats.products.inactive}</h4>
                <p>Inactive</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Dashboard;