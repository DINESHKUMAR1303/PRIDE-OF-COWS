import axios from "axios";

// Change if your backend URL is different
const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

// REGISTER USER
export const registerUser = async (userData) => {
  try {
    const res = await API.post("/register", userData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Registration failed" };
  }
};

// LOGIN USER
export const loginUser = async (loginData) => {
  try {
    const res = await API.post("/login", loginData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};
