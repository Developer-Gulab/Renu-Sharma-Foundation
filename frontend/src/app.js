import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import cookies from "js-cookie";
import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";

// Import PATHS constants
import { PATHS } from "./path/path.js";

// Import pages
import ContactPage from "./pages/ContactPage";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import InternDashboard from "./pages/InternPanel";
import ProjectOverview from "./pages/projectOverview.jsx";
import DonatePage from "./pages/DonatePage";
import SuccessPage from "./pages/Success";
import CancelPage from "./pages/Cancel";
import Internship from "./pages/Internship";
import Navbar from "./components/Navbar.jsx";
import "react-toastify/dist/ReactToastify.css";
import './styles/tailwind.css';
import GalleryPage from "./pages/GalleryPage";




// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const token = cookies.get("authToken");
  return token ? children : <Navigate to={PATHS.LOGIN} replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// Main App Component
const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.HOME} element={<Home />} />
          <Route path={PATHS.SIGNUP} element={<SignUp />} />
          <Route path={PATHS.LOGIN} element={<Login />} />
          <Route path={PATHS.CONTACT} element={<ContactPage />} />
          <Route path={PATHS.INTERNSHIP} element={<Internship />} />
          <Route path="/gallery" element={<GalleryPage/>} />
          <Route
            path={PATHS.DASHBOARD}
            element={
              <ProtectedRoute>
                <InternDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.OVERVIEW}
            element={
              <ProtectedRoute>
                <ProjectOverview />
              </ProtectedRoute>
            }
          />
          <Route path={PATHS.DONATE} element={<DonatePage />} />
          <Route path={PATHS.SUCCESS} element={<SuccessPage />} />
          <Route path={PATHS.CANCEL} element={<CancelPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
