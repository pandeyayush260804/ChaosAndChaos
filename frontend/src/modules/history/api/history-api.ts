import axios from "axios";

// Separate axios instance for History APIs
const historyAPI = axios.create({
  baseURL: import.meta.env.VITE_HISTORY_API_BASE_URL,
});

/**
 * Fetch user's match history
 * GET /match-history/my-history?email=
 */
export const fetchMyMatchHistory = (email: string) => {
  console.log(
    "HistoryAPI BaseURL:",
    historyAPI.defaults.baseURL,
    "Email:",
    email
  );

  return historyAPI.get("/match-history/my-history", {
    params: { email },
  });
};
