// backend/routes/authRoutes.js

const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

/* ============================================================
   🔐 AUTH ROUTES (Base URL → /api/auth)
============================================================ */

/* ------------------------------------------------------------
   ⭐ REGISTER USER
   POST → /api/auth/register
------------------------------------------------------------ */
router.post("/register", registerUser);

/* ------------------------------------------------------------
   ⭐ LOGIN USER (Email OR Phone)
   POST → /api/auth/login
------------------------------------------------------------ */
router.post("/login", loginUser);

/* ------------------------------------------------------------
   ⭐ VERIFY TOKEN (Optional - useful for frontend Auth check)
   GET → /api/auth/verify
------------------------------------------------------------ */
router.get("/verify", protect, (req, res) => {
  return res.json({ valid: true, userId: req.user.id });
});

/* ------------------------------------------------------------
   ⭐ TEST ROUTE (Optional)
------------------------------------------------------------ */
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes working ✔️" });
});

module.exports = router;
