import React from "react";

const MarketAnalysis = () => {
  return (
    <div className="mt-20">
      <div className="p-12 bg-white rounded-3xl border shadow-lg border-slate-200">
        <div className="flex justify-between items-center mb-10 max-md:flex-col max-md:items-start max-md:gap-4">
          <div className="text-5xl font-bold text-slate-800">
            Market Analysis
          </div>
          <div className="flex gap-4 items-center max-sm:flex-wrap">
            <div className="px-6 py-3 text-lg rounded-xl border-2 border-slate-200 text-slate-500">
              24H
            </div>
            <div className="px-6 py-3 text-lg text-white bg-indigo-700 rounded-xl">
              7D
            </div>
            <div className="px-6 py-3 text-lg rounded-xl border-2 border-slate-200 text-slate-500">
              30D
            </div>
            <div className="px-6 py-3 text-lg rounded-xl border-2 border-slate-200 text-slate-500">
              ALL
            </div>
          </div>
        </div>
        <div className="rounded-2xl border bg-slate-100 border-slate-200 h-[400px]" />
      </div>
    </div>
  );
};

export default MarketAnalysis;
