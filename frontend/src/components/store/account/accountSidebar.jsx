import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaTimes
} from "react-icons/fa";

export default function AccountSidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all";

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      {/* BACKDROP (Mobile Only) */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed md:static top-14 left-0 h-full md:h-auto w-72 
                    bg-white md:bg-transparent 
                    shadow-2xl md:shadow-none 
                    border-r md:border 
                    z-50 
                    transform transition-transform duration-300 
                    ${
                      isOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }`}
      >
        <div className="p-6 space-y-4">

          {/* Mobile Header */}
          <div className="flex justify-between items-center md:hidden">
            <h2 className="font-semibold text-gray-800">My Account</h2>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Desktop Title */}
          <h2 className="hidden md:block font-semibold mb-4 text-gray-800">
            My Account
          </h2>

          <NavLink
            to="/account"
            end
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${linkStyle} ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-gray-100"
              }`
            }
          >
            <FaUser />
            Dashboard
          </NavLink>

          <NavLink
            to="/account/orders"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${linkStyle} ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-gray-100"
              }`
            }
          >
            <FaBoxOpen />
            My Orders
          </NavLink>

          <NavLink
            to="/account/profile"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${linkStyle} ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-gray-100"
              }`
            }
          >
            <FaClipboardList />
            Profile Settings
          </NavLink>

          <hr className="my-4" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>
      </div>
    </>
  );
}