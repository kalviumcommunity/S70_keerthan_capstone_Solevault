import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Added LogIn icon for the Sign In button
import { Search, User, Bell, Menu, X, LogIn } from "lucide-react"; 
import CustomButton from "../ui/CustomButton"; // Assuming this path is correct

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handler for Sign Up button
  const handleSignUp = () => {
    navigate("/signup"); 
    if (isMenuOpen) {
      setIsMenuOpen(false); 
    }
  };

  // Handler for Sign In button
  const handleSignIn = () => {
    navigate("/signin"); // Navigate to the /signin route
    if (isMenuOpen) {
      setIsMenuOpen(false); // Close the mobile menu if it's open
    }
  };

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
          {/* Sign In Button Added Here */}
          <CustomButton onClick={handleSignIn} variant="ghost"> {/* Adjust variant as needed */}
            <LogIn size={16} className="mr-2" />
            Sign In
          </CustomButton>
          {/* Sign Up Button */}
          <CustomButton onClick={handleSignUp} variant="accent">
            <User size={16} className="mr-2" /> 
            Sign Up
          </CustomButton>
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
            <div className="pt-3 mt-3 border-t border-[#1a1a1a] space-y-3"> {/* Use space-y-3 for buttons */}
                {/* Sign In Button for Mobile */}
                <CustomButton 
                    size="md" 
                    onClick={handleSignIn} 
                    variant="ghost" /* Adjust variant */
                    className="w-full" 
                >
                    <LogIn size={16} className="mr-2" />
                    Sign In
                </CustomButton>
                {/* Sign Up Button for Mobile */}
                <CustomButton 
                    size="md" 
                    onClick={handleSignUp} 
                    variant="accent" 
                    className="w-full"
                >
                    <User size={16} className="mr-2" />
                    Sign Up
                </CustomButton>
                {/* Mobile Icons (optional placement) */}
                <div className="flex space-x-3 pt-2 justify-center"> {/* Centered icons */}
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