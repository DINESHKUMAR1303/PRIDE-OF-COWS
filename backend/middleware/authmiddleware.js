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
    // Load user from DB
    // ---------------------------------------
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log("⛔ Token user does not exist anymore");
      return res.status(401).json({ message: "User no longer exists" });
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
