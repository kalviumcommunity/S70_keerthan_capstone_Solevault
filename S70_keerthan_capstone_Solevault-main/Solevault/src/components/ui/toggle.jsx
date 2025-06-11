import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-[#121212] transition-colors hover:bg-[#262626] hover:text-[#999999] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4d4d4] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[#212121] data-[state=on]:text-[#fafafa]",
  // Replaced ring-offset-background with ring-offset-[#121212]
  // Replaced hover:bg-muted with hover:bg-[#262626]
  // Replaced hover:text-muted-foreground with hover:text-[#999999]
  // Replaced focus-visible:ring-ring with focus-visible:ring-[#d4d4d4]
  // Replaced data-[state=on]:bg-accent with data-[state=on]:bg-[#212121]
  // Replaced data-[state=on]:text-accent-foreground with data-[state=on]:text-[#fafafa]
  {
    variants: {
      variant: {
        default: "bg-transparent", // No theme color variables to replace here
        outline:
          "border border-[#262626] bg-transparent hover:bg-[#212121] hover:text-[#fafafa]",
        // Replaced border-input with border-[#262626] (with existing 'border' class)
        // Replaced hover:bg-accent with hover:bg-[#212121]
        // Replaced hover:text-accent-foreground with hover:text-[#fafafa]
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Toggle = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };