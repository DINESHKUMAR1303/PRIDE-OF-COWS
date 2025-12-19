// src/AdminPanel/Users/AddUser.jsx
import React, { useState } from "react";
import {
  CheckCircle,
  X,
  Upload,
  Lock,
  Mail,
  Phone,
  User,
  Briefcase,
  Bell,
  Search,
} from "lucide-react";
import "./AddUser.css";

const AddUser = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    contact: "",
    designation: "Administrator",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const departments = [
    "Category",
    "Product",
    "Customers",
    "Booking",
    "Reports",
    "Settings",
  ];

  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const toggleDepartment = (dept) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept)
        ? prev.filter((d) => d !== dept)
        : [...prev, dept]
    );
  };

  const validateForm = () => {
    const e = {};
    if (!formData.userId) e.userId = "User ID is required";
    if (!formData.name) e.name = "Name is required";
    if (!formData.email) e.email = "E-Mail ID is required";
    if (!formData.contact) e.contact = "Contact No. is required";
    if (!formData.password) e.password = "Password is required";
    if (selectedDepartments.length === 0)
      e.departments = "Select at least one department permission";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowSuccess(true);
  };

  return (
    <div className="add-user-page">
      {/* ================= HEADER ================= */}
      <div className="adduser-header">
        <div className="adduser-header-left">
          <h1>User Management</h1>
          <div className="breadcrumb">
            User Modules <span>›</span> <strong>Add User</strong>
          </div>
        </div>

        <div className="adduser-header-right">
          <div className="header-search">
            <Search size={16} />
            <input placeholder="Search..." />
          </div>

          <button className="header-bell">
            <Bell size={18} />
            <span className="bell-dot" />
          </button>
        </div>
      </div>

      {/* ================= SUCCESS ================= */}
      {showSuccess && (
        <div className="success-alert">
          <CheckCircle size={18} />
          <span>User account has been created successfully.</span>
          <button onClick={() => setShowSuccess(false)}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* ================= CARD ================= */}
      <div className="add-user-card">
        <div className="card-title">
          <h2>New User Details</h2>
          <p>Fill in the information below to create a new user profile.</p>
        </div>

        <form onSubmit={handleSubmit} className="add-user-form">
          {/* ================= FORM GRID ================= */}
          <div className="form-grid">
            {/* User ID */}
            <div className="form-group">
              <label>User ID</label>
              <div className="input-wrapper">
                <User size={16} />
                <input
                  placeholder="Enter user ID"
                  value={formData.userId}
                  onChange={(e) =>
                    setFormData({ ...formData, userId: e.target.value })
                  }
                />
              </div>
              {errors.userId && <span className="error">{errors.userId}</span>}
            </div>

            {/* Name */}
            <div className="form-group">
              <label>Name</label>
              <div className="input-wrapper">
                <User size={16} />
                <input
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label>E-Mail ID</label>
              <div className="input-wrapper">
                <Mail size={16} />
                <input
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            {/* Contact */}
            <div className="form-group">
              <label>Contact No.</label>
              <div className="input-wrapper">
                <Phone size={16} />
                <input
                  placeholder="98765 43210"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                />
              </div>
              {errors.contact && (
                <span className="error">{errors.contact}</span>
              )}
            </div>

            {/* Designation */}
            <div className="form-group">
              <label>Designation</label>
              <div className="input-wrapper select-wrapper">
                <Briefcase size={16} />
                <select
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      designation: e.target.value,
                    })
                  }
                >
                  <option>Administrator</option>
                  <option>Manager</option>
                  <option>Staff</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={16} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
          </div>

          {/* ================= PROFILE ================= */}
          <div className="profile-box">
            <div className="profile-left">
              <div className="avatar">
                <User size={28} />
              </div>
              <div>
                <strong>Profile Picture</strong>
                <p>PNG, JPG or JPEG. Max size 5MB.</p>
              </div>
            </div>

            <label className="upload-btn">
              <Upload size={16} />
              Select Image
              <input type="file" hidden />
            </label>
          </div>

          {/* ================= PERMISSIONS ================= */}
          <div className="permissions">
            <label className="section-label">DEPARTMENT PERMISSION</label>
            <div className="permission-grid">
              {departments.map((d) => (
                <label key={d} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(d)}
                    onChange={() => toggleDepartment(d)}
                  />
                  <span className="checkmark" />
                  {d}
                </label>
              ))}
            </div>
            {errors.departments && (
              <span className="error">{errors.departments}</span>
            )}
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="form-actions">
            <button type="button" className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-save">
              <CheckCircle size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
