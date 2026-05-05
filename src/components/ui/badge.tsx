import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "bg-brand-950 text-cream-100",
        accent: "bg-accent-500 text-white",
        outline: "border border-brand-300 text-brand-700 bg-transparent",
        success: "bg-emerald-700 text-white",
        warning: "bg-amber-600 text-white",
        danger: "bg-red-700 text-white",
        soft: "bg-accent-100 text-accent-800 border border-accent-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
