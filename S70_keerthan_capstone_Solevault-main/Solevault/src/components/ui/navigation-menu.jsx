import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn(
        "relative z-10 flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  )
);
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn(
        "group flex flex-1 list-none items-center justify-center space-x-1",
        className
      )}
      {...props}
    />
  )
);
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-[#121212] px-4 py-2 text-sm font-medium transition-colors hover:bg-[#212121] hover:text-[#fafafa] focus:bg-[#212121] focus:text-[#fafafa] focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[#212121]/50 data-[state=open]:bg-[#212121]/50"
  // Replaced bg-background with bg-[#121212]
  // Replaced hover:bg-accent with hover:bg-[#212121]
  // Replaced hover:text-accent-foreground with hover:text-[#fafafa]
  // Replaced focus:bg-accent with focus:bg-[#212121]
  // Replaced focus:text-accent-foreground with focus:text-[#fafafa]
  // Replaced data-[active]:bg-accent/50 with data-[active]:bg-[#212121]/50
  // Replaced data-[state=open]:bg-accent/50 with data-[state=open]:bg-[#212121]/50
);

const NavigationMenuTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDown
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
);
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(
        "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
        className
      )}
      {...props}
    />
  )
);
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div className={cn("absolute left-0 top-full flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        className={cn(
          "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-[#262626] bg-[#1a1a1a] text-[#fafafa] shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
          // Replaced 'border' with 'border border-[#262626]'
          // Replaced 'bg-popover' with 'bg-[#1a1a1a]'
          // Replaced 'text-popover-foreground' with 'text-[#fafafa]'
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
);
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-[#262626] shadow-md" />
      {/* Replaced bg-border with bg-[#262626] */}
    </NavigationMenuPrimitive.Indicator>
  )
);
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};