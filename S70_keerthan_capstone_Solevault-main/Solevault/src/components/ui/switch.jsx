import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4d4d4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#171717] data-[state=unchecked]:bg-[#262626]",
        // Replaced focus-visible:ring-ring with focus-visible:ring-[#d4d4d4]
        // Replaced focus-visible:ring-offset-background with focus-visible:ring-offset-[#121212]
        // Replaced data-[state=checked]:bg-primary with data-[state=checked]:bg-[#171717]
        // Replaced data-[state=unchecked]:bg-input with data-[state=unchecked]:bg-[#262626]
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-[#121212] shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
          // Replaced bg-background with bg-[#121212]
        )}
      />
    </SwitchPrimitives.Root>
  )
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };