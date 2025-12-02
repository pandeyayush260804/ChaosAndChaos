// player-api.ts
import axios from "axios";

// Separate axios instance for Player APIs
const playerAPI = axios.create({
  baseURL: import.meta.env.VITE_PLAYER_API_BASE_URL, // player URL from .env
});

// Player Register
export const doPlayerRegister = (userData: unknown) => {
  console.log("PlayerAPI BaseURL:", playerAPI.defaults.baseURL, "User:", userData);
  return playerAPI.post("/register", userData);
};

// Player Login
export const doPlayerLogin = (userData: unknown) => {
  console.log("PlayerAPI BaseURL:", playerAPI.defaults.baseURL, "User:", userData);
  return playerAPI.post("/login", userData);
};
