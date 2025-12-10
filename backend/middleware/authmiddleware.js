const mongoose = require("mongoose");

// ⭐ Prevent OverwriteModelError during hot reload (safe fix)
if (mongoose.models.User) {
  delete mongoose.models.User;
}

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

    /* ----------------------------------------------------
       ⭐ Nested Address Object (Your structure preserved)
       ---------------------------------------------------- */
    address: {
      name: { type: String },                 
      type: { type: String, default: "Home" },
      fullAddress: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      pincode: { type: String }
    },
  },
  { timestamps: true }
);

// ⭐ Always return the same compiled model
module.exports = mongoose.model("User", userSchema);