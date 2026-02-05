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
   ⭐ INTERCEPTORS
============================================================ */

// Attach User Token (Customer)
USER_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("poc_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, Promise.reject);

// Attach Admin Token (Staff/Admin)
STAFF_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, Promise.reject);

// Response Interceptor: Handle 401 Token Expiration (Auto-Logout)
const handleTokenExpiry = (error) => {
  if (error.response?.status === 401) {
    console.warn("⚠️ Session expired or unauthorized. Logging out...");
    localStorage.removeItem("poc_token");
    localStorage.removeItem("poc_user");
    // Use window.location to strictly force a refresh/redirect
    window.location.href = "/";
  }
  return Promise.reject(error);
};

USER_API.interceptors.response.use((response) => response, handleTokenExpiry);
STAFF_API.interceptors.response.use((response) => response, handleTokenExpiry);

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

/**
 * GET /api/user/all (Admin Only)
 * Uses direct axios call with admin_token because USER_API uses poc_token
 */
export const fetchAllUsers = async () => {
  try {
    const token = localStorage.getItem("admin_token");
    const res = await axios.get("http://localhost:5000/api/user/all", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch users" };
  }
};

/**
 * PATCH /api/user/status/:id (Admin Only)
 */
export const updateUserStatus = async (id, isActive) => {
  try {
    const token = localStorage.getItem("admin_token");
    const res = await axios.put(`http://localhost:5000/api/user/status/${id}`, { isActive }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update user status" };
  }
};

/**
 * DELETE /api/user/:id (Admin Only)
 */
export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("admin_token");
    const res = await axios.delete(`http://localhost:5000/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to delete user" };
  }
};

/**
 * POST /api/user/bulk-delete (Admin Only)
 */
export const bulkDeleteUsers = async (ids) => {
  try {
    const token = localStorage.getItem("admin_token");
    const res = await axios.post("http://localhost:5000/api/user/bulk-delete", { ids }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to bulk delete users" };
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

/**
 * PUT /api/admin/staff/update/:id
 * Update staff member details
 */
export const updateStaff = async (id, formData) => {
  try {
    const res = await STAFF_API.put(`/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update staff" };
  }
};

/**
 * DELETE /api/admin/staff/delete/:id
 * Delete a single staff member
 */
export const deleteStaff = async (id) => {
  try {
    const res = await STAFF_API.delete(`/delete/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to delete staff" };
  }
};

/**
 * POST /api/admin/staff/bulk-delete
 * Delete multiple staff members
 */
export const bulkDeleteStaff = async (ids) => {
  try {
    const res = await STAFF_API.post("/bulk-delete", { ids });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to bulk delete staff" };
  }
};

/* ============================================================
   ⭐ EXPORT DEFAULT USER API INSTANCE (optional)
============================================================ */
export default USER_API;
