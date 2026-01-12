// backend/controllers/orderController.js

import Order from "../models/Order.js";

/* ============================================================
   ⭐ CREATE ORDER
============================================================ */
export const createOrder = async (req, res) => {
  try {
    console.log("🔥 CREATE ORDER HIT");
    console.log("➡️ USER:", req.user?._id);
    console.log("➡️ BODY:", req.body);

    const { items, address, deliveryDate, totalAmount } = req.body;

    // --------------------------
    // VALIDATIONS
    // --------------------------
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required",
      });
    }

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }

    if (!deliveryDate) {
      return res.status(400).json({
        success: false,
        message: "Delivery date is required",
      });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid total amount",
      });
    }

    // --------------------------
    // CREATE ORDER IN DB
    // --------------------------
    const order = await Order.create({
      userId: req.user._id,
      items,
      address,
      deliveryDate: new Date(deliveryDate),
      totalAmount,
      status: "pending",
    });

    console.log("✅ ORDER SAVED:", order._id);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    console.error("❌ createOrder ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server error while creating order",
      error: err.message,
    });
  }
};

/* ============================================================
   ⭐ GET USER ORDERS (My Orders Page)
============================================================ */
export const getUserOrders = async (req, res) => {
  try {
    console.log("🔥 GET USER ORDERS HIT");
    console.log("➡️ USER:", req.user?._id);

    const userId = req.user?._id;

    if (!userId) {
      console.log("❌ NO USER FOUND IN TOKEN");
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
        orders: [],
      });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    console.log("📦 ORDERS RETURNED:", orders.length);

    return res.status(200).json({
      success: true,
      orders: orders || [],
    });
  } catch (err) {
    console.error("❌ getUserOrders ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
      error: err.message,
      orders: [],
    });
  }
};

/* ============================================================
   ⭐ GET ALL ORDERS (Admin)
============================================================ */
export const getAllOrders = async (req, res) => {
  try {
    console.log("🔥 GET ALL ORDERS HIT (Admin)");

    // Populate userId to get customer name/email
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    console.log("📦 ALL ORDERS RETURNED:", orders.length);

    return res.status(200).json({
      success: true,
      orders: orders || [],
    });
  } catch (err) {
    console.error("❌ getAllOrders ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching all orders",
      error: err.message,
      orders: [],
    });
  }
};
