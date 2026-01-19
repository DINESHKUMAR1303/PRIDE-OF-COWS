// backend/models/User.js
import mongoose from "mongoose";

/* ============================================================
   ⭐ ADDRESS SUB-SCHEMA (Clean, Stable & Future-Proof)
============================================================ */
const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home",
      trim: true,
    },

    fullAddress: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    state: {
      type: String,
      default: "",
      trim: true,
    },

    country: {
      type: String,
      default: "",
      trim: true,
    },

    pincode: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

/* ============================================================
   ⭐ USER SCHEMA (Matches Your Controllers)
============================================================ */
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    telephone: {
      type: String,
      default: "",
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    address: {
      type: addressSchema,
      default: () => ({}),
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/* ============================================================
   ⭐ EXPORT (ESM — REQUIRED)
============================================================ */
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
