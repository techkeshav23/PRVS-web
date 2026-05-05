"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Welcome back");
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@prvsbusiness.in"
          required
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>
      <Button type="submit" disabled={loading} size="lg" className="w-full">
        {loading ? "Signing in…" : <>Sign In <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} /></>}
      </Button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface border border-border p-10">
          <div className="mb-10">
            <div className="w-12 h-12 bg-brand-950 text-cream-100 flex items-center justify-center font-display text-2xl mb-6">
              P
            </div>
            <p className="divider-gold text-[11px] uppercase tracking-[0.25em] text-accent-700 font-semibold mb-3">
              Administrator
            </p>
            <h1 className="font-display text-3xl text-brand-950">Sign in</h1>
            <p className="text-sm text-foreground-muted mt-2">
              Manage services, leads, content and site settings.
            </p>
          </div>
          <Suspense fallback={<div className="h-40" />}>
            <LoginForm />
          </Suspense>
          <p className="mt-8 text-[11px] uppercase tracking-widest text-foreground-muted text-center">
            Authorized personnel only
          </p>
        </div>
      </div>
    </div>
  );
}
