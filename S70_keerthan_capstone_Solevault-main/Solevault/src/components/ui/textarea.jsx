import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-[#262626] bg-[#121212] px-3 py-2 text-sm ring-offset-[#121212] placeholder:text-[#999999] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4d4d4] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        // Replaced border-input with border-[#262626] (with existing 'border' class)
        // Replaced bg-background with bg-[#121212]
        // Replaced ring-offset-background with ring-offset-[#121212]
        // Replaced placeholder:text-muted-foreground with placeholder:text-[#999999]
        // Replaced focus-visible:ring-ring with focus-visible:ring-[#d4d4d4]
        className
      )}
      ref={ref}
      {...rest}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };