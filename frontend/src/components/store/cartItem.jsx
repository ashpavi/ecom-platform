import { FaTrash } from "react-icons/fa";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="flex gap-6 border rounded-xl p-5 bg-white shadow-sm">

      <div className="w-28 h-28 bg-gray-200 rounded-lg overflow-hidden"></div>

      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p className="font-semibold text-lg">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <p className="text-gray-500 text-sm mt-1">
          Color: {item.color} | Size: {item.size}
        </p>

        <span className="inline-block bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full mt-2">
          In Stock
        </span>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button onClick={onDecrease} className="px-3 py-1 hover:bg-gray-100">
              -
            </button>
            <span className="px-4">{item.quantity}</span>
            <button onClick={onIncrease} className="px-3 py-1 hover:bg-gray-100">
              +
            </button>
          </div>

          <button
            onClick={onRemove}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 text-sm"
          >
            <FaTrash size={14} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
