// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Homesection from "./Homesection";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homesection />} />
      <Route path="/menu" element={<>menu</>} />
        <Route path="/franchise" element={<>franchise</>} />
        <Route path="/contact" element={<>contact</>} />
    </Routes>
  );
};

export default AppRoutes;
