import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noOrderImg from "./images/orderbag.png";
import { getMyOrders } from "../../api/order";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("poc_token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders(token);

        // Backend may return: { success: true, orders: [...] }
        setOrders(res.data.orders || res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="orders-wrapper">

      {/* Breadcrumb */}
      <p className="breadcrumb">
        <Link to="/" className="breadcrumb-link">HOME</Link>
        <span> / </span>
        <Link to="/my-account" className="breadcrumb-link">MY ACCOUNT</Link>
        <span> / MY ORDERS</span>
      </p>

      {/* Page Title */}
      <h1 className="page-title">Orders</h1>

      {/* If NO ORDERS */}
      {orders.length === 0 && (
        <div className="no-order-box">
          <img
            src={noOrderImg}
            alt="No Orders"
            className="no-order-img"
          />

          <h2>No Order Found!</h2>
          <p>Start shopping and experience premium dairy at home.</p>

          <Link to="/shop/all" className="explore-btn">
            EXPLORE MORE PRODUCTS
          </Link>
        </div>
      )}

      {/* If ORDERS EXIST */}
      {orders.length > 0 && (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">

              <div className="order-header">
                <h3>Order #{order._id.slice(-6)}</h3>
                <span className="order-status">{order.status || "Placed"}</span>
              </div>

              <p className="order-date">
                Delivery:{" "}
                <strong>
                  {new Date(order.deliveryDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </strong>
              </p>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item-row">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="order-item-img"
                    />

                    <div className="order-item-info">
                      <p className="item-title">{item.title}</p>
                      <p className="item-weight">{item.weight}</p>
                      <p className="item-qty">Qty: {item.qty}</p>
                    </div>

                    <p className="item-amount">₹{item.price * item.qty}</p>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <p className="order-total">
                  Total Amount: <strong>₹{order.totalAmount}</strong>
                </p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;