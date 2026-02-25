import {
  FaShoppingBag,
  FaTruck,
  FaCheckCircle
} from "react-icons/fa";
import {Link}  from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Welcome Back, Alex 👋
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Here’s an overview of your account activity.
        </p>
      </div>


      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Total Orders */}
        <div className="group bg-gradient-to-br from-blue-50 to-white 
                        p-6 rounded-2xl shadow-sm hover:shadow-md 
                        transition-all duration-300 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                12
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full group-hover:scale-110 transition">
              <FaShoppingBag className="text-blue-600" size={18} />
            </div>
          </div>
        </div>

        {/* Processing */}
        <div className="group bg-gradient-to-br from-yellow-50 to-white 
                        p-6 rounded-2xl shadow-sm hover:shadow-md 
                        transition-all duration-300 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Processing</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">
                3
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full group-hover:scale-110 transition">
              <FaTruck className="text-yellow-600" size={18} />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="group bg-gradient-to-br from-green-50 to-white 
                        p-6 rounded-2xl shadow-sm hover:shadow-md 
                        transition-all duration-300 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                9
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full group-hover:scale-110 transition">
              <FaCheckCircle className="text-green-600" size={18} />
            </div>
          </div>
        </div>

      </div>


      {/* ================= RECENT ORDERS ================= */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <h3 className="font-semibold text-lg">
            Recent Orders
          </h3>
          <Link to="/account/orders">
          <button className="text-sm text-blue-600 hover:underline">
            View All
          </button>
          </Link>
        </div>

        <div className="space-y-4">

          {/* Order Item */}
          <div className="flex flex-col sm:flex-row 
                          sm:items-center sm:justify-between 
                          gap-3 p-4 rounded-xl 
                          hover:bg-gray-50 transition border">

            <div>
              <p className="font-medium text-gray-800">
                #ORD-882193
              </p>
              <p className="text-sm text-gray-500">
                Placed on Oct 24
              </p>
            </div>

            <span className="inline-flex items-center justify-center 
                             px-3 py-1 rounded-full text-xs font-medium 
                             bg-yellow-100 text-yellow-700 w-fit">
              Processing
            </span>
          </div>


          <div className="flex flex-col sm:flex-row 
                          sm:items-center sm:justify-between 
                          gap-3 p-4 rounded-xl 
                          hover:bg-gray-50 transition border">

            <div>
              <p className="font-medium text-gray-800">
                #ORD-882120
              </p>
              <p className="text-sm text-gray-500">
                Placed on Oct 18
              </p>
            </div>

            <span className="inline-flex items-center justify-center 
                             px-3 py-1 rounded-full text-xs font-medium 
                             bg-green-100 text-green-700 w-fit">
              Delivered
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}