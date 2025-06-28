// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, User, Bell, Menu, X, LogIn, LogOut } from "lucide-react"; 
import CustomButton from "../ui/CustomButton"; // Assuming this path is correct
import UpgradeButton from '@/components/payments/UpgradeButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('soleVaultUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user from localStorage:", error);
        localStorage.removeItem('soleVaultUser');
        localStorage.removeItem('soleVaultToken');
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [location.key, location.pathname]); // Re-run on location.pathname too for explicit navigations

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // handleSignUp and handleSignIn are no longer needed if using Link with asChild
  // const handleSignUp = () => { /* ... */ };
  // const handleSignIn = () => { /* ... */ };

  const handleLogout = () => {
    localStorage.removeItem('soleVaultUser');
    localStorage.removeItem('soleVaultToken');
    setCurrentUser(null);
    navigate("/"); 
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const isAuthenticated = !!currentUser;

  return (
    <nav className="bg-[#121212] border-b border-[#1a1a1a] py-4 sticky top-0 z-50">
      <div className="solevault-container flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold solevault-gradient-text">SoleVault</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/dashboard" className="text-[#fafafa] hover:text-white transition-colors">Dashboard</Link>
          <Link to="/marketplace" className="text-[#fafafa] hover:text-white transition-colors">Marketplace</Link>
          <Link to="/community" className="text-[#fafafa] hover:text-white transition-colors">Community</Link>
          <Link to="/analytics" className="text-[#fafafa] hover:text-white transition-colors">Analytics</Link>
        </div>
        
        {/* Desktop Auth Buttons Area */}
        <div className="hidden md:flex items-center space-x-4">
          <button type="button" className="p-2 text-[#d4d4d4] hover:text-white transition-colors" aria-label="Search">
            <Search size={20} />
          </button>
          <button type="button" className="p-2 text-[#d4d4d4] hover:text-white transition-colors" aria-label="Notifications">
            <Bell size={20} />
          </button>

          {isAuthenticated && currentUser ? (
            <>
              <UpgradeButton /> 
              <span className="text-[#d4d4d4] text-sm">
                Hi, {currentUser.firstName || currentUser.name || currentUser.email}
              </span>
              <CustomButton type="button" onClick={handleLogout} variant="outline">
                <LogOut size={16} className="mr-2" />
                Logout
              </CustomButton>
            </>
          ) : (
            <>
              {/* --- MODIFIED FOR asChild PATTERN --- */}
              <CustomButton asChild variant="ghost">
                <Link to="/signin">
                  <LogIn size={16} className="mr-2" />
                  Sign In
                </Link>
              </CustomButton>
              <CustomButton asChild variant="accent">
                <Link to="/signup">
                  <User size={16} className="mr-2" /> 
                  Sign Up
                </Link>
              </CustomButton>
              {/* --- END MODIFICATION --- */}
            </>
          )}
        </div>
        
        {/* Mobile Navigation Toggle */}
        <button type="button" className="md:hidden p-2 text-[#d4d4d4] hover:text-white" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#121212] border-t border-[#1a1a1a] absolute w-full left-0 right-0 shadow-xl">
          <div className="solevault-container py-4 space-y-1 mx-auto px-4 sm:px-6 lg:px-8"> {/* Reduced space-y */}
            <Link to="/dashboard" className="block px-4 py-3 text-[#fafafa] hover:bg-[#1a1a1a] rounded-md text-base" onClick={toggleMenu}>Dashboard</Link>
            <Link to="/marketplace" className="block px-4 py-3 text-[#fafafa] hover:bg-[#1a1a1a] rounded-md text-base" onClick={toggleMenu}>Marketplace</Link>
            <Link to="/community" className="block px-4 py-3 text-[#fafafa] hover:bg-[#1a1a1a] rounded-md text-base" onClick={toggleMenu}>Community</Link>
            <Link to="/analytics" className="block px-4 py-3 text-[#fafafa] hover:bg-[#1a1a1a] rounded-md text-base" onClick={toggleMenu}>Analytics</Link>
            
            <div className="pt-3 mt-3 border-t border-[#1a1a1a] space-y-3">
              {isAuthenticated && currentUser ? (
                <>
                  <div className="px-4 py-2 text-[#d4d4d4] text-sm">
                    Hi, {currentUser.firstName || currentUser.name || currentUser.email}
                  </div>
                  <CustomButton 
                    type="button"
                    size="md" 
                    onClick={handleLogout} 
                    variant="outline"
                    className="w-full"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </CustomButton>
                </>
              ) : (
                <>
                  {/* --- MODIFIED FOR asChild PATTERN --- */}
                  <CustomButton asChild size="md" variant="ghost" className="w-full">
                    <Link to="/signin" onClick={toggleMenu}>
                      <LogIn size={16} className="mr-2" />
                      Sign In
                    </Link>
                  </CustomButton>
                  <CustomButton asChild size="md" variant="accent" className="w-full">
                    <Link to="/signup" onClick={toggleMenu}>
                      <User size={16} className="mr-2" />
                      Sign Up
                    </Link>
                  </CustomButton>
                  {/* --- END MODIFICATION --- */}
                </>
              )}
              <div className="flex space-x-3 pt-2 justify-center">
                <button type="button" className="p-2 text-[#d4d4d4] hover:text-white transition-colors" aria-label="Search">
                  <Search size={20} />
                </button>
                <button type="button" className="p-2 text-[#d4d4d4] hover:text-white transition-colors" aria-label="Notifications">
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