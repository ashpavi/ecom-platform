import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const productId = product?.id ?? 1;
  const productPath = `/products/${productId}`;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200
                    hover:shadow-xl transition-all duration-300 
                    overflow-hidden">

      {/* IMAGE */}
      <Link
        to={productPath}
        className="block relative h-52 sm:h-56 md:h-60 bg-gray-100 overflow-hidden"
        aria-label={`View details for ${product.name}`}
      >
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
      </Link>

      {/* CONTENT */}
      <div className="p-4 sm:p-5">

        {/* NAME */}
        <Link
          to={productPath}
          className="text-sm sm:text-base font-semibold text-gray-800 truncate block hover:text-blue-600 transition"
        >
          {product.name}
        </Link>

        {/* PRICE */}
        <p className="text-blue-600 text-base sm:text-lg font-bold mt-2">
          LKR {product.price}
        </p>

        {/* ADD TO CART */}
        <button
          onClick={() =>
            addToCart({
              id: product.id ?? Math.random(),
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
