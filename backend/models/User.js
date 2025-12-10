// backend/models/User.js

const mongoose = require("mongoose");

/* ============================================================
   ⭐ NESTED ADDRESS SCHEMA (Clean, Stable, Future-Safe)
============================================================ */
const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },

    type: {
      type: String,
      trim: true,
      default: "Home",
      enum: ["Home", "Work", "Other"],
    },

    fullAddress: {
      type: String,
      trim: true,
      default: "",
    },

    city: {
      type: String,
      trim: true,
      default: "",
    },

    state: {
      type: String,
      trim: true,
      default: "",
    },

    country: {
      type: String,
      trim: true,
      default: "",
    },

    pincode: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false } // avoids creating nested _id for address object
);

/* ============================================================
   ⭐ USER SCHEMA
============================================================ */
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "First name is required"],
    },

    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name is required"],
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
      trim: true,
      default: "",
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    /* ----------------------------------------------------
       ⭐ NESTED ADDRESS OBJECT
       Default ensures new users always start with empty address
    ---------------------------------------------------- */
    address: {
      type: addressSchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

/* ============================================================
   ⭐ SAFE EXPORT (Prevents OverwriteModelError)
============================================================ */
module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);
