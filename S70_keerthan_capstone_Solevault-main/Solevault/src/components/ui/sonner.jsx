import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner"; // Assuming 'toast' export is intentional

const Toaster = (props) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme} // Sonner's theme prop might interact with these classNames or be overridden by them
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#121212] group-[.toaster]:text-[#fafafa] group-[.toaster]:border group-[.toaster]:border-[#262626] group-[.toaster]:shadow-lg",
          // Replaced bg-background, text-foreground
          // Replaced border-border with border border-[#262626] to ensure a border is applied with the color
          description: "group-[.toast]:text-[#999999]",
          // Replaced text-muted-foreground
          actionButton:
            "group-[.toast]:bg-[#171717] group-[.toast]:text-[#fafafa]",
          // Replaced bg-primary, text-primary-foreground
          cancelButton:
            "group-[.toast]:bg-[#262626] group-[.toast]:text-[#999999]",
          // Replaced bg-muted, text-muted-foreground
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };