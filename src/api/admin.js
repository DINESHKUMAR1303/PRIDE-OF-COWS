import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Simple API call (no auth yet)
export const getDashboardStats = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data;
};
