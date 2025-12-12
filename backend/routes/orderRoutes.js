// backend/routes/orderRoutes.js

const express = require("express");
const router = express.Router();

const {
  createOrder,
  getUserOrders
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

// CREATE ORDER
router.post("/create", authMiddleware, createOrder);

// GET USER ORDERS
router.get("/my-orders", authMiddleware, getUserOrders);

module.exports = router;   // ✔ VERY IMPORTANT
