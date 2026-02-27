import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
  FaTimes
} from "react-icons/fa";
import logo from "../../assets/logo.jpg"; 

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all";

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      {/* Overlay (Mobile) */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen w-64 
                    bg-white border-r shadow-sm z-50 
                    transform transition-transform duration-300
                    ${
                      isOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }`}
      >
        <div className="flex flex-col h-full p-6">

          {/* TOP BRAND SECTION */}
          <div className="flex items-center justify-between lg:justify-start mb-8">

            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="LuxeStore Logo"
                className="w-10 h-10 object-contain rounded-md"
              />

              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  LuxeStore
                </h2>
                <p className="text-xs text-gray-500">
                  Admin Panel
                </p>
              </div>
            </div>

            <button
              className="lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">

            <NavLink
              to="/admin/adminDashboard"
              end
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${linkStyle} ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <FaTachometerAlt size={14} />
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `${linkStyle} ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <FaBoxOpen size={14} />
              Products
            </NavLink>

            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `${linkStyle} ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <FaTags size={14} />
              Categories
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `${linkStyle} ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <FaShoppingCart size={14} />
              Orders
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `${linkStyle} ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <FaUsers size={14} />
              Users
            </NavLink>

          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 px-4 py-3 
                       rounded-xl text-sm font-medium text-red-500 
                       hover:bg-red-50 transition"
          >
            <FaSignOutAlt size={14} />
            Logout
          </button>

        </div>
      </div>
    </>
  );
}