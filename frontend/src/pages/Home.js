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
        <h1 className="text-4xl font-bold mb-4">Welcome to Renushala</h1>
        <p className="text-lg mb-6">
          Learn. Work. Earn Your Internship Certificate.
        </p>
        <a
          href="/signup"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          Get Started
        </a>
      </header>

      {/* Internship Categories */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Explore Internship Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Web Development", icon: "🌐" },
            { title: "App Development", icon: "📱" },
            { title: "Data Science", icon: "📊" },
            { title: "UI/UX Design", icon: "🎨" },
            { title: "Marketing", icon: "📈" },
            { title: "Content Writing", icon: "✍️" },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-lg font-medium">{category.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Steps to Get Certified */}
      <section className="bg-gray-100 py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { step: "1", title: "Login or Sign Up", desc: "Create your account to start." },
            { step: "2", title: "Select an Internship", desc: "Pick the category you love." },
            { step: "3", title: "Complete Tasks", desc: "Work on assignments & projects." },
            { step: "4", title: "Get Certified", desc: "Receive your internship certificate." },
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
