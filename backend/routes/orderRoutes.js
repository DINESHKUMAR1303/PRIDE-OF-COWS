// backend/routes/orderRoutes.js
import express from "express";
import { createOrder, getUserOrders, getAllOrders, deleteOrder, updateOrderStatus } from "../controllers/orderController.js";
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

/* ============================================================
   ⭐ GET ALL ORDERS (Admin)
   GET → /api/orders/all
============================================================ */
router.get("/all", authMiddleware, getAllOrders);

/* ============================================================
   ⭐ UPDATE ORDER STATUS (Admin)
   PUT → /api/orders/:id/status
============================================================ */
router.put("/:id/status", authMiddleware, updateOrderStatus);

/* ============================================================
   ⭐ DELETE ORDER (Admin)
   DELETE → /api/orders/:id
============================================================ */
router.delete("/:id", authMiddleware, deleteOrder);

export default router;
