// backend/middleware/authMiddleware.js

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    // ---------------------------------------
    // Extract token from "Authorization"
    // ---------------------------------------
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      console.log("⛔ No token provided");
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // ---------------------------------------
    // Check if JWT_SECRET exists
    // ---------------------------------------
    if (!process.env.JWT_SECRET) {
      console.error("❌ SERVER ERROR: JWT_SECRET missing in .env");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    // ---------------------------------------
    // SPECIAL DEV BYPASS: Allow Hardcoded "mock-super-admin-token"
    // ---------------------------------------
    if (token === "mock-super-admin-token") {
      console.log("⚠️ USING MOCK ADMIN TOKEN (DEV MODE) ⚠️");
      req.user = { _id: "mock_admin_id", name: "Super Admin", role: "Super Admin" };
      return next();
    }

    // ---------------------------------------
    // Verify token
    // ---------------------------------------
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("❌ JWT Verification Error:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // ---------------------------------------
    // Load user from DB (Check User then Staff)
    // ---------------------------------------
    let user = await User.findById(decoded.id).select("-password");

    if (!user) {
      // If not in User, check Staff (for Admin actions)
      const Staff = (await import("../models/Staff.js")).default;
      user = await Staff.findById(decoded.id).select("-password");
    }

    if (!user) {
      console.log("⛔ Token user/staff does not exist anymore");
      return res.status(401).json({ message: "User/Staff no longer exists" });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (err) {
    console.error("❌ AUTH MIDDLEWARE ERROR:", err);
    return res.status(401).json({ message: "Not authorized" });
  }
};

export default authMiddleware;
