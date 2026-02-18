import { FaCheckCircle, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { useCart } from "../../context/cartContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function OrderSuccessPage() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const shippingData = location.state?.shippingData;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 12.5 : 0;
  const total = subtotal + shipping;

  const orderId = "ORD-" + Math.floor(Math.random() * 1000000);

  return (
    <div className="bg-gray-50 min-h-screen py-16">

      <div className="max-w-3xl mx-auto px-4 text-center">

        {/* SUCCESS ICON */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-6 rounded-full">
            <FaCheckCircle className="text-green-600" size={50} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Thank You for Your Purchase!
        </h1>

        <p className="text-gray-600 mb-10">
          Order <span className="font-semibold text-blue-600">
            #{orderId}
          </span> is confirmed.
        </p>

        {/* DELIVERY ADDRESS */}
        {shippingData && (
          <div className="bg-white rounded-xl border shadow-sm p-6 text-left mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FaMapMarkerAlt className="text-blue-600" />
              <h3 className="font-semibold">Delivery Address</h3>
            </div>

            <p className="text-gray-700 " >
              Full Name: {shippingData.fullName}
            </p>
            <p className="text-gray-600">
              Street Address: {shippingData.streetAddress}
            </p>
            <p className="text-gray-600">
              City: {shippingData.city}<br></br>
              Zip Code: {shippingData.zipcode} <br></br>
              Contact No: {shippingData.contactno}<br></br>
              Email: {shippingData.email}
            </p>
          </div>
        )}

        {/* ORDER SUMMARY */}
        <div className="bg-white rounded-xl border shadow-sm p-6 text-left mb-10">
          <h3 className="font-semibold mb-4">Order Summary</h3>

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-2">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total Paid</span>
            <span className="text-blue-600">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/shop")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            Continue Shopping
            <FaArrowRight />
          </button>

          <button
            onClick={() => navigate("/account")}
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            View Orders
          </button>
        </div>

      </div>
    </div>
  );
}
