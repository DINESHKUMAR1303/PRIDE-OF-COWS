import axios from "axios";
import { MOCK_PRODUCTS } from "./mockData";

// Base URL for Backend
const API_URL = "http://localhost:5000/api/admin/products";

// Add Product
export const addProduct = async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/add`, formData);
        return res.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to add product";
    }
};

// Get All Products

export const fetchProducts = async (activeOnly = false) => {
    try {
        const url = activeOnly ? `${API_URL}?active=true` : API_URL;
        const res = await axios.get(url, { timeout: 3000 }); // 3s timeout to fallback quickly
        return res.data;
    } catch (error) {
        console.warn("API Unreachable or Error. Using Mock Data for Live Demo.");
        return { data: MOCK_PRODUCTS };
    }
};

// Delete Product
export const deleteProduct = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/delete/${id}`);
        return res.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to delete product";
    }
};

// Bulk Delete Products
export const deleteBulkProducts = async (ids) => {
    try {
        const res = await axios.post(`${API_URL}/delete-bulk`, { ids });
        return res.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to delete products";
    }
};

// Update Product
export const updateProduct = async (id, formData) => {
    try {
        const res = await axios.put(`${API_URL}/update/${id}`, formData);
        return res.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to update product";
    }
};

// Toggle Product Status (JSON)
export const updateProductStatus = async (id, isActive) => {
    try {
        // Send JSON to dedicated status endpoint
        const res = await axios.put(`${API_URL}/status/${id}`, { isActive });
        return res.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to update status";
    }
};
