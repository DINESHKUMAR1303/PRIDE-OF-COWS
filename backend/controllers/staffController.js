import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Staff from "../models/Staff.js";

/* ============================================================
   ⭐ CREATE STAFF (ADD USER)
   - Image saved in filesystem
   - Only HTTP path saved in MongoDB
============================================================ */
export const createStaff = async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      contact,
      designation,
      password,
      departments,
    } = req.body;

    // 🔒 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🖼️ IMAGE HTTP PATH (IMPORTANT)
    const profileImage = req.file
      ? `/uploads/users/${req.file.filename}`
      : "";

    const staff = new Staff({
      userId,
      name,
      email,
      contact,
      designation,
      password: hashedPassword,
      departments: departments ? JSON.parse(departments) : [],
      profileImage, // ✅ correct HTTP path
    });

    await staff.save();

    res.status(201).json({
      success: true,
      message: "Staff created successfully",
      data: staff,
    });
  } catch (error) {
    console.error("❌ Create Staff Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create staff",
    });
  }
};

/* ============================================================
   ⭐ GET ALL STAFF (MANAGE USER)
============================================================ */
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    console.error("❌ Fetch Staff Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch staff",
    });
  }
};

/* ============================================================
   ⭐ LOGIN STAFF (ADMIN/EMPLOYEE LOGIN)
============================================================ */
/* ============================================================
   ⭐ LOGIN STAFF (ADMIN/EMPLOYEE LOGIN)
============================================================ */

export const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Check Password
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Generate Token
    const token = jwt.sign(
      { id: staff._id, role: staff.designation },
      process.env.JWT_SECRET || "poc_admin_secret",
      { expiresIn: "10h" } // Admin session
    );

    // 4. Return Data (Exclude Password)
    const { password: _, ...staffData } = staff.toObject();

    res.status(200).json({
      success: true,
      token,
      data: staffData,
    });
  } catch (error) {
    console.error("❌ Staff Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
