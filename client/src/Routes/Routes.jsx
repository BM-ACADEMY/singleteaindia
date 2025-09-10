import { Routes, Route } from "react-router-dom";
import Homesection from "./Homesection";
import Login from "@/auth/Login";
import Adminroutes from "./Adminroutes";
import PrivateRoute from "../Context/PrivateRoute";
import Menuroutes from "./Menuroutes";
import Franchisesroute from "./Franchisesroute";
import FranchiseDetail from "@/Modules/Pages/Franchises/FranchiseDetail";
import Contactroute from "./Contactroutes";
// import { Notfoundpage } from "@/Modules/Pages/Notfoundpage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homesection />} />
      <Route path="/menu" element={<Menuroutes />} />
      <Route path="/franchise/:id" element={<FranchiseDetail />} />{" "}
      {/* ✅ Detail route */}
      <Route path="/franchise/*" element={<Franchisesroute />} />
      <Route path="/contact" element={<Contactroute />} />
      <Route path="/login" element={<Login />} />
       {/* <Route path="*" element={<Notfoundpage />} /> */}
      <Route
        path="/*"
        element={
          <PrivateRoute adminOnly={true}>
            <Adminroutes />
          </PrivateRoute>
        }
      />
    </Routes>
    
  );
};

export default AppRoutes;
