import CartItem from "../../components/store/cartItem";
import OrderSummary from "../../components/store/orderSummary";
import { useCart } from "../../context/cartContext";

export default function CartPage() {

  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem
  } = useCart();

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 12.5 : 0;
  const tax = subtotal * 0.08;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-3xl font-bold mb-8">
          Shopping Cart ({cartItems.length} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={() => increaseQty(item.id)}
                onDecrease={() => decreaseQty(item.id)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>

          {/* Right: Summary */}
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
          />

        </div>

      </div>
    </div>
  );
}
