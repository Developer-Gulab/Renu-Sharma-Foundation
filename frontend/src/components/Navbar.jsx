import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../path/path";
import { motion } from "framer-motion";

const Navbar = () => {
  const pages = [
    {
      page: "Login",
      path: PATHS.LOGIN,
    },
    {
      page: "SignUp",
      path: PATHS.SIGNUP,
    },
    {
      page: "Contact",
      path: PATHS.CONTACT,
    },
    {
      page: "Donate",
      path: PATHS.DONATE,
    },
    {
      page: "Internship",
      path: PATHS.INTERNSHIP,
    },
  ];

  return (
    <nav className="bg-blue-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to={PATHS.HOME}
          className="text-2xl font-bold tracking-wide text-white hover:text-blue-200 transition-colors duration-300"
        >
          Renu Healthcare
        </Link>
      </motion.div>

      <div className="flex items-center space-x-4">
        {pages.map(({ page, path }, index) => (
          <motion.div
            key={path}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
          >
            <Link to={path}>
              <button
                className={`
                  hidden md:flex
                  px-4 md:py-2 rounded-md transition duration-300
                  bg-teal-500 text-white hover:bg-teal-600
                  hover:scale-105 focus:outline-none focus:ring-2
                  focus:ring-teal-400 focus:ring-opacity-50
                  transform active:scale-95
                `}
              >
                {page}
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
