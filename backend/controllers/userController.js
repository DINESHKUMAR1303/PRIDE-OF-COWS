// backend/controllers/userController.js

import User from "../models/User.js";

/* ============================================================
   ⭐ FORMAT ADDRESS (Works for BOTH old & new users)
============================================================ */
function formatAddress(user) {
  const addr = user.address;

  // OLD USERS → address was stored as a plain string
  if (typeof addr === "string") {
    return {
      name: `${user.firstName} ${user.lastName}`,
      type: "Home",
      fullAddress: addr || "",
      city: user.city || "",
      state: user.state || "",
      country: user.country || "",
      pincode: user.pincode || "",
    };
  }

  // NEW USERS → address is an object
  return {
    name: addr?.name || `${user.firstName} ${user.lastName}`,
    type: addr?.type || "Home",
    fullAddress: addr?.fullAddress || "",
    city: addr?.city || "",
    state: addr?.state || "",
    country: addr?.country || "",
    pincode: addr?.pincode || "",
  };
}

/* ============================================================
   ⭐ GET FULL USER PROFILE
============================================================ */
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user?._id; // ⭐ FIXED: our middleware sets _id, not id

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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
export const getUserAddress = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(formatAddress(user));

  } catch (err) {
    console.error("❌ GET ADDRESS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   ⭐ UPDATE / SAVE USER ADDRESS
============================================================ */
export const updateUserAddress = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { name, type, fullAddress, city, state, country, pincode } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ⭐ Always store address in NEW structured format
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

/* ============================================================
   ⭐ GET ALL USERS (ADMIN PANEL)
   GET /api/user/all
============================================================ */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    // Use formatAddress for consistent structure if needed, or just return as is
    const formattedUsers = users.map(user => ({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      telephone: user.telephone,
      address: formatAddress(user), // Use the helper
      isActive: user.isActive !== false,
      createdAt: user.createdAt
    }));

    return res.status(200).json({
      success: true,
      data: formattedUsers
    });
  } catch (err) {
    console.error("❌ GET ALL USERS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   ⭐ UPDATE USER STATUS (ENABLE/DISABLE)
   PATCH /api/user/status/:id
============================================================ */
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      success: true,
      message: `User ${isActive ? 'enabled' : 'disabled'} successfully`,
      data: user
    });
  } catch (err) {
    console.error("❌ UPDATE STATUS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   ⭐ DELETE SINGLE USER
   DELETE /api/user/:id
============================================================ */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (err) {
    console.error("❌ DELETE USER ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   ⭐ BULK DELETE USERS
   POST /api/user/bulk-delete
============================================================ */
export const bulkDeleteUsers = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No user IDs provided" });
    }

    await User.deleteMany({ _id: { $in: ids } });

    return res.json({
      success: true,
      message: `${ids.length} users deleted successfully`
    });
  } catch (err) {
    console.error("❌ BULK DELETE ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
