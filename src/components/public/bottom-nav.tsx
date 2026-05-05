"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Calculator, BookOpen, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/services", label: "Services", Icon: Briefcase },
  { href: "/tools", label: "Tools", Icon: Calculator },
  { href: "/blog", label: "Insights", Icon: BookOpen },
  { href: "/contact", label: "Contact", Icon: MessageCircle },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-stretch justify-around h-16 max-w-md mx-auto">
        {tabs.map(({ href, label, Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1 min-w-0">
              <Link
                href={href}
                className={cn(
                  "h-full flex flex-col items-center justify-center gap-1 transition-colors relative px-1",
                  isActive
                    ? "text-brand-950"
                    : "text-foreground-muted hover:text-brand-950"
                )}
              >
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent-500" />
                )}
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
                <span
                  className={cn(
                    "text-[11px] leading-none truncate max-w-full",
                    isActive ? "font-semibold" : "font-normal"
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
