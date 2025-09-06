import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../Context/PrivateRoute";
import ResponsiveDashboard from "@/Modules/Admin/ResponsiveDashboard";
import MenuForm from "@/Modules/Admin/Pages/Menu";
import MenuList from "@/Modules/Admin/Pages/Menulist";


const Adminroutes = () => {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <PrivateRoute adminOnly={true}>
            <ResponsiveDashboard />
          </PrivateRoute>
        }
      >
        <Route path="menu" element={<MenuForm />} />
        <Route path="menu-list" element={<MenuList />} />
        <Route path="franchises" element={<div><h2>Franchises Page</h2></div>} />
        <Route path="gallery" element={<div><h2>Gallery Page</h2></div>} />
        <Route path="franchises-image" element={<div><h2>Analytics Page</h2></div>} />
      </Route>
    </Routes>
  );
};

export default Adminroutes;
