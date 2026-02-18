import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt
} from "react-icons/fa";

export default function AccountSidebar() {
  const navigate = useNavigate();

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition";

  const handleLogout = () => {
    // Later replace with real auth logout
    navigate("/");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 space-y-3">

      <h2 className="font-semibold mb-4 text-gray-800">My Account</h2>

      <NavLink
        to="/account"
        end
        className={({ isActive }) =>
          `${linkStyle} ${
            isActive
              ? "bg-blue-50 text-blue-600"
              : "hover:bg-gray-100"
          }`
        }
      >
        <FaUser />
        Dashboard
      </NavLink>

      <NavLink
        to="/account/orders"
        className={({ isActive }) =>
          `${linkStyle} ${
            isActive
              ? "bg-blue-50 text-blue-600"
              : "hover:bg-gray-100"
          }`
        }
      >
        <FaBoxOpen />
        My Orders
      </NavLink>

      <NavLink
        to="/account/profile"
        className={({ isActive }) =>
          `${linkStyle} ${
            isActive
              ? "bg-blue-50 text-blue-600"
              : "hover:bg-gray-100"
          }`
        }
      >
        <FaClipboardList />
        Profile Settings
      </NavLink>

      <hr className="my-3" />

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 w-full transition"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}
