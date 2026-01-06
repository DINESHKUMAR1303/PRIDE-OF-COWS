import express from "express";
import multer from "multer";
import {
  createStaff,
  getAllStaff,
} from "../controllers/staffController.js";

const router = express.Router();

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ================= ROUTES =================
router.post("/create", upload.single("profileImage"), createStaff);
router.get("/list", getAllStaff);

export default router;
