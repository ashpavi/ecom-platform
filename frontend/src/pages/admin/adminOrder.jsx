import { useState } from "react";
import { FaEye } from "react-icons/fa";

const mockOrders = [
  {
    id: "ORD-1001",
    customer: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    shippingAddress: {
      street: "123 Main Street",
      city: "New York",
      zipcode: "10001",
      country: "USA",
    },
    total: 240,
    paymentMethod: "Credit Card",
    status: "Processing",
    items: [
      { name: "Premium Headphones", quantity: 1 },
      { name: "Smart Watch", quantity: 2 },
    ],
  },
  {
    id: "ORD-1002",
    customer: "Sarah Lee",
    email: "sarah@example.com",
    phone: "+1 555 888 222",
    shippingAddress: {
      street: "45 Sunset Avenue",
      city: "Los Angeles",
      zipcode: "90001",
      country: "USA",
    },
    total: 90,
    paymentMethod: "Cash on Delivery",
    status: "Delivered",
    items: [{ name: "Smart Watch", quantity: 1 }],
  },
];

export default function AdminOrder() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const statusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-600";
      case "Shipped":
        return "bg-blue-100 text-blue-600";
      case "Delivered":
        return "bg-green-100 text-green-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Order Management
      </h1>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">

                <td className="p-4 font-semibold text-gray-700">
                  {order.id}
                </td>

                <td className="p-4">
                  <div className="font-medium text-gray-800">
                    {order.customer}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.email}
                  </div>
                </td>

                <td className="p-4 font-semibold text-gray-800">
                  ${order.total}
                </td>

                <td className="p-4 text-gray-600">
                  {order.paymentMethod}
                </td>

                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(order.status)}`}
                  >
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

{/* ORDER DETAILS MODAL */}
    {selectedOrder && (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">

        <h2 className="text-xl font-bold mb-6">
            Order Details
        </h2>

        {/* BASIC INFO */}
        <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Email:</strong> {selectedOrder.email}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
        </div>

        {/* SHIPPING ADDRESS */}
        <div className="mt-6">
            <h3 className="font-semibold mb-2 text-gray-800">
            Shipping Address
            </h3>

            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
            <p>{selectedOrder.shippingAddress.street}</p>
            <p>
                {selectedOrder.shippingAddress.city},{" "}
                {selectedOrder.shippingAddress.zipcode}
            </p>
            <p>{selectedOrder.shippingAddress.country}</p>
            </div>
        </div>

        {/* ITEMS */}
        <div className="mt-6">
            <h3 className="font-semibold mb-2 text-gray-800">
            Order Items
            </h3>

            {selectedOrder.items.map((item, index) => (
            <div
                key={index}
                className="flex justify-between text-sm border-b py-2"
            >
                <span>{item.name} × {item.quantity}</span>
            </div>
            ))}
        </div>

        {/* TOTAL */}
        <div className="mt-6 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-blue-600">
            ${selectedOrder.total}
            </span>
        </div>

        {/* CLOSE BUTTON */}
        <div className="mt-6 text-right">
            <button
            onClick={() => setSelectedOrder(null)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
            >
            Close
            </button>
        </div>

        </div>
    </div>
    )}
    </div>
  );
}