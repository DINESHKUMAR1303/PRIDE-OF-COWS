// src/api/order.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// Create axios instance to handle global errors (like 401)
const orderApi = axios.create();

orderApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Session expired. Logging out.");
      localStorage.removeItem("poc_token");
      localStorage.removeItem("poc_user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// ============================
// CREATE ORDER
// ============================
export const createOrder = async (orderData) => {
  const token = localStorage.getItem("poc_token");

  const res = await orderApi.post(`${API}/orders`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res; // IMPORTANT: return full axios response
};

/* ============================================================
// CHECKOUT (Razorpay Order Creation)
// ============================================================ */
export const checkoutOrder = async (amount) => {
  const token = localStorage.getItem("poc_token");
  const res = await orderApi.post(`${API}/orders/checkout`, { amount }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// ============================
// GET USER ORDERS
// ============================
export const getMyOrders = async () => {
  const token = localStorage.getItem("poc_token");

  const res = await orderApi.get(`${API}/orders/my-orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res; // IMPORTANT: return full axios response
};

// ============================
// GET ALL ORDERS (Admin)
// ============================
export const getAllOrders = async () => {
  const token = localStorage.getItem("admin_token") || localStorage.getItem("poc_token"); // Try admin token first

  const res = await orderApi.get(`${API}/orders/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
};

// ============================
// DELETE ORDER (Admin)
// ============================
export const deleteOrder = async (id) => {
  const token = localStorage.getItem("admin_token") || localStorage.getItem("poc_token"); // Try admin token first

  const res = await orderApi.delete(`${API}/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// ============================
// UPDATE ORDER STATUS (Admin)
// ============================
export const updateOrder = async (id, status) => {
  const token = localStorage.getItem("admin_token") || localStorage.getItem("poc_token");

  const res = await orderApi.put(`${API}/orders/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
};

