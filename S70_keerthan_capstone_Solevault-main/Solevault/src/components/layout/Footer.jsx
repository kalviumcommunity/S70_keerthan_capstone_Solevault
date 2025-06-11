import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#121212] border-t border-[#1a1a1a] pt-12 pb-8"> {/* Replaced bg-solevault-900, border-solevault-800 */}
      <div className="solevault-container"> {/* Kept solevault-container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold solevault-gradient-text mb-4">SoleVault</h3> {/* Kept solevault-gradient-text */}
            <p className="text-[#999999] mb-4"> {/* Replaced text-solevault-400 */}
              The ultimate platform for sneaker collectors, investors, and enthusiasts.
            </p>
          </div>
          
          <div>
            <h4 className="text-[#fafafa] font-medium mb-4">Platform</h4> {/* Replaced text-solevault-100 */}
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-[#999999] hover:text-[#fafafa]"> {/* Replaced text-solevault-400, hover:text-solevault-100 */}
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-[#999999] hover:text-[#fafafa]"> {/* Replaced text-solevault-400, hover:text-solevault-100 */}
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-[#999999] hover:text-[#fafafa]"> {/* Replaced text-solevault-400, hover:text-solevault-100 */}
                  Community
                </Link>
              </li>
              <li>
                <Link to="/authentication" className="text-[#999999] hover:text-[#fafafa]"> {/* Replaced text-solevault-400, hover:text-solevault-100 */}
                  Authentication
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#fafafa] font-medium mb-4">Company</h4> {/* Replaced text-solevault-100 */}
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-[#999999] hover:text-[#fafafa]"> {/* Replaced text-solevault-400, hover:text-solevault-100 */}
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#999999] hover:text-[#fafafa]"> {/* Replaced text-solevault-400, hover:text-solevault-100 */}
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-[#999999] hover:text-[#fafafa]"> {/* Replaced text-solevault-400, hover:text-solevault-100 */}
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-[#999999] hover:text-[#fafafa]"> {/* Replaced text-solevault-400, hover:text-solevault-100 */}
                  Press
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#fafafa] font-medium mb-4">Legal</h4> {/* Replaced text-solevault-100 */}
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-[#999999] hover:text-[#fafafa]"> {/* Replaced text-solevault-400, hover:text-solevault-100 */}
                  Terms of Service
                </Link>
              </li>
              <li>
               <Link to="/privacy-policy" className="text-neutral-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>          
              <li>
                
                <Link to="/cookie-policy" className="text-[#999999] hover:text-[#fafafa]"> {/* **Replaced text-solevault-400, hover:text-solevault-100 */}
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#1a1a1a] pt-6 flex flex-col md:flex-row justify-between items-center"> {/* Replaced border-solevault-800 */}
          <p className="text-[#999999] text-sm mb-4 md:mb-0"> {/* Replaced text-solevault-500 */}
            © {new Date().getFullYear()} SoleVault. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="#" className="text-[#999999] hover:text-[#d4d4d4]"> {/* Replaced text-solevault-500, hover:text-solevault-300 */}
              Twitter
            </Link>
            <Link to="#" className="text-[#999999] hover:text-[#d4d4d4]"> {/* Replaced text-solevault-500, hover:text-solevault-300 */}
              Instagram
            </Link>
            <Link to="#" className="text-[#999999] hover:text-[#d4d4d4]"> {/* Replaced text-solevault-500, hover:text-solevault-300 */}
              Discord
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;