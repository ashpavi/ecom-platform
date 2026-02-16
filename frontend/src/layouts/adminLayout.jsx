import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex">
      <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
        Admin Sidebar
      </div>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
