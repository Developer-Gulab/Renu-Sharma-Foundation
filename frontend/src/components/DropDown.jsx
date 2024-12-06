import  { useState } from "react";

const DropDown = ({setFormData, setErrors}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["HR", "Web Development", "Social Media", "UI/UX", "Graphic Design"];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setFormData((prev)=>{
      return {
        ...prev,
        departmentName:option
      } 
    })
    setErrors("");
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-full text-left py-2 px-3 border rounded-md bg-white 
          ${
            isOpen
              ? "border-indigo-500 focus:ring-indigo-500"
              : "border-gray-300"
          } shadow-sm focus:outline-none focus:ring-2 transition-all`}
      >
        {selectedOption || "Select Department"}
      </button>
      {isOpen && (
        <ul
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto"
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 hover:bg-indigo-100 cursor-pointer transition-all"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
