// backend/server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Route Imports
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); // ⭐ User profile + address routes

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ----------------------
// Middlewares
// ----------------------
app.use(cors());
app.use(express.json());

// ⭐ Log all incoming requests (helpful for debugging APIs)
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

// ----------------------
// API Routes
// ----------------------

// Auth: Register + Login
app.use("/api/auth", authRoutes);

// ⭐ User Routes: Profile, Address (Protected by authMiddleware)
app.use("/api/user", userRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Pride of Cows API is running 🚀");
});

// 404 Fallback Route (not removing your route)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
