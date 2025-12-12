// backend/config/db.js

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Ensure MONGO_URI exists
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI is not defined in .env file");
      process.exit(1);
    }

    // Mongoose 7+ recommended usage: only pass the URI
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Optional: listen for disconnections
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

export default connectDB;
