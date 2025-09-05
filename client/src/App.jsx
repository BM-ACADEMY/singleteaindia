import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Modules/Layout/Navbar";
import AppRoutes from "./Routes/Routes";
import Footer from "./Modules/Layout/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
      <Footer/>
    </Router>
  );
}

export default App;
