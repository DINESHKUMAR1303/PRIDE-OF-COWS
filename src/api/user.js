// src/api/user.js
import axios from "axios";

/* ============================================================
   ⭐ BASE INSTANCES
============================================================ */

// User APIs
const USER_API = axios.create({
  baseURL: "http://localhost:5000/api/user",
});

// Admin Staff APIs
const STAFF_API = axios.create({
  baseURL: "http://localhost:5000/api/admin/staff",
});

/* ============================================================
   ⭐ INTERCEPTOR → Attach JWT token automatically
============================================================ */
const attachToken = (config) => {
  const token = localStorage.getItem("poc_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

USER_API.interceptors.request.use(attachToken, Promise.reject);
STAFF_API.interceptors.request.use(attachToken, Promise.reject);

/* ============================================================
   ⭐ USER APIs
============================================================ */

/**
 * GET /api/user/profile
 */
export const getUserProfile = async () => {
  try {
    const res = await USER_API.get("/profile");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch user profile" };
  }
};

/**
 * GET /api/user/address
 */
export const getUserAddress = async () => {
  try {
    const res = await USER_API.get("/address");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch address" };
  }
};

/**
 * PUT /api/user/address
 */
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

    const res = await USER_API.put("/address", payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update address" };
  }
};

/* ============================================================
   ⭐ ADMIN PANEL → STAFF APIs
============================================================ */

/**
 * POST /api/admin/staff/create
 * Create new staff (Add User form)
 */
export const createStaff = async (formData) => {
  try {
    const res = await STAFF_API.post("/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to create staff" };
  }
};

/**
 * POST /api/admin/staff/login
 * Login for staff members
 */
export const loginStaff = async (credentials) => {
  try {
    const res = await STAFF_API.post("/login", credentials);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to login" };
  }
};

/**
 * GET /api/admin/staff/list
 * Fetch all staff (Manage User table)
 */
export const fetchStaff = async () => {
  try {
    const res = await STAFF_API.get("/list");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch staff list" };
  }
};

/* ============================================================
   ⭐ EXPORT DEFAULT USER API INSTANCE (optional)
============================================================ */
export default USER_API;
