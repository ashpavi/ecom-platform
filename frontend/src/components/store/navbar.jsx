import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.jpg";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get search query from URL directly
  const getSearchQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  };
  
  const [searchQuery, setSearchQuery] = useState(getSearchQuery());

  // Update search query when location changes
  useEffect(() => {
    setSearchQuery(getSearchQuery());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LEFT SECTION */}
        <div className="flex items-center space-x-8">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Store Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-lg font-semibold text-gray-800">
              LuxeStore
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-6 text-gray-600 font-medium">
            <Link to="/" className="hover:text-black">Home</Link>
            <Link to="/products" className="hover:text-black">Products</Link>
            <Link to="/new" className="hover:text-black">New Arrivals</Link>
            <Link to="/sale" className="hover:text-black">Sale</Link>
          </div>
        </div>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </form>

        {/* RIGHT SECTION */}
        <div className="flex items-center space-x-6 text-gray-600">

          <Link to="/wishlist" className="hover:text-black">
            <FaHeart size={18} />
          </Link>

          <Link to="/cart" className="relative hover:text-black">
            <FaShoppingCart size={18} />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              2
            </span>
          </Link>

          <Link to="/account" className="hover:text-black">
            <FaUser size={18} />
          </Link>

        </div>
      </div>
    </nav>
  );
}
