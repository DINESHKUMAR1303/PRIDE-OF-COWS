// src/api/auth.js
import axios from "axios";

// ⭐ Backend base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

/* ============================================================
   ⭐ AUTO ATTACH TOKEN TO REQUEST
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
   ⭐ REGISTER USER — SEND CORRECT ADDRESS FIELDS
============================================================ */
export const registerUser = async (data) => {
  try {
    const payload = {
      firstName: data.firstName?.trim(),
      lastName: data.lastName?.trim(),
      email: data.email?.trim(),
      telephone: data.telephone?.trim(),
      password: data.password,
      confirmPassword: data.confirmPassword,

      // ⭐ UI MAY STILL SEND data.address — HANDLE BOTH
      fullAddress: (data.fullAddress || data.address || "").trim(),
      city: data.city?.trim(),
      state: data.state?.trim(),
      country: data.country?.trim(),
      pincode: data.pincode?.trim(),
    };

    console.log("📤 REGISTER PAYLOAD SENT TO BACKEND:", payload);

    const res = await API.post("/register", payload);

    return res.data;

  } catch (err) {
    const error = err.response?.data || { message: "Registration failed" };
    console.error("❌ REGISTER ERROR:", error);
    throw error;
  }
};

/* ============================================================
   ⭐ LOGIN USER — EMAIL OR PHONE
============================================================ */
export const loginUser = async (loginData) => {
  try {
    const payload = {
      login: loginData.login?.trim(),
      password: loginData.password,
    };

    console.log("📤 LOGIN PAYLOAD:", payload);

    const res = await API.post("/login", payload);

    // ⭐ Save token & user info
    if (res.data?.token) {
      localStorage.setItem("poc_token", res.data.token);
      localStorage.setItem("poc_user", JSON.stringify(res.data.user));
    }

    return res.data;

  } catch (err) {
    const error = err.response?.data || { message: "Login failed" };
    console.error("❌ LOGIN ERROR:", error);
    throw error;
  }
};

export default API;
