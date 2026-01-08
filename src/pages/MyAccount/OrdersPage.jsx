import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const token = localStorage.getItem("poc_token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders(token);
        const data = res?.data || {};

        if (!data.success || !Array.isArray(data.orders)) {
          setOrders([]);
          return;
        }

        const formatted = data.orders.map((order) => ({
          ...order,
          items: order.items.map((item) => ({
            title: item.name,
            qty: item.quantity,
            price: item.price,
            img: productData[item.productId]?.img || "",
            weight: productData[item.productId]?.weight || ""
          }))
        }));

        setOrders(formatted);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [token]);

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
                {order.items.map((item, index) => (
                  <div key={index} className="order-item-row">
                    <div className="order-item-img-container">
                      <img src={item.img} alt={item.title} className="order-item-img" />
                    </div>
                    <div className="order-item-details">
                      <p className="item-name">{item.title}</p>
                      <div className="item-meta">
                        <span>{item.weight}</span>
                        <span>Qty: {item.qty}</span>
                      </div>
                    </div>
                    <div className="item-price-col">
                      ₹{item.price * item.qty}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="total-summary">
                  <span className="total-label">Total Amount</span>
                  <span className="total-amount-val">₹{order.totalAmount}</span>
                </div>
                <div className="order-actions">
                  <button className="details-btn">View Details</button>
                  <button className="reorder-btn">Reorder</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
