// backend/routes/userRoutes.js

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
   getUserProfile,
   getUserAddress,
   updateUserAddress,
   getAllUsers,
   updateUserStatus,
   deleteUser,
   bulkDeleteUsers
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
   ⭐ GET ALL USERS (ADMIN)
   GET /api/user/all
============================================================ */
router.get("/all", authMiddleware, getAllUsers);

/* ============================================================
   ⭐ UPDATE USER STATUS (ADMIN)
   PATCH /api/user/status/:id
============================================================ */
router.put("/status/:id", authMiddleware, updateUserStatus);

/* ============================================================
   ⭐ DELETE SINGLE USER (ADMIN)
   DELETE /api/user/:id
============================================================ */
router.delete("/:id", authMiddleware, deleteUser);

/* ============================================================
   ⭐ BULK DELETE USERS (ADMIN)
   POST /api/user/bulk-delete
============================================================ */
router.post("/bulk-delete", authMiddleware, bulkDeleteUsers);

/* ============================================================
   ⭐ EXPORT ROUTER (ESM)
   ============================================================ */
export default router;
