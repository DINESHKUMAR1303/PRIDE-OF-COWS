import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  Hash
} from "lucide-react";
import "./AddUser.css";
import { createStaff, updateStaff } from "../../api/user";


const AddUser = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const editUser = location.state?.editUser;
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Initialize counter from localStorage
  const [userCounter, setUserCounter] = useState(() => {
    const saved = localStorage.getItem('userCounter');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    contact: "",
    designation: "Administrator",
    password: "",
  });

  // Update userId when counter changes
  useEffect(() => {
    if (editUser) {
      setFormData({
        userId: editUser.userId || "",
        name: editUser.name || "",
        email: editUser.email || "",
        contact: editUser.contact || "",
        designation: editUser.designation || "Administrator",
        password: "", // Keep password empty for security, handle update logic if needed
      });
      setSelectedDepartments(editUser.departments || []);
      if (editUser.profileImage) {
        setImagePreview(`http://localhost:5000${editUser.profileImage}`);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        userId: `USR - ${userCounter}`,
      }));
    }
  }, [userCounter, editUser]);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (3MB limit)
      if (file.size > 3 * 1024 * 1024) {
        alert("File size should not exceed 3MB");
        return;
      }

      // Check file type
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        alert("Please select a PNG, JPG or JPEG image");
        return;
      }

      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
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
    const allTouched = {};

    ["name", "email", "contact", "password"].forEach((key) => {
      // If editing, password is optional
      if (editUser && key === "password" && !formData[key]) {
        return;
      }
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
      allTouched[key] = true;
    });

    if (selectedDepartments.length === 0) {
      newErrors.departments = "Please select at least one department permission";
    }

    setErrors(newErrors);
    setTouched(allTouched);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // CREATE FORM DATA FOR BACKEND
      const payload = new FormData();
      // Use existing userId if editing, otherwise generate one (or use the one from state which handles counter)
      payload.append("userId", editUser ? editUser.userId : formData.userId);
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("contact", formData.contact);
      payload.append("designation", formData.designation);

      // Only append password if it's provided
      if (formData.password) {
        payload.append("password", formData.password);
      }

      payload.append(
        "departments",
        JSON.stringify(selectedDepartments)
      );

      if (selectedImage) {
        payload.append("profileImage", selectedImage);
      }

      if (editUser) {
        // UPDATE EXISTING USER
        await updateStaff(editUser._id, payload);
        alert("User updated successfully");
        navigate("/admin/users/manage");
      } else {
        // SAVE NEW USER TO MONGODB
        const res = await createStaff(payload);

        // SET PREVIEW FROM SERVER PATH
        if (res?.data?.data?.profileImage) {
          setImagePreview(`http://localhost:5000${res.data.data.profileImage}`);
        }

        // SHOW SUCCESS
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000);

        // RESET FORM AND INCREMENT COUNTER
        setTimeout(() => {
          const newCounter = userCounter + 1;
          setUserCounter(newCounter);
          localStorage.setItem('userCounter', newCounter.toString());

          setFormData({
            userId: `USR - ${newCounter}`,
            name: "",
            email: "",
            contact: "",
            designation: "Administrator",
            password: "",
          });
          setSelectedDepartments([]);
          setTouched({});
          setErrors({});
          setSelectedImage(null);
          setImagePreview(null);
        }, 4500);
      }

    } catch (error) {
      alert(error.message || `Failed to ${editUser ? 'update' : 'save'} user`);
    }
  };


  const handleCancel = () => {
    setFormData({
      userId: `USR - ${userCounter}`,
      name: "",
      email: "",
      contact: "",
      designation: "Administrator",
      password: "",
    });
    setSelectedDepartments([]);
    setErrors({});
    setTouched({});
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <div className="adduser-page-wrapper">
      <div className="adduser-top-header">
        <div className="adduser-top-header-left">
          <h1>User Management</h1>
          <p className="adduser-breadcrumb">
            User Modules <span>›</span> <strong>Add User</strong>
          </p>
        </div>
        <div className="adduser-top-header-right">
          <div className="adduser-header-search">
            <Search size={16} />
            <input placeholder="Search" />
          </div>
          <button className="adduser-header-bell">
            <Bell size={18} />
            <span className="adduser-bell-dot" />
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="adduser-success-alert">
          <div className="adduser-success-content">
            <div className="adduser-success-icon-wrapper">
              <CheckCircle size={20} />
            </div>
            <div className="adduser-success-text">
              <strong>Success</strong>
              <p>User account has been {editUser ? "updated" : "created"} successfully.</p>
            </div>
          </div>
          <button className="adduser-success-close" onClick={() => setShowSuccess(false)}>
            <X size={18} />
          </button>
        </div>
      )}

      <div className="adduser-card">
        <div className="adduser-card-title">
          <h2>{editUser ? "Edit User Details" : "New User Details"}</h2>
          <User size={48} className="adduser-title-icon" />
        </div>

        <form onSubmit={handleSubmit} className="adduser-form" noValidate>
          <div className="adduser-form-main-grid">
            {/* Row 1: USER ID + NAME */}
            <div className="adduser-form-group">
              <div className="adduser-input-wrapper">
                <Hash size={18} />
                <input name="userId" value={formData.userId} readOnly />
              </div>
            </div>

            <div className="adduser-form-group">
              <div className="adduser-input-wrapper">
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
              {errors.name && touched.name && <span className="adduser-error-text">{errors.name}</span>}
            </div>

            {/* Row 2: E-MAIL ID + CONTACT NO. */}
            <div className="adduser-form-group">
              <div className="adduser-input-wrapper">
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
              {errors.email && touched.email && <span className="adduser-error-text">{errors.email}</span>}
            </div>

            <div className="adduser-form-group">
              <div className="adduser-input-wrapper">
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
              {errors.contact && touched.contact && <span className="adduser-error-text">{errors.contact}</span>}
            </div>

            {/* Row 3: Designation + PASSWORD */}
            <div className="adduser-form-group adduser-designation-group">
              <div className="adduser-input-wrapper adduser-select-wrapper">
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

            <div className="adduser-form-group">
              <div className="adduser-input-wrapper adduser-password-wrapper">
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
                  className="adduser-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && touched.password && (
                <span className="adduser-error-text">{errors.password}</span>
              )}
            </div>
          </div>

          {/* ================= PROFILE ================= */}
          <div className="adduser-profile-box">
            <div className="adduser-profile-left">
              <div className="adduser-avatar">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="adduser-avatar-image" />
                ) : (
                  <User size={28} />
                )}
              </div>
              <div>
                <strong>Profile Picture</strong>
                {selectedImage ? (
                  <p className="adduser-image-name">{selectedImage.name}</p>
                ) : (
                  <p>Supports PNG, JPG or JPEG. Max file size 3MB</p>
                )}
              </div>
            </div>

            <label className="adduser-upload-btn">
              <Upload size={16} />
              Select Image
              <input type="file" accept="image/png,image/jpeg,image/jpg" onChange={handleImageChange} hidden />
            </label>
          </div>

          {/* ================= PERMISSIONS ================= */}
          <div className="adduser-permissions">
            <label className="adduser-section-label">DEPARTMENT PERMISSION</label>
            <div className="adduser-permission-grid">
              {departments.map((dept) => (
                <label key={dept} className="adduser-checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(dept)}
                    onChange={() => toggleDepartment(dept)}
                  />
                  <span className="adduser-checkmark" />
                  <span className="adduser-checkbox-label">{dept}</span>
                </label>
              ))}
            </div>
            {errors.departments && (
              <span className="adduser-error-text adduser-dept-error">
                {errors.departments}
              </span>
            )}
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="adduser-form-actions">
            <button type="button" className="adduser-btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="adduser-btn-save">
              <CheckCircle size={16} />
              {editUser ? "Update Changes" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;