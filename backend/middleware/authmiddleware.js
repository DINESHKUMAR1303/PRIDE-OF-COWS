const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.header("Authorization");

  // No token provided
  if (!token) {
    return res.status(401).json({ message: "No token, unauthorized" });
  }

  try {
    // Format is: "Bearer <token>"
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1]; // Extract actual token
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request
    req.user = { id: decoded.id };

    // ⭐ Added logging to debug token issues (non-breaking)
    // console.log("🔐 Authenticated user:", decoded.id);

    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;
