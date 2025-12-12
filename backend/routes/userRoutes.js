// backend/routes/userRoutes.js

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  getUserAddress,
  updateUserAddress
} from "../controllers/userController.js";

const router = express.Router();

/* ============================================================
   ⭐ GET FULL USER PROFILE
   GET /api/user/profile
============================================================ */
router.get("/profile", authMiddleware, getUserProfile);

/* ============================================================
   ⭐ GET ONLY USER ADDRESS
   GET /api/user/address
============================================================ */
router.get("/address", authMiddleware, getUserAddress);

/* ============================================================
   ⭐ UPDATE OR SAVE ADDRESS
   PUT /api/user/address
============================================================ */
router.put("/address", authMiddleware, updateUserAddress);

/* ============================================================
   ⭐ EXPORT ROUTER (ESM)
============================================================ */
export default router;
