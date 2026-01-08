import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile } from "../../api/user";

const ProfilePage = () => {
  const { user, setUser } = useAuth();

  /* ============================================================
     ⭐ INITIAL FORM DATA
  ============================================================ */
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    telephone: user?.telephone || "",
    email: user?.email || "",
    gender: user?.gender || "Male",
    dob: user?.dob || "",
  });

  const [editMode, setEditMode] = useState(false);

  /* ============================================================
     ⭐ LOAD FRESH PROFILE — ONLY ONCE ON MOUNT
  ============================================================ */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getUserProfile();

        // update context
        setUser(profile);

        // update form
        setFormData({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          telephone: profile.telephone || "",
          email: profile.email || "",
          gender: profile.gender || "Male",
          dob: profile.dob || "",
        });

      } catch (err) {
        console.error("❌ Failed to load profile:", err);
      }
    };

    loadProfile();
  }, []); // ← runs only once (fixed)

  /* ============================================================
     ⭐ INPUT HANDLER
  ============================================================ */
  const handleChange = (e) => {
    if (!editMode) return;

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ============================================================
     ⭐ SAVE HANDLER (API COMING SOON)
  ============================================================ */
  const handleSave = () => {
    console.log("📤 Profile Save Triggered:", formData);

    // TODO: API here → PUT /api/user/profile

    setEditMode(false);
  };

  return (
    <>
      {/* ---------------- Breadcrumb ---------------- */}
      <p className="breadcrumb">
        <Link to="/" className="breadcrumb-link">HOME</Link> /
        <Link to="/my-account/profile" className="breadcrumb-link"> MY ACCOUNT</Link> /
        <span> PROFILE</span>
      </p>

      {/* ---------------- Title + Edit/Save Button ---------------- */}
      <div className="title-row">
        <h1 className="page-title">My Account</h1>

        <button
          className="edit-btn"
          onClick={() => {
            editMode ? handleSave() : setEditMode(true);
          }}
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
              name="telephone"
              value={formData.telephone}
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
              readOnly // email shouldn’t be editable
            />
          </div>

          <div className="input-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
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
