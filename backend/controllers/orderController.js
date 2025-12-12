// backend/controllers/orderController.js
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { items, address, deliveryDate, totalAmount } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: "No items in order" });
    }

    const order = new Order({
      user: req.user.id, // auth middleware should set req.user
      items,
      address,
      deliveryDate,
      totalAmount,
    });

    await order.save();

    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error("createOrder error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error("getUserOrders error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
