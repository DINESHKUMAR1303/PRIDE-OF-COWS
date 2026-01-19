// backend/controllers/authController.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* ============================================================
   ⭐ REGISTER USER
============================================================ */
export const registerUser = async (req, res) => {
  console.log("🔥 registerUser called");
  console.log("🔥 BODY:", req.body);

  try {
    const {
      firstName = "",
      lastName = "",
      email = "",
      telephone = "",
      password = "",
      confirmPassword = "",

      // Address fields
      fullAddress = "",
      city = "",
      state = "",
      country = "",
      pincode = "",
    } = req.body || {};

    // -------------------------------
    // Validate required fields
    // -------------------------------
    const required = {
      firstName,
      lastName,
      email,
      telephone,
      password,
      confirmPassword,
      fullAddress,
      city,
      state,
      country,
      pincode,
    };

    const missing = Object.entries(required)
      .filter(([_, v]) => (typeof v === "string" ? v.trim() === "" : !v))
      .map(([k]) => k);

    if (missing.length > 0) {
      return res.status(400).json({
        message: "Please fill all fields",
        missingFields: missing,
      });
    }

    // -------------------------------
    // Validate passwords
    // -------------------------------
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // -------------------------------
    // Check for existing user
    // -------------------------------
    const cleanEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: cleanEmail });

    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // -------------------------------
    // Hash password
    // -------------------------------
    const hashedPassword = await bcrypt.hash(password, 10);

    // -------------------------------
    // Create user
    // -------------------------------
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: cleanEmail,
      telephone: telephone.trim(),
      password: hashedPassword,

      address: {
        name: `${firstName.trim()} ${lastName.trim()}`,
        type: "Home",
        fullAddress: fullAddress.trim(),
        city: city.trim(),
        state: state.trim(),
        country: country.trim(),
        pincode: pincode.trim(),
      },
    });

    console.log("✅ User created:", user._id);

    return res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        telephone: user.telephone,
        address: user.address,
      },
    });
  } catch (err) {
    console.error("❌ Register Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   ⭐ LOGIN USER (email OR phone)
============================================================ */
export const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res
        .status(400)
        .json({ message: "Please enter login & password" });
    }

    const loginValue = login.includes("@")
      ? login.toLowerCase().trim()
      : login.trim();

    const user = await User.findOne({
      $or: [{ email: loginValue }, { telephone: loginValue }],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 🔒 CHECK IF BLOCKED
    if (user.isActive === false) {
      return res.status(403).json({
        message: "Your account has been blocked by the admin. Please contact support."
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // -------------------------------
    // Generate token
    // -------------------------------
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        telephone: user.telephone,
        address: user.address ?? null,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
