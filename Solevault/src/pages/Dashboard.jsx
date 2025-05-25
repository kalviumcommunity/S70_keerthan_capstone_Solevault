import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar"; // Assumed to be hex-coded
import Footer from "@/components/layout/Footer";   // Assumed to be hex-coded
import CollectionGrid from "@/components/dashboard/CollectionGrid"; // Assumed to be hex-coded
import MarketAnalytics from "@/components/marketplace/MarketAnalytics"; // Assumed to be hex-coded
import CommunityFeed from "@/components/community/CommunityFeed"; // Assumed to be hex-coded
import CustomButton from "@/components/ui/CustomButton"; // Assumed to be hex-coded internally for variants
import { Plus, Filter, BarChart2, GridIcon } from "lucide-react";

const Dashboard = () => {
  const [view, setView] = useState("grid");

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col"> {/* Replaced bg-black */}
      <Navbar />

      <main className="flex-grow py-6" role="main" aria-label="Dashboard">
        <div className="solevault-container"> {/* Kept solevault-container */}
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#fafafa] mb-2">Your Collection</h1> {/* Replaced text-solevault-100 */}
            <p className="text-[#999999]">Manage and track your sneaker inventory</p> {/* Replaced text-solevault-400 */}
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#1a1a1a] p-4"> {/* Replaced solevault-card */}
              <p className="text-[#999999] text-sm mb-1">Collection Size</p> {/* Replaced text-solevault-400 */}
              <p className="text-2xl font-bold text-[#fafafa]">24 Pairs</p> {/* Replaced text-solevault-100 */}
            </div>
            <div className="bg-[#1a1a1a] p-4"> {/* Replaced solevault-card */}
              <p className="text-[#999999] text-sm mb-1">Total Retail Value</p> {/* Replaced text-solevault-400 */}
              <p className="text-2xl font-bold text-[#fafafa]">$4,250</p> {/* Replaced text-solevault-100 */}
            </div>
            <div className="bg-[#1a1a1a] p-4"> {/* Replaced solevault-card */}
              <p className="text-[#999999] text-sm mb-1">Market Value</p> {/* Replaced text-solevault-400 */}
              <p className="text-2xl font-bold text-[#fafafa]">$5,690</p> {/* Replaced text-solevault-100 */}
            </div>
            <div className="bg-[#1a1a1a] p-4"> {/* Replaced solevault-card */}
              <p className="text-[#999999] text-sm mb-1">Overall ROI</p> {/* Replaced text-solevault-400 */}
              <p className="text-2xl font-bold text-[#22c55e]">+33.9%</p> {/* Replaced text-green-500 */}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Collection Section */}
            <section className="w-full lg:w-2/3" aria-labelledby="recent-sneakers-title">
              <div className="flex justify-between items-center mb-5">
                <h2 id="recent-sneakers-title" className="text-xl font-semibold text-[#fafafa]"> {/* Replaced text-solevault-100 */}
                  Recent Sneakers
                </h2>
                <div className="flex items-center space-x-2">
                  <CustomButton size="sm" variant="outline" className="flex items-center">
                    <Filter size={16} className="mr-1" /> Filter
                  </CustomButton>
                  <CustomButton size="sm" className="flex items-center">
                    <Plus size={16} className="mr-1" /> Add Pair
                  </CustomButton>
                  <div className="hidden sm:flex bg-[#1a1a1a] rounded-md overflow-hidden" role="group" aria-label="Toggle view mode"> {/* Replaced bg-solevault-800 */}
                    <button
                      aria-pressed={view === "grid"}
                      onClick={() => setView("grid")}
                      className={`p-2 ${view === "grid" ? "bg-[#262626] text-[#fafafa]" : "text-[#999999]"}`} // Replaced solevault classes
                    >
                      <GridIcon size={18} />
                    </button>
                    <button
                      aria-pressed={view === "chart"}
                      onClick={() => setView("chart")}
                      className={`p-2 ${view === "chart" ? "bg-[#262626] text-[#fafafa]" : "text-[#999999]"}`} // Replaced solevault classes
                    >
                      <BarChart2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <CollectionGrid className="mb-8" view={view} />

              <div className="text-center">
                <CustomButton variant="ghost">Load More</CustomButton>
              </div>
            </section>

            {/* Sidebar Content */}
            <aside className="w-full lg:w-1/3 space-y-8" aria-labelledby="sidebar-content-title">
              <MarketAnalytics />

              <div className="bg-[#1a1a1a] p-5" aria-labelledby="community-highlights-title"> {/* Replaced solevault-card */}
                <h3 id="community-highlights-title" className="text-lg font-semibold text-[#fafafa] mb-4"> {/* Replaced text-solevault-100 */}
                  Community Highlights
                </h3>
                <CommunityFeed />

                <div className="mt-4 text-center">
                  <CustomButton variant="ghost" size="sm">
                    View Community
                  </CustomButton>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;