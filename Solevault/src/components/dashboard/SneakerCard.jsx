import React from "react";
import { Heart, Tag, TrendingUp, Eye, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SneakerCard = ({
  id,
  name,
  brand,
  model,
  description, // <-- 1. RECEIVE a 'description' prop
  releaseDate,
  retailPrice,
  marketValue,
  changePercentage,
  image,
  className,
  onEdit,
  onDelete,
  onViewDetails
}) => {

  const handleEditClick = () => {
    if (typeof onEdit === 'function') onEdit(id);
  };

  const handleDeleteClick = () => {
    if (typeof onDelete === 'function') onDelete(id);
  };

  return (
    <div className={cn("bg-[#262626] border border-[#404040] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group", className)}>
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover object-center" />
        <button type="button" aria-label="Favorite" className="absolute top-3 right-3 p-1.5 bg-[#171717]/60 hover:bg-[#171717]/90 rounded-full transition-colors">
          <Heart size={18} className="text-[#d4d4d4] hover:text-red-500 transition-colors" />
        </button>
        <div className="absolute top-3 left-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {onEdit && (<button type="button" onClick={handleEditClick} aria-label="Edit sneaker" className="p-1.5 bg-[#171717]/60 hover:bg-[#171717]/90 rounded-full transition-colors"><Edit size={16} className="text-[#d4d4d4] hover:text-blue-400 transition-colors" /></button>)}
          {onDelete && (<button type="button" onClick={handleDeleteClick} aria-label="Delete sneaker" className="p-1.5 bg-[#171717]/60 hover:bg-[#171717]/90 rounded-full transition-colors"><Trash2 size={16} className="text-[#d4d4d4] hover:text-red-400 transition-colors" /></button>)}
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <p className="text-xs uppercase tracking-wider text-[#a3a3a3] font-medium">{brand}</p>
          <h3 className="font-semibold text-lg text-[#f5f5f5] truncate" title={name}>{name}</h3>
          <p className="text-sm text-[#b3b3b3] truncate" title={model}>{model}</p>
          
          {/* --- 2. ADD THIS PARAGRAPH TO DISPLAY THE DESCRIPTION --- */}
          {description && (
            <p className="text-xs text-[#a3a3a3] mt-2 line-clamp-2" title={description}>
              {description}
            </p>
          )}

        </div>
        <div className="my-3 pt-3 border-t border-[#404040] space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-xs text-[#a3a3a3]"><Tag size={14} className="mr-1.5" /><span>Retail Price</span></div>
            <span className="text-sm font-medium text-[#f0f0f0]">${retailPrice != null ? retailPrice.toFixed(2) : 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-xs text-[#a3a3a3]"><TrendingUp size={14} className="mr-1.5" /><span>Market Value</span></div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-[#f0f0f0] mr-1.5">${marketValue != null ? marketValue.toFixed(2) : 'N/A'}</span>
              {typeof changePercentage === 'number' && (<span className={cn("text-xs font-semibold px-1.5 py-0.5 rounded-full", changePercentage >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>{changePercentage >= 0 ? '▲' : '▼'} {Math.abs(changePercentage).toFixed(1)}%</span>)}
            </div>
          </div>
        </div>
        <div className="mt-auto pt-2 flex justify-between items-center text-xs">
          <span className="text-[#737373]">{releaseDate ? new Date(releaseDate).toLocaleDateString() : "Unknown release"}</span>
         <button 
        type="button" 
        onClick={() => onViewDetails(id)} // 2. Add the onClick handler
        className="flex items-center text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors font-medium"
    >
        <Eye size={14} className="mr-1" />
        Details
    </button>
        </div>
      </div>
    </div>
  );
};

export default SneakerCard;