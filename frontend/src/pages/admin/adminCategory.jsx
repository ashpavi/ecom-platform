import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const mockCategories = [
  { id: "CAT-001", name: "Electronics", productCount: 12 },
  { id: "CAT-002", name: "Accessories", productCount: 8 },
  { id: "CAT-003", name: "Clothing", productCount: 15 },
];

export default function AdminCategory() {
  const [categories, setCategories] = useState(mockCategories);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  // Add Category
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    const newCat = {
      id: `CAT-${Math.floor(Math.random() * 1000)}`,
      name: newCategory,
      productCount: 0,
    };

    setCategories([...categories, newCat]);
    setNewCategory("");
  };

  // Save Edited Category
  const handleSaveEdit = () => {
    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory.id ? editingCategory : cat
      )
    );
    setEditingCategory(null);
  };

  // Delete Category
  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Category Management
      </h1>

      {/* ADD CATEGORY */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="New category name..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaPlus size={14} />
          Add Category
        </button>
      </div>

      {/* CATEGORY TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Category Name</th>
              <th className="p-4">Products</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t hover:bg-gray-50 transition">

                <td className="p-4">
                  <span className="text-xs font-semibold bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                    {category.id}
                  </span>
                </td>

                <td className="p-4 font-medium text-gray-800">
                  {category.name}
                </td>

                <td className="p-4 text-gray-600">
                  {category.productCount}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setEditingCategory(category)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-500 hover:text-red-700"
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
      {editingCategory && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">

            <h2 className="text-xl font-bold mb-6">
              Edit Category
            </h2>

            <input
              type="text"
              value={editingCategory.name}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-2 mb-6"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditingCategory(null)}
                className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveEdit}
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