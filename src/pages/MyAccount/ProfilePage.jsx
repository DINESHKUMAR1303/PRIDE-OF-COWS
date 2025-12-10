import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth();

  // Local editable state
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phone: user.phone || "",
    email: user.email || "",
    gender: "Male",
    dob: ""
  });

  const [editMode, setEditMode] = useState(false);

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editMode) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      {/* ---------------- Breadcrumb ---------------- */}
      <p className="breadcrumb">
        <Link to="/" className="breadcrumb-link">HOME</Link> /
        <Link to="/my-account/profile" className="breadcrumb-link"> MY ACCOUNT</Link> /
        <span> PROFILE</span>
      </p>

      {/* ---------------- Title + Edit Button ---------------- */}
      <div className="title-row">
        <h1 className="page-title">My Account</h1>

        <button
          className="edit-btn"
          onClick={() => setEditMode((prev) => !prev)}
        >
          {editMode ? "Save" : "Edit"}
        </button>
      </div>

      {/* ---------------- Profile Form ---------------- */}
      <form className="profile-form">

        {/* Row 1 */}
        <div className="row">
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="row">
          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              disabled={!editMode}
              onChange={handleChange}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Row 3 */}
        <div className="row">
          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Date of Birth</label>
            <input
              type="text"
              name="dob"
              placeholder="mm/dd/yyyy"
              value={formData.dob}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Checkbox */}
        <div className="checkbox-row">
          <input type="checkbox" disabled={!editMode} />
          Email me with news and offers
        </div>

      </form>
    </>
  );
};

export default ProfilePage;
