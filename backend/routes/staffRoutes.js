import express from "express";
import multer from "multer";
import path from "path";

import {
  createStaff,
  getAllStaff,
} from "../controllers/staffController.js";

const router = express.Router();

// ================= MULTER CONFIG =================

// STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users"); // ✅ correct folder
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// FILE FILTER
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isValid =
    allowedTypes.test(file.mimetype) &&
    allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG files are allowed"), false);
  }
};

// MULTER INSTANCE
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
});

// ================= ROUTES =================

// CREATE STAFF (WITH IMAGE)
router.post(
  "/create",
  upload.single("profileImage"), // 🔑 must match frontend
  createStaff
);

// GET STAFF LIST
router.get("/list", getAllStaff);

export default router;
