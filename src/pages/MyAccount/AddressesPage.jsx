import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddAddressForm from "./AddAddressForm";
import { getUserProfile } from "../../api/user";

const AddressesPage = () => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  /* ============================================================
     ⭐ FETCH USER PROFILE → Extract nested address
  ============================================================ */
  const fetchAddress = async () => {
    try {
      setLoading(true);

      const profile = await getUserProfile();
      console.log("✔ FETCHED PROFILE:", profile);

      // Ensure structured address object exists
      const addr = profile.address || {};

      setAddress({
        name: addr.name || `${profile.firstName} ${profile.lastName}`.trim(),
        type: addr.type || "Home",
        fullAddress: addr.fullAddress || "",
        city: addr.city || "",
        state: addr.state || "",
        country: addr.country || "",
        pincode: addr.pincode || "",
      });
    } catch (err) {
      console.error("❌ Error fetching user address:", err);
      setAddress(null);
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     ⭐ Run once on mount
  ============================================================ */
  useEffect(() => {
    fetchAddress();
  }, []);

  /* ============================================================
     ⭐ Check Address Availability
  ============================================================ */
  const hasAddress =
    address &&
    address.fullAddress &&
    address.fullAddress.trim() !== "";

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

      {/* ================================ */}
      {/* ⭐ Loading */}
      {/* ================================ */}
      {loading && <p className="loading-text">Loading address...</p>}

      {/* ================================ */}
      {/* ⭐ Address Exists */}
      {/* ================================ */}
      {!loading && hasAddress && (
        <div className="address-card">
          <div className="address-header">
            <strong>{address.name}</strong>
            <span className="tag">{address.type}</span>
          </div>

          <p className="full-address">
            {address.fullAddress}
            <br />
            {address.city}, {address.state}, {address.country} - {address.pincode}
          </p>

          <div className="address-footer">
            <button className="edit-btn" onClick={() => setShowForm(true)}>
              ✏️ Edit
            </button>
          </div>
        </div>
      )}

      {/* ================================ */}
      {/* ⭐ No Address Found */}
      {/* ================================ */}
      {!loading && !hasAddress && (
        <div className="no-address-box">
          <h2>No Address Added Yet</h2>
          <p>Please add a delivery address to continue shopping.</p>

          <button className="explore-btn" onClick={() => setShowForm(true)}>
            ADD NEW ADDRESS
          </button>
        </div>
      )}

      {/* ================================ */}
      {/* ⭐ Add / Edit Modal */}
      {/* ================================ */}
      {showForm && (
        <AddAddressForm
          onClose={() => setShowForm(false)}
          onSaved={() => {
            fetchAddress();   // refresh from backend
            setShowForm(false);
          }}
        />
      )}

    </div>
  );
};

export default AddressesPage;
