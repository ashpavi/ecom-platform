import { useState } from "react";
import OrderDetailsModal from "../../../components/store/account/OrderDetailModal";

export default function MyOrdersPage() {

  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: "ORD-882193",
      total: 409.75,
      status: "Processing",
      date: "Oct 24, 2024",
      items: [
        { name: "Wireless Headphones", price: 299, quantity: 1 },
        { name: "Cotton Tee", price: 55.75, quantity: 2 }
      ],
      shipping: {
        name: "Alex Morgan",
        address: "123 Main Street, NY 10001"
      }
    },
    {
      id: "ORD-882120",
      total: 129.00,
      status: "Delivered",
      date: "Oct 18, 2024",
      items: [
        { name: "Ceramic Mug", price: 29, quantity: 3 }
      ],
      shipping: {
        name: "Alex Morgan",
        address: "123 Main Street, NY 10001"
      }
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-5 flex justify-between items-center hover:shadow-sm transition"
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
                onClick={() => setSelectedOrder(order)}
                className="text-blue-600 hover:underline text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
