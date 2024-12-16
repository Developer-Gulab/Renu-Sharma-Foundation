import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard.jsx";
import Image from "./Image.jsx";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleCount, setVisibleCount] = useState(0); 
  const increment = 8; 

  
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  
  useEffect(() => {
    const calculateInitialCount = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) return 2; 
      if (screenWidth < 1024) return 6; 
      return 8;
    };

    setVisibleCount(calculateInitialCount());

   
    const handleResize = () => setVisibleCount(calculateInitialCount());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  const loadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + increment, images.length));
  };

  return (
    <div className="w-full">
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-colo p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg"
      >
        <AnimatePresence>
          {images.slice(0, visibleCount).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <ImageCard image={image} onClick={() => openModal(image)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visibleCount < images.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-colo text-white font-bold rounded-lg hover:bg-white hover:text-colo transition duration-300"
          >
            Load More
          </button>
        </div>
      )}

      {isModalOpen && <Image image={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default Gallery;

