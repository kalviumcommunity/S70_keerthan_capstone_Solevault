import React from 'react'; // Standard React import
import { forwardRef } from 'react'; // Standard React import
import cn from 'classnames'; // Using 'classnames' directly

const SidebarMenuButton = forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => { // showOnHover is defined but not used in this simplified version's className
  const Comp = asChild ? 'slot' : 'button';

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action" // Keeping this data attribute, though its purpose might be from a more complex version
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-[#fafafa] outline-none",
        // Replaced text-sidebar-foreground with text-[#fafafa]
        className
      )}
      {...props} // Added spread props to Comp
    >
      {/* Additional content can go here, props.children would render it if passed */}
      {props.children} 
    </Comp>
  );
});

SidebarMenuButton.displayName = "SidebarMenuButton";

export default SidebarMenuButton;