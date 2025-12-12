// backend/controllers/orderController.js
import Order from "../models/Order.js";

// ==========================
// CREATE ORDER
// ==========================
export const createOrder = async (req, res) => {
  try {
    const { items, address, deliveryDate, totalAmount } = req.body;

    // Basic validation
    if (!items || !items.length) {
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

    // Create order document
    const order = await Order.create({
      user: req.user._id, // Auth middleware must attach the user
      items,
      address,
      deliveryDate: new Date(deliveryDate), // ensure correct Date format
      totalAmount,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });

  } catch (err) {
    console.error("❌ createOrder error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while creating order",
      error: err.message,
    });
  }
};

// ==========================
// GET USER ORDERS
// ==========================
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      orders,
    });

  } catch (err) {
    console.error("❌ getUserOrders error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
      error: err.message,
    });
  }
};
