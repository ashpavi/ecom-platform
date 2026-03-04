import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.jpg";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const { currentUser, logoutUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const getSearchQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("search") || "";
  };

  const [searchQuery, setSearchQuery] = useState(getSearchQuery());

  useEffect(() => {
    setSearchQuery(getSearchQuery());
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const handleUserClick = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (currentUser.role === "superadmin") {
      navigate("/superAdmin/superAdminDashboard");
    } else if (currentUser.role === "admin") {
      navigate("/admin/adminDashboard");
    } else {
      navigate("/account");
    }
  };

  const firstName = currentUser?.name?.split(" ")[0] || "";

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="bg-white shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden"
              onClick={() => setIsOpen(true)}
            >
              <FaBars size={20} />
            </button>

            <Link to="/" className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <span className="font-semibold text-gray-800">
                LuxeStore
              </span>
            </Link>

            <div className="hidden md:flex space-x-6 ml-6 text-gray-600 font-medium">
              <Link to="/">Home</Link>
              <Link to="/products">Shop</Link>
              <Link to="/aboutUs">About Us</Link>
              <Link to="/contactUs">Contact Us</Link>
            </div>
          </div>

          {/* SEARCH (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 mx-8"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </form>

          {/* RIGHT */}
          <div className="flex items-center space-x-6 text-gray-700">

            {/* CART */}
            <Link to="/cart" className="relative">
              <FaShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* ================= NOT LOGGED IN ================= */}
            {!currentUser && (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="bg-blue-300 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-400 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </div>
            )}

            {/* ================= LOGGED IN ================= */}
            {currentUser && (
              <div className="flex items-center space-x-4">

                <button
                  onClick={handleUserClick}
                  className="flex items-center bg-gray-100 space-x-2 hover:bg-gray-200 px-3 py-2 rounded-full transition cursor-pointer"
                >
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {firstName.charAt(0).toUpperCase()}
                  </div>

                  <span className="hidden md:block text-sm font-medium">
                    {firstName}
                  </span>
                </button>

                <button
                  onClick={handleLogout}
                  className="hidden md:block bg-red-500 px-4 py-2 rounded-full text-sm text-white hover:bg-red-600 transition cursor-pointer"
                >
                  Logout
                </button>

              </div>
            )}

          </div>
        </div>
      </nav>

      {/* ================= OVERLAY ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ================= SIDE DRAWER ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">

          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </form>

          <div className="flex flex-col space-y-4 text-gray-700 font-medium">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setIsOpen(false)}>Shop</Link>
            <Link to="/aboutUs" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contactUs" onClick={() => setIsOpen(false)}>Contact Us</Link>

            {!currentUser && (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </>
            )}

            {currentUser && (
              <>
                <div className="flex items-center space-x-2 mt-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                  <span>{firstName}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-500 mt-3"
                >
                  Logout
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
}