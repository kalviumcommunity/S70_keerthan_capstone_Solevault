import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Note: Two different Toasters, ensure this is intended.
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import Analytics from "./pages/Analytics";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Community from "./pages/Community";
import ProtectedRoute from "./components/utility/ProtectedRoute";
import { GoogleOAuthProvider } from '@react-oauth/google'; // You have this
import AboutPage from "./pages/AboutPage";
import CookiePolicyPage from "./pages/CookiePolicyPage"; 


const queryClient = new QueryClient();

// Retrieve your Google Client ID from environment variables
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Check if the Client ID is loaded, otherwise GoogleOAuthProvider might not work correctly
if (!googleClientId) {
  console.error("ERROR: Google Client ID (VITE_GOOGLE_CLIENT_ID) is not defined. Google OAuth will not work.");
  // You might want to render an error message or a fallback UI here
}

const App = () => (
  <React.StrictMode>
    {/* GoogleOAuthProvider should wrap the parts of your app that use Google Login.
        It's often placed high up, even wrapping BrowserRouter if possible,
        or at least wrapping your Routes. It MUST have the clientId prop. */}
    <GoogleOAuthProvider clientId={googleClientId}> {/* <<< ADDED clientId PROP HERE */}
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster /> {/* For Shadcn UI Toasts */}
            <Sonner />  {/* For Sonner Toasts */}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/marketplace" 
                element={
                  <ProtectedRoute>
                    <Marketplace />
                  </ProtectedRoute>
                } 
              />
<Route path="/privacy" element={<PrivacyPolicyPage />} />
<Route path="/about" element={<AboutPage />} />
<Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/community" 
                element={
                  <ProtectedRoute>
                    <Community />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
          </TooltipProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

export default App;