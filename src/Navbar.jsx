

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



const Navbar = ({ onMobileMenuToggle }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        // Decode token to extract user information
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.name || "User"); // Adjust based on token payload
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const toggleMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    if (onMobileMenuToggle) {
      onMobileMenuToggle(newState);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName(""); // Clear the user's name
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50 h-16">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="text-xl font-bold">
          {isLoggedIn ? ` ${userName}` : "StudySync"}
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="hover:text-gray-400">
            Home
          </a>
          <a href="#hello" className="hover:text-gray-400">
            About
          </a>
          <a href="#whyus" className="hover:text-gray-400">
            Why us
          </a>
          <a href="#services" className="hover:text-gray-400">
            Services
          </a>
          <a href="#contactus" className="hover:text-gray-400">
            Contact
          </a>
        </div>

        {isLoggedIn ? (
          <div className="space-x-4">
            <Link
              to="/setting"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Notes
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
            >
              Register
            </Link>
          </div>
        )}

        <div className="md:hidden">
          <button
            id="menu-toggle"
            className="focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } flex-col items-center space-y-4 bg-gray-800 text-white py-4 md:hidden fixed top-16 w-full`}
      >
        <a href="#home" className="hover:text-gray-400">
          Home
        </a>
        <a href="#hello" className="hover:text-gray-400">
          About
        </a>
        <a href="#whyus" className="hover:text-gray-400">
          Why us
        </a>
        <a href="#services" className="hover:text-gray-400">
          Services
        </a>
        <a href="#contactus" className="hover:text-gray-400">
          Contact
        </a>
        {isLoggedIn ? (
          <>
            <Link
              to="/setting"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Note
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
