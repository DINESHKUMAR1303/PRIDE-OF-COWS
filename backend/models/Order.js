// backend/models/Order.js
import mongoose from "mongoose";

/* ============================================================
   ⭐ ORDER ITEM SUBSCHEMA
   Prevents nested _id inside items[]
============================================================ */
const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false } // Prevents auto-generation of _id for each item
);

/* ============================================================
   ⭐ MAIN ORDER SCHEMA
============================================================ */
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [orderItemSchema],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    deliveryDate: {
      type: Date,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },


  },
  { timestamps: true }
);

/* ============================================================
   ⭐ SAFE EXPORT (Prevents OverwriteModelError in Nodemon)
============================================================ */
const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
