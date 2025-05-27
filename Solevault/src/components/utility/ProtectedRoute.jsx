// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('soleVaultToken'); // Check for the existence of the token
  const location = useLocation();

  if (!token) {
    // User is not authenticated, redirect to sign-in page
    // Pass the current location in state so we can redirect back after login
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // User is authenticated, render the child components (the protected page)
  return children;
};

export default ProtectedRoute;