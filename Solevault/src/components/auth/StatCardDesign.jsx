import React from "react";
import StatCard from "./StatCard";

const StatCardDemo = () => {
  return (
    <div className="flex flex-col bg-slate-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">StatCard Component Examples</h1>

      <h2 className="text-2xl font-bold mb-4">Market Overview Cards</h2>
      <div className="grid grid-cols-3 gap-12 max-md:grid-cols-2 max-sm:grid-cols-1 mb-12">
        <StatCard title="Global Market Value" value="$23.7B" />
        <StatCard title="24h Trading Volume" value="$847.2M" />
        <StatCard
          title="Avg. Resale Premium"
          value="+31.2%"
          valueColor="success"
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">Market Insights Cards</h2>
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
  );
};

export default StatCardDemo;
