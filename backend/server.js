// backend/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Route Imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; // ⭐ ESM import

// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

/* ============================================================
   ⭐ GLOBAL MIDDLEWARES
============================================================ */
app.use(
  cors({
    origin: "*", // Change in production
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

/* ============================================================
   ⭐ REQUEST LOGGER
============================================================ */
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

/* ============================================================
   ⭐ API ROUTES
============================================================ */

// Auth: Register & Login
app.use("/api/auth", authRoutes);

// User routes
app.use("/api/user", userRoutes);

// Order routes
app.use("/api/orders", orderRoutes);

/* ============================================================
   ⭐ ROOT ROUTE
============================================================ */
app.get("/", (req, res) => {
  res.send("🚀 Pride of Cows API is running...");
});

/* ============================================================
   ⭐ 404 HANDLER
============================================================ */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ============================================================
   ⭐ GLOBAL ERROR HANDLER
============================================================ */
app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

/* ============================================================
   ⭐ START SERVER
============================================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
