import { useState } from "react";
import { FaEye, FaUserSlash, FaUserCheck } from "react-icons/fa";

const mockUsers = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    role: "User",
    status: "Active",
    address: "123 Main Street, New York, USA",
  },
  {
    id: "USR-002",
    name: "Sarah Lee",
    email: "sarah@example.com",
    phone: "+1 555 888 222",
    role: "Admin",
    status: "Active",
    address: "45 Sunset Avenue, Los Angeles, USA",
  },
  {
    id: "USR-003",
    name: "Michael Tan",
    email: "michael@example.com",
    phone: "+1 999 111 333",
    role: "User",
    status: "Blocked",
    address: "22 Lake View Road, Chicago, USA",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Blocked" : "Active",
            }
          : user
      )
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (status) =>
    status === "Active"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        User Management
      </h1>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">

                <td className="p-4 text-gray-600">
                  {user.id}
                </td>

                <td className="p-4">
                  <div className="font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {user.email}
                  </div>
                </td>

                <td className="p-4 text-gray-700">
                  {user.role}
                </td>

                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>

                <td className="p-4 text-center">
                  <div className="flex justify-center gap-4">

                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`${
                        user.status === "Active"
                          ? "text-red-500 hover:text-red-700"
                          : "text-green-600 hover:text-green-800"
                      }`}
                    >
                      {user.status === "Active" ? <FaUserSlash /> : <FaUserCheck />}
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* USER DETAILS MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">

            <h2 className="text-xl font-bold mb-6">
              User Details
            </h2>

            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>ID:</strong> {selectedUser.id}</p>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Status:</strong> {selectedUser.status}</p>
              <p><strong>Address:</strong> {selectedUser.address}</p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}