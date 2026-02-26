import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../../assets/logo.jpg";
import { useCart } from "../../context/cartContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-sm border-b-0 relative z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* LEFT SECTION */}
          <div className="flex items-center space-x-4">

            {/* Hamburger (Mobile Only) */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsOpen(true)}
            >
              <FaBars size={20} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Store Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <span className="text-base sm:text-lg font-semibold text-gray-800">
                LuxeStore
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6 text-gray-600 font-medium ml-6">
              <Link to="/" className="hover:text-black">Home</Link>
              <Link to="/shop" className="hover:text-black">Shop</Link>
              <Link to="/aboutUs" className="hover:text-black">About Us</Link>
              <Link to="/contactUs" className="hover:text-black">Contact Us</Link>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-8">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-gray-600">

            <Link to="/cart" className="relative hover:text-black">
              <FaShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link to="/account" className="hover:text-black">
              <FaUser size={18} />
            </Link>
          </div>
        </div>
      </nav>

      {/* BACKDROP BLUR OVERLAY */}
      <div
        className={`fixed inset-0 backdrop-blur-sm bg-black/30 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* SIDE DRAWER */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 space-y-6">

          {/* Close Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes size={18} />
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Links */}
          <div className="flex flex-col space-y-4 text-gray-700 font-medium">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
            <Link to="/aboutUs" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contactUs" onClick={() => setIsOpen(false)}>Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  );
}