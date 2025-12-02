import { Routes, Route } from "react-router-dom";
import Home from "../component/home";
import Register from "@/modules/admin/pages/register";
import Login from "@/modules/admin/pages/login";
import DashboardSelector from "../component/dashboardselector";
import PlayerRegister from "@/modules/user/pages/pregister";
import PlayerLogin from "@/modules/user/pages/plogin";
import PlayerDashboard from "@/modules/user/pages/player-dashboard";
import AdminDashboard from "@/modules/admin/pages/admin-dashboard";

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
    </Routes>
  );
};

export default AppRoutes;
