import mongoose from "mongoose";

/* ============================================================
   ⭐ STAFF SCHEMA (ADMIN PANEL → STAFF DETAILS)
============================================================ */
const staffSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    designation: { type: String, required: true },
    password: { type: String, required: true },
    departments: { type: [String], required: true },
    profileImage: { type: String, default: "" },
  },
  { timestamps: true }
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
