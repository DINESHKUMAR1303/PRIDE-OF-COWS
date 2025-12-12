// src/api/order.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL; 
// Make sure .env contains:  VITE_API_URL=http://localhost:5000/api

export const createOrder = async (orderData, token) => {
  return await axios.post(`${API}/orders/create`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyOrders = async (token) => {
  return await axios.get(`${API}/orders/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};