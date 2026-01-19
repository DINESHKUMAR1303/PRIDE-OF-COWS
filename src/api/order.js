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

// ============================
// GET ALL ORDERS (Admin)
// ============================
export const getAllOrders = async () => {
  const token = localStorage.getItem("admin_token") || localStorage.getItem("poc_token"); // Try admin token first

  const res = await axios.get(`${API}/orders/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
};

// ============================
// DELETE ORDER (Admin)
// ============================
export const deleteOrder = async (id) => {
  const token = localStorage.getItem("admin_token") || localStorage.getItem("poc_token"); // Try admin token first

  const res = await axios.delete(`${API}/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// ============================
// UPDATE ORDER STATUS (Admin)
// ============================
export const updateOrder = async (id, status) => {
  const token = localStorage.getItem("admin_token") || localStorage.getItem("poc_token");

  const res = await axios.put(`${API}/orders/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
};

