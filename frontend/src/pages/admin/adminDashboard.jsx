import {
  FaDollarSign,
  FaUsers,
  FaShoppingCart,
  FaChartLine
} from "react-icons/fa";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export default function DashboardPage() {

  // Dummy Data (replace later with API)
  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3200 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 6800 },
    { month: "May", revenue: 7200 },
    { month: "Jun", revenue: 9100 }
  ];

  const orderData = [
    { name: "Pending", value: 12 },
    { name: "Processing", value: 8 },
    { name: "Delivered", value: 24 }
  ];

  return (
    <div className="space-y-12">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back! Here’s what’s happening with your store today.
        </p>
      </div>


      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          icon={<FaDollarSign />}
          title="Total Revenue"
          value="$42,580"
        />

        <StatCard
          icon={<FaShoppingCart />}
          title="Total Orders"
          value="368"
        />

        <StatCard
          icon={<FaUsers />}
          title="Total Users"
          value="1,245"
        />

        <StatCard
          icon={<FaChartLine />}
          title="Monthly Growth"
          value="+18%"
        />

      </div>


      {/* ================= CHART SECTION ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl border shadow-sm p-8 xl:col-span-2">
          <h2 className="font-semibold text-gray-800 mb-6">
            Revenue Overview
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid stroke="#f1f5f9" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>


        {/* Orders Summary */}
        <div className="bg-white rounded-2xl border shadow-sm p-8">
          <h2 className="font-semibold text-gray-800 mb-6">
            Order Status
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderData}>
                <CartesianGrid stroke="#f1f5f9" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>


      {/* ================= RECENT ORDERS ================= */}
      <div className="bg-white rounded-2xl border shadow-sm p-8">

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-gray-800">
            Recent Orders
          </h2>

          <button className="text-sm text-blue-600 hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-4">

          <OrderRow
            id="ORD-88321"
            user="Alex Fernando"
            total="$120.00"
            status="Processing"
          />

          <OrderRow
            id="ORD-88318"
            user="John Silva"
            total="$240.00"
            status="Delivered"
          />

          <OrderRow
            id="ORD-88310"
            user="Mary Perera"
            total="$89.00"
            status="Pending"
          />

        </div>
      </div>

    </div>
  );
}


/* ================= SMALL COMPONENTS ================= */

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm 
                    hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
          {icon}
        </div>
      </div>

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="text-3xl font-semibold text-gray-900 mt-1">
        {value}
      </p>
    </div>
  );
}


function OrderRow({ id, user, total, status }) {

  const statusColor =
    status === "Delivered"
      ? "bg-green-100 text-green-700"
      : status === "Processing"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-700";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-xl hover:bg-gray-50 transition">

      <div>
        <p className="font-medium text-gray-900">{id}</p>
        <p className="text-sm text-gray-500">{user}</p>
      </div>

      <div className="flex items-center gap-6">
        <span className="font-medium text-gray-800">
          {total}
        </span>

        <span className={`text-xs px-3 py-1 rounded-full ${statusColor}`}>
          {status}
        </span>
      </div>

    </div>
  );
}