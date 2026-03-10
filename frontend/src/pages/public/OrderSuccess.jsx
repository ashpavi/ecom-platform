import {
  FaCheckCircle,
  FaArrowRight,
  FaMapMarkerAlt
} from "react-icons/fa";
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export default function OrderSuccess() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const shippingData = location.state?.shippingData;
  const paymentMethod = location.state?.paymentMethod;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 12.5 : 0;
  const total = subtotal + shipping;

  const orderId = "ORD-" + Math.floor(Math.random() * 1000000);

  return (
    <div className="bg-gray-50 min-h-screen py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* SUCCESS SECTION */}
        <div className="text-center mb-12">

          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-6 rounded-full shadow-sm">
              <FaCheckCircle className="text-green-600" size={48} />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Thank You for Your Purchase!
          </h1>

          <p className="text-gray-600 text-sm sm:text-base">
            Order{" "}
            <span className="font-semibold text-blue-600">
              #{orderId}
            </span>{" "}
            has been successfully placed.
          </p>

        </div>


        {/* DELIVERY ADDRESS */}
        {shippingData && (
          <div className="bg-white rounded-2xl border shadow-sm p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <FaMapMarkerAlt className="text-blue-600" />
              <h3 className="font-semibold text-lg">
                Delivery Address
              </h3>
            </div>

            <div className="space-y-2 text-sm sm:text-base text-gray-700">
              <p><strong>{shippingData.fullName}</strong></p>
              <p>{shippingData.streetAddress}</p>
              <p>
                {shippingData.city}, {shippingData.zipcode}
              </p>
              <p>Contact: {shippingData.contactno}</p>
              <p>Email: {shippingData.email}</p>
            </div>
          </div>
        )}

        {/* PAYMENT METHOD */}
        {paymentMethod && (
          <div className="bg-white rounded-2xl border shadow-sm p-6 sm:p-8 mb-8">
            <h3 className="font-semibold text-lg mb-6">
              Payment Method
            </h3>

            <div className="flex items-center gap-3 text-gray-700">

              {paymentMethod === "card" && (
                <>
                  <FaCreditCard className="text-blue-600" />
                  <span>Credit Card</span>
                </>
              )}

              {paymentMethod === "paypal" && (
                <>
                  <FaPaypal className="text-blue-600" />
                  <span>PayPal</span>
                </>
              )}

              {paymentMethod === "cod" && (
                <>
                  <FaMoneyBillWave className="text-blue-600" />
                  <span>Cash on Delivery</span>
                </>
              )}

            </div>
          </div>
        )}


        {/* ORDER SUMMARY */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 sm:p-8 mb-10">
          <h3 className="font-semibold text-lg mb-6">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm sm:text-base">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <hr className="my-6" />

          <div className="space-y-2 text-gray-600 text-sm sm:text-base">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
          </div>

          <hr className="my-6" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total Paid</span>
            <span className="text-blue-600">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>


        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <button
            onClick={() => navigate("/shop")}
            className="bg-black text-white px-6 py-3 rounded-xl 
                       hover:bg-gray-800 transition 
                       flex items-center justify-center gap-2"
          >
            Continue Shopping
            <FaArrowRight />
          </button>

          <button
            onClick={() => navigate("/account")}
            className="border border-gray-300 px-6 py-3 rounded-xl 
                       hover:bg-gray-100 transition"
          >
            View Orders
          </button>

        </div>

      </div>
    </div>
  );
}
