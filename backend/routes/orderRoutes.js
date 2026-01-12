// backend/routes/orderRoutes.js
import express from "express";
import { createOrder, getUserOrders, getAllOrders, deleteOrder } from "../controllers/orderController.js";
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
   ⭐ DELETE ORDER (Admin)
   DELETE → /api/orders/:id
============================================================ */
router.delete("/:id", authMiddleware, deleteOrder);

export default router;
