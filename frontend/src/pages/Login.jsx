import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useUser } from "../context/userContext";

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

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      setError("Both fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

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
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-blue-50">
      {/* Left Side Image */}
      <div
        id="shadow-l"
        className="lg:max-w-4xl flex justify-center lg:h-[512px] bg-blue-600 rounded-l-3xl"
      >
        <img
          src="/LoginPageImages/signup.svg"
          alt="LoginPageImage"
          className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[512px] lg:h-[512px] object-contain animate-pulse"
        />
      </div>

      {/* Right Side (Login Form) */}
      <div
        id="shadow-r"
        className="p-8 rounded-r-3xl bg-white w-full max-w-lg lg:w-[350px] lg:h-[511.7px] flex flex-col justify-center"
      >
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 text-center">
          Log In
        </h2>
        <p className="text-gray-600 mb-8 text-center">Welcome back!</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
            />
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-xl text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁" : "👁‍🗨"}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white p-2 hover:bg-blue-600 rounded-[12px] bg-blue-700"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="mt-3 text-center">
          <Link to={"/ForgotPassword"} className="text-blue-600 text-sm">
            Forgot Password?
          </Link>
        </div>

        <div className="mt-3">
          <button className="w-full flex items-center justify-center text-black p-2 rounded-[12px] border border-black">
            <img
              src="https://img.icons8.com/color/24/000000/google-logo.png"
              alt="Google logo"
              className="w-5 h-5 mr-2"
            />
            Log in with Google
          </button>
        </div>

        <div className="mt-3 text-center">
          <p className="text-gray-600 font-semibold">
            Don’t have an account?
            <Link to="/signup" className="text-blue-500 font-medium ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
