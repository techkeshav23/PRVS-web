import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-14",
        align === "center" ? "text-center mx-auto" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-[11px] uppercase tracking-[0.25em] text-accent-700 font-semibold mb-5",
            align === "center" && "divider-gold inline-block"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-[2rem] sm:text-4xl lg:text-5xl font-medium text-brand-950 leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mt-5 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
