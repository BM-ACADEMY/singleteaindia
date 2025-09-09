import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./Modules/Layout/Navbar";
import AppRoutes from "./Routes/Routes"; // make sure the path is correct
import Footer from "./Modules/Layout/Footer";
import { ToastContainer } from "react-toastify";
import { Scrolltotop } from "./scrolltop/Scrolltotop";
import { AuthProvider } from "./Context/Authcontext";

function AppContent() {
  const location = useLocation();

  // Hide Navbar/Footer on admin routes
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Navbar />}
      <AppRoutes />
      {!hideLayout && <Footer />}
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Scrolltotop/>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
