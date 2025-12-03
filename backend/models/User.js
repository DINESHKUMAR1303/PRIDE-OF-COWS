// backend/models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { 
      type: String, 
      required: [true, "First name is required"], 
      trim: true 
    },

    lastName: { 
      type: String, 
      required: [true, "Last name is required"], 
      trim: true 
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    telephone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    address: { type: String, required: [true, "Address is required"] },
    city:    { type: String, required: [true, "City is required"] },
    country: { type: String, required: [true, "Country is required"] },
    state:   { type: String, required: [true, "State is required"] },
  },
  { timestamps: true }
);

// Prevent duplicate model compilation during development
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
