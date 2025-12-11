// backend/models/User.js

const mongoose = require("mongoose");

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
  { _id: false } // prevents nested _id from being created
);

/* ============================================================
   ⭐ USER SCHEMA (Stable & Matches Your Controllers)
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

    /* --------------------------------------------------------
       ⭐ CLEAN DEFAULT ADDRESS OBJECT
       Ensures EVERY NEW user has structured address ready
    -------------------------------------------------------- */
    address: {
      type: addressSchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

/* ============================================================
   ⭐ SAFE EXPORT (Avoids OverwriteModelError in dev / hot reload)
============================================================ */
module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);
