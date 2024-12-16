import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ImageCard = ({ image, onClick }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.1,
  });

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl shadow-md bg-white hover:shadow-xl transition duration-300 border-2 border-white cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 8px 15px rgba(93, 164, 243, 0.8)",
      }}
      onClick={onClick}
      ref={ref} 
    >
      {inView ? (
        <img
          src={image}
          alt={image.alt}
          className="w-full h-64 object-cover transition duration-300 hover:opacity-80"
        />
      ) : (
        <div className="w-full h-64 bg-gray-300 animate-pulse"></div> 
      )}
      <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 hover:opacity-100 transition duration-300"></div>
    </motion.div>
  );
};

export default ImageCard;

