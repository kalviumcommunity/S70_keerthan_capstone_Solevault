// src/components/ui/CustomButton.jsx
import React from "react";
import { Slot } from "@radix-ui/react-slot"; // Import Slot
import { cva } from "class-variance-authority"; // Import cva
import { cn } from "@/lib/utils";

// Define buttonVariants using cva for better organization and defaults
const buttonVariants = cva(
  // Base styles applied to all variants
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d4d4d4] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#121212] border border-[#262626] text-[#fafafa] hover:bg-[#1a1a1a]",
        outline: "border border-[#262626] bg-transparent hover:bg-[#121212]/10 text-[#999999] hover:text-[#fafafa]", // Added hover:text for outline
        ghost: "bg-transparent hover:bg-[#121212]/10 text-[#999999] hover:text-[#fafafa]",
        accent: "bg-[#212121] text-white hover:bg-[#212121]/80", // Removed hover:scale-105 for consistency, handle transforms separately if needed
        // You can add more variants here if needed
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2", // Your previous default size
        lg: "h-12 px-6 text-lg",
        icon: "h-10 w-10", // Common size for icon-only buttons
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md", // Explicitly set the default size
    },
  }
);

const CustomButton = React.forwardRef(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    // If asChild is true, use Slot, otherwise use a 'button'
    const Comp = asChild ? Slot : "button"; 
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props} // Spread remaining props (like onClick, type, aria-label, etc.)
      >
        {children}
      </Comp>
    );
  }
);
CustomButton.displayName = "CustomButton";

export default CustomButton;
// You can also export buttonVariants if other components need to use the styles:
// export { CustomButton, buttonVariants };