import React, { useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SignUpBackroundImage from '../images/SignUp.jpg';
import Navbar from "../components/Navbar";
import {
  AtSign,
  Lock,
  User,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Info,
} from "lucide-react";
import api from "../api/api";
import { useUser } from "../context/userContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
    state: "",
    college: "",
    departmentName: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const steps = useMemo(() => [
    [
      { name: "name", label: "Full Name", type: "text", icon: User, placeholder: "John Doe" },
      { name: "email", label: "Email Address", type: "email", icon: AtSign, placeholder: "john@example.com" },
      { name: "password", label: "Password", type: "password", icon: Lock, placeholder: "Must include uppercase, lowercase, number, special char" },
    ],
    [
      { name: "phoneNumber", label: "Phone Number", type: "tel", icon: Phone, placeholder: "+1234567890" },
      { name: "city", label: "City", type: "text", icon: MapPin, placeholder: "Your City" },
      { name: "state", label: "State", type: "text", icon: MapPin, placeholder: "Your State" },
    ],
    [
      { name: "college", label: "College Name", type: "text", icon: Building2, placeholder: "University Name" },
      { name: "departmentName", label: "Department Name", type: "text", icon: Info, placeholder: "Computer Science" },
      { name: "startDate", label: "Start Date", type: "date", icon: Calendar },
      { name: "endDate", label: "End Date", type: "date", icon: Calendar, readOnly: true },
    ],
  ], []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    steps[currentStep].forEach(({ name }) => {
      const value = formData[name]?.trim();
      if (!value) newErrors[name] = `${name} is required`;
    });
    return newErrors;
  }, [formData, currentStep, steps]);

  const handleChange = ({ target: { name, value } }) => {
    if (name === "startDate") {
      const startDate = new Date(value);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        endDate: endDate.toISOString().split("T")[0],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNext = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/user/register", formData);

      if (response.data.status === "success") {
        if (setUser) {
          await setUser(response.data.user);
        }
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setErrors({ form: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex  justify-center px-4 py-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
          {/* Image Section */}
          <div className="hidden md:block relative bg-blue-300">
            <img 
              src={SignUpBackroundImage} 
              alt="Background" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* <div className="absolute inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center px-6">
                <h3 className="text-3xl font-bold mb-4">Welcome to Our Platform</h3>
                <p className="text-lg opacity-80">Create your account and start your journey</p>
              </div>
            </div> */}
          </div>
          
          {/* Form Section */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Sign Up</h2>
            <form onSubmit={handleSubmit} className="w-full">
              {steps[currentStep].map(({ name, label, type, icon: Icon, placeholder, readOnly }) => (
                <div key={name} className="mb-4">
                  <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <div
                    className={`flex items-center rounded-lg border-2 p-2 transition-all duration-300 
                      ${errors[name] 
                        ? "border-red-500 bg-red-50" 
                        : "border-gray-300 hover:border-blue-500 focus-within:border-blue-600"
                      }`}
                  >
                    <Icon className={`mr-3 ${errors[name] ? 'text-red-500' : 'text-gray-500'}`} />
                    <input
                      id={name}
                      name={name}
                      type={type}
                      value={formData[name]}
                      placeholder={placeholder}
                      onChange={handleChange}
                      readOnly={readOnly}
                      className="flex-grow outline-none bg-transparent text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  {errors[name] && (
                    <p className="text-red-600 text-sm mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}
              <div className="flex justify-between mt-6">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ml-auto"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors ml-auto disabled:opacity-50"
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
              {errors.form && (
                <p className="text-red-600 text-sm mt-4 text-center">{errors.form}</p>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default SignUp;