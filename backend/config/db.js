// backend/config/db.js

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Options recommended for Mongoose 7+
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Stop server if DB fails
  }
};

module.exports = connectDB;
