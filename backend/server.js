// backend/server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

// ================= ROUTE IMPORTS =================
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";

// ================= CONFIG =================
dotenv.config();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= DB CONNECTION =================
await connectDB();

mongoose.connection.once("open", () => {
  console.log(`📦 Connected MongoDB Database: ${mongoose.connection.name}`);
});

const app = express();

// ================= GLOBAL MIDDLEWARES =================
app.use(
  cors({
    origin: "*", // 🔒 restrict in production
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// 🔹 REQUIRED FOR JSON
app.use(express.json());

// 🔹 REQUIRED FOR FORM-DATA TEXT FIELDS
app.use(express.urlencoded({ extended: true }));

// ================= STATIC FILES (IMAGE UPLOADS) =================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= REQUEST LOGGER =================
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

// ================= API ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/staff", staffRoutes);
app.use("/api/admin", adminRoutes);

// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 Pride of Cows API is running...");
});

// ================= 404 HANDLER =================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
