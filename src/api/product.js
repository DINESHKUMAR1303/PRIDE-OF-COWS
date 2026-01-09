import axios from "axios";

// Base URL for Backend
const API_URL = "http://localhost:5000/api/admin/products";

// Add Product
export const addProduct = async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/add`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to add product";
    }
};

// Get All Products
export const fetchProducts = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch products";
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

// Update Product
export const updateProduct = async (id, formData) => {
    try {
        const res = await axios.put(`${API_URL}/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to update product";
    }
};
