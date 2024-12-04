import { useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/custom.css";

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
import DropDown from "../components/DropDown";

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
  const { setUser } = useUser();
  const navigate = useNavigate();

  const validateForm = useCallback(() => {
    const newErrors = {};
 



    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (
      !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)
    ) {
      newErrors.password =
        "Password must include uppercase, lowercase, number, and special character";
    }

    // Phone number validation
    const phoneRegex = /^[+]?[\d\s-]{10,}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
    }

    // College validation
    if (!formData.college.trim()) {
      newErrors.college = "College name is required";
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    // Department validation
    if (!formData.departmentName.trim()) {
      newErrors.departmentName = "Department name is required";
    }

    // Date validations
    const today = new Date();
    const startDate = new Date(formData.startDate);

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    } else if (startDate < today) {
      newErrors.startDate = "Start date must be in the future";
    }

    return newErrors;
  }, [formData]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

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
        err.response?.data?.message ||
        (err.response?.data?.errors
          ? Object.values(err.response.data.errors).join(", ")
          : "Registration failed. Please try again.");

      setErrors({
        form: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = useMemo(
    () => [
      {
        name: "name",
        type: "text",
        label: "Full Name",
        icon: User,
        placeholder: "John Doe",
      },
      {
        name: "email",
        type: "email",
        label: "Email Address",
        icon: AtSign,
        placeholder: "john@example.com",
      },
      {
        name: "password",
        type: "password",
        label: "Password",
        icon: Lock,
        placeholder: "Must include uppercase, lowercase, number, special char",
      },
      {
        name: "phoneNumber",
        type: "tel",
        label: "Phone Number",
        icon: Phone,
        placeholder: "+1234567890",
      },
      {
        name: "city",
        type: "text",
        label: "City",
        icon: MapPin,
        placeholder: "Your City",
      },
      {
        name: "state",
        type: "text",
        label: "State",
        icon: MapPin,
        placeholder: "Your State",
      },
      {
        name: "college",
        type: "text",
        label: "College Name",
        icon: Building2,
        placeholder: "University Name",
      },
      {
        name: "departmentName",
        type: "text",
        label: "Department Name",
        icon: Info,
        placeholder: "Computer Science",
      },
      {
        name: "startDate",
        type: "date",
        label: "Start Date",
        icon: Calendar,
      },
    ],
    []
  );

  //  shine hover effect to taxt

const shineStyle = {
  WebkitMaskImage: 'linear-gradient(-75deg, rgba(71, 102, 59, 0.4) 40%, #000 40%, rgba(71, 102, 59, 1) 60%)',
  WebkitMaskSize: '200%',
  transition: 'all 0.5s ease', 
  // Optional for smoothness
};

  return (
    <div className="min-h-screen flex items-start justify-evenly bg-[#16142c] py-12 px-4">
   

   {/* animation image */}\

   <div className="flex items-center justify-evenly flex-col gap-8">
    <div>
      <img src='https://lms.countryedu.com/assets/frontend/default-new/image/login-security.gif'/>
    </div>

    <div   className="text-[45px] text-white font-semibold  p-10  rounded-md hover:animate-shine"
        style={shineStyle}>Turn Your Skills Into Success <br />  Join Now!</div>
   </div>
    
      <div className="max-w-md w-full rounded-2xl">
        <div className="bg-white p-8 shadow-2xl rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl text-[34px] font-extrabold  text-[#010f0d] text-center mb-6 from-neutral-300">
              Create Account <span className="text-[#47663B]">!</span>
            </h2>
            <p  className="mb-6 font-medium text-[#080808dc]">
            Explore, learn, and grow with us. enjoy a seamless and enriching educational journey. lets begin!
            </p>
          </div>

          {errors.form && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map(
              ({ name, type, label, icon: Icon, placeholder }) => (
                <div key={name} className="relative">
                  <label
                    htmlFor={name}
                     className="block text-[16px] font-medium mb-2 text-gray-600"
                  >
                    {label}
                  </label>
                  <div className="relative">
                    {Icon && (
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Icon size={20} />
                      </div>
                    )}
                    {name === "departmentName" ? (
                      <DropDown setFormData = {setFormData} setErrors = {setErrors} />
                    ) : (
                      <input
                        id={name}
                        name={name}
                        type={type}
                        required
                        placeholder={placeholder}
                        value={formData[name]}
                        onChange={handleChange}
                        className={`w-full mt-1 p-3 rounded-2xl text-[#565c64] text-[16px] font-normal bg-[#6e798a1c]${
                          name === "endDate"
                            ? "bg-gray-100 cursor-not-allowed"
                            : ""
                        } pl-10 pr-3 py-2 border rounded-md ${
                          errors[name]
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-indigo-500"
                        }`}
                        readOnly={name === "endDate"}
                      />
                    )}
                  </div>
                  {errors[name] && (
                    <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                  )}
                </div>
              )
            )}
            <div className="relative">
              <label
                htmlFor="endDate"
                className="block text-[16px] font-medium mb-2 text-gray-600"
              >
                End Date
              </label>
              <div className="relative">
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  className="w-full bg-gray-100 cursor-not-allowed pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
                  readOnly
                />
              </div>
            </div>


     <div className="w-[100%] flex justify-center text-white ">
            <button
              type="submit"
              class=" z-99   text-white w-[200px] h-[45px] btn relative text-[20px] text-center overflow-hidden font-bold transition-all bg-[#888581] rounded hover:bg-[#6e6d6a] group py-1.5 px-2.5">
<span class=" z-10 w-56 h-48 rounded bg-[#242144f5] font-bold absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0 text-white"></span>
<span class= " z-10 relative w-full text-center text-white font-bold transition-colors duration-300 ease-in-out group-hover:text-white "></span>
              {isLoading ? "Registering..." : "Sign Up"}
            </button>
     </div>

          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
