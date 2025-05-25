import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef((props, ref) => {
  const { className, ...rest } = props; // Destructure className and rest of props
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-[#262626] p-1 text-[#999999]",
        // Replaced bg-muted with bg-[#262626]
        // Replaced text-muted-foreground with text-[#999999]
        className
      )}
      {...rest} // Spread the rest of the props
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef((props, ref) => {
  const { className, ...rest } = props; // Destructure className and rest of props
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-[#121212] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4d4d4] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#121212] data-[state=active]:text-[#fafafa] data-[state=active]:shadow-sm",
        // Replaced ring-offset-background with ring-offset-[#121212]
        // Replaced focus-visible:ring-ring with focus-visible:ring-[#d4d4d4]
        // Replaced data-[state=active]:bg-background with data-[state=active]:bg-[#121212]
        // Replaced data-[state=active]:text-foreground with data-[state=active]:text-[#fafafa]
        className
      )}
      {...rest} // Spread the rest of the props
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef((props, ref) => { // Corrected props destructuring
  const { className, ...rest } = props;
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-2 ring-offset-[#121212] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4d4d4] focus-visible:ring-offset-2",
        // Assuming the standard shadcn/ui classes for TabsContent:
        // Replaced ring-offset-background with ring-offset-[#121212]
        // Replaced focus-visible:ring-ring with focus-visible:ring-[#d4d4d4]
        className
      )}
      {...rest} // Spread the rest of the props
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName; // Added display name

export { Tabs, TabsList, TabsTrigger, TabsContent };