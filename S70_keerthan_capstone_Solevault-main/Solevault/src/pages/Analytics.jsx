import React from "react";
import Navbar from "@/components/layout/Navbar"; // Assumed to be hex-coded
import Footer from "@/components/layout/Footer";   // Assumed to be hex-coded
import MarketAnalytics from "@/components/marketplace/MarketAnalytics"; // Assumed to be hex-coded

const Analytics = () => {
  return (
    <div className="min-h-screen bg-[#000000]"> {/* Replaced bg-black */}
      <Navbar />
      <main className="solevault-container py-8" role="main"> {/* Kept solevault-container */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold text-[#ffffff]">Analytics Dashboard</h1> {/* Replaced text-white */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MarketAnalytics />
            <div className="bg-[#1a1a1a] p-6"> {/* Replaced solevault-card */}
              <p className="text-[#fafafa]">More Analytics Coming Soon</p> {/* Replaced text-solevault-100 */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;