import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "flex h-11 w-full rounded-sm border border-input bg-surface px-4 pr-10 py-2 text-sm appearance-none cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-500 focus-visible:border-accent-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted pointer-events-none"
          strokeWidth={1.5}
        />
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
