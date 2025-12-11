// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function protect(req, res, next) {
  try {
    let token;

    // Should be in: Authorization: Bearer xyz
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    next();
  } catch (err) {
    console.error("❌ AUTH ERROR:", err);
    return res.status(401).json({ message: "Not authorized" });
  }
};
