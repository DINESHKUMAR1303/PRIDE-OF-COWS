import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddAddressForm from "./AddAddressForm";
import { getUserProfile } from "../../api/user";
import { MapPin, Home, Briefcase, Plus, Edit2, Trash2 } from "lucide-react";
import "./AddressesPage.css";

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
        name: addr.name || `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "User",
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

  const hasAddress = address && address.fullAddress && address.fullAddress.trim() !== "";

  const getAddressIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "home": return <Home size={18} />;
      case "work": return <Briefcase size={18} />;
      default: return <MapPin size={18} />;
    }
  };

  return (
    <div className="addresses-wrapper">
      {/* Breadcrumb Section */}
      <p className="breadcrumb">
        <Link to="/" className="breadcrumb-link">HOME</Link> /
        <Link to="/my-account/profile" className="breadcrumb-link">MY ACCOUNT</Link> /
        <span>MY ADDRESSES</span>
      </p>

      <h1 className="page-title">My Addresses</h1>

      {loading ? (
        <p className="loading-text">Loading your address...</p>
      ) : (
        <div className="addresses-grid">
          {/* Main Address Card */}
          {hasAddress ? (
            <div className="address-card">
              <div className="address-card-header">
                <div className="address-type-group">
                  <div className="address-icon-wrapper">
                    {getAddressIcon(address.type)}
                  </div>
                  <span className="address-tag-label">{address.type}</span>
                </div>

                <div className="address-card-actions">
                  <button className="icon-action-btn edit" onClick={() => setShowForm(true)} title="Edit">
                    <Edit2 size={16} />
                  </button>
                  <button className="icon-action-btn delete" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="address-card-content">
                <h3 className="address-holder-name">{address.name}</h3>
                <p className="address-detailed-text">
                  {address.fullAddress}
                  <br />
                  {address.city}, {address.state}, {address.country} - {address.pincode}
                </p>
              </div>
            </div>
          ) : null}

          {/* Consistent Add Placeholder (Visible if no address OR shown as next in grid if multiple supported) */}
          <div className="add-address-placeholder" onClick={() => setShowForm(true)}>
            <div className="add-circle">
              <Plus size={24} />
            </div>
            <span>Add New Address</span>
          </div>
        </div>
      )}

      {/* Form Modal */}
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