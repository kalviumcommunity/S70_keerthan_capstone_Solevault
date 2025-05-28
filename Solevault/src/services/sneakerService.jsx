// src/services/sneakerService.js

// Define your backend API's base URL.
// If your Vite dev server is configured to proxy /api to your backend,
// you can just use '/api'. Otherwise, use the full backend URL (e.g., 'http://localhost:5000/api').
const API_BASE_URL = 'https://s70-keerthan-capstone-solevault.onrender.com/'; // Adjust if your backend is on a different port/domain during development

// Placeholder function to get the auth token.
// You'll need to implement this based on how you store the token after login (e.g., localStorage).
const getAuthToken = () => {
  return localStorage.getItem('soleVaultToken'); // Example: token stored in localStorage
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Fetch all sneakers for the authenticated user
export const fetchUserSneakers = async () => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/sneakers`, { // Assuming GET /api/sneakers is protected and user-specific
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(response);
};

// Add a new sneaker
export const addSneaker = async (sneakerData) => {
  const token = getAuthToken();
  // Prepare only the data expected by the backend schema
  const payload = {
    name: sneakerData.name,
    brand: sneakerData.brand,
    model: sneakerData.model,
    releaseDate: sneakerData.releaseDate, // Ensure this is what the modal provides for this field
    retailPrice: sneakerData.retailPrice,
    marketValue: sneakerData.marketValue,
    image: sneakerData.image,
  };

  const response = await fetch(`${API_BASE_URL}/sneakers`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

// Update an existing sneaker
export const updateSneaker = async (sneakerId, sneakerData) => {
  const token = getAuthToken();
  const payload = { /* Prepare only fields that can be updated */
    name: sneakerData.name,
    brand: sneakerData.brand,
    model: sneakerData.model,
    releaseDate: sneakerData.releaseDate,
    retailPrice: sneakerData.retailPrice,
    marketValue: sneakerData.marketValue,
    image: sneakerData.image,
  };
  const response = await fetch(`${API_BASE_URL}/sneakers/${sneakerId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

// Delete a sneaker
export const deleteSneaker = async (sneakerId) => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/sneakers/${sneakerId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  // Delete often returns 200/204 with no content or a success message
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  if (response.status === 204) { // No Content
    return { message: 'Sneaker deleted successfully' };
  }
  return response.json();
};