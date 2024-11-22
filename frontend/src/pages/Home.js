import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="bg-blue-600 text-white text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to Renu Healthcare</h1>
        <p className="text-lg mb-6">
          Your Health, Our Priority. Comprehensive Care for a Better Tomorrow.
        </p>
        <a
          href="/contact"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          Contact Us
        </a>
      </header>

      {/* Services Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "General Checkups", icon: "🩺" },
            { title: "Diagnostics", icon: "🔬" },
            { title: "Surgical Services", icon: "⚕️" },
            { title: "Emergency Care", icon: "🚑" },
            { title: "Pharmacy", icon: "💊" },
            { title: "Vaccination", icon: "💉" },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-medium">{service.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Steps to Better Health */}
      <section className="bg-gray-100 py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Your Journey to Better Health
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { step: "1", title: "Schedule an Appointment", desc: "Book online or visit us." },
            { step: "2", title: "Consult Our Experts", desc: "Get personalized care plans." },
            { step: "3", title: "Receive Treatment", desc: "Access world-class healthcare." },
            { step: "4", title: "Stay Healthy", desc: "Follow up and maintain your well-being." },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="text-blue-600 text-4xl font-bold mb-2">{item.step}</div>
              <h3 className="text-xl font-medium">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
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
