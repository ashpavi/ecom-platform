import { Outlet } from "react-router-dom";

export default function SuperAdminLayout() {
  return (
    <div className="flex">
      <div className="w-64 bg-black text-white min-h-screen p-4">
        Super Admin Sidebar
      </div>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
