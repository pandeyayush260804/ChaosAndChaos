// admin-api.ts
import axios from "axios";

// Separate axios instance for Admin APIs
const adminAPI = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_BASE_URL,
});

// ===== AUTH (UNCHANGED) =====
export const doAdminRegister = (userData: unknown) => {
  return adminAPI.post("/register", userData);
};

export const doAdminLogin = (userData: unknown) => {
  return adminAPI.post("/login", userData);
};

// ===== NEW ADMIN APIs =====

// Global Leaderboard (Top N)
export const getAdminLeaderboard = (limit: number) => {
  return adminAPI.get(`/leaderboard?limit=${limit}`);
};

// All Matches (1 record per room)
export const getAllAdminMatches = () => {
  return adminAPI.get("/matches");
};

// All Players Stats
export const getAllAdminPlayers = () => {
  return adminAPI.get("/players");
};
// Search player by email (Admin)
export const searchAdminPlayer = (email: string) => {
  return adminAPI.get(`/players/search?email=${email}`);
};
