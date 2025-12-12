// src/api/order.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL; 
// Example: VITE_API_URL=http://localhost:5000/api

// ============================
// CREATE ORDER (POST /orders)
// ============================
export const createOrder = async (orderData) => {
  const token = localStorage.getItem("poc_token");  // Auto-read token

  const res = await axios.post(`${API}/orders`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;   // Always return clean data
};

// ============================
// GET USER ORDERS (GET /orders/my-orders)
// ============================
export const getMyOrders = async () => {
  const token = localStorage.getItem("poc_token"); // Auto-read token

  const res = await axios.get(`${API}/orders/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;   // { success: true, orders: [...] }
};
