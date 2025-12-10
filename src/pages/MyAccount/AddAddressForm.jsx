import React, { useState, useEffect } from "react";
import { getUserAddress, updateAddress } from "../../api/user";

const AddAddressForm = ({ onClose, onSaved }) => {
  const localUser = JSON.parse(localStorage.getItem("poc_user"));

  /* ============================================================
     ⭐ INITIAL FORM DATA
  ============================================================ */
  const [formData, setFormData] = useState({
    name: localUser ? `${localUser.firstName} ${localUser.lastName}` : "",
    type: "Home",
    fullAddress: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* ============================================================
     ⭐ FETCH EXISTING ADDRESS (EDIT MODE)
  ============================================================ */
  useEffect(() => {
    const loadAddress = async () => {
      try {
        const data = await getUserAddress();
        console.log("📥 Loaded Address:", data);

        if (!data) return;

        setFormData({
          name: data.name || formData.name,
          type: data.type || "Home",
          fullAddress: data.fullAddress || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
          pincode: data.pincode || "",
        });
      } catch (err) {
        console.error("❌ Failed to load address:", err);
      }
    };

    loadAddress();
  }, []); // runs only once

  /* ============================================================
     ⭐ HANDLE INPUT CHANGE
  ============================================================ */
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "name") {
      value = value.replace(/[0-9]/g, ""); // prevent numbers
    }

    if (["city", "state", "country"].includes(name)) {
      value = value.replace(/[^A-Za-z\s]/g, ""); // only letters
    }

    if (name === "pincode") {
      value = value.replace(/\D/g, "").slice(0, 6); // numeric only + 6 char limit
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ============================================================
     ⭐ FORM VALIDATION
  ============================================================ */
  const isFormValid = () => {
    if (
      !formData.name.trim() ||
      !formData.fullAddress.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.country.trim() ||
      !formData.pincode.trim()
    ) {
      setErrorMsg("⚠️ Please fill all fields.");
      return false;
    }

    if (formData.pincode.length !== 6) {
      setErrorMsg("⚠️ Pincode must be exactly 6 digits.");
      return false;
    }

    return true;
  };

  /* ============================================================
     ⭐ SUBMIT → SAVE ADDRESS
  ============================================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    try {
      setSaving(true);
      setErrorMsg("");

      const result = await updateAddress(formData);
      console.log("✔ Address Saved:", result);

      onSaved?.(); // refresh parent
      onClose?.(); // close modal

    } catch (err) {
      console.error("❌ Error saving address:", err);
      setErrorMsg(err.message || "Failed to save address.");
    } finally {
      setSaving(false);
    }
  };

  /* ============================================================
     ⭐ UI
  ============================================================ */
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Add / Edit Address</h2>

        {errorMsg && <p className="error-text">{errorMsg}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="fullAddress"
            placeholder="Full Address (Street, Area)"
            value={formData.fullAddress}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
          />

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
