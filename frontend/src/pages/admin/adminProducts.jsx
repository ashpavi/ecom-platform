import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const mockProducts = [
  {
    id: "PRD-001",
    name: "Premium Headphones",
    category: "Electronics",
    price: 120,
    stock: 12,
    image: "https://via.placeholder.com/60",
    description:
      "Premium wireless noise-cancelling headphones with 40 hours battery life and immersive sound experience.",
  },
  {
    id: "PRD-002",
    name: "Smart Watch",
    category: "Accessories",
    price: 90,
    stock: 0,
    image: "https://via.placeholder.com/60",
    description:
      "Advanced smart watch with heart-rate tracking, GPS, and seamless smartphone connectivity.",
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
      setEditingProduct({
        ...editingProduct,
        image: imageURL,
      });
    }
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Product Management
        </h1>

        <Link
          to="/admin/products/add"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaPlus size={14} />
          Add Product
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Product</th>
              <th className="p-4">Description</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4">
                  <span className="text-xs font-semibold bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                    {product.id}
                  </span>
                </td>

                <td className="p-4 flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <span className="font-medium text-gray-800">
                    {product.name}
                  </span>
                </td>

                <td className="p-4 text-gray-600 max-w-sm">
                  <p className="line-clamp-2">{product.description}</p>
                </td>

                <td className="p-4 text-gray-600">
                  {product.category}
                </td>

                <td className="p-4 font-semibold text-gray-800">
                  ${product.price}
                </td>

                <td className="p-4">
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-medium">
                      {product.stock} in stock
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium">
                      Out of Stock
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setPreviewImage(product.image);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>

                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">

            <h2 className="text-xl font-bold mb-6">
              Edit Product
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    name: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-4 py-2"
              />

              <textarea
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
                rows="3"
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: Number(e.target.value),
                  })
                }
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="number"
                value={editingProduct.stock}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    stock: Number(e.target.value),
                  })
                }
                className="w-full border rounded-lg px-4 py-2"
              />

              {/* IMAGE SECTION */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm"
                />

                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="mt-4 w-40 h-40 object-cover rounded-lg border"
                  />
                )}
              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setPreviewImage(null);
                }}
                className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setProducts(
                    products.map((p) =>
                      p.id === editingProduct.id ? editingProduct : p
                    )
                  );
                  setEditingProduct(null);
                  setPreviewImage(null);
                }}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}