import { useState, useEffect } from "react";
import OrderDetailsModal from "../../../components/store/account/OrderDetailModal";
import { getOrders } from "../../../firebase/services/orderService";
import { formatPrice } from "../../../utils/formatPrice";

export default function MyOrdersPage() {

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {

    const loadOrders = async () => {

      try {

        const data = await getOrders();
        setOrders(data);

      } catch (error) {

        console.error("Failed to load orders:", error);

      }

    };

    loadOrders();

  }, []);

  return (

    <div>

      <h2 className="text-2xl font-semibold mb-6">
        My Orders
      </h2>

      {orders.length === 0 && (
        <p className="text-gray-500">
          You haven't placed any orders yet.
        </p>
      )}

      <div className="space-y-4">

        {orders.map((order) => (

          <div
            key={order.id}
            className="border rounded-xl p-5 flex justify-between items-center hover:shadow-sm transition"
          >

            {/* ORDER ID */}

            <div>
              <p className="text-sm text-gray-500">
                {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="font-semibold">
                #{order.id}
              </p>
              <p className="text-sm text-gray-600">
                {formatPrice(order.total)}
              </p>
            </div>


            {/* STATUS */}

            <div className="flex items-center gap-6">

              
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium
                    ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-600"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status || "Processing"}
                  </span>
                


              {/* VIEW DETAILS */}

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


      {/* ORDER MODAL */}

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

    </div>

  );

}