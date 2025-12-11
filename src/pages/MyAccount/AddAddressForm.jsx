import React, { useState, useEffect } from "react";
import { getUserAddress, updateAddress } from "../../api/user";

const AddAddressForm = ({ onClose, onSaved }) => {
  const localUser = JSON.parse(localStorage.getItem("poc_user"));

  const [formData, setFormData] = useState({
    name: localUser ? `${localUser.firstName} ${localUser.lastName}` : "",
    fullAddress: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    type: "Home",
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* Load existing address */
  useEffect(() => {
    const loadAddress = async () => {
      try {
        const data = await getUserAddress();
        if (!data) return;

        setFormData({
          name: data.name || formData.name,
          fullAddress: data.fullAddress || "",
          city: data.city || "",
          pincode: data.pincode || "",
          state: data.state || "",
          country: data.country || "",
          type: data.type || "Home",
        });
      } catch (err) {
        console.error("Failed to load address:", err);
      }
    };

    loadAddress();
  }, []);

  /* Input Change */
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "name") value = value.replace(/[0-9]/g, "");
    if (["city", "state", "country"].includes(name))
      value = value.replace(/[^A-Za-z\s]/g, "");
    if (name === "pincode") value = value.replace(/\D/g, "").slice(0, 6);

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* Validation */
  const isFormValid = () => {
    if (
      !formData.name ||
      !formData.fullAddress ||
      !formData.city ||
      !formData.state ||
      !formData.pincode ||
      !formData.country
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

  /* Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      setSaving(true);
      setErrorMsg("");

      await updateAddress(formData);

      /* save location for navbar */
      const formatted = `${formData.city.toUpperCase()} (${formData.pincode})`;
      localStorage.setItem("userLocation", formatted);

      onSaved?.();
      onClose?.();
    } catch (err) {
      setErrorMsg(err.message || "Failed to save address.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="address-modal">

        {/* HEADER */}
        <div className="modal-header">
          <h2>Add Address</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {errorMsg && <p className="error-text">{errorMsg}</p>}

        {/* FORM */}
        <form className="address-form" onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="form-row">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* House / Flat */}
          <div className="form-row">
            <label>House / Flat / Building</label>
            <input
              type="text"
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
            />
          </div>

          {/* Street */}
          <div className="form-row">
            <label>Street / Area (optional)</label>
            <input
              type="text"
              placeholder=""
            />
          </div>

          {/* City + Pincode */}
          <div className="form-row two-col">
            <div>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* State + Country */}
          <div className="form-row two-col">
            <div>
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Address Type */}
          <div className="form-row">
            <label>Address Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Save Button */}
          <button type="submit" className="save-btn" disabled={saving}>
            {saving ? "Saving..." : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddressForm;
