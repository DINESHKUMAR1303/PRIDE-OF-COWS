const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==============================
// REGISTER USER
// ==============================
exports.registerUser = async (req, res) => {
  console.log("🔥 registerUser called");
  console.log("🔥 BODY:", req.body);

  try {
    // Give default empty string so `.trim()` is safe
    const {
      firstName = "",
      lastName = "",
      email = "",
      telephone = "",
      password = "",
      confirmPassword = "",
      address = "",
      city = "",
      pincode = "",
      country = "",
      state = "",
    } = req.body || {};

    // ---- Check for missing fields (with trim) ----
    const fields = {
      firstName,
      lastName,
      email,
      telephone,
      password,
      confirmPassword,
      address,
      city,
      pincode,
      country,
      state,
    };

    const missingFields = Object.entries(fields)
      .filter(([key, value]) => {
        if (typeof value === "string") {
          return value.trim() === "";
        }
        return value === undefined || value === null;
      })
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.log("❌ Missing fields:", missingFields);
      return res
        .status(400)
        .json({ message: "Please fill all fields", missingFields });
    }

    // ---- Extra validation ----
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Passwords do not match" });
    }

    const cleanEmail = email.toLowerCase().trim();

    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in MongoDB
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: cleanEmail,
      telephone: telephone.trim(),
      password: hashedPassword,
      address: address.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      country: country.trim(),
      state: state.trim(),
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
        city: user.city,
        pincode: user.pincode,
        address: user.address,
        state: user.state,
        country: user.country,
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
    const { login, password } = req.body;

    if (!login || !password) {
      return res
        .status(400)
        .json({ message: "Please enter login and password" });
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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        telephone: user.telephone,
        city: user.city,
        pincode: user.pincode,
        address: user.address,
        state: user.state,
        country: user.country,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
