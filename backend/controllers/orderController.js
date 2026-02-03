// backend/controllers/orderController.js

import Order from "../models/Order.js";
import Razorpay from "razorpay";
import crypto from "crypto";

/* ============================================================
   ⭐ CREATE ORDER
============================================================ */
export const createOrder = async (req, res) => {
  try {
    console.log("🔥 CREATE ORDER HIT");
    console.log("➡️ USER:", req.user?._id);

    // ⭐ Extract Payment Details
    const {
      items,
      address,
      deliveryDate,
      totalAmount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

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
    // ⭐ VERIFY PAYMENT (If Razorpay IDs provided)
    // --------------------------
    let paymentStatus = "pending";
    if (razorpay_payment_id) {
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature === razorpay_signature) {
        paymentStatus = "confirmed"; // or 'paid'
        console.log("✅ PAYMENT VERIFIED");
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid Payment Signature",
        });
      }
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
      status: paymentStatus,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature
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
   ⭐ RAZORPAY CHECKOUT (Generate Order ID)
   POST → /api/orders/checkout
============================================================ */
export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100), // amount in paise
      currency: "INR",
    };

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });

    const order = await instance.orders.create(options);
    console.log("✅ RAZORPAY ORDER CREATED:", order);

    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_API_KEY
    });
  } catch (error) {
    console.error("❌ Razorpay Checkout Error:", error);
    res.status(500).json({
      success: false,
      message: "Razorpay Checkout Error",
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
      .populate("userId", "firstName lastName name email")
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

/* ============================================================
   ⭐ DELETE ORDER (Admin)
============================================================ */
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔥 DELETE ORDER HIT: ${id}`);

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    console.log(`✅ ORDER DELETED: ${id}`);

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (err) {
    console.error("❌ deleteOrder ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting order",
      error: err.message,
    });
  }
};

/* ============================================================
   ⭐ UPDATE ORDER STATUS (Admin)
============================================================ */
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log(`🔥 UPDATE ORDER STATUS HIT: ${id} -> ${status}`);

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    console.log(`✅ ORDER STATUS UPDATED: ${id} -> ${status}`);

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (err) {
    console.error("❌ updateOrderStatus ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server error while updating order status",
      error: err.message,
    });
  }
};
