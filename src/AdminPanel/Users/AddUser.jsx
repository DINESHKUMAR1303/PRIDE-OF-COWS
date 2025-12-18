// src/AdminPanel/Users/AddUser.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  UserPlus, 
  Mail, 
  Phone, 
  Lock, 
  ChevronDown, 
  Eye, 
  EyeOff, 
  X, 
  CheckCircle2 
} from "lucide-react";
import "./AddUser.css";

const AddUser = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    userId: `USR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    name: "",
    email: "",
    phone: "",
    designation: "Administrator",
    password: "",
    permissions: {
      category: false,
      product: false,
      customers: false,
      booking: false,
      reports: false,
      settings: false,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePermission = (key) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [key]: !prev.permissions[key],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating new user →", formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000); // auto hide after 5 sec
  };

  return (
    <div className="add-user-page">
      {/* Header exactly like screenshot */}
      <header className="page-header">
        <div className="header-content">
          <h1>User Management</h1>
          <p className="breadcrumb">
            User Modules <span>›</span> <strong>Add User</strong>
          </p>
        </div>
        <div className="header-right">
          <input type="text" placeholder="Search..." className="search-input" />
          <UserPlus size={20} className="add-icon" />
        </div>
      </header>

      <div className="main-container">
        {/* Green Success Alert – exact match */}
        {showSuccess && (
          <div className="success-alert">
            <CheckCircle2 size={24} className="success-icon" />
            <div className="success-text">
              <h3>Success</h3>
              <p>User account has been created successfully.</p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="close-btn">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Form Card – pixel perfect */}
        <div className="form-card">
          <div className="card-header">
            <h2>New User Details</h2>
            <p>Fill in the information below to create a new user profile.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className="form-row">
              <div className="form-group">
                <label>User ID</label>
                <input
                  type="text"
                  value={formData.userId}
                  disabled
                  className="disabled-input"
                />
              </div>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="form-row">
              <div className="form-group">
                <label>E-Mail ID</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Contact No.</label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="form-row">
              <div className="form-group">
                <label>Designation</label>
                <div className="select-wrapper">
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
                  <ChevronDown size={18} className="select-icon" />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-with-icon password-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Picture – exact */}
            <div className="upload-section">
              <div className="avatar-placeholder">
                <UserPlus size={32} />
              </div>
              <div className="upload-info">
                <h4>Profile Picture</h4>
                <p>Supports PNG, JPG or JPEG. Max file size 3MB.</p>
              </div>
              <label className="file-label">
                Select Image
                <input type="file" accept="image/png,image/jpeg" hidden />
              </label>
            </div>

            {/* Permissions – exact 2×3 grid */}
            <div className="permissions-section">
              <h5>DEPARTMENT PERMISSION</h5>
              <div className="permissions-grid">
                {Object.keys(formData.permissions).map((key) => (
                  <label key={key} className="permission-item">
                    <input
                      type="checkbox"
                      checked={formData.permissions[key]}
                      onChange={() => togglePermission(key)}
                    />
                    <span className="checkmark"></span>
                    <span className="permission-label">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons – exact position & style */}
            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/admin/users")}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;