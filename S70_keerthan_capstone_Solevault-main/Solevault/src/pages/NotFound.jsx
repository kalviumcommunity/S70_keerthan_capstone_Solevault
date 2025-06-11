import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
// import React from "react"; // React is implicitly available in modern JSX transforms

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]"> {/* Replaced bg-gray-100 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-[#4b5563] mb-4">Oops! Page not found</p> {/* Replaced text-gray-600 */}
        <Link to="/" className="text-[#3b82f6] hover:text-[#1d4ed8] underline"> {/* Replaced text-blue-500 and hover:text-blue-700 */}
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;