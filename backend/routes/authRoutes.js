// backend/routes/authRoutes.js

const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

/* ============================================
   🔐 AUTH ROUTES
   Base URL → /api/auth
   ============================================ */

// ⭐ REGISTER USER
// POST → /api/auth/register
router.post("/register", registerUser);

// ⭐ LOGIN USER (email or phone)
// POST → /api/auth/login
router.post("/login", loginUser);

// ⭐ OPTIONAL: TEST ROUTE (helps confirm server is working)
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes working ✔️" });
});

module.exports = router;
