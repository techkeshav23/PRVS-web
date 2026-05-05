"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/public/logo";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-shadow bg-surface border-b border-border",
        scrolled && "shadow-sm"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-18 items-center justify-between">
          <Link href="/" className="flex items-center group shrink-0" aria-label="PRVS Business — Home">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[13px] font-medium transition-colors relative py-6",
                    isActive
                      ? "text-brand-700"
                      : "text-foreground/75 hover:text-brand-700"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-3 left-0 right-0 h-px bg-accent-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact">
              <Button size="sm" variant="default" className="px-4 sm:px-6">
                <span className="hidden sm:inline">Let&apos;s Talk</span>
                <span className="sm:hidden">Talk</span>
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 -mr-2 text-brand-950"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border py-3 animate-fade-up">
            <nav className="flex flex-col">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-2 py-3 text-base border-b border-border/50 last:border-0",
                      isActive
                        ? "text-brand-700 font-semibold"
                        : "text-foreground/75"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
