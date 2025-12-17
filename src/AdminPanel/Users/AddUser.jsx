import React, { useState } from "react";
import "./AddUser.css";

const AddUser = () => {
  const [formData, setFormData] = useState({
    userId: "USR-2023-884",
    name: "",
    email: "",
    phone: "",
    designation: "Administrator",
    password: "",
    permissions: {
      enquiry: true,
      enrollment: true,
      attendance: false,
      staff: false,
      placement: false,
      report: false,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePermission = (key) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [key]: !formData.permissions[key],
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="add-user-wrapper">

      {/* ===== Header ===== */}
      <div className="add-user-header">
        <h1>User Management</h1>
        <p>
          User Modules <span>›</span> <b>Add User</b>
        </p>
      </div>

      {/* ===== Success Alert ===== */}
      <div className="success-box">
        <span className="success-icon">✔</span>
        <div>
          <h4>Success</h4>
          <p>User account has been created successfully.</p>
        </div>
      </div>

      {/* ===== Card ===== */}
      <div className="add-user-card">
        <div className="card-head">
          <h2>New User Details</h2>
          <p>Fill in the information below to create a new user profile.</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Row 1 */}
          <div className="form-grid">
            <div className="form-group">
              <label>User ID</label>
              <input value={formData.userId} disabled />
            </div>

            <div className="form-group">
              <label>Name</label>
              <input
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-grid">
            <div className="form-group">
              <label>E-Mail ID</label>
              <input
                name="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Contact No.</label>
              <input
                name="phone"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-grid">
            <div className="form-group">
              <label>Designation</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              >
                <option>Administrator</option>
                <option>Store Manager</option>
                <option>Support Agent</option>
                <option>Content Editor</option>
              </select>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Profile Upload */}
          <div className="upload-box">
            <div className="avatar">👤</div>
            <div className="upload-info">
              <h4>Profile Picture</h4>
              <p>Supports PNG, JPG or JPEG. Max file size 3MB.</p>
            </div>
            <button type="button" className="upload-btn">
              Select Image
            </button>
          </div>

          {/* Permissions */}
          <div className="permission-section">
            <h5>DEPARTMENT PERMISSION</h5>
            <div className="permission-grid">
              {Object.keys(formData.permissions).map((key) => (
                <label key={key} className="permission-item">
                  <input
                    type="checkbox"
                    checked={formData.permissions[key]}
                    onChange={() => togglePermission(key)}
                  />
                  <span>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button type="button" className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddUser;
