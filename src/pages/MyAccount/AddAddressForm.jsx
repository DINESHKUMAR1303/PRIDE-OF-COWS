import React, { useState } from "react";

const AddAddressForm = ({ onClose, onSaved }) => {
  const user = JSON.parse(localStorage.getItem("poc_user"));

  const [formData, setFormData] = useState({
    name: user ? `${user.firstName} ${user.lastName}` : "",
    type: "Home",
    fullAddress: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Input change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Required field validation
  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.fullAddress.trim() &&
      formData.city.trim() &&
      formData.state.trim() &&
      formData.country.trim() &&
      formData.pincode.trim()
    );
  };

  // Submit form → Save address
  const handleSubmit = async (e) => {
    e.preventDefault(); // ⭐ IMPORTANT: Stops page refresh

    if (!isFormValid()) {
      setErrorMsg("Please fill all fields.");
      return;
    }

    try {
      setSaving(true);
      setErrorMsg("");

      const token = localStorage.getItem("poc_token");

      const res = await fetch("http://localhost:5000/api/user/address", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData), // ⭐ Send full form data
      });

      const data = await res.json();
      console.log("✔ Address Saved:", data);

      if (res.ok) {
        onSaved();   // Refresh address page
        onClose();   // Close modal
      } else {
        setErrorMsg(data.message || "Failed to save address.");
      }

    } catch (error) {
      console.error("❌ Error saving address:", error);
      setErrorMsg("Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>Add / Edit Address</h2>

        {errorMsg && <p className="error-text">{errorMsg}</p>}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Address Type */}
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Home">Home</option>
            <option value="Work">Work</option>
          </select>

          {/* Full Address */}
          <textarea
            name="fullAddress"
            placeholder="Full Address (Street, Door No, Area)"
            value={formData.fullAddress}
            onChange={handleChange}
          />

          {/* City */}
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />

          {/* State */}
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />

          {/* Country */}
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />

          {/* Pincode */}
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="modal-actions">
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? "Saving..." : "Save Address"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddAddressForm;
