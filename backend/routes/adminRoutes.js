import express from "express";
import User from "../models/User.js";
import Order from "../models/Order.js";

const router = express.Router();

/* ============================================================
   📊 ADMIN DASHBOARD STATS (LIVE FROM MONGODB)
============================================================ */
router.get("/dashboard", async (req, res) => {
  try {
    // Total users
    const users = await User.countDocuments();

    // Total orders
    const orders = await Order.countDocuments();

    // Total revenue (sum of totalAmount)
    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    const revenue = revenueResult[0]?.total || 0;

    // Today's orders
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: startOfToday },
    });

    res.json({
      users,
      orders,
      revenue,
      todayOrders,
    });
  } catch (error) {
    console.error("❌ Dashboard Error:", error);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
});

export default router;
