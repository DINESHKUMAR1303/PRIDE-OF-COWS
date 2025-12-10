// backend/controllers/userController.js

const User = require("../models/User");

/* ============================================================
   ⭐ FORMAT ADDRESS (Handles OLD & NEW users)
============================================================ */
function formatAddress(user) {
  // Case 1: OLD users → address was a plain string
  if (typeof user.address === "string") {
    return {
      name: `${user.firstName} ${user.lastName}`,
      type: "Home",
      fullAddress: user.address || "",
      city: user.city || "",
      state: user.state || "",
      country: user.country || "",
      pincode: user.pincode || "",
    };
  }

  // Case 2: NEW users → address is an object
  const addr = user.address || {};

  return {
    name: addr.name || `${user.firstName} ${user.lastName}`,
    type: addr.type || "Home",
    fullAddress: addr.fullAddress || "",
    city: addr.city || "",
    state: addr.state || "",
    country: addr.country || "",
    pincode: addr.pincode || "",
  };
}

/* ============================================================
   ⭐ GET USER PROFILE
============================================================ */
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.userId;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      telephone: user.telephone,
      address: formatAddress(user),
    });

  } catch (err) {
    console.error("❌ PROFILE ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   ⭐ GET USER ADDRESS ONLY
============================================================ */
exports.getUserAddress = async (req, res) => {
  try {
    const userId = req.user?.id || req.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(formatAddress(user));

  } catch (err) {
    console.error("❌ GET ADDRESS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   ⭐ UPDATE / CREATE USER ADDRESS
============================================================ */
exports.updateUserAddress = async (req, res) => {
  try {
    const userId = req.user?.id || req.userId;

    const { name, type, fullAddress, city, state, country, pincode } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Always save NEW format consistently
    user.address = {
      name: name || `${user.firstName} ${user.lastName}`,
      type: type || user.address?.type || "Home",
      fullAddress: fullAddress || user.address?.fullAddress || "",
      city: city || user.address?.city || "",
      state: state || user.address?.state || "",
      country: country || user.address?.country || "",
      pincode: pincode || user.address?.pincode || "",
    };

    await user.save();

    return res.json({
      message: "Address updated successfully",
      address: user.address,
    });

  } catch (err) {
    console.error("❌ UPDATE ADDRESS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
