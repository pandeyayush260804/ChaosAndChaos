// admin-api.ts
import axios from "axios";

// Separate axios instance for Admin APIs
const adminAPI = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_BASE_URL, // admin URL from .env
});

// Admin Register
export const doAdminRegister = (userData:unknown) => {
  console.log("AdminAPI BaseURL:", adminAPI.defaults.baseURL, "User:", userData);
  return adminAPI.post("/register", userData);
};

// Admin Login
export const doAdminLogin = (userData: unknown) => {
  console.log("AdminAPI BaseURL:", adminAPI.defaults.baseURL, "User:", userData);
  return adminAPI.post("/login", userData);
};
