import React from "react";
import { Link } from "react-router-dom";
import noOrderImg from "./images/orderbag.png";

const OrdersPage = () => {
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

      {/* Empty Orders Box */}
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

    </div>
  );
};

export default OrdersPage;
