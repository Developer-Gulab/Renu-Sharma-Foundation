import React from "react";
import { motion } from "framer-motion";

const Image = ({ image, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <motion.div
        className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] p-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
      
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold z-10"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="w-full aspect-w-16 aspect-h-9 bg-gray-100 rounded-md overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Image;
