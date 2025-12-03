// backend/controllers/authController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==============================
// REGISTER USER
// ==============================
exports.registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      telephone,
      password,
      confirmPassword,
      address,
      city,
      country,
      state,
    } = req.body;

    // ---- Validation ----
    if (
      !firstName ||
      !lastName ||
      !email ||
      !telephone ||
      !password ||
      !confirmPassword ||
      !address ||
      !city ||
      !country ||
      !state
    ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Normalize email
    const cleanEmail = email.toLowerCase().trim();

    // Check if user exists
    const existing = await User.findOne({ email: cleanEmail });

    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email: cleanEmail,
      telephone,
      password: hashedPassword,
      address,
      city,
      country,
      state,
    });

    return res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// LOGIN USER (email OR phone)
// ==============================
exports.loginUser = async (req, res) => {
  try {
    const { login, password } = req.body; // login = email or phone number

    if (!login || !password) {
      return res.status(400).json({ message: "Please enter login and password" });
    }

    // Format the login field
    const loginValue =
      login.includes("@") ? login.toLowerCase().trim() : login.trim();

    // Find user
    const user = await User.findOne({
      $or: [{ email: loginValue }, { telephone: loginValue }],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // JWT Token
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
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
