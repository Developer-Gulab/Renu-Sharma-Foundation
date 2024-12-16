import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Slideshow = ({ imageList }) => {
  console.log(imageList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomImages, setRandomImages] = useState([]);

 
  const getRandomImages = (list, count) => {
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    
    setRandomImages(getRandomImages(imageList, 3));
  }, [imageList]);

  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); 

    return () => clearInterval(interval);
  }, [currentIndex, randomImages]);

 
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % randomImages.length);
  };

  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? randomImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-lg">
      {randomImages.length > 0 && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={randomImages[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      )}

      <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
        <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-black bg-opacity-50 px-4 py-2 rounded-md">
          GALLERY
        </h1>


        {randomImages.length > 0 && (
          <p className="text-white text-lg sm:text-xl bg-black bg-opacity-40 px-3 py-1 mt-4 rounded-md">
            {randomImages[currentIndex].caption}
          </p>
        )}
      </div>


      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70"
      >
        &#8249;
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70"
      >
        &#8250; 
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {randomImages.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-black" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
