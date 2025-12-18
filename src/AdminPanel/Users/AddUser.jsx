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
      Category: true,
      Product: true,
      Customers: false,
      Booking: false,
      Reports: false,
      Settings: false,
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    setShowSuccess(true);
  };

  return (
    <div className="au-wrapper">
      <div className="au-header">
        <h1>User Management</h1>
        <p>
          User Modules <span>›</span> <b>Add User</b>
        </p>
      </div>

      <div className="au-container">
        {showSuccess && (
          <div className="au-success">
            <CheckCircle2 />
            <div>
              <h4>Success</h4>
              <p>User account has been created successfully.</p>
            </div>
            <X onClick={() => setShowSuccess(false)} />
          </div>
        )}

        <div className="au-card">
          <div className="au-card-header">
            <h2>New User Details</h2>
            <p>Fill in the information below to create a new user profile.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="au-grid">
              <div>
                <label>User ID</label>
                <div className="au-input disabled">
                  <BadgeCheck />
                  <input value={formData.userId} disabled />
                </div>
              </div>

              <div>
                <label>Name</label>
                <div className="au-input">
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

            <div className="au-grid">
              <div>
                <label>E-Mail ID</label>
                <div className="au-input">
                  <Mail />
                  <input
                    name="email"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label>Contact No.</label>
                <div className="au-input">
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

            <div className="au-grid">
              <div>
                <label>Designation</label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                >
                  <option>Administrator</option>
                  <option>Store Manager</option>
                  <option>Support Agent</option>
                </select>
              </div>

              <div>
                <label>Password</label>
                <div className="au-input">
                  <Lock />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </span>
                </div>
              </div>
            </div>

            <div className="au-permissions">
              <h4>Department Permission</h4>
              <div className="au-permission-grid">
                {Object.keys(formData.permissions).map((key) => (
                  <label key={key} className="perm-item">
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

            <div className="au-actions">
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
    </div>
  );
};

export default AddUser;
