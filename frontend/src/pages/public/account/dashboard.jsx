import { FaShoppingBag, FaTruck, FaCheckCircle } from "react-icons/fa";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Welcome Back, Alex 👋
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Here’s an overview of your account activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <FaShoppingBag className="text-blue-600" size={22} />
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-yellow-600">3</p>
            </div>
            <FaTruck className="text-yellow-600" size={22} />
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">9</p>
            </div>
            <FaCheckCircle className="text-green-600" size={22} />
          </div>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h3 className="font-semibold mb-4">Recent Orders</h3>

        <div className="space-y-4">

          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <p className="font-medium">#ORD-882193</p>
              <p className="text-sm text-gray-500">Placed on Oct 24</p>
            </div>
            <span className="text-yellow-600 text-sm font-medium">
              Processing
            </span>
          </div>

          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <p className="font-medium">#ORD-882120</p>
              <p className="text-sm text-gray-500">Placed on Oct 18</p>
            </div>
            <span className="text-green-600 text-sm font-medium">
              Delivered
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
