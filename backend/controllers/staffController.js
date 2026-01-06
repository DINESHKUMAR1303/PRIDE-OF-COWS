import bcrypt from "bcryptjs";
import Staff from "../models/Staff.js";

/* ============================================================
   ⭐ CREATE STAFF (ADD USER)
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = new Staff({
      userId,
      name,
      email,
      contact,
      designation,
      password: hashedPassword,
      departments: departments ? JSON.parse(departments) : [],
      profileImage: req.file ? `/uploads/${req.file.filename}` : "",
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
    res.status(200).json(staff);
  } catch (error) {
    console.error("❌ Fetch Staff Error:", error);
    res.status(500).json({
      message: error.message || "Failed to fetch staff",
    });
  }
};
