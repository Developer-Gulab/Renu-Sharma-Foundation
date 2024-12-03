import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoReorderThreeOutline } from "react-icons/io5";
import logo from "../images/logo/logo.png";
import gsap from "gsap";
import "../styles/index.css";

import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {}, []);

  return (
    <>
      <div className=" fixed z-50 w-screen bg-white lg:px-5">
        {/* Header area start here */}
        <header className="header-area py-2 px-2">
          <div className=" flex justify-between items-center ">
            <Link to="/" className=" outline-none ">
              <img
                src={logo}
                alt="logo"
                className=" text-white w-12 lg:w-20 outline-none"
              />
            </Link>
            <div className={` hidden lg:flex`}>
              <nav>
                <ul className=" flex justify-center space-x-7">
                  <li className=" hover:text-blue-900 hover:font-semibold">
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li className=" hover:text-blue-900 hover:font-semibold">
                    <Link to={"/"}>About</Link>
                  </li>
                  <li className=" hover:text-blue-900 hover:font-semibold">
                    <Link to={"/donate-page"}>Donate</Link>
                  </li>
                  <li className=" hover:text-blue-900 hover:font-semibold">
                    <Link to={"/"}>Gallery</Link>
                  </li>
                  <li className=" hover:text-blue-900 hover:font-semibold">
                    <Link to={"/"}>Event</Link>
                  </li>
                  <li className=" hover:text-blue-900 hover:font-semibold">
                    <Link to={"/"}>Contact</Link>
                  </li>
                  <li>
                    <Link
                      to={"/"}
                      className=" hover:text-blue-900 hover:font-semibold"
                    >
                      Services
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className=" flex justify-center gap-4">
              <div className="  text-white p-2 bg-[#281d77] text-[14px] font-semibold rounded-md px-4 ">
                <Link to={"/login"} className="">
                  LOGIN
                </Link>
              </div>
              <IoReorderThreeOutline
                className=" text-3xl font-semibold lg:hidden hover:scale-[105%]"
                onClick={toggleMenu}
              />
            </div>
          </div>
        </header>
        {/* Header area end here */}
      </div>

      {/* Mobile Header area start here */}
      <div
        className={` h-screen w-screen fixed  z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden transition-all duration-500 ease-in-out`}
      >
        <div
          className={`bg-[#120e2e]  h-screen  w-[70%] min-[375px]:w-[50%] fixed top-0 py-14 right-0 transform transition-transform duration-500 ease-in-out z-40`}
        >
          <button
            className=" outline-none text-2xl text-gray-50 p-3 cursor-pointer"
            onClick={toggleMenu}
          >
            <RxCross1 onClick={toggleMenu} className=" hover:scale-[105%]" />
          </button>
          <div>
            <div className="flex flex-col items-center w-full py-3 text-white ">
              <nav>
                <ul className=" space-y-2">
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li>
                    <Link to={"/"}>About</Link>
                  </li>
                  <li>
                    <Link to={"/donate-page"}>Donate</Link>
                  </li>
                  <li>
                    <Link to={"/"}>Gallery</Link>
                  </li>
                  <li>
                    <Link to={"/"}>Event</Link>
                  </li>
                  <li>
                    <Link to={"/"}>Contact</Link>
                  </li>
                  <li>
                    <Link to={"/"}>Services</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
