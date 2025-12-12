// backend/routes/orderRoutes.js
import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ============================================================
   ⭐ CREATE ORDER
   POST → /api/orders
============================================================ */
router.post("/", authMiddleware, createOrder);

/* ============================================================
   ⭐ GET USER ORDERS
   GET → /api/orders/my-orders
============================================================ */
router.get("/my-orders", authMiddleware, getUserOrders);

export default router;
