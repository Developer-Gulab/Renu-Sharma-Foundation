import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../index.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("User is logged in successfully!");
        // Handle the response data here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error here
      });
  }

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-blue-50 ">
        {/* Left Side Image */}
        <div id="shadow-l" className=" lg:max-w-4xl flex justify-center lg:h-[512px] bg-blue-600  rounded-l-3xl">
          <img
            src="/LoginPageImages/signup.svg"
            alt="LoginPageImage"
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[512px] lg:h-[512px] object-contain animate-pulse"
          />
        </div>

        {/* Right Side (Login Form) */}
        <div id="shadow-r" className="p-8 rounded-r-3xl bg-white w-full max-w-lg lg:w-[350px] lg:h-[511.7px] flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 text-center">
            Log In
          </h2>
          <p className="text-gray-600 mb-8 text-center">Let's Help someone.</p>

          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div>
              {/* <label className="block text-black font-medium">
                E-mail or phone number
              </label> */}
              <input
                type="text" // Change type to text for both email and phone
                id="emailOrPhone" // Adjusted ID
                name="emailOrPhone" // Adjusted name
                placeholder="E-mail or phone number"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:blue-purple-400 font-medium"
                required
                pattern="(^\d{10}$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)" // Regex pattern for email or 10-digit phone
                title="Please enter a valid email or a 10-digit phone number." // Tooltip for invalid input
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="flex flex-col w-full cursor-pointer relative font-medium"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                  id="password"
                  name="password"
                  required
                  pattern="^(?=.*[0-9]{3})(?=.*[!@#$%^&*]{1})(?=.*[a-zA-Z]).{8,}$"
                  title="Password must be at least 8 characters long, contain 3 numbers, and 1 special characters."
                />
                <span
                  className="absolute grid place-items-center top-2.5 right-3 text-2xl text-zinc-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IconEye /> : <IconEyeInvisible />}
                </span>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full text-white p-2 hover:bg-blue-600 rounded-[12px] bg-blue-700"
              >
                Log in
              </button>
            </div>
          </form>

          <div className="mt-3 text-center">
            <p className="text-purple-500 text-sm  sm:mt-0 sm:text-right">
              <Link to={"/ForgotPassword"} className="text-blue-600">
                Forgot Password?
              </Link>
            </p>
          </div>

          <div className="mt-3">
            <button className="w-full flex items-center justify-center text-black p-2 rounded-[12px] border border-black">
              <img
                src="https://img.icons8.com/color/24/000000/google-logo.png"
                alt="Google logo"
                className="w-5 h-5 mr-2 bg-[#FFFFFF]"
              />
              Sign up with Google
            </button>
          </div>

          <div className="mt-3 text-center">
            <p className="text-gray-600 font-semibold">
              Don't have an account?
              <a href="/Signup" className="text-blue-500 font-medium ml-1">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

function IconEyeInvisible(props) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M508 624a112 112 0 00112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43zm370.72-458.44L836 122.88a8 8 0 00-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 000 11.31L155.25 889a8 8 0 0011.31 0l712.16-712.12a8 8 0 000-11.32zM332 512a176 176 0 01258.88-155.28l-48.62 48.62a112.08 112.08 0 00-140.92 140.92l-48.62 48.62A175.09 175.09 0 01332 512z" />
      <path d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 01445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5z" />
    </svg>
  );
}

function IconEye(props) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
    </svg>
  );
}
