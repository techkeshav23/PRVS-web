"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Briefcase,
  BookOpen,
  Inbox,
  Star,
  HelpCircle,
  Settings,
  LogOut,
  Folder,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", Icon: Briefcase },
  { href: "/admin/categories", label: "Categories", Icon: Folder },
  { href: "/admin/blogs", label: "Blogs", Icon: BookOpen },
  { href: "/admin/leads", label: "Leads", Icon: Inbox },
  { href: "/admin/testimonials", label: "Testimonials", Icon: Star },
  { href: "/admin/faqs", label: "FAQs", Icon: HelpCircle },
  { href: "/admin/settings", label: "Site Settings", Icon: Settings },
];

export function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-64 bg-card border-r flex flex-col z-50 transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between gap-2 px-5 h-16 border-b">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center text-white shadow-md shadow-brand-600/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-sm">PRVS Admin</span>
              <span className="text-[10px] text-muted-foreground">Control Panel</span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded hover:bg-muted"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {links.map(({ href, label, Icon }) => {
            const isActive =
              href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-gradient-to-r from-brand-600 to-accent-600 text-white shadow-md shadow-brand-600/30"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t space-y-2">
          <Link href="/" target="_blank" className="block">
            <Button variant="outline" size="sm" className="w-full">
              View Site
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            <LogOut className="w-4 h-4" /> Sign out
          </Button>
        </div>
      </aside>
    </>
  );
}
