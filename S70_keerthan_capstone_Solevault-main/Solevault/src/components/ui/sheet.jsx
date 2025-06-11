import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import React from "react"; // Added missing import for React

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-[#121212] p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  // Replaced bg-background with bg-[#121212]
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b border-[#262626] data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        // Added border-[#262626] to border-b
        bottom: "inset-x-0 bottom-0 border-t border-[#262626] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        // Added border-[#262626] to border-t
        left: "inset-y-0 left-0 h-full w-3/4 border-r border-[#262626] data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        // Added border-[#262626] to border-r
        right: "inset-y-0 right-0 h-full w-3/4 border-l border-[#262626] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
        // Added border-[#262626] to border-l
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[#121212] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#d4d4d4] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[#212121]">
        {/* Replaced ring-offset-background with ring-offset-[#121212] */}
        {/* Replaced focus:ring-ring with focus:ring-[#d4d4d4] */}
        {/* Replaced data-[state=open]:bg-secondary with data-[state=open]:bg-[#212121] */}
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-[#fafafa]", className)} // Replaced text-foreground
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-[#999999]", className)} // Replaced text-muted-foreground
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};