import React from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/auth/StatCard";
import TrendingSection from "../components/auth/TrendingSection";
import MarketAnalysis from "../components/auth/MarketAnalysis";
import Footer from "../components/auth/Footer";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.30.0/tabler-icons.min.css"
        rel="stylesheet"
      />
      <div className="flex flex-col bg-slate-50 min-h-screen">

        <div className="px-6 py-12 mx-auto max-w-[1272px] max-sm:px-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-12 max-md:grid-cols-2 max-sm:grid-cols-1">
            <StatCard title="Global Market Value" value="$23.7B" />
            <StatCard title="24h Trading Volume" value="$847.2M" />
            <StatCard
              title="Avg. Resale Premium"
              value="+31.2%"
              valueColor="success"
            />
          </div>

          {/* Trending Section */}
          <TrendingSection />

          {/* Market Analysis */}
          <MarketAnalysis />

          {/* Bottom Stats */}
          <div className="mt-20">
            <div className="grid grid-cols-3 gap-12 max-md:grid-cols-2 max-sm:grid-cols-1">
              <StatCard
                title="Most Traded"
                value="Nike Dunk Low"
                subtext="12.4K trades"
              />
              <StatCard
                title="Highest Premium"
                value="Trophy Room x AJ1"
                subtext="+892%"
                valueColor="success"
              />
              <StatCard
                title="Market Movers"
                value="Yeezy 350"
                subtext="-24%"
                valueColor="danger"
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;