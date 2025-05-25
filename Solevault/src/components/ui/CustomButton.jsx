import React from "react";
import { cn } from "@/lib/utils";

const CustomButton = ({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d4d4d4] disabled:pointer-events-none disabled:opacity-50";
  // Replaced focus-visible:ring-solevault-500 with focus-visible:ring-[#d4d4d4]

  const variantStyles = {
    default: "bg-[#121212] border border-[#262626] text-[#fafafa] hover:bg-[#1a1a1a]",
    // Replaced bg-solevault-900 with bg-[#121212]
    // Replaced border-solevault-700 with border-[#262626]
    // Replaced text-solevault-100 with text-[#fafafa]
    // Replaced hover:bg-solevault-800 with hover:bg-[#1a1a1a]
    outline: "border border-[#262626] bg-transparent hover:bg-[#121212]/10 text-[#999999]",
    // Replaced border-solevault-600 with border-[#262626]
    // Replaced hover:bg-solevault-900/10 with hover:bg-[#121212]/10
    // Replaced text-solevault-300 with text-[#999999]
    ghost: "bg-transparent hover:bg-[#121212]/10 text-[#999999] hover:text-[#fafafa]",
    // Replaced hover:bg-solevault-900/10 with hover:bg-[#121212]/10
    // Replaced text-solevault-300 with text-[#999999]
    // Replaced hover:text-solevault-100 with hover:text-[#fafafa]
    accent: "bg-[#212121] text-white hover:bg-[#212121]/90",
    // Replaced bg-solevault-accent with bg-[#212121]
    // Kept text-white
    // Replaced hover:bg-solevault-accent/90 with hover:bg-[#212121]/90
  };

  const sizeStyles = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;