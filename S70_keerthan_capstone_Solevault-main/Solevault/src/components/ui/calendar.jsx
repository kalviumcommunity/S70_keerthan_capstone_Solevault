import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
// We assume buttonVariants itself is not being modified here, but its output is what we use for replacement logic.
// For the purpose of this exercise, we'll directly inline the effective classes with hex codes.

// Hex-converted equivalent of buttonVariants({ variant: "outline" })
const outlineButtonHex = "border border-[#262626] bg-[#121212] hover:bg-[#212121] hover:text-[#fafafa]";
// Hex-converted equivalent of buttonVariants({ variant: "ghost" })
const ghostButtonHex = "hover:bg-[#212121] hover:text-[#fafafa]";


function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium", // No theme color
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          outlineButtonHex, // Using pre-converted hex string for buttonVariants({ variant: "outline" })
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100" // bg-transparent overrides bg from outlineButtonHex
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-[#999999] rounded-md w-9 font-normal text-[0.8rem]", // Replaced text-muted-foreground
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-[#212121]/50 [&:has([aria-selected])]:bg-[#212121] first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        // Replaced bg-accent/50 with bg-[#212121]/50
        // Replaced bg-accent with bg-[#212121]
        day: cn(
          ghostButtonHex, // Using pre-converted hex string for buttonVariants({ variant: "ghost" })
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-[#171717] text-[#fafafa] hover:bg-[#171717] hover:text-[#fafafa] focus:bg-[#171717] focus:text-[#fafafa]",
        // Replaced bg-primary, text-primary-foreground and their hover/focus states
        day_today: "bg-[#212121] text-[#fafafa]", // Replaced bg-accent, text-accent-foreground
        day_outside:
          "day-outside text-[#999999] opacity-50 aria-selected:bg-[#212121]/50 aria-selected:text-[#999999] aria-selected:opacity-30",
        // Replaced text-muted-foreground, aria-selected:bg-accent/50, aria-selected:text-muted-foreground
        day_disabled: "text-[#999999] opacity-50", // Replaced text-muted-foreground
        day_range_middle:
          "aria-selected:bg-[#212121] aria-selected:text-[#fafafa]",
        // Replaced aria-selected:bg-accent, aria-selected:text-accent-foreground
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };