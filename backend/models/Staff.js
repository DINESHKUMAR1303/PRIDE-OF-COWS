import mongoose from "mongoose";

/* ============================================================
   ⭐ STAFF SCHEMA (ADMIN PANEL → STAFF DETAILS)
   Stores ONLY image HTTP path (not file / base64)
============================================================ */
const staffSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    departments: {
      type: [String],
      required: true,
    },

    // ✅ Stores HTTP path like: /uploads/users/12345.jpg
    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/* ============================================================
   ⭐ EXPORT MODEL (ES MODULE)
============================================================ */
const Staff = mongoose.model(
  "staff_details",
  staffSchema,
  "admin_panel.staff_details"
);

export default Staff;
