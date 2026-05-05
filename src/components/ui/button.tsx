import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-ink-950 text-white hover:bg-ink-900 active:bg-ink-800",
        primary:
          "bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900",
        secondary:
          "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700",
        outline:
          "border border-ink-950 text-ink-950 bg-transparent hover:bg-ink-950 hover:text-white",
        ghost:
          "text-brand-700 hover:bg-brand-50 dark:text-cream-100 dark:hover:bg-brand-800",
        destructive: "bg-red-700 text-white hover:bg-red-800",
        link: "text-brand-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-sm rounded-sm",
        sm: "h-9 px-4 text-xs rounded-sm",
        lg: "h-13 px-8 text-sm tracking-wide rounded-sm",
        icon: "h-10 w-10 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
