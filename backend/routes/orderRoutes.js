// backend/routes/orderRoutes.js

const express = require("express");
const router = express.Router();

const {
  createOrder,
  getUserOrders
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

// =============================
// CREATE ORDER 
// Frontend sends POST /api/orders
// =============================
router.post("/", authMiddleware, createOrder);

// =============================
// GET USER ORDERS 
// GET /api/orders/my-orders
// =============================
router.get("/my-orders", authMiddleware, getUserOrders);

module.exports = router;   // ✔ DO NOT REMOVE
