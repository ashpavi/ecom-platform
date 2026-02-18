import { useNavigate } from "react-router-dom";

export default function MyOrdersPage() {
  const navigate = useNavigate();

  const orders = [
    { id: "ORD-882193", total: 409.75, status: "Processing" },
    { id: "ORD-882120", total: 129.00, status: "Delivered" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-5 flex justify-between items-center hover:shadow-sm"
          >
            <div>
              <p className="font-semibold">{order.id}</p>
              <p className="text-sm text-gray-600">
                ${order.total.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <span
                className={`text-sm font-medium ${
                  order.status === "Delivered"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {order.status}
              </span>

              <button
                onClick={() =>
                  navigate(`/account/orders/${order.id}`)
                }
                className="text-blue-600 hover:underline text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
