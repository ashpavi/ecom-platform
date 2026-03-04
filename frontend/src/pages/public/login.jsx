import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

export default function LoginPage() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await loginUser(email, password);

      // 🔥 Role-based redirect
      if (user.role === "superadmin") {
        navigate("/superAdmin/superAdminDashboard");
      } else if (user.role === "admin") {
        navigate("/admin/adminDashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-sm border">

        <div className="text-center mb-6">
          <FaLock className="mx-auto text-blue-600 mb-3" size={30} />
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">
            Login to your account
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}