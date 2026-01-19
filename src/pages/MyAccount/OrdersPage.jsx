import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import noOrderImg from "./images/orderbag.png";
import { getMyOrders } from "../../api/order";
import "./OrderPage.css";

// LOCAL PRODUCT LOOKUP (Backend does NOT store images or weights)
import prod1 from "../../components/ProductCarousel/images/onelitermilk.png";
import prod2 from "../../components/ProductCarousel/images/purecurd.png";
import prod3 from "../../components/ProductCarousel/images/ghee.png";
import prod4 from "../../components/ProductCarousel/images/panner.png";
import prod5 from "../../components/ProductCarousel/images/proteinbar.png";
import prod6 from "../../components/ProductCarousel/images/proteinbarpack.png";

const productData = {
  1: { img: prod1, weight: "1L" },
  2: { img: prod2, weight: "320g" },
  3: { img: prod3, weight: "200ml" },
  4: { img: prod4, weight: "200g" },
  5: { img: prod5, weight: "40g" },
  6: { img: prod6, weight: "320g" }
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [productMap, setProductMap] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const token = localStorage.getItem("poc_token");
  const navigate = useNavigate();
  const { increaseItem } = useCart();

  // 1️⃣ Fetch Products to create a lookup map
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { fetchProducts } = await import("../../api/product");
        const res = await fetchProducts(false); // Fetch all (even inactive)
        const map = {};
        if (res.data) {
          res.data.forEach((p) => {
            map[p._id] = {
              img: p.image,
              weight: p.weight
            };
          });
        }
        setProductMap(map);
      } catch (err) {
        console.error("Failed to load products map", err);
      }
    };
    loadProducts();
  }, []);

  // 2️⃣ Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders(token);
        const data = res?.data || {};

        if (!data.success || !Array.isArray(data.orders)) {
          setOrders([]);
          return;
        }

        setOrders(data.orders);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [token]);

  // Helper to get product details
  const getProductDetails = (id) => {
    if (productMap[id]) return productMap[id];
    // Fallback for old integer IDs if any exist
    const fallbackData = {
      1: { img: prod1, weight: "1L" },
      2: { img: prod2, weight: "320g" },
      3: { img: prod3, weight: "200ml" },
      4: { img: prod4, weight: "200g" },
      5: { img: prod5, weight: "40g" },
      6: { img: prod6, weight: "320g" }
    };
    return fallbackData[id] || { img: "", weight: "" };
  };

  const handleReorder = (order) => {
    order.items.forEach(item => {
      // Add quantity times (since context only supports +1)
      for (let i = 0; i < item.quantity; i++) {
        increaseItem(item.productId);
      }
    });
    navigate("/cart");
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="orders-wrapper">
      <p className="breadcrumb">
        <Link to="/" className="breadcrumb-link">HOME</Link> /
        <Link to="/my-account/profile" className="breadcrumb-link">MY ACCOUNT</Link> /
        <span>MY ORDERS</span>
      </p>

      <h1 className="page-title">My Orders</h1>

      {/* If NO ORDERS */}
      {orders.length === 0 && (
        <div className="no-order-box">
          <img src={noOrderImg} alt="No Orders" className="no-order-img" />
          <h2>Hungry for quality?</h2>
          <p>You haven't placed any orders yet. Start exploring our premium dairy products.</p>
          <Link to="/shop/all" className="explore-btn">
            START SHOPPING
          </Link>
        </div>
      )}

      {/* If ORDERS EXIST */}
      {orders.length > 0 && (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-header-left">
                  <span className="order-id">Order #{order._id.slice(-6).toUpperCase()}</span>
                  <span className="order-date-text">
                    {new Date(order.deliveryDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className={`order-status-pill ${order.status?.toLowerCase() || 'pending'}`}>
                  {order.status || "Placed"}
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => {
                  const details = getProductDetails(item.productId);
                  const isLocal = details.img && !details.img.startsWith("/uploads");
                  const imgSrc = details.img
                    ? (isLocal ? details.img : `http://localhost:5000${details.img}`)
                    : "https://via.placeholder.com/150?text=No+Image";

                  return (
                    <div key={index} className="order-item-row">
                      <div className="order-item-img-container">
                        <img src={imgSrc} alt={item.name} className="order-item-img" onError={(e) => e.target.src = "https://via.placeholder.com/150"} />
                      </div>
                      <div className="order-item-details">
                        <p className="item-name">{item.name}</p>
                        <div className="item-meta">
                          <span>{details.weight}</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="item-price-col">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="order-footer">
                <div className="total-summary">
                  <span className="total-label">Total Amount</span>
                  <span className="total-amount-val">₹{order.totalAmount}</span>
                </div>
                <div className="order-actions">
                  <button className="details-btn" onClick={() => handleViewDetails(order)}>View Details</button>
                  <button className="reorder-btn" onClick={() => handleReorder(order)}>Reorder</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details</h3>
              <button className="close-btn" onClick={() => setSelectedOrder(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-row">
                <strong>Order ID:</strong> #{selectedOrder._id.slice(-6).toUpperCase()}
              </div>
              <div className="modal-row">
                <strong>Date:</strong> {new Date(selectedOrder.deliveryDate).toLocaleDateString()}
              </div>
              <div className="modal-row">
                <strong>Status:</strong> <span className={`status-text ${selectedOrder.status}`}>{selectedOrder.status}</span>
              </div>
              <div className="modal-row address-row">
                <strong>Address:</strong>
                <p>{selectedOrder.address}</p>
              </div>

              <div className="modal-items">
                <h4>Items</h4>
                {selectedOrder.items.map((item, idx) => {
                  const details = getProductDetails(item.productId);
                  const isLocal = details.img && !details.img.startsWith("/uploads");
                  const imgSrc = details.img
                    ? (isLocal ? details.img : `http://localhost:5000${details.img}`)
                    : "https://via.placeholder.com/150?text=No+Image";

                  return (
                    <div key={idx} className="modal-item">
                      <img src={imgSrc} alt={item.name} />
                      <div className="modal-item-info">
                        <span className="name">{item.name}</span>
                        <span className="qty">Qty: {item.quantity}</span>
                        <span className="price">₹{item.price}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="modal-footer">
                <span className="total-label">Total Amount:</span>
                <span className="total-value">₹{selectedOrder.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;