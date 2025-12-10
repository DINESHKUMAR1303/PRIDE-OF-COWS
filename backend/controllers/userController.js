const User = require("../models/User");

// ============================================
// ⭐ GET USER ADDRESS
// URL: GET /api/user/address
// ============================================
exports.getUserAddress = async (req, res) => {
  try {
    // FIX: correct ID source depending on your authMiddleware
    const userId = req.user?.id || req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized - No user ID" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ⭐ Support BOTH formats:
    // 1️⃣ New nested format: user.address.fullAddress
    // 2️⃣ Old flat format: user.fullAddress, user.city, etc.
    const addressObj = user.address || {};

    return res.json({
      name: `${user.firstName} ${user.lastName}`,
      addressType: addressObj.type || "Home",
      fullAddress: addressObj.fullAddress || "",
      city: addressObj.city || "",
      state: addressObj.state || "",
      country: addressObj.country || "",
      pincode: addressObj.pincode || "",
    });

  } catch (error) {
    console.log("❌ GET USER ADDRESS ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
