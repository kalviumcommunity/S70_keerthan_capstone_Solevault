import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tag, TrendingUp, Calendar, DollarSign, X } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have this utility for class names

const SneakerDetailsModal = ({ sneaker, open, onOpenChange }) => {
  if (!sneaker) return null;

  // Calculate profit/loss details safely
  const retailPrice = sneaker.retailPrice ?? 0;
  const marketValue = sneaker.marketValue ?? 0;
  const profitLoss = marketValue - retailPrice;
  const roi = retailPrice > 0 ? (profitLoss / retailPrice) * 100 : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1c1c1c] border-[#404040] text-white max-w-3xl p-0">
        {/* Close Button */}
        <button 
          onClick={() => onOpenChange(false)} 
          className="absolute top-3 right-3 p-1.5 bg-black/50 hover:bg-black/80 rounded-full transition-colors z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* --- Image Section --- */}
          <div className="w-full h-64 md:h-auto">
            <img 
              src={sneaker.image} 
              alt={sneaker.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* --- Details Section --- */}
          <div className="p-8 flex flex-col space-y-6">
            <DialogHeader className="text-left space-y-1">
              <p className="text-sm uppercase tracking-widest text-blue-400 font-semibold">{sneaker.brand}</p>
              <DialogTitle className="text-white text-3xl font-bold">{sneaker.name}</DialogTitle>
              <DialogDescription className="text-lg text-neutral-400 !mt-1">{sneaker.model}</DialogDescription>
            </DialogHeader>

            {/* --- Description Section --- */}
            {sneaker.description && (
              <div className="border-t border-b border-neutral-700 py-4">
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {sneaker.description}
                </p>
              </div>
            )}
            
            {/* --- Stats Section --- */}
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-neutral-400"><Tag size={16} className="mr-3 text-neutral-500" /><span>Retail Price</span></div>
                <span className="font-medium text-neutral-100">${retailPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-neutral-400"><TrendingUp size={16} className="mr-3 text-neutral-500" /><span>Market Value</span></div>
                <span className="font-medium text-neutral-100">${marketValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-neutral-400"><DollarSign size={16} className="mr-3 text-neutral-500" /><span>Profit / Loss</span></div>
                <div className="flex items-center space-x-2">
                    <span className={cn("font-bold", profitLoss >= 0 ? 'text-green-400' : 'text-red-400')}>
                        {profitLoss >= 0 ? '+' : '-'}${Math.abs(profitLoss).toFixed(2)}
                    </span>
                    <span className={cn(
                        "text-xs font-semibold px-2 py-0.5 rounded-full",
                        roi >= 0 ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                    )}>
                        {roi.toFixed(1)}%
                    </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-neutral-400"><Calendar size={16} className="mr-3 text-neutral-500" /><span>Purchase Date</span></div>
                <span className="font-medium text-neutral-100">{sneaker.purchaseDate ? new Date(sneaker.purchaseDate).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SneakerDetailsModal;