// src/AdminPanel/Users/AddUser.jsx
import React, { useState } from "react";
import {
  Mail,
  Phone,
  User,
  Lock,
  BadgeCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  Image,
} from "lucide-react";
import "./AddUser.css";

const AddUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    userId: "USR-2023-884",
    name: "",
    email: "",
    phone: "",
    designation: "Administrator",
    password: "",
    permissions: {
      Enquiry: true,
      Enrollment: true,
      Attendance: false,
      Staff: false,
      Placement: false,
      Report: false,
    },
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePermission = (key) =>
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [key]: !formData.permissions[key],
      },
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  return (
    <div className="adduser-wrapper">
      {/* HEADER */}
      <div className="adduser-header">
        <h1>User Management</h1>
        <p>
          User Modules <span>›</span> <b>Add User</b>
        </p>
      </div>

      <div className="adduser-container">
        {/* SUCCESS MESSAGE */}
        {showSuccess && (
          <div className="adduser-success">
            <CheckCircle2 />
            <div className="adduser-success-text">
              <h4>Success</h4>
              <p>User account has been created successfully.</p>
            </div>
            <X
              className="adduser-success-close"
              onClick={() => setShowSuccess(false)}
            />
          </div>
        )}

        <div className="adduser-card">
          <div className="adduser-card-header">
            <h2>New User Details</h2>
            <p>Fill in the information below to create a new user profile.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* ROW 1 */}
            <div className="adduser-grid adduser-grid-compact">
              <div className="adduser-field">
                <label>User ID</label>
                <div className="adduser-input adduser-input-disabled">
                  <BadgeCheck />
                  <input value={formData.userId} disabled />
                </div>
              </div>

              <div className="adduser-field">
                <label>Name</label>
                <div className="adduser-input">
                  <User />
                  <input
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* ROW 2 */}
            <div className="adduser-grid adduser-grid-compact">
              <div className="adduser-field">
                <label>E-Mail ID</label>
                <div className="adduser-input">
                  <Mail />
                  <input
                    name="email"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="adduser-field">
                <label>Contact No.</label>
                <div className="adduser-input">
                  <Phone />
                  <input
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* ROW 3 */}
            <div className="adduser-grid adduser-grid-compact">
              <div className="adduser-field">
                <label>Designation</label>
                <select
                  className="adduser-select"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                >
                  <option>Administrator</option>
                  <option>Store Manager</option>
                  <option>Support Agent</option>
                </select>
              </div>

              <div className="adduser-field">
                <label>Password</label>
                <div className="adduser-input">
                  <Lock />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span
                    className="adduser-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </span>
                </div>
              </div>
            </div>

            {/* PROFILE IMAGE */}
            <div className="adduser-profile">
              <div className="adduser-profile-left">
                <div className="adduser-avatar">
                  <Image />
                </div>
                <div>
                  <h4>Profile Picture</h4>
                  <p>PNG, JPG or JPEG. Max size 3MB.</p>
                </div>
              </div>
              <button type="button" className="adduser-upload-btn">
                Select Image
              </button>
            </div>

            {/* PERMISSIONS */}
            <div className="adduser-permissions adduser-permissions-compact">
              <h4>Department Permission</h4>
              <div className="adduser-permission-row">
                {Object.keys(formData.permissions).map((key) => (
                  <label key={key} className="adduser-permission-pill">
                    <input
                      type="checkbox"
                      checked={formData.permissions[key]}
                      onChange={() => togglePermission(key)}
                    />
                    <span>{key}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="adduser-actions adduser-actions-compact">
              <button type="button" className="adduser-btn-cancel">
                Cancel
              </button>
              <button type="submit" className="adduser-btn-save">
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
