// backend/server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Route Imports
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

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
    origin: "*", // You can restrict later for production
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

/* ============================================================
   ⭐ REQUEST LOGGER (Helpful for debugging)
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

// User: Profile + Address
// Changed to plural "users" (follows REST standards)
app.use("/api/users", userRoutes);

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
   ⭐ GLOBAL ERROR HANDLER (Optional but recommended)
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
