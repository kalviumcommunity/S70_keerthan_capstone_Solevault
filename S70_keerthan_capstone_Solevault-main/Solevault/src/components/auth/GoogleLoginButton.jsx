// src/components/auth/GoogleLoginButton.jsx (Example)
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"; // Install if not present: npm install jwt-decode

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("Google Sign-In Success. CredentialResponse:", credentialResponse);
    const idToken = credentialResponse.credential;
    // const decodedToken = jwtDecode(idToken); // You can decode to see claims client-side if needed
    // console.log("Decoded Google ID Token:", decodedToken);

    // Send this idToken to your backend for verification and to get your app's JWT
    try {
      const res = await fetch('/api/auth/google-login', { // Your backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: idToken }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Google login backend failed, no JSON response' }));
        throw new Error(errorData.message || `Server error: ${res.status}`);
      }

      const data = await res.json(); // This should contain your application's JWT
      console.log("Backend response after Google login:", data);
      // Call the onSuccess prop passed from your login page/component
      // This prop would typically handle storing your app's JWT and updating auth state
      onSuccess(data.token); // Assuming backend returns { token: 'yourAppJWT' }
    } catch (error) {
      console.error("Error sending Google token to backend:", error);
      if (onFailure) {
        onFailure(error);
      }
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Sign-In Failed:", error);
    if (onFailure) {
      onFailure(error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleFailure}
      useOneTap // Optional: for a more seamless experience
      shape="rectangular" // "rectangular", "pill", "circle", "square"
      theme="outline" // "outline", "filled_blue", "filled_black"
      size="large" // "small", "medium", "large"
    />
  );
};

export default GoogleLoginButton;