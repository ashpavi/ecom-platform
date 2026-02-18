import { Outlet } from "react-router-dom";
import AccountSidebar from "../../../components/store/account/accountSidebar";

export default function AccountLayout() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-4 gap-8">

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <AccountSidebar />
        </div>

        {/* Content */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
