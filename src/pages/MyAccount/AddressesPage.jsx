import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddressesPage = () => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user address from backend
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("poc_token");

        const response = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        // ⭐ SAFE LOGGING — NO SYNTAX ERROR ANYMORE
        console.log("🔥 FULL PROFILE RESPONSE:", data);
        console.log("🔥 ADDRESS RECEIVED:", data.address || "No address field");
        console.log(
          "🔥 FULL ADDRESS FIELD:",
          data.address?.fullAddress || "fullAddress missing"
        );

        setAddress(data.address || null);
      } catch (error) {
        console.error("Address fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, []);

  // Helper: check if backend returned a valid fullAddress
  const hasAddress =
    address &&
    typeof address.fullAddress === "string" &&
    address.fullAddress.trim().length > 0;

  return (
    <div className="addresses-wrapper">

      {/* Breadcrumb */}
      <p className="breadcrumb">
        <Link to="/" className="breadcrumb-link">HOME</Link>
        <span> / </span>
        <Link to="/my-account" className="breadcrumb-link">MY ACCOUNT</Link>
        <span> / MY ADDRESSES</span>
      </p>

      <h1 className="page-title">My Addresses</h1>

      {/* Loading State */}
      {loading && <p className="loading-text">Loading address...</p>}

      {/* ===========================
           SHOW SAVED ADDRESS
      ============================== */}
      {!loading && hasAddress && (
        <div className="address-card">
          <div className="address-header">
            <strong>{address.name}</strong>
            <span className="tag">{address.type || "Home"}</span>
          </div>

          <p className="full-address">
            {address.fullAddress}
            <br />
            {address.city}, {address.state}, {address.country} - {address.pincode}
          </p>

          <div className="address-footer">
            <button className="edit-btn">✏️ Edit</button>
          </div>
        </div>
      )}

      {/* ===========================
           EMPTY STATE
      ============================== */}
      {!loading && !hasAddress && (
        <div className="no-address-box">
          <h2>No Address Added Yet</h2>
          <p>Please add a delivery address to continue shopping conveniently.</p>

          <button className="explore-btn">
            ADD NEW ADDRESS
          </button>
        </div>
      )}

    </div>
  );
};

export default AddressesPage;
