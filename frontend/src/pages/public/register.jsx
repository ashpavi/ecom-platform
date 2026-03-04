import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

export default function RegisterPage() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser({
        name,
        email,
        password,
      });

      navigate("/account");

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-sm border">

        <div className="text-center mb-6">
          <FaUserPlus className="mx-auto text-blue-600 mb-3" size={30} />
          <h2 className="text-2xl font-semibold">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">
            Join us today
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm mb-2">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your full name"
            />
          </div>

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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}