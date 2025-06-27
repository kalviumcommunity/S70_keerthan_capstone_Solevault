// src/services/sneakerService.js

// This now correctly reads the URL from your .env file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthToken = () => {
  return localStorage.getItem('soleVaultToken');
};

// This helper creates the authorization headers.
const getAuthHeaders = () => {
    const token = getAuthToken();
    if (!token) {
        // This can help in debugging if the token is missing.
        console.error("Authentication token not found in localStorage.");
        return { 'Content-Type': 'application/json' };
    }
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  // For DELETE requests with no content
  if (response.status === 204) {
    return { message: 'Action completed successfully.' };
  }
  return response.json();
};

// --- CORRECTED API FUNCTIONS ---

export const fetchUserSneakers = async () => {
  const response = await fetch(`${API_BASE_URL}/sneakers`, {
    method: 'GET',
    headers: getAuthHeaders(), // Use the helper function
  });
  return handleResponse(response);
};

export const addSneaker = async (sneakerData) => {
  const response = await fetch(`${API_BASE_URL}/sneakers`, {
    method: 'POST',
    headers: getAuthHeaders(), // Use the helper function
    body: JSON.stringify(sneakerData),
  });
  return handleResponse(response);
};

export const updateSneaker = async (sneakerId, sneakerData) => {
  const response = await fetch(`${API_BASE_URL}/sneakers/${sneakerId}`, {
    method: 'PUT',
    headers: getAuthHeaders(), // Use the helper function
    body: JSON.stringify(sneakerData),
  });
  return handleResponse(response);
};

export const deleteSneaker = async (sneakerId) => {
  const response = await fetch(`${API_BASE_URL}/sneakers/${sneakerId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(), // Use the helper function
  });
  return handleResponse(response);
};

