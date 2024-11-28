import React, { useState, useEffect} from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  


  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully", formData);
    }
  };

  return (
   <div className="bg-[#16142c] w-[100%] h-auto p-16 flex items-center justify-between" >
    <div>
      <img src='https://lms.countryedu.com/assets/frontend/default-new/image/login-security.gif' />
    </div>

    <div className=" w-[38%]  p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl text-[34px] font-bold  text-gray-600 text-center mb-6 from-neutral-300">
        Login <span className="text-[#1d4ed8]">!</span>
      </h2>
      <p className="mb-6 font-medium text-[#2e2e2ed7]">Explore, learn, and grow with us. enjoy a seamless and enriching educational journey. lets begin!</p>
      <form onSubmit={handleSubmit} noValidate>
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-[16px] font-medium mb-2 text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full mt-1 p-3  text-[#6E798A] text-[16px] font-normal bg-[#6e798a1c] ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring focus:ring-blue-300 focus:outline-none hover:shadow-sm`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-[16px] font-medium mb-2 text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            className={`w-full mt-1 p-3  text-[#6E798A] text-[16px] font-normal bg-[#6e798a1c] ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring focus:ring-blue-300 focus:outline-none hover:shadow-sm`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-[16px] font-medium mb-2 text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder="Enter Password "
            onChange={handleChange}
            className={`w-full mt-1 p-3  text-[#6E798A] text-[16px] font-normal bg-[#6e798a1c] ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring focus:ring-blue-300 focus:outline-none hover:shadow-sm`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-[16px] font-medium mb-2 text-gray-600"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Enter confirm password"
            onChange={handleChange}
            className={`w-full mt-1 p-3  text-[#6E798A] text-[16px] font-normal bg-[#6e798a1c] ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring focus:ring-blue-300 focus:outline-none hover:shadow-sm`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-[100%] flex justify-center ">
        <button class=" px-auto w-[200px] h-[45px] btn relative flex items-center justify-center text-center overflow-hidden font-medium transition-all bg-indigo-100 rounded hover:bg-white group py-1.5 px-2.5">
<span class="w-56 h-48 rounded bg-indigo-600 font-bold absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
<span class="relative w-full text-center text-indigo-600 font-bold transition-colors duration-300 ease-in-out group-hover:text-white">Submit</span>
</button>
        </div>
      </form>
    </div>
   </div>
  );
};

export default LoginForm;
