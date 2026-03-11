import { useState } from "react";
import {
  FaArrowLeft,
  FaCreditCard,
  FaPaypal,
  FaMoneyBillWave
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { createOrder } from "../../firebase/services/orderService";
import { formatPrice } from "../../utils/formatPrice";

export default function Checkout() {

  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [shippingData, setShippingData] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    zipcode: "",
    contactno: "",
    email: ""
  });

  /* ================= ORDER CALCULATIONS ================= */

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const COD_FEE = paymentMethod === "cod" ? 350 : 0;

  const total = subtotal + COD_FEE;

  /* ================= PLACE ORDER ================= */
  const validateForm = () => {

  if (!shippingData.fullName.trim()) {
    alert("Please enter your full name");
    return false;
  }

  if (!shippingData.streetAddress.trim()) {
    alert("Please enter your street address");
    return false;
  }

  if (!shippingData.city.trim()) {
    alert("Please enter your city");
    return false;
  }

  if (!shippingData.zipcode.trim()) {
    alert("Please enter your ZIP code");
    return false;
  }

  if (!shippingData.contactno.trim()) {
    alert("Please enter your contact number");
    return false;
  }

  if (!shippingData.email.trim()) {
    alert("Please enter your email address");
    return false;
  }

  if (cartItems.length === 0) {
    alert("Your cart is empty");
    return false;
  }

  return true;
};

 const handlePlaceOrder = async () => {

  if (!validateForm()) return;

  try {

    const order = {
      customer: shippingData,
      items: cartItems,
      paymentMethod,
      subtotal,
      codFee: COD_FEE,
      total,
      status: "Processing",
      date: new Date().toISOString()
    };

    const orderId = await createOrder(order);

    navigate("/orderSuccess", {
      state: {
        orderId,
        shippingData,
        paymentMethod,
        items: cartItems,
        subtotal,
        codFee: COD_FEE,
        total,
        date: new Date().toISOString()
      }
    });

  } catch (error) {

    console.error("Order creation failed:", error);

  }

};

  return (

    <div className="bg-gray-50 min-h-screen py-10 sm:py-14">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-sm text-gray-600 mb-10 hover:text-black"
        >
          <FaArrowLeft />
          Back to Cart
        </button>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">


          {/* ================= LEFT SIDE ================= */}

          <div className="lg:col-span-2 space-y-8">


            {/* DELIVERY ADDRESS */}

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border space-y-6">

              <h3 className="text-lg font-semibold">
                Delivery Address
              </h3>


              <input
                value={shippingData.fullName}
                onChange={(e) =>
                  setShippingData({ ...shippingData, fullName: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Full Name"
              />


              <input
                value={shippingData.streetAddress}
                onChange={(e) =>
                  setShippingData({ ...shippingData, streetAddress: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Street Address"
              />


              <div className="grid grid-cols-2 gap-4">

                <input
                  value={shippingData.city}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, city: e.target.value })
                  }
                  className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="City"
                />

                <input
                  value={shippingData.zipcode}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, zipcode: e.target.value })
                  }
                  className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="ZIP Code"
                />

              </div>


              <div className="grid grid-cols-2 gap-4">

                <input
                  value={shippingData.contactno}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, contactno: e.target.value })
                  }
                  className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Contact Number"
                />

                <input
                  value={shippingData.email}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, email: e.target.value })
                  }
                  className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Email Address"
                />

              </div>

            </div>


            {/* PAYMENT METHOD */}

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border space-y-6">

              <h3 className="text-lg font-semibold">
                Payment Method
              </h3>


              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer
                    ${paymentMethod === "card" ? "border-blue-600 bg-blue-50" : ""}`}
                >
                  <FaCreditCard />
                  Credit Card
                </div>


                <div
                  onClick={() => setPaymentMethod("paypal")}
                  className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer
                    ${paymentMethod === "paypal" ? "border-blue-600 bg-blue-50" : ""}`}
                >
                  <FaPaypal />
                  PayPal
                </div>


                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer
                    ${paymentMethod === "cod" ? "border-blue-600 bg-blue-50" : ""}`}
                >
                  <FaMoneyBillWave />
                  Cash on Delivery
                </div>

              </div>

            </div>

          </div>


          {/* ================= RIGHT SIDE ================= */}

          <div className="bg-white border rounded-2xl p-6 shadow-sm lg:sticky lg:top-24 h-fit space-y-6">

            <h3 className="text-lg font-semibold">
              Order Summary
            </h3>


            {/* ITEMS */}

            <div className="space-y-3 text-sm">

              {cartItems.map((item) => (

                <div key={item.id} className="flex justify-between">

                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>
                    {formatPrice(item.price * item.quantity)}
                  </span>

                </div>

              ))}

            </div>


            <hr />


            {/* SUBTOTAL */}

            <div className="flex justify-between text-sm">

              <span>Subtotal</span>

              <span>{formatPrice(subtotal)}</span>

            </div>


            {/* COD FEE */}

            {paymentMethod === "cod" && (

              <div className="flex justify-between text-sm">

                <span>Cash on Delivery</span>

                <span>{formatPrice(350)}</span>

              </div>

            )}


            <hr />


            {/* TOTAL */}

            <div className="flex justify-between font-bold text-lg">

              <span>Total</span>

              <span className="text-blue-600">
                {formatPrice(total)}
              </span>

            </div>


            {/* PLACE ORDER */}

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800"
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