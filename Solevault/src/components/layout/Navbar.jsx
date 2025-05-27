// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, User, Bell, Menu, X, LogIn, LogOut } from "lucide-react"; 
import CustomButton from "../ui/CustomButton"; // Assuming this path is correct

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Local state for the user
  const navigate = useNavigate();
  const location = useLocation(); // To help re-check localStorage on navigation

  // Effect to check localStorage when the component mounts or route changes
  useEffect(() => {
    const storedUser = localStorage.getItem('soleVaultUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user from localStorage:", error);
        // Clear potentially corrupted data
        localStorage.removeItem('soleVaultUser');
        localStorage.removeItem('soleVaultToken'); // If user data is corrupt, token might be too or irrelevant
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null); // No user found in localStorage
    }
  }, [location.key]); // Re-run this effect when the route 'key' changes (on navigation)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignUp = () => {
    navigate("/signup"); 
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleSignIn = () => {
    navigate("/signin"); 
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('soleVaultUser');
    localStorage.removeItem('soleVaultToken'); // Make sure to remove the token as well!
    setCurrentUser(null); // Update local state to trigger re-render
    navigate("/"); // Navigate to sign-in page (or homepage)
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Derived state for convenience in conditional rendering
  const isAuthenticated = !!currentUser;

  return (
    <nav className="bg-[#121212] border-b border-[#1a1a1a] py-4 sticky top-0 z-50">
      <div className="solevault-container flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold solevault-gradient-text">SoleVault</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/dashboard" className="text-[#fafafa] hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link to="/marketplace" className="text-[#fafafa] hover:text-white transition-colors">
            Marketplace
          </Link>
          <Link to="/community" className="text-[#fafafa] hover:text-white transition-colors">
            Community
          </Link>
          <Link to="/analytics" className="text-[#fafafa] hover:text-white transition-colors">
            Analytics
          </Link>
        </div>
        
        {/* Desktop Auth Buttons Area */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 text-[#d4d4d4] hover:text-white transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2 text-[#d4d4d4] hover:text-white transition-colors">
            <Bell size={20} />
          </button>

          {isAuthenticated && currentUser ? (
            <>
              <span className="text-[#d4d4d4] text-sm">
                Hi, {currentUser.firstName || currentUser.email}
              </span>
              <CustomButton onClick={handleLogout} variant="outline"> {/* Adjust variant as needed */}
                <LogOut size={16} className="mr-2" />
                Logout
              </CustomButton>
            </>
          ) : (
            <>
              <CustomButton onClick={handleSignIn} variant="ghost"> {/* Adjust variant as needed */}
                <LogIn size={16} className="mr-2" />
                Sign In
              </CustomButton>
              <CustomButton onClick={handleSignUp} variant="accent">
                <User size={16} className="mr-2" /> 
                Sign Up
              </CustomButton>
            </>
          )}
        </div>
        
        {/* Mobile Navigation Toggle */}
        <button className="md:hidden p-2 text-[#d4d4d4] hover:text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#121212] border-t border-[#1a1a1a] absolute w-full left-0 right-0 shadow-xl">
          <div className="solevault-container py-4 space-y-3 mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/dashboard" 
              className="block px-4 py-3 text-[#fafafa] hover:bg-[#1a1a1a] rounded-md text-base"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link 
              to="/marketplace" 
              className="block px-4 py-3 text-[#fafafa] hover:bg-[#1a1a1a] rounded-md text-base"
              onClick={toggleMenu}
            >
              Marketplace
            </Link>
            <Link 
              to="/community" 
              className="block px-4 py-3 text-[#fafafa] hover:bg-[#1a1a1a] rounded-md text-base"
              onClick={toggleMenu}
            >
              Community
            </Link>
            <Link 
              to="/analytics" 
              className="block px-4 py-3 text-[#fafafa] hover:bg-[#1a1a1a] rounded-md text-base"
              onClick={toggleMenu}
            >
              Analytics
            </Link>
            <div className="pt-3 mt-3 border-t border-[#1a1a1a] space-y-3">
              {isAuthenticated && currentUser ? (
                <>
                  <div className="px-4 py-2 text-[#d4d4d4] text-sm">
                    Hi, {currentUser.firstName || currentUser.email}
                  </div>
                  <CustomButton 
                    size="md" 
                    onClick={handleLogout} 
                    variant="outline" // Adjust variant
                    className="w-full"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </CustomButton>
                </>
              ) : (
                <>
                  <CustomButton 
                    size="md" 
                    onClick={handleSignIn} 
                    variant="ghost" // Adjust variant
                    className="w-full" 
                  >
                    <LogIn size={16} className="mr-2" />
                    Sign In
                  </CustomButton>
                  <CustomButton 
                    size="md" 
                    onClick={handleSignUp} 
                    variant="accent" 
                    className="w-full"
                  >
                    <User size={16} className="mr-2" />
                    Sign Up
                  </CustomButton>
                </>
              )}
              {/* Mobile Icons */}
              <div className="flex space-x-3 pt-2 justify-center">
                <button className="p-2 text-[#d4d4d4] hover:text-white transition-colors">
                  <Search size={20} />
                </button>
                <button className="p-2 text-[#d4d4d4] hover:text-white transition-colors">
                  <Bell size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;