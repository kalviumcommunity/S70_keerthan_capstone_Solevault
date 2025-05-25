import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )}
      {...rest}
    />
  );
});
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-[#262626] p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  // Replaced base 'border' with 'border border-[#262626]'
  {
    variants: {
      variant: {
        default: "bg-[#121212] text-[#fafafa]",
        // Replaced 'bg-background text-foreground', 'border' (now in base)
        destructive:
          "destructive group border-[#ef4444] bg-[#ef4444] text-[#fafafa]",
        // Replaced 'border-destructive', 'bg-destructive', 'text-destructive-foreground'
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Toast = React.forwardRef((props, ref) => {
  const { className, variant, ...rest } = props;
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...rest}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <ToastPrimitives.Action
      ref={ref}
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-[#262626] bg-transparent px-3 text-sm font-medium ring-offset-[#121212] transition-colors hover:bg-[#212121] focus:outline-none focus:ring-2 focus:ring-[#d4d4d4] focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-[#262626]/40 group-[.destructive]:hover:border-[#ef4444]/30 group-[.destructive]:hover:bg-[#ef4444] group-[.destructive]:hover:text-[#fafafa] group-[.destructive]:focus:ring-[#ef4444]",
        // Replaced 'border' with 'border border-[#262626]'
        // Replaced ring-offset-background with ring-offset-[#121212]
        // Replaced hover:bg-secondary with hover:bg-[#212121]
        // Replaced focus:ring-ring with focus:ring-[#d4d4d4]
        // Replaced group-[.destructive]:border-muted/40 with group-[.destructive]:border-[#262626]/40
        // Replaced group-[.destructive]:hover:border-destructive/30 with group-[.destructive]:hover:border-[#ef4444]/30
        // Replaced group-[.destructive]:hover:bg-destructive with group-[.destructive]:hover:bg-[#ef4444]
        // Replaced group-[.destructive]:hover:text-destructive-foreground with group-[.destructive]:hover:text-[#fafafa]
        // Replaced group-[.destructive]:focus:ring-destructive with group-[.destructive]:focus:ring-[#ef4444]
        className
      )}
      {...rest}
    />
  );
});
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <ToastPrimitives.Close
      ref={ref}
      className={cn(
        "absolute right-2 top-2 rounded-md p-1 text-[#fafafa]/50 opacity-0 transition-opacity hover:text-[#fafafa] focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
        // Replaced text-foreground/50 with text-[#fafafa]/50
        // Replaced hover:text-foreground with hover:text-[#fafafa]
        className
      )}
      toast-close=""
      {...rest}
    >
      <X className="h-4 w-4" />
    </ToastPrimitives.Close>
  );
});
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <ToastPrimitives.Title
      ref={ref}
      className={cn("text-sm font-semibold", className)} // No explicit theme color class to replace
      {...rest}
    />
  );
});
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <ToastPrimitives.Description
      ref={ref}
      className={cn("text-sm opacity-90", className)} // No explicit theme color class to replace
      {...rest}
    />
  );
});
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};