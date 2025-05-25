import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Bell, Menu, X } from "lucide-react";
import CustomButton from "../ui/CustomButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-[#121212] border-b border-[#1a1a1a] py-4 sticky top-0 z-50"> {/* Replaced bg-solevault-900, border-solevault-800 */}
      <div className="solevault-container flex justify-between items-center"> {/* Kept solevault-container */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold solevault-gradient-text">SoleVault</span> {/* Kept solevault-gradient-text */}
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/dashboard" className="text-[#fafafa] hover:text-white transition-colors"> {/* Replaced text-solevault-200 */}
            Dashboard
          </Link>
          <Link to="/marketplace" className="text-[#fafafa] hover:text-white transition-colors"> {/* Replaced text-solevault-200 */}
            Marketplace
          </Link>
          <Link to="/community" className="text-[#fafafa] hover:text-white transition-colors"> {/* Replaced text-solevault-200 */}
            Community
          </Link>
          <Link to="/analytics" className="text-[#fafafa] hover:text-white transition-colors"> {/* Replaced text-solevault-200 */}
            Analytics
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 text-[#d4d4d4] hover:text-white transition-colors"> {/* Replaced text-solevault-300 */}
            <Search size={20} />
          </button>
          <button className="p-2 text-[#d4d4d4] hover:text-white transition-colors"> {/* Replaced text-solevault-300 */}
            <Bell size={20} />
          </button>
          <CustomButton>
            <User size={16} className="mr-2" />
            Sign In
          </CustomButton>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <button className="md:hidden p-2 text-[#d4d4d4]" onClick={toggleMenu}> {/* Replaced text-solevault-300 */}
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#121212] border-t border-[#1a1a1a] absolute w-full left-0 right-0 shadow-xl"> {/* Replaced bg-solevault-900, border-solevault-800 */}
          <div className="solevault-container py-4 space-y-3"> {/* Kept solevault-container */}
            <Link 
              to="/dashboard" 
              className="block px-4 py-2 text-[#fafafa] hover:bg-[#1a1a1a] rounded-md" // Replaced text-solevault-200, hover:bg-solevault-800
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link 
              to="/marketplace" 
              className="block px-4 py-2 text-[#fafafa] hover:bg-[#1a1a1a] rounded-md" // Replaced text-solevault-200, hover:bg-solevault-800
              onClick={toggleMenu}
            >
              Marketplace
            </Link>
            <Link 
              to="/community" 
              className="block px-4 py-2 text-[#fafafa] hover:bg-[#1a1a1a] rounded-md" // Replaced text-solevault-200, hover:bg-solevault-800
              onClick={toggleMenu}
            >
              Community
            </Link>
            <Link 
              to="/analytics" 
              className="block px-4 py-2 text-[#fafafa] hover:bg-[#1a1a1a] rounded-md" // Replaced text-solevault-200, hover:bg-solevault-800
              onClick={toggleMenu}
            >
              Analytics
            </Link>
            <div className="pt-2 flex items-center justify-between border-t border-[#1a1a1a]"> {/* Replaced border-solevault-800 */}
              <div className="flex space-x-3 py-3">
                <button className="p-2 text-[#d4d4d4] hover:text-white transition-colors"> {/* Replaced text-solevault-300 */}
                  <Search size={20} />
                </button>
                <button className="p-2 text-[#d4d4d4] hover:text-white transition-colors"> {/* Replaced text-solevault-300 */}
                  <Bell size={20} />
                </button>
              </div>
              <CustomButton size="sm">
                <User size={16} className="mr-2" />
                Sign In
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;