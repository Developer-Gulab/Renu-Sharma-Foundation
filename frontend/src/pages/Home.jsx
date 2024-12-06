import React, { useState } from 'react';
import 'animate.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { id: 1, src: 'https://via.placeholder.com/800x400', alt: 'Slide 1' },
    { id: 2, src: 'https://via.placeholder.com/800x400', alt: 'Slide 2' },
    { id: 3, src: 'https://via.placeholder.com/800x400', alt: 'Slide 3' },
  ];

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <Navbar />

      {/* Carousel Section */}
      <div className="carousel relative w-full overflow-hidden mt-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-item absolute w-full transition-transform duration-1000 ${
              index === activeSlide ? 'block' : 'hidden'
            }`}
          >
            <img src={slide.src} alt={slide.alt} className="w-full" />
          </div>
        ))}
        <div className="carousel-controls absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeSlide ? 'bg-blue-600' : 'bg-gray-500'
              } hover:bg-blue-700 focus:outline-none`}
              onClick={() => handleSlideChange(index)}
            ></button>
          ))}
        </div>
      </div>

      {/* Empowering Communities Section */}
      <section className="empowering-communities py-16 bg-blue-50 text-center">
        <h1 className="text-4xl font-bold text-blue-800">Empowering Communities</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Join us in creating a better tomorrow. Our mission is to bring impactful change through dedicated programs and community support.
        </p>
        <button className="mt-6 px-6 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition">Learn More</button>
      </section>

      {/* About Us Section */}
      <section className="about-us py-16 flex flex-col md:flex-row items-center">
        <div className="text-content md:w-1/2 px-6">
          <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
          <p className="mt-4 text-gray-600">
            We are committed to driving meaningful change in communities through innovation, collaboration, and dedication.
          </p>
        </div>
        <div className="image-content md:w-1/2 px-6 mt-8 md:mt-0">
        <img
            src="./assets/images/image1.png"
            alt="About Us"
            className="w-full h-60 object-cover rounded-md shadow-lg"
      />

        </div>
      </section>

      {/* Impactful Programs Section */}
      <section className="impactful-programs py-16 bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Our Impactful Programs</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover how our programs are transforming lives and creating a lasting impact.
          </p>
        </div>
        <div className="program-list mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {[1, 2, 3].map((program) => (
            <div key={program} className="program-card bg-white shadow-md rounded-md p-4">
              <img
                src="./assets/images/image2.png"
                alt="Program 1"
                className="w-full h-40 object-cover rounded-md"
              />

              <h3 className="text-xl font-semibold text-gray-800">Program {program}</h3>
              <p className="mt-2 text-gray-600">
                Learn how Program {program} is making a difference through dedicated efforts.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;


