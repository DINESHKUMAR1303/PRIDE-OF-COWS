// backend/routes/userRoutes.js

const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  getUserProfile,
  getUserAddress,
  updateUserAddress,
} = require("../controllers/userController");

/* ============================================================
   ⭐ GET FULL USER PROFILE
   GET /api/user/profile
============================================================ */
router.get("/profile", protect, getUserProfile);

/* ============================================================
   ⭐ GET ONLY USER ADDRESS
   GET /api/user/address
============================================================ */
router.get("/address", protect, getUserAddress);

/* ============================================================
   ⭐ UPDATE OR SAVE ADDRESS
   PUT /api/user/address
============================================================ */
router.put("/address", protect, updateUserAddress);

module.exports = router;
