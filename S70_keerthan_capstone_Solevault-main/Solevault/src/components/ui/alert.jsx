import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border border-[#262626] p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-[#fafafa]",
  // Replaced 'border' with 'border border-[#262626]'
  // Replaced '[&>svg]:text-foreground' with '[&>svg]:text-[#fafafa]'
  {
    variants: {
      variant: {
        default: "bg-[#121212] text-[#fafafa]", // Replaced 'bg-background text-foreground'
        destructive:
          "border-[#ef4444]/50 text-[#ef4444] dark:border-[#ef4444] [&>svg]:text-[#ef4444]",
        // Replaced 'border-destructive/50' with 'border-[#ef4444]/50'
        // Replaced 'text-destructive' with 'text-[#ef4444]'
        // Replaced 'dark:border-destructive' with 'dark:border-[#ef4444]'
        // Replaced '[&>svg]:text-destructive' with '[&>svg]:text-[#ef4444]'
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }