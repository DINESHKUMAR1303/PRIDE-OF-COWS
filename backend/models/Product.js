import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName: { type: String, required: true },
        weight: { type: String, required: true }, // e.g. "1L", "200ml"
        price: { type: Number, required: true },  // Selling Price
        mrp: { type: Number, required: true },    // Maximum Retail Price
        image: { type: String, required: true },  // Store URL path
        isActive: { type: Boolean, default: true }, // Status
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
