import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useUser } from "../context/userContext";
import "../styles/custom.css";

import loginImage from "../images/loginimage.svg";
import Navbar from "../components/Navbar";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = useCallback(({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateForm = useCallback(() => {
    const { email, password } = formData;
    if (!email || !password) {
      setError("Both fields are required.");
      return false;
    }
    
    // Email or phone number validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^\d{10}$/;
    if (!emailRegex.test(email) && !phoneRegex.test(email)) {
      setError("Please enter a valid email or 10-digit phone number.");
      return false;
    }

    // Password validation (at least 8 characters, 3 numbers, 1 special character)
    const passwordRegex = /^(?=.*[0-9]{3})(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters, contain 3 numbers, and 1 special character.");
      return false;
    }

    return true;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Reset previous errors
    setError("");

    // Validate form
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await api.post("/user/login", formData);

      if (response.data.status === "success") {
        setUser(response.data.user);
        setFormData({ email: "", password: "" });
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }, [formData, navigate, setUser, validateForm]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="flex my-[20px] mx-auto rounded-2xl shadow-2xl md:max-w-6xl md:max-h-[600px] flex-col md:flex-row h-full bg-white overflow-hidden">
        {/* Left Side Image */}
        <div className="md:w-1/2 p-8  flex items-center justify-center">
          <img
            src={loginImage}
            alt="LoginPageImage"
            className="w-full max-h-[500px] object-contain"
          />
        </div>

        {/* Right Side (Login Form) */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
            Welcome Back
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Help connect people, one login at a time
          </p>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email or Phone
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter email or phone number"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[50px] transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              className={`w-full text-white p-3 rounded-lg transition duration-300 ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/ForgotPassword"
              className="text-blue-700 hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-center">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="px-4 text-gray-500 text-sm">
                Or continue with
              </span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>

            <button className="w-full flex items-center justify-center text-black p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-300">
              <img
                src="https://img.icons8.com/color/24/000000/google-logo.png"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/Signup"
                className="text-blue-700 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;