import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#262626] bg-[#121212] px-3 py-2 text-base ring-offset-[#121212] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#fafafa] placeholder:text-[#999999] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4d4d4] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          // Replaced border-input with border-[#262626] (with existing 'border' class)
          // Replaced bg-background with bg-[#121212]
          // Replaced ring-offset-background with ring-offset-[#121212]
          // Replaced file:text-foreground with file:text-[#fafafa]
          // Replaced placeholder:text-muted-foreground with placeholder:text-[#999999]
          // Replaced focus-visible:ring-ring with focus-visible:ring-[#d4d4d4]
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };