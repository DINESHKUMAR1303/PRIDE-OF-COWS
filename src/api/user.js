// src/api/user.js
import axios from "axios";

/* ============================================================
   ⭐ BASE URL FOR USER ROUTES (Correct: /api/user)
============================================================ */
const API = axios.create({
  baseURL: "http://localhost:5000/api/user",
});

/* ============================================================
   ⭐ INTERCEPTOR → Automatically attach token
============================================================ */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("poc_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ============================================================
   ⭐ GET USER PROFILE
   GET /api/user/profile
============================================================ */
export const getUserProfile = async () => {
  try {
    const res = await API.get("/profile");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch user profile" };
  }
};

/* ============================================================
   ⭐ GET USER ADDRESS
   GET /api/user/address
============================================================ */
export const getUserAddress = async () => {
  try {
    const res = await API.get("/address");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch address" };
  }
};

/* ============================================================
   ⭐ UPDATE USER ADDRESS
   PUT /api/user/address
============================================================ */
export const updateAddress = async (addressData) => {
  try {
    const payload = {
      name: addressData.name?.trim(),
      type: addressData.type || "Home",
      fullAddress: addressData.fullAddress?.trim(),
      city: addressData.city?.trim(),
      state: addressData.state?.trim(),
      country: addressData.country?.trim(),
      pincode: addressData.pincode?.trim(),
    };

    const res = await API.put("/address", payload);
    return res.data;

  } catch (err) {
    throw err.response?.data || { message: "Failed to update address" };
  }
};

export default API;
