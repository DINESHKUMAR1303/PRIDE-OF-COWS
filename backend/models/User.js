const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    telephone: { type: String, trim: true },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    address: { type: String },   // ✅ NOT required now
    city: { type: String },      // ✅ NOT required

    pincode: { type: String },   // ✅ NOT required

    country: { type: String },   // ✅ NOT required
    state: { type: String },     // ✅ NOT required
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
