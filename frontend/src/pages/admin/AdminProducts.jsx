import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useProducts } from "../../hooks/useProducts";
import { uploadProductImages } from "../../firebase/services/uploadService";

export default function AdminProducts() {
  const { products, editProduct, removeProduct } = useProducts();

  const [editingProduct, setEditingProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    let imageUrl = editingProduct.image;

    if (imageFile) {
      imageUrl = await uploadProductImages(imageFile, editingProduct.id);
    }

    await editProduct(editingProduct.id, {
      ...editingProduct,
      image: imageUrl,
    });

    setEditingProduct(null);
    setPreviewImage(null);
    setImageFile(null);
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Product Management
        </h1>

        <Link
          to="/admin/products/add"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          <FaPlus size={14} />
          Add Product
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600 uppercase">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">

                <td className="p-4 flex items-center gap-4">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-14 h-14 rounded-lg object-cover border"
                  />
                  <span className="font-medium">{product.name}</span>
                </td>

                <td className="p-4">{product.category}</td>

                <td className="p-4 font-semibold">
                  LKR {product.price}
                </td>

                <td className="p-4">
                  {product.stock > 0 ? (
                    <span className="text-green-600">
                      {product.stock} in stock
                    </span>
                  ) : (
                    <span className="text-red-500">
                      Out of stock
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
                      className="text-blue-600"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => removeProduct(product.id)}
                      className="text-red-500"
                    >
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
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-full max-w-lg">

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

              {/* IMAGE */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              {previewImage && (
                <img
                  src={previewImage}
                  className="w-40 h-40 object-cover rounded-lg border"
                />
              )}

            </div>

            <div className="flex justify-end gap-4 mt-6">

              <button
                onClick={() => setEditingProduct(null)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
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