const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const User = require("../models/User");


// =======================
// ⭐ GET LOGGED-IN USER PROFILE (PROTECTED)
// =======================
router.get("/profile", protect, async (req, res) => {
  try {
    // ⭐ Support both req.user.id and req.userId
    const userId = req.user?.id || req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized - user not found in token" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ⭐ Detect OLD address format → string
    const isOldFormat = typeof user.address === "string";

    // ⭐ Convert OLD → NEW structure OR return NEW as is
    const structuredAddress = isOldFormat
      ? {
          name: `${user.firstName} ${user.lastName}`,
          type: "Home",
          fullAddress: user.address || "",
          city: user.city || "",
          state: user.state || "",
          country: user.country || "",
          pincode: user.pincode || "",
        }
      : {
          name: user.address?.name || `${user.firstName} ${user.lastName}`,
          type: user.address?.type || "Home",
          fullAddress: user.address?.fullAddress || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          country: user.address?.country || "",
          pincode: user.address?.pincode || "",
        };

    return res.json({
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      telephone: user.telephone,
      address: structuredAddress,
    });

  } catch (err) {
    console.error("Profile Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


// =======================
// ⭐ UPDATE / SAVE USER ADDRESS (PROTECTED)
// PUT /api/user/address
// =======================
router.put("/address", protect, async (req, res) => {
  try {
    // ⭐ Support both req.user.id and req.userId
    const userId = req.user?.id || req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized - No user ID found" });
    }

    const { name, type, fullAddress, city, state, country, pincode } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ⭐ Save in NEW FORMAT
    user.address = {
      name: name || user.address?.name,
      type: type || user.address?.type,
      fullAddress: fullAddress || user.address?.fullAddress,
      city: city || user.address?.city,
      state: state || user.address?.state,
      country: country || user.address?.country,
      pincode: pincode || user.address?.pincode,
    };

    // ⭐ Keep backward compatibility
    user.city = city;
    user.state = state;
    user.country = country;
    user.pincode = pincode;

    await user.save();

    return res.json({
      message: "Address updated successfully",
      address: user.address,
    });

  } catch (err) {
    console.error("Update Address Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
