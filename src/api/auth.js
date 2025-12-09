// src/api/auth.js
import axios from "axios";

// Backend base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

// ✅ REGISTER USER — send ALL FIELDS
export const registerUser = async (data) => {
  try {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      telephone: data.telephone,
      password: data.password,
      confirmPassword: data.confirmPassword,
      address: data.address,
      city: data.city,
      pincode: data.pincode,
      country: data.country,
      state: data.state,
    };

    console.log("📤 SENDING TO BACKEND:", payload);

    const res = await API.post("/register", payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Registration failed" };
  }
};

// ✅ LOGIN USER (unchanged)
export const loginUser = async (loginData) => {
  try {
    const res = await API.post("/login", loginData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};
