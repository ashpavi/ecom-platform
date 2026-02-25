import { useState } from "react";
import { FaBars } from "react-icons/fa";
import AccountSidebar from "../../../components/store/account/accountSidebar";
import { Outlet } from "react-router-dom";

export default function AccountLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Mobile Header */}
      <div className="md:hidden mb-6 flex items-center gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-gray-100 rounded-lg"
        >
          <FaBars />
        </button>
        <h1 className="text-lg font-semibold">My Account</h1>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-8">

        <AccountSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}