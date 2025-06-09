// src/services/sneakerService.js

// This now correctly reads the URL from your .env file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthToken = () => {
  return localStorage.getItem('soleVaultToken');
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

// --- FETCH SNEAKERS (No changes needed) ---
export const fetchUserSneakers = async () => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/sneakers`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(response);
};

// --- ADD SNEAKER (Corrected) ---
export const addSneaker = async (sneakerData) => {
  const token = getAuthToken();
  
  // No need to create a new payload object. We send sneakerData directly.
  // This ensures 'description' and all other fields are included.
  
  const response = await fetch(`${API_BASE_URL}/sneakers`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sneakerData), // Pass the whole object
  });
  return handleResponse(response);
};

// --- UPDATE SNEAKER (Corrected) ---
export const updateSneaker = async (sneakerId, sneakerData) => {
  const token = getAuthToken();

  // No need to create a new payload object here either.
  // We send the complete sneakerData object directly.

  const response = await fetch(`${API_BASE_URL}/sneakers/${sneakerId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sneakerData), // Pass the whole object
  });
  return handleResponse(response);
};

// --- DELETE SNEAKER (No changes needed) ---
export const deleteSneaker = async (sneakerId) => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/sneakers/${sneakerId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};