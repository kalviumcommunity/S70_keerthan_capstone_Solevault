import React from "react";

const TrendingSection = () => {
  return (
    <div className="mt-20">
      <div className="flex justify-between items-center mb-8">
        <div className="text-3xl font-bold text-slate-800">Trending Now</div>
        <div className="px-8 py-4 text-2xl text-white bg-indigo-700 rounded-xl shadow-sm">
          View All
        </div>
      </div>
      <div className="grid grid-cols-3 gap-12 max-md:grid-cols-2 max-sm:grid-cols-1">
        <div className="overflow-hidden rounded-3xl h-[380px]">
          <img
            src="https://placehold.co/360x380/1e293b/1e293b"
            alt="Trending sneaker"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-3xl h-[380px]">
          <img
            src="https://placehold.co/360x380/1e293b/1e293b"
            alt="Trending sneaker"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-3xl h-[380px]">
          <img
            src="https://placehold.co/360x380/1e293b/1e293b"
            alt="Trending sneaker"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;
