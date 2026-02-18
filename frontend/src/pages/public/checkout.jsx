import { useState } from "react";
import { useCart } from "../../context/cartContext";
import {
  FaLock,
  FaArrowLeft,
  FaCreditCard,
  FaPaypal,
  FaMoneyBillWave
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function CheckoutPage() {
  const [shippingData, setShippingData] = useState({
  fullName: "",
  streetAddress: "",
  city: "",
  zipcode: "",
  contactno:"",
  email:"",
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
    <div className="bg-gray-50 min-h-screen">

      

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Back to cart */}
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-sm text-gray-600 mb-8 hover:text-black"
        >
          <FaArrowLeft />
          Back to Cart
        </button>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            {/* Delivery Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-5">
              <h3 className="text-lg font-semibold">Delivery Address</h3>

              <input
                value={shippingData.fullName}
                onChange={(e) =>
                  setShippingData({ ...shippingData, fullName: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Full Name"
              />


              <input
                value={shippingData.streetAddress}
                onChange={(e) =>
                  setShippingData({ ...shippingData, streetAddress: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Street Address"
              />  


              <div className="grid md:grid-cols-2 gap-4">
                <input
                  value={shippingData.city}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, city: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-3"
                  placeholder="City"
                />

                <input
                  value={shippingData.zipcode}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, zipcode: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-3"
                  placeholder="ZIP Code"
                />

              </div>

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  value={shippingData.contactno}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, contactno: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-3"
                  placeholder="Contact Number"
                />

                <input
                  value={shippingData.email}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, email: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-3"
                  placeholder="Email Address"
                />

              </div>
            </div>

            {/* Payment Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6">
              <h3 className="text-lg font-semibold">Payment Method</h3>

              <div className="grid md:grid-cols-3 gap-4">

                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`border rounded-lg p-4 flex items-center gap-3 cursor-pointer transition ${
                    paymentMethod === "card"
                      ? "border-blue-600 bg-blue-50"
                      : "hover:border-gray-400"
                  }`}
                >
                  <FaCreditCard />
                  Credit Card
                </div>

                <div
                  onClick={() => setPaymentMethod("paypal")}
                  className={`border rounded-lg p-4 flex items-center gap-3 cursor-pointer transition ${
                    paymentMethod === "paypal"
                      ? "border-blue-600 bg-blue-50"
                      : "hover:border-gray-400"
                  }`}
                >
                  <FaPaypal />
                  PayPal
                </div>

                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`border rounded-lg p-4 flex items-center gap-3 cursor-pointer transition ${
                    paymentMethod === "cod"
                      ? "border-blue-600 bg-blue-50"
                      : "hover:border-gray-400"
                  }`}
                >
                  <FaMoneyBillWave />
                  Cash on Delivery
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 mt-4">
                  <input className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Cardholder Name" />
                  <input className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Card Number" />
                  <div className="grid md:grid-cols-2 gap-4">
                    <input className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="MM/YY" />
                    <input className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="CVV" />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div className="bg-white border rounded-xl p-6 shadow-sm h-fit space-y-5">

            <h3 className="text-lg font-semibold">Order Summary</h3>

            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <hr />

            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery Cost</span>
              <span>${shipping.toFixed(2)}</span>
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
                navigate("/orderSuccess", {
                  state: { shippingData }
                })
              }
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition mt-4"
            >
              Place Order →
            </button>


            <p className="text-xs text-gray-500 text-center mt-4">
              Secure 256-bit SSL encrypted payment processing.
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}
