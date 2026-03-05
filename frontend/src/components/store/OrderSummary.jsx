import { useNavigate } from "react-router-dom";


export default function OrderSummary({ subtotal, shipping, tax }) {
  const total = subtotal + shipping + tax;
  const navigate = useNavigate();

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm space-y-5">

      <h2 className="text-xl font-semibold">Order Summary</h2>

      <div className="space-y-3 text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <hr />

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button 
        onClick={() => navigate("/checkout")}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
        Proceed to Checkout →
      </button>

      <p className="text-xs text-gray-500 text-center">
        Secure 256-bit SSL encrypted payment processing.
      </p>
    </div>
  );
}
