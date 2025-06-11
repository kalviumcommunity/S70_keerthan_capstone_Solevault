import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-[#171717] ring-offset-[#121212] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4d4d4] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#171717] data-[state=checked]:text-[#fafafa]",
      // Replaced border-primary with border-[#171717] (assuming 'border' class handles width/style)
      // Replaced ring-offset-background with ring-offset-[#121212]
      // Replaced focus-visible:ring-ring with focus-visible:ring-[#d4d4d4]
      // Replaced data-[state=checked]:bg-primary with data-[state=checked]:bg-[#171717]
      // Replaced data-[state=checked]:text-primary-foreground with data-[state=checked]:text-[#fafafa]
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };