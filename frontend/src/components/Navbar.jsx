import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-800 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Renu Healthcare</h1>
      <div>
        <Link to="/login">
          <button className="px-4 py-2 bg-white text-blue-800 rounded-md mr-2 hover:bg-blue-100">Login</button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Signup</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


