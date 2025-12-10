// backend/config/db.js

const mongoose = require("mongoose");

// Optional: turn on useful mongoose logs in dev
// mongoose.set("debug", true);

const connectDB = async () => {
  try {
    // Ensure MONGO_URI exists
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI is not defined in .env file");
      process.exit(1);
    }

    // Mongoose 7+ recommended usage: just pass the URI
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Optional: handle disconnected / error events
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB error:", err.message);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Stop server if DB fails
  }
};

module.exports = connectDB;
