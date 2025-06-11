import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-[#262626] px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#d4d4d4] focus:ring-offset-2",
  // Replaced 'border' with 'border border-[#262626]'
  // Replaced 'focus:ring-ring' with 'focus:ring-[#d4d4d4]'
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#171717] text-[#fafafa] hover:bg-[#171717]/80",
        // Replaced 'bg-primary text-primary-foreground hover:bg-primary/80'
        secondary:
          "border-transparent bg-[#212121] text-[#fafafa] hover:bg-[#212121]/80",
        // Replaced 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        destructive:
          "border-transparent bg-[#ef4444] text-[#fafafa] hover:bg-[#ef4444]/80",
        // Replaced 'bg-destructive text-destructive-foreground hover:bg-destructive/80'
        outline: "text-[#fafafa]", // Replaced 'text-foreground'
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }