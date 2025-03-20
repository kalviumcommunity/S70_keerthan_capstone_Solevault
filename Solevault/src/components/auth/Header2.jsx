import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between items-center px-5 py-3.5 bg-indigo-700 shadow-md text-white">
      <div className="flex items-center gap-3">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b167ea54ed19bd2e071dbf6905533de35df6e199908910afcdd459773864c06"
          alt="SoleVault Logo"
          className="object-contain w-10 h-10 rounded-full"
        />
        <h1 className="text-2xl font-bold">SoleVault</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-6 text-lg">
        <Link to="/" className="hover:text-gray-300">Market</Link>
        <Link to="/collection" className="hover:text-gray-300">Collection</Link>
        <Link to="/wishlist" className="hover:text-gray-300">Wishlist</Link>
        <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
      </nav>

      {/* Auth Buttons */}
      <div className="flex gap-3">
        <Link to="/login">
          <button className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-indigo-700">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-white text-indigo-700 rounded-lg hover:bg-gray-200">
            Signup
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
