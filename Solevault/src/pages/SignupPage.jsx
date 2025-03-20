import React from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 to-blue-300">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        {/* Toggle Login / Signup */}
        <div className="flex justify-between items-center border-b pb-3">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-500 hover:text-blue-600 transition-all duration-300"
          >
            Login
          </button>
          <button className="text-blue-600 font-bold">Signup</button>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mt-6 text-gray-800">
          Create Your Account
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">Join us today!</p>

        {/* Signup Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
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
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </main>
  );
};

export default SignupPage;
