import { useState } from "react";
import {
  FaArrowLeft,
  FaCreditCard,
  FaPaypal,
  FaMoneyBillWave
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export default function Checkout() {
  const [shippingData, setShippingData] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    zipcode: "",
    contactno: "",
    email: ""
  });

  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 12.5 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-sm text-gray-600 mb-10 hover:text-black transition"
        >
          <FaArrowLeft />
          Back to Cart
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-2 space-y-8">

            {/* DELIVERY CARD */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border space-y-6">
              <h3 className="text-lg font-semibold">Delivery Address</h3>

              <div className="space-y-4">
                {[
                  { key: "fullName", placeholder: "Full Name" },
                  { key: "streetAddress", placeholder: "Street Address" }
                ].map((field) => (
                  <input
                    key={field.key}
                    value={shippingData[field.key]}
                    onChange={(e) =>
                      setShippingData({
                        ...shippingData,
                        [field.key]: e.target.value
                      })
                    }
                    className="w-full border rounded-xl px-4 py-3 
                               focus:ring-2 focus:ring-blue-500 
                               focus:border-blue-500 outline-none transition"
                    placeholder={field.placeholder}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  value={shippingData.city}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, city: e.target.value })
                  }
                  className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="City"
                />
                <input
                  value={shippingData.zipcode}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, zipcode: e.target.value })
                  }
                  className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="ZIP Code"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  value={shippingData.contactno}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, contactno: e.target.value })
                  }
                  className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Contact Number"
                />
                <input
                  value={shippingData.email}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, email: e.target.value })
                  }
                  className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Email Address"
                />
              </div>
            </div>

            {/* PAYMENT CARD */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border space-y-6">
              <h3 className="text-lg font-semibold">Payment Method</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { key: "card", label: "Credit Card", icon: <FaCreditCard /> },
                  { key: "paypal", label: "PayPal", icon: <FaPaypal /> },
                  { key: "cod", label: "Cash on Delivery", icon: <FaMoneyBillWave /> }
                ].map((method) => (
                  <div
                    key={method.key}
                    onClick={() => setPaymentMethod(method.key)}
                    className={`rounded-xl p-4 flex items-center gap-3 cursor-pointer transition border ${
                      paymentMethod === method.key
                        ? "border-blue-600 bg-blue-50"
                        : "hover:border-gray-400"
                    }`}
                  >
                    {method.icon}
                    {method.label}
                  </div>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 mt-4">
                  <input
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="Cardholder Name"
                  />
                  <input
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="Card Number"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      placeholder="MM/YY"
                    />
                    <input
                      className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      placeholder="CVV"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm 
                          lg:sticky lg:top-24 h-fit space-y-6">

            <h3 className="text-lg font-semibold">Order Summary</h3>

            <div className="space-y-3 text-sm">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr />

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-blue-600">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() =>
                navigate("/orderSuccess", { state: { shippingData , paymentMethod } })
              }
              className="w-full bg-black text-white py-3 rounded-xl 
                         hover:bg-gray-800 active:scale-95 
                         transition-all duration-200 mt-4"
            >
              Place Order →
            </button>

            <p className="text-xs text-gray-500 text-center">
              Secure 256-bit SSL encrypted payment.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
