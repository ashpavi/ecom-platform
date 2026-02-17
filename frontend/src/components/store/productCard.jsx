import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ product }) {
  const productId = product?.id ?? 1;
  const productPath = `/products/${productId}`;
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition duration-300 bg-white">

      {/* Product Image */}
      <Link to={productPath} className="block h-48 bg-gray-200 rounded mb-4 overflow-hidden" aria-label={`View details for ${product.name}`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </Link>

      {/* Product Name */}
      <Link to={productPath} className="font-semibold text-gray-800 truncate block">
        {product.name}
      </Link>

      {/* Price */}
      <p className="text-blue-600 font-bold mt-2">
        LKR {product.price}
      </p>

      {/* Add to Cart */}
      <button className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        <FaShoppingCart size={14} />
        Add to Cart
      </button>
    </div>
  );
}
