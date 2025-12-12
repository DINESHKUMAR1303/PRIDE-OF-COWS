// backend/models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: Number,
        title: String,
        weight: String,
        price: Number,
        qty: Number,
        img: String,
      },
    ],
    address: {
      name: String,
      fullAddress: String,
      label: String,
    },
    deliveryDate: String, // store ISO string
    totalAmount: Number,
    status: { type: String, default: "placed" }, // placed | processing | delivered | cancelled
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
