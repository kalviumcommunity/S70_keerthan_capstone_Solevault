import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

// Mock data for the market analytics
const marketData = [
  { month: "Jan", value: 200 },
  { month: "Feb", value: 230 },
  { month: "Mar", value: 220 },
  { month: "Apr", value: 250 },
  { month: "May", value: 300 },
  { month: "Jun", value: 280 },
  { month: "Jul", value: 310 },
  { month: "Aug", value: 350 },
  { month: "Sep", value: 340 },
  { month: "Oct", value: 390 },
  { month: "Nov", value: 400 },
  { month: "Dec", value: 450 },
];

const MarketAnalytics = () => {
  return (
    <div className="bg-[#1a1a1a] p-5 h-full"> {/* Replaced solevault-card */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-[#fafafa] flex items-center"> {/* Replaced text-solevault-100 */}
            <TrendingUp size={18} className="mr-2" /> Market Value Trend
          </h3>
          <p className="text-sm text-[#999999]">Your collection's market performance</p> {/* Replaced text-solevault-400 */}
        </div>
        <div className="bg-[#121212]/50 rounded-full px-3 py-1 text-sm"> {/* Replaced bg-solevault-900/50 */}
          <span className="text-green-500 font-medium">+12.5%</span>
          <span className="text-[#999999] text-xs ml-1">YTD</span> {/* Replaced text-solevault-400 */}
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={marketData}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff4d00" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ff4d00" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={{ stroke: '#404040' }}
              tick={{ fill: '#737373', fontSize: 12 }}
            />
            <YAxis 
              axisLine={{ stroke: '#404040' }}
              tick={{ fill: '#737373', fontSize: 12 }}
              tickFormatter={(tick) => `$${tick}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#171717',
                borderColor: '#404040',
                color: '#e5e5e5',
                borderRadius: '0.375rem'
              }}
              labelStyle={{ color: '#e5e5e5' }}
              formatter={(value) => [`$${value}`, 'Value']}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#ff4d00" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        <div className="bg-[#121212]/50 p-3 rounded-md"> {/* Replaced bg-solevault-900/50 */}
          <p className="text-[#999999] text-xs mb-1">Initial Investment</p> {/* Replaced text-solevault-400 */}
          <p className="text-[#fafafa] font-semibold">$4,250</p> {/* Replaced text-solevault-100 */}
        </div>
        <div className="bg-[#121212]/50 p-3 rounded-md"> {/* Replaced bg-solevault-900/50 */}
          <p className="text-[#999999] text-xs mb-1">Current Value</p> {/* Replaced text-solevault-400 */}
          <p className="text-[#fafafa] font-semibold">$5,690</p> {/* Replaced text-solevault-100 */}
        </div>
        <div className="bg-green-900/20 p-3 rounded-md">
          <p className="text-[#999999] text-xs mb-1">Profit</p> {/* Replaced text-solevault-400 */}
          <p className="text-green-500 font-semibold">$1,440</p>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalytics;