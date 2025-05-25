import React from "react";
import { Heart, Tag, TrendingUp, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const SneakerCard = ({
  name,
  brand,
  model,
  releaseDate,
  retailPrice,
  marketValue,
  changePercentage,
  image,
  className,
}) => {
  return (
    <div className={cn("bg-[#1a1a1a] overflow-hidden flex flex-col", className)}> {/* Replaced solevault-card */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover object-center"
        />
        <button className="absolute top-2 right-2 p-1.5 bg-[#121212]/70 rounded-full hover:bg-[#121212] transition-colors"> {/* Replaced bg-solevault-900 */}
          <Heart size={18} className="text-[#d4d4d4] hover:text-red-500 transition-colors" /> {/* Replaced text-solevault-300 */}
        </button>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <p className="text-xs uppercase tracking-wider text-[#999999]">{brand}</p> {/* Replaced text-solevault-400 */}
          <h3 className="font-medium text-[#fafafa]">{name}</h3> {/* Replaced text-solevault-100 */}
          <p className="text-sm text-[#999999]">{model}</p> {/* Replaced text-solevault-400 */}
        </div>
        
        <div className="mt-2 mb-3 pt-3 border-t border-[#262626]"> {/* Replaced border-solevault-700 */}
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center">
              <Tag size={14} className="mr-1.5 text-[#999999]" /> {/* Replaced text-solevault-400 */}
              <span className="text-xs text-[#999999]">Retail</span> {/* Replaced text-solevault-400 */}
            </div>
            <span className="text-sm font-medium text-[#fafafa]">${retailPrice}</span> {/* Added text-[#fafafa] for consistency if numbers should be bright, assuming default foreground */}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <TrendingUp size={14} className="mr-1.5 text-[#999999]" /> {/* Replaced text-solevault-400 */}
              <span className="text-xs text-[#999999]">Market</span> {/* Replaced text-solevault-400 */}
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-1.5 text-[#fafafa]">${marketValue}</span> {/* Added text-[#fafafa] for consistency */}
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded",
                changePercentage >= 0 
                  ? "bg-green-900/20 text-green-500" 
                  : "bg-red-900/20 text-red-500"
              )}>
                {changePercentage >= 0 ? '+' : ''}{changePercentage}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-auto flex justify-between">
          <span className="text-xs text-[#999999]">{releaseDate}</span> {/* Replaced text-solevault-500 */}
          <button className="flex items-center text-xs text-[#999999] hover:text-[#fafafa] transition-colors"> {/* Replaced text-solevault-400 and hover:text-solevault-200 */}
            <Eye size={14} className="mr-1" />
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SneakerCard;