import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import cookies from "js-cookie";
import PropTypes from "prop-types";
import ContactPage from "./pages/ContactPage";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import InternDashboard from "./pages/InternPanel";
import ProjectOverview from "./pages/projectOverview";
import DonatePage from "./pages/DonatePage";
import { Toaster } from "react-hot-toast";
import SuccessPage from "./pages/Success";
import CancelPage from "./pages/Cancel";

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const token = cookies.get("authToken");
  return token ? children : <Navigate to="/login" replace />;
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
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ContactPage" element={<ContactPage/>}/>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <InternDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/overview"
            element={
              <ProtectedRoute>
                <ProjectOverview />
              </ProtectedRoute>
            }
          />
          <Route path="/donate-page" element={<DonatePage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
