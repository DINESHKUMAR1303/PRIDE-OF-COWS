import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddAddressForm from "./AddAddressForm";
import { getUserProfile } from "../../api/user";
import "./AddAddressForm.css";


const AddressesPage = () => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchAddress = async () => {
    try {
      setLoading(true);
      const profile = await getUserProfile();

      const addr = profile.address || {};

      setAddress({
        name:
          addr.name ||
          `${profile.firstName || ""} ${profile.lastName || ""}`.trim() ||
          "User",
        type: addr.type || "Home",
        fullAddress: addr.fullAddress || "",
        city: addr.city || "",
        state: addr.state || "",
        country: addr.country || "",
        pincode: addr.pincode || "",
      });
    } catch (err) {
      console.error("Error fetching user address:", err);
      setAddress(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

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

      {/* Loading State */}
      {loading && <p className="loading-text">Loading your address...</p>}

      {/* Address Exists */}
      {!loading && hasAddress && (
        <div className="address-card">

          {/* ⭐ Name ABOVE — Home BELOW */}
         <div className="address-header">
  <span className="address-name">{address.name}</span>
  <span className="address-tag">{address.type}</span>
</div>

          <p className="full-address">
            {address.fullAddress}
            <br />
            {address.city}, {address.state}, {address.country} - {address.pincode}
          </p>

          {/* Edit Button */}
          <div className="address-footer">
            <button
              className="edit-btn"
              onClick={() => setShowForm(true)}
              aria-label="Edit address"
            >
              Edit
            </button>
          </div>
        </div>
      )}

      {/* No Address */}
      {!loading && !hasAddress && (
        <div className="no-address-box">
          <h2>No Address Added Yet</h2>
          <p>Please add a delivery address to continue shopping.</p>

          <button className="add-new-btn" onClick={() => setShowForm(true)}>
            + Add New Address
          </button>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <AddAddressForm
          existingAddress={hasAddress ? address : null}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            fetchAddress();
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};

export default AddressesPage;
