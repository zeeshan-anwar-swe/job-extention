import React, { useState, useEffect } from "react";
import menu from "../../assets/menu.png";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

function HEADER() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isHomeActive =
    location.pathname === "/" || location.pathname === "/Home";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="header"
      className="bg-[#E0E2F4] max-w-[1280px] mx-auto px-5 md:px-10 lg:px-14 py-3 md:py-6 lg:py-10"
    >
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo and Menu Button */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={logo} alt="Logo" className="h-8" />
          </div>

          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <img src={menu} alt="Menu" className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-[#E0E2F4] bg-opacity-50 z-10 mt-16"
            onClick={toggleMenu}
          ></div>
        )}

        <nav
          className={`${
            isMenuOpen
              ? "fixed top-16 left-0 right-0 bg-[#E0E2F4] z-20 p-5 shadow-lg"
              : "hidden"
          } md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 lg:space-x-6 mb-4 md:mb-0 text-center`}
        >
          <NavLink
            to="/Home"
            className={({ isActive }) =>
              isActive || isHomeActive
                ? "block font-medium text-base text-[#010314] border border-[#1384EA] bg-white/27 text-center rounded-3xl px-2 py-2"
                : "block font-medium text-base text-[#010314] py-2 border border-transparent"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/Blog"
            className={({ isActive }) =>
              isActive
                ? "block font-medium text-base text-[#010314] border border-[#1384EA] bg-white/27 text-center rounded-3xl px-2 py-2"
                : "block font-medium text-base text-[#010314] py-2 border border-transparent"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </NavLink>

          <NavLink
            to="/Pricing"
            className={({ isActive }) =>
              isActive
                ? "block font-medium text-base text-[#010314] border border-[#1384EA] bg-white/27 text-center rounded-3xl px-2 py-2"
                : "block font-medium text-base text-[#010314] py-2 border border-transparent"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </NavLink>

          <NavLink
            to="/Contact"
            className={({ isActive }) =>
              isActive
                ? "block font-medium text-base text-[#010314] border border-[#1384EA] bg-white/27 text-center rounded-3xl px-2 py-2"
                : "block font-medium text-base text-[#010314] py-2 border border-transparent"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Contact us
          </NavLink>
        </nav>

        {/* Sign In Button */}
        <div
          className={`${
            isMenuOpen ? "fixed bottom-5 left-5 right-5 z-20" : "hidden"
          } md:block`}
        >
          <a
            href="https://koalabyte.ai/signin"
            className="w-full md:w-auto bg-[linear-gradient(126.51deg,#1E51E8_42.05%,#0BA5EC_100%)] border border-[linear-gradient(126.51deg,#1E2AE8_42.05%,#0BA5EC_100%)] font-medium text-base text-white px-4 py-2 xl:px-6 xl:py-3 rounded-xl cursor-pointer"
          >
            Sign in
          </a>
        </div>
      </div>
    </section>
  );
}

export default HEADER;
