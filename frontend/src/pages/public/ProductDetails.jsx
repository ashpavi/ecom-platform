import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

const PRODUCT = {
  id: 1,
  name: "Premium Heritage Leather Jacket",
  price: 24900,
  description:
    "Exquisitely crafted from full-grain leather with antique brass hardware and quilted satin lining.",
  images: [
    "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=800",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800",
  ],
  colors: ["#1a1a1a", "#8B4513", "#708090"],
  sizes: ["S", "M", "L", "XL"],
};

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [imageIndex, setImageIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: PRODUCT.id,
      name: PRODUCT.name,
      price: PRODUCT.price,
      quantity: qty,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* IMAGE SECTION */}
        <div>

          <div className="bg-gray-100 rounded-xl overflow-hidden
                          h-[350px] md:h-[420px] lg:h-[480px]">
            <img
              src={PRODUCT.images[imageIndex]}
              alt={PRODUCT.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4">
            {PRODUCT.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImageIndex(i)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2
                  ${imageIndex === i ? "border-blue-600" : "border-gray-200"}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>


        {/* PRODUCT INFO */}
        <div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {PRODUCT.name}
          </h1>

          <p className="text-2xl font-bold text-blue-600 mb-6">
            LKR {PRODUCT.price}
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {PRODUCT.description}
          </p>


          {/* COLOR */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2">Color</p>

            <div className="flex gap-3">
              {PRODUCT.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setColorIndex(i)}
                  className={`w-8 h-8 rounded-full border-2
                    ${colorIndex === i ? "border-blue-600" : "border-gray-200"}`}
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>


          {/* SIZE */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2">Size</p>

            <div className="flex gap-2">
              {PRODUCT.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-lg border
                    ${
                      size === s
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>


          {/* QUANTITY */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2">Quantity</p>

            <div className="flex items-center border rounded-lg w-fit">

              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-2"
              >
                -
              </button>

              <span className="px-4">{qty}</span>

              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-4 py-2"
              >
                +
              </button>

            </div>
          </div>


          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 rounded-lg text-white font-semibold transition
              ${added ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>

        </div>
      </div>


      {/* DETAILS SECTION */}
      <div className="mt-16">

        <h2 className="text-xl font-semibold mb-4">
          Product Details
        </h2>

        <p className="text-gray-600 leading-relaxed max-w-3xl">
          Our Heritage Leather Jacket combines traditional craftsmanship
          with modern durability. The leather develops a beautiful patina
          over time, making each jacket unique.
        </p>

      </div>

    </div>
  );
}