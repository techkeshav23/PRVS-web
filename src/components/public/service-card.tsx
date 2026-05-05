import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DynamicIcon } from "@/components/dynamic-icon";
import { formatINR } from "@/lib/utils";

type Props = {
  title: string;
  slug: string;
  shortDescription: string;
  icon: string;
  price?: number;
  startingFrom?: boolean;
  index?: number;
};

export function ServiceCard({
  title,
  slug,
  shortDescription,
  icon,
  price,
  startingFrom,
  index,
}: Props) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group relative bg-card border border-border hover:border-brand-950 transition-colors p-6 sm:p-7 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-11 h-11 border border-border group-hover:border-accent-500 group-hover:bg-accent-500 group-hover:text-white flex items-center justify-center text-brand-950 transition-colors">
          <DynamicIcon name={icon} className="w-5 h-5" />
        </div>
        {typeof index === "number" && (
          <span className="text-[10px] uppercase tracking-widest text-foreground-muted tabular">
            {String(index + 1).padStart(2, "0")} / Service
          </span>
        )}
      </div>

      <h3 className="font-display text-xl text-brand-950 leading-tight mb-3 line-clamp-2 min-h-[3rem]">
        {title}
      </h3>
      <p className="text-sm text-foreground-muted leading-relaxed mb-6 line-clamp-3 min-h-[3.5rem]">
        {shortDescription}
      </p>

      <div className="flex items-end justify-between mt-auto pt-5 border-t border-border">
        {price && price > 0 ? (
          <div>
            {startingFrom && (
              <span className="text-[10px] uppercase tracking-widest text-foreground-muted block leading-none mb-1">
                From
              </span>
            )}
            <span className="font-display text-xl text-brand-950 tabular">
              {formatINR(price)}
            </span>
          </div>
        ) : (
          <span className="text-sm font-medium text-accent-700 uppercase tracking-wider">
            Request Quote
          </span>
        )}
        <span
          aria-hidden="true"
          className="w-10 h-10 border border-brand-950 text-brand-950 group-hover:bg-brand-950 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0"
        >
          <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}
