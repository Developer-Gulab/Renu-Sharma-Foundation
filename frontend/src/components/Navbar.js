import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div>
      {/* Header area start here */}
      <header className="header-area">
        <div className="container header__container">
          <div className="header__main">
            <Link to="/" className="logo">
              <img src="" alt="logo" width={96} />
            </Link>

            {/* Mobile menu toggle */}
            <div className="mobile-menu-icon" onClick={toggleMenu}>
              <span className="menu-icon"></span>
            </div>

            <div className={`main-menu ${isMobileMenuOpen ? "open" : ""}`}>
              <nav>
                <ul>
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

            <div className="btn-one">
              <Link to={"/login"}>LOGIN</Link>
            </div>
          </div>
        </div>
      </header>
      {/* Header area end here */}
    </div>
  );
};

export default Navbar;
