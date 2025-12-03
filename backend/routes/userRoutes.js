const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const User = require("../models/User");

// =======================
// GET LOGGED-IN USER PROFILE (PROTECTED)
// =======================
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      telephone: user.telephone,
      address: user.address,
      city: user.city,
      state: user.state,
      country: user.country,
    });
  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
