import { FaTimes, FaBox, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect } from "react";

export default function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = "auto";
  };
}, []);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl relative p-8 transition-all duration-300 scale-100 animate-[fadeIn_0.2s_ease-out]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes size={18} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">
            Order {order.id}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Placed on {order.date}
          </p>
        </div>

        {/* Status */}
        <div className="mb-6">
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {order.status}
          </span>
        </div>

        {/* Products */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FaBox />
            Items
          </h3>

          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm border-b pb-2"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FaMapMarkerAlt />
            Shipping Address
          </h3>

          <p className="text-sm text-gray-700">
            {order.shipping.name}
          </p>
          <p className="text-sm text-gray-600">
            {order.shipping.address}
          </p>
        </div>

        {/* Total */}
        <div className="border-t pt-4 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-blue-600">
            ${order.total.toFixed(2)}
          </span>
        </div>

      </div>
    </div>
  );
}