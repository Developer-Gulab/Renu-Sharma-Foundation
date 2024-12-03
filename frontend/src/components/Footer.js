import React from "react";
import { CiLocationOn } from "react-icons/ci";
import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import logo from "../images/logo/logo.png";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";

const Footer = () => {
  return (
    <div className=" bg-gradient-to-r from-[#281d77] to-[#120d3d] text-white py-10 px-2 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-10">
        {/* About Us Section */}
        <div className=" flex flex-col items-center gap-2 col-span-2">
          <img className=" w-20 " src={logo} alt="logo" />
          <h1 className="text-[16px] lg:text-lg font-bold text-center">
            Renu Sharma Healthcare & Education Foundation
          </h1>
          <p className="text-[12px] lg:text-sm text-center ">
            We ensure access to healthcare and education for all, transforming
            lives through compassion, knowledge, and support.
          </p>
        </div>
        {/* Contact Section */}
        <div className=" col-span-2 flex flex-col pl-14 md:pl-0 ">
          <h1 className="text-[16px] font-bold mb-2 lg:mb-4 text-center w-[80%]">
            {" "}
            Contact Us
          </h1>
          <p className="">
            <a
              href="https://www.google.com/maps/place/Haryana+122503/@28.3386399,76.7234886,12z/data=!3m1!4b1!4m6!3m5!1s0x390d40ee40f61ae9:0x7f08a0051c808b89!8m2!3d28.3308988!4d76.8028933!16s%2Fg%2F11_txzrjy?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              className=" text-[12px] lg:text-sm flex justify-start items-center gap-2 pb-3 w-fit hover:text-blue-400 transition-all duration-300 ease-in"
            >
              <CiLocationOn className="bg-blue-700 size-6 lg:size-7 rounded-full p-1 text-white" />{" "}
              Gurugram, Haryana - 122503, India
            </a>
          </p>
          <a
            href="mailto:info@admedusociety.org"
            target="_blank"
            className=" text-[12px] lg:text-sm flex justify-start items-center gap-2 pb-3 w-fit hover:text-blue-400 transition-all duration-300 ease-in"
          >
            <MdOutlineEmail className="bg-blue-700 size-6 lg:size-7 rounded-full p-1 text-white" />{" "}
            info@admedusociety.org
          </a>
          <a
            href="tel:+919958586721"
            className=" text-[12px] lg:text-sm flex justify-start items-center gap-2 pb-3 w-fit hover:text-blue-400 transition-all duration-300 ease-in"
          >
            <IoCallOutline className="bg-blue-700 size-6 lg:size-7 rounded-full p-1 text-white" />{" "}
            +91-9958586721
          </a>
        </div>

        {/* Quick Links Section */}
        <div className=" col-span-1 text-[12px] lg:text-[14px] flex flex-col items-center">
          <h1 className="text-[16px] font-bold mb-2 lg:mb-4">Resources</h1>
          <ul className="space-y-2 lg:space-y-3">
            <li>
              <Link
                to={"/about"}
                className="hover:text-blue-400 hover:text-[102%] transition-all duration-300 ease-in"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to={"/services"}
                className="hover:text-blue-400 hover:text-[102%] transition-all duration-300 ease-in"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/Events"
                className="hover:text-blue-400 hover:text-[102%] transition-all duration-300 ease-in"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/donate-page"
                className="hover:text-blue-400 hover:text-[102%] transition-all duration-300 ease-in"
              >
                Donate
              </Link>
            </li>
            <li>
              <Link
                to="/Gallery"
                className="hover:text-blue-400 hover:text-[102%] transition-all duration-300 ease-in"
              >
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col  items-center col-span-2 ">
          <h1 className="text-[16px] font-bold mb-2">Connect with us</h1>
          <div className="flex justify-start items-center gap-4 pb-4">
            <a href="#">
              <FaXTwitter className="bg-blue-700 size-6 lg:size-8 rounded-full p-1 lg:p-[6px] text-white outline-none cursor-pointer" />
            </a>
            <a href="#">
              <FaInstagram className="bg-blue-700 size-6 lg:size-8 rounded-full p-1 lg:p-[6px] text-white outline-none cursor-pointer" />
            </a>
            <a href="#">
              <FaFacebook className="bg-blue-700 size-6 lg:size-8 rounded-full p-1 lg:p-[6px] text-white outline-none cursor-pointer" />
            </a>
            <a href="#">
              <FaYoutube className="bg-blue-700 size-6 lg:size-8 rounded-full p-1 lg:p-[6px] text-white outline-none cursor-pointer" />
            </a>
            <a href="#">
              <FaLink className="bg-blue-700 size-6 lg:size-8 rounded-full p-1 lg:p-[6px] text-white outline-none cursor-pointer" />
            </a>
          </div>
          <p className="text-sm  font-bold pb-2">Subscribe to our Newsletter</p>
          <form className="flex ">
            <div className=" flex justify-center items-center gap-1 text-sm lg:text-[16px]  px-2 lg:p-2 border-blue-700 border-1 rounded-l-2xl bg-blue-100 outline-none text-black">
              <span>
                <MdOutlineMail className=" text-sm lg:text-xl text-gray-400 outline-none" />
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-blue-100 outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-700 text-sm lg:text-[16px] text-white outline-none px-4 py-1 lg:py-2 rounded-r-2xl hover:bg-blue-800 transition-all duration-300 ease-in"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-300 mt-10 flex justify-center items-center gap-2">
        <img className="w-10" src={logo} alt="logo" />
        <p className="text-center text-[12px] lg:text-sm py-4 font-normal">
          © 2024 All Rights Reserved : Renu Sharma Healthcare & Education
          Foundation
        </p>
      </div>
    </div>
  );
};

export default Footer;
