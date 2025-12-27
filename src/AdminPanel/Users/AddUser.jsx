import React, { useState, useEffect } from "react";

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
  Eye,
  EyeOff,
} from "lucide-react";
import "./AddUser.css";

const AddUser = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [userCounter, setUserCounter] = useState(1);

  const [formData, setFormData] = useState({
    userId: "USR-1",
    name: "",
    email: "",
    contact: "",
    designation: "Administrator",
    password: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      userId: `USR-${userCounter}`,
    }));
  }, [userCounter]);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const departments = [
    "Dashboard",
    "User Module",
    "Product",
    "Customers",
    "Booking",
    "Reports",
    "Settings",
  ];

  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const toggleDepartment = (dept) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
    if (errors.departments) {
      setErrors((prev) => ({ ...prev, departments: "" }));
    }
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.trim().length < 3) error = "Name must be at least 3 characters";
        break;
      case "email":
        if (!value.trim()) error = "E-Mail ID is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Please enter a valid email address";
        break;
      case "contact":
        if (!value.trim()) error = "Contact No. is required";
        else if (!/^\d{10}$/.test(value.replace(/\s/g, "")))
          error = "Please enter a valid 10-digit contact number";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    ["name", "email", "contact", "password"].forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    if (selectedDepartments.length === 0) {
      newErrors.departments = "Please select at least one department permission";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);

    setTimeout(() => {
      setUserCounter((prev) => prev + 1);
      setFormData({
        userId: "",
        name: "",
        email: "",
        contact: "",
        designation: "Administrator",
        password: "",
      });
      setSelectedDepartments([]);
      setTouched({});
      setErrors({});
    }, 4500);
  };

  const handleCancel = () => {
    setFormData({
      userId: "",
      name: "",
      email: "",
      contact: "",
      designation: "Administrator",
      password: "",
    });
    setSelectedDepartments([]);
    setErrors({});
    setTouched({});
  };

  return (
    <div className="add-user-page">
      <div className="adduser-header">
        <div className="adduser-header-left">
          <h1>User Management</h1>
          <p className="breadcrumb">
            User Modules <span>›</span> <strong>Add User</strong>
          </p>
        </div>
        <div className="adduser-header-right">
          <div className="header-search">
            <Search size={16} />
            <input placeholder="Search" />
          </div>
          <button className="header-bell">
            <Bell size={18} />
            <span className="bell-dot" />
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="success-alert">
          <div className="success-content">
            <div className="success-icon-wrapper">
              <CheckCircle size={20} />
            </div>
            <div className="success-text">
              <strong>Success</strong>
              <p>User account has been created successfully.</p>
            </div>
          </div>
          <button className="success-close" onClick={() => setShowSuccess(false)}>
            <X size={18} />
          </button>
        </div>
      )}

      <div className="add-user-card">
        <div className="card-title">
          <h2>New User Details</h2>
          <User size={24} className="title-icon" />
        </div>

        <form onSubmit={handleSubmit} className="add-user-form" noValidate>
          <div className="form-main-grid">
            {/* Row 1: USER ID + NAME */}
            <div className="form-group">
              <div className="input-wrapper">
                <User size={18} />
                <input name="userId" value={formData.userId} readOnly />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <User size={18} />
                <input
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={errors.name && touched.name ? "error" : ""}
                />
              </div>
              {errors.name && touched.name && <span className="error-text">{errors.name}</span>}
            </div>

            {/* Row 2: E-MAIL ID + CONTACT NO. */}
            <div className="form-group">
              <div className="input-wrapper">
                <Mail size={18} />
                <input
                  name="email"
                  type="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? "error" : ""}
                />
              </div>
              {errors.email && touched.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <Phone size={18} />
                <input
                  name="contact"
                  placeholder="+91 98765 43210"
                  value={formData.contact}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={errors.contact && touched.contact ? "error" : ""}
                />
              </div>
              {errors.contact && touched.contact && <span className="error-text">{errors.contact}</span>}
            </div>

            {/* Row 3: Designation (no label) + PASSWORD */}
            <div className="form-group designation-group">
              <div className="input-wrapper select-wrapper">
                <Briefcase size={18} />
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                >
                  <option>Administrator</option>
                  <option>Manager</option>
                  <option>Staff</option>
                  <option>Employee</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper password-wrapper">
                <Lock size={18} />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={errors.password && touched.password ? "error" : ""}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && touched.password && (
                <span className="error-text">{errors.password}</span>
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
                <p>Supports PNG, JPG or JPEG. Max file size 3MB</p>
              </div>
            </div>

            <label className="upload-btn">
              <Upload size={16} />
              Select Image
              <input type="file" accept="image/*" hidden />
            </label>
          </div>

          {/* ================= PERMISSIONS ================= */}
          <div className="permissions">
            <label className="section-label">DEPARTMENT PERMISSION</label>
            <div className="permission-grid">
              {departments.map((dept) => (
                <label key={dept} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(dept)}
                    onChange={() => toggleDepartment(dept)}
                  />
                  <span className="checkmark" />
                  {dept}
                </label>
              ))}
            </div>
            {errors.departments && (
              <span className="error-text dept-error">
                {errors.departments}
              </span>
            )}
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
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