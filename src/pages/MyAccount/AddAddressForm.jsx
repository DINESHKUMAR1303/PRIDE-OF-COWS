import React, { useState, useEffect } from "react";
import { getUserAddress, updateAddress } from "../../api/user";
import "./AddAddressForm.css";


const AddAddressForm = ({ onClose, onSaved }) => {
  const localUser = JSON.parse(localStorage.getItem("poc_user"));

  const [formData, setFormData] = useState({
    name: localUser ? `${localUser.firstName} ${localUser.lastName}` : "",
    fullAddress: "",
    street: "",
    city: "",
    pincode: "",
    type: "Home",
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUserAddress();
        if (!data) return;
        setFormData((prev) => ({
          ...prev,
          name: data.name || prev.name,
          fullAddress: data.fullAddress || "",
          street: data.street || "",
          city: data.city || "",
          pincode: data.pincode || "",
          type: data.type || "Home",
        }));
      } catch (e) {
        console.log(e);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "pincode") value = value.replace(/\D/g, "").slice(0, 6);

    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (
      !formData.name ||
      !formData.fullAddress ||
      !formData.city ||
      !formData.pincode
    ) {
      setErrorMsg("Please fill all required fields.");
      return false;
    }
    if (formData.pincode.length !== 6) {
      setErrorMsg("Pincode must be 6 digits.");
      return false;
    }
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSaving(true);

      await updateAddress(formData);

      localStorage.setItem("user_city", formData.city);
      localStorage.setItem("user_pincode", formData.pincode);
      localStorage.setItem(
        "userLocation",
        `${formData.city.toUpperCase()} (${formData.pincode})`
      );

      onSaved?.();
      onClose?.();
    } catch (err) {
      setErrorMsg(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="address-modal-overlay">
      <div className="address-modal-box">
        {/* HEADER */}
        <div className="address-modal-header">
          <h2>Add Address</h2>
          <button className="address-close-btn" onClick={onClose}>✕</button>
        </div>

        {errorMsg && <p className="address-error">{errorMsg}</p>}

        <form className="address-form" onSubmit={submit}>
          <div className="address-field">
            <label>Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="address-field">
            <label>Street / Area</label>
            <input
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
            />
          </div>

          {/* <div className="address-field">
            <label>Street / Area (optional)</label>
            <input
              name="street"
              value={formData.street}
              onChange={handleChange}
            />
          </div> */}

          <div className="address-row">
            <div>
              <label>City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Pincode</label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="address-field">
            <label>Address Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option>Home</option>
              <option>Work</option>
              <option>Other</option>
            </select>
          </div>

          <button className="address-save-btn" disabled={saving}>
            {saving ? "Saving..." : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddressForm;
