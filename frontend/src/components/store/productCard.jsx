import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/cartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl border  border-gray-600 
                    hover:shadow-xl transition-all duration-300 
                    overflow-hidden">

      {/* Product Image */}
      <div className="relative h-52 sm:h-56 md:h-60 bg-gray-100 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover 
                       transition-transform duration-500 
                       group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5">

        {/* Product Name */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
          {product.name}
        </h3>

        {/* Price */}
        <p className="text-blue-600 text-base sm:text-lg font-bold mt-2">
          LKR {product.price}
        </p>

        {/* Add to Cart */}
        <button
          onClick={() =>
            addToCart({
              id: product.id || Math.random(),
              name: product.name,
              price: product.price,
            })
          }
          className="mt-4 w-full flex items-center justify-center gap-2 
                     bg-blue-600 text-white py-2.5 rounded-xl
                     hover:bg-blue-700 active:scale-95
                     transition-all duration-200"
        >
          <FaShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}