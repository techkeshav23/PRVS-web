"use client";

import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Props = {
  name: string;
  className?: string;
  size?: number;
};

export function DynamicIcon({ name, className, size }: Props) {
  const lookup = Icons as unknown as Record<string, LucideIcon>;
  const Icon = lookup[name] ?? lookup.Briefcase;
  return <Icon className={className} size={size} />;
}
