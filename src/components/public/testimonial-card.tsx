import { Star } from "lucide-react";

type Props = {
  name: string;
  role?: string;
  company?: string;
  message: string;
  rating: number;
  photo?: string;
};

export function TestimonialCard({ name, role, company, message, rating, photo }: Props) {
  return (
    <figure className="bg-card border border-border p-7 lg:p-8 h-full flex flex-col">
      <div className="flex gap-1 mb-6">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="w-3.5 h-3.5 fill-accent-500 text-accent-500"
            strokeWidth={0}
          />
        ))}
      </div>

      <blockquote className="font-display text-lg lg:text-xl leading-snug text-brand-950 flex-1 mb-8">
        <span className="text-accent-500 mr-1" aria-hidden="true">
          &ldquo;
        </span>
        {message}
      </blockquote>

      <figcaption className="flex items-center gap-3 pt-6 border-t border-border">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={name}
            width={44}
            height={44}
            className="w-11 h-11 object-cover flex-shrink-0 grayscale"
          />
        ) : (
          <div className="w-11 h-11 bg-brand-950 text-cream-100 flex items-center justify-center font-display text-base flex-shrink-0">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <div className="font-medium text-sm text-brand-950 truncate">{name}</div>
          {(role || company) && (
            <div className="text-xs text-foreground-muted truncate">
              {role}
              {role && company && " · "}
              {company}
            </div>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
