import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

// Add Product
export const addProduct = async (req, res) => {
    try {
        const { productName, weight, price, mrp } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const imagePath = `/uploads/products/${req.file.filename}`;

        const newProduct = new Product({
            productName,
            weight,
            price,
            mrp,
            image: imagePath,
        });

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", data: newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get All Products (Descending Order)
export const getProducts = async (req, res) => {
    try {
        const { active } = req.query;
        let query = {};

        // If active=true is passed, filter out inactive products
        // We use $ne: false to include true AND undefined (legacy products)
        if (active === 'true') {
            query.isActive = { $ne: false };
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        res.status(200).json({ data: products });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // In a real app, delete the file from fs here using product.image path

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update Product
export const updateProduct = async (req, res) => {
    try {
        const { productName, weight, price, mrp, isActive } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        let imagePath = product.image;
        if (req.file) {
            imagePath = `/uploads/products/${req.file.filename}`;
        }

        product.productName = productName || product.productName;
        product.weight = weight || product.weight;
        product.price = price || product.price;
        product.mrp = mrp || product.mrp;
        product.image = imagePath;

        // Handle boolean toggle specifically
        // Handle boolean toggle specifically
        if (typeof isActive !== 'undefined') {
            console.log(`[UpdateProduct] Toggling status for ${product._id}: received ${isActive} (${typeof isActive})`);

            // Normalize value: convert string 'false' to boolean false
            const isTrue = String(isActive) === 'true';

            // Explicitly set the value to avoid coercion issues
            product.isActive = isTrue;
            console.log(`[UpdateProduct] New status set to: ${product.isActive}`);
        } else {
            console.log(`[UpdateProduct] No status change received for ${product._id}`);
        }

        await product.save();
        res.status(200).json({ message: "Product updated successfully", data: product });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Toggle Product Status (Dedicated Endpoint)
export const toggleProductStatus = async (req, res) => {
    try {
        const { isActive } = req.body;
        console.log(`[ToggleStatus] ID: ${req.params.id}`);
        console.log(`[ToggleStatus] Received Body:`, req.body);
        console.log(`[ToggleStatus] Raw isActive: ${isActive} (type: ${typeof isActive})`);

        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Robust Boolean Conversion
        let newStatus;
        if (typeof isActive === 'string') {
            newStatus = isActive.toLowerCase() === 'true';
        } else {
            newStatus = Boolean(isActive);
        }

        console.log(`[ToggleStatus] Setting status to: ${newStatus}`);
        product.isActive = newStatus;

        await product.save();
        console.log(`[ToggleStatus] Successfully saved.`);

        res.status(200).json({ message: "Status updated successfully", data: product });
    } catch (error) {
        console.error("Toggle status error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
