import React from "react";
import { Link } from "react-router-dom";
import Login from "../pages/Login";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        Renu Healthcare
      </Link>
      <div>
        <Link to="/login"  className="px-4 py-2 bg-white text-blue-600 rounded-lg mr-4">
          Login
        </Link>
        <Link to="/signup" className="px-4 py-2 bg-blue-800 rounded-lg">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
