import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[#121212] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4d4d4] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  // Replaced ring-offset-background with ring-offset-[#121212]
  // Replaced focus-visible:ring-ring with focus-visible:ring-[#d4d4d4]
  {
    variants: {
      variant: {
        default: "bg-[#171717] text-[#fafafa] hover:bg-[#171717]/90",
        // Replaced bg-primary text-primary-foreground hover:bg-primary/90
        destructive:
          "bg-[#ef4444] text-[#fafafa] hover:bg-[#ef4444]/90",
        // Replaced bg-destructive text-destructive-foreground hover:bg-destructive/90
        outline:
          "border border-[#262626] bg-[#121212] hover:bg-[#212121] hover:text-[#fafafa]",
        // Replaced border border-input bg-background hover:bg-accent hover:text-accent-foreground
        secondary:
          "bg-[#212121] text-[#fafafa] hover:bg-[#212121]/80",
        // Replaced bg-secondary text-secondary-foreground hover:bg-secondary/80
        ghost: "hover:bg-[#212121] hover:text-[#fafafa]",
        // Replaced hover:bg-accent hover:text-accent-foreground
        link: "text-[#171717] underline-offset-4 hover:underline",
        // Replaced text-primary
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };