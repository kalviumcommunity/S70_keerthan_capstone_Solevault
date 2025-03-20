import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 to-blue-300">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        {/* Toggle Login / Signup */}
        <div className="flex justify-between items-center border-b pb-3">
          <button className="text-blue-600 font-bold">Login</button>
          <button
            onClick={() => navigate("/signup")}
            className="text-gray-500 hover:text-blue-600 transition-all duration-300"
          >
            Signup
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mt-6 text-gray-800">
          Welcome Back!
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Login to access your account
        </p>

        {/* Login Form */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4 font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign up here
          </span>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
