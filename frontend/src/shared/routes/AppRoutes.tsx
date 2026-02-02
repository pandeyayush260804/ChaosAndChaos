import { Routes, Route } from "react-router-dom";
import Home from "../component/home";
import Register from "@/modules/admin/pages/register";
import Login from "@/modules/admin/pages/login";
import DashboardSelector from "../component/dashboardselector";
import PlayerRegister from "@/modules/user/pages/pregister";
import PlayerLogin from "@/modules/user/pages/plogin";
import PlayerDashboard from "@/modules/user/pages/player-dashboard";
import AdminDashboard from "@/modules/admin/pages/admin-dashboard";
import Matchmaking from "@/modules/matches/match-making";
import VsScreen from "@/modules/matches/VsScreen";
import Battle from "@/modules/matches/battle";
import MatchHistory from "@/modules/history/pages/MatchHistory";
import Leaderboard from "@/modules/leaderboard/pages/Leaderboard";
import PlayerStats from "@/modules/leaderboard/pages/PlayerStats";
import AdminMatches from "@/modules/admin/pages/admin-matches";
import AdminPlayers from "@/modules/admin/pages/admin-players";
import AdminLeaderboard from "@/modules/admin/pages/admin-leaderboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Pregister" element={<PlayerRegister />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Plogin" element={<PlayerLogin />} />
      <Route path="/ds" element={<DashboardSelector />} />
      <Route path="/pd" element={<PlayerDashboard />} />
      <Route path="/ad" element={<AdminDashboard />} />
      <Route path="/mm" element={<Matchmaking />} />
      <Route path="/vs" element={<VsScreen />} />
      <Route path="/battle/:roomID" element={<Battle />} />
      <Route path="/match-history" element={<MatchHistory />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/stats" element={<PlayerStats />} />

      <Route path="/admin/matches" element={<AdminMatches />} />
      <Route path="/admin/players" element={<AdminPlayers />} />
      <Route path="/admin/leaderboard" element={<AdminLeaderboard/>} />

    </Routes>
  );
};

export default AppRoutes;
