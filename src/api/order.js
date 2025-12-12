// src/api/order.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ============================
// CREATE ORDER
// ============================
export const createOrder = async (orderData) => {
  const token = localStorage.getItem("poc_token");

  const res = await axios.post(`${API}/orders`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res; // IMPORTANT: return full axios response
};

// ============================
// GET USER ORDERS
// ============================
export const getMyOrders = async () => {
  const token = localStorage.getItem("poc_token");

  const res = await axios.get(`${API}/orders/my-orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res; // IMPORTANT: return full axios response
};
