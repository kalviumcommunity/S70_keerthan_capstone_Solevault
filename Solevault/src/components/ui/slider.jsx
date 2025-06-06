import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef(
  ({ className, value, ...props }, ref) => ( // Added value to destructuring as it's used in style
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-[#212121]">
        {/* Replaced bg-secondary */}
        <SliderPrimitive.Range className="absolute h-full bg-[#171717]" />
        {/* Replaced bg-primary */}
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-[#171717] bg-[#121212] ring-offset-[#121212] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4d4d4] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      {/*
        Replaced border-primary with border-[#171717]
        Replaced bg-background with bg-[#121212]
        Replaced ring-offset-background with ring-offset-[#121212]
        Replaced focus-visible:ring-ring with focus-visible:ring-[#d4d4d4]
      */}
    </SliderPrimitive.Root>
  )
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };