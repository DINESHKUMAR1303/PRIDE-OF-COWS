// backend/routes/authRoutes.js

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

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
   ⭐ VERIFY TOKEN
   GET → /api/auth/verify
------------------------------------------------------------ */
router.get("/verify", authMiddleware, (req, res) => {
  return res.json({
    valid: true,
    userId: req.user._id,
  });
});

/* ------------------------------------------------------------
   ⭐ TEST ROUTE
------------------------------------------------------------ */
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes working ✔️" });
});

/* ------------------------------------------------------------
   ⭐ EXPORT ROUTER (ESM)
------------------------------------------------------------ */
export default router;
