import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
};

export function AdminPageHeader({ title, description, actionLabel, actionHref }: Props) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-sm mt-0.5">{description}</p>
        )}
      </div>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button>
            <Plus className="w-4 h-4" /> {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}
