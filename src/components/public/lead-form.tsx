"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { submitLead, type LeadFormState } from "@/app/actions/leads";

const initialState: LeadFormState = {};

type Props = {
  services?: { title: string; slug: string }[];
  compact?: boolean;
};

export function LeadForm({ services = [], compact = false }: Props) {
  const [state, action, pending] = useActionState(submitLead, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Thank you. Our team will reach out within 24 hours.");
    } else if (state.error && !state.fieldErrors) {
      toast.error(state.error);
    }
  }, [state]);

  if (state.success) {
    return (
      <div className="text-center space-y-3 py-6">
        <div className="w-11 h-11 mx-auto bg-accent-500 flex items-center justify-center text-white">
          <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <h3 className="font-display text-lg text-brand-950">Request Received</h3>
        <p className="text-xs text-foreground-muted max-w-xs mx-auto leading-relaxed">
          A senior consultant will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  const spacing = compact ? "space-y-3" : "space-y-5";
  const fieldGap = compact ? "space-y-1" : "space-y-2";

  return (
    <form action={action} className={spacing}>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className={fieldGap}>
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" name="name" placeholder="Rajesh Sharma" required />
          {state.fieldErrors?.name && (
            <p className="text-xs text-red-700">{state.fieldErrors.name}</p>
          )}
        </div>
        <div className={fieldGap}>
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
          {state.fieldErrors?.phone && (
            <p className="text-xs text-red-700">{state.fieldErrors.phone}</p>
          )}
        </div>
      </div>
      <div className={fieldGap}>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" />
      </div>
      <div className={fieldGap}>
        <Label htmlFor="service">Service</Label>
        <Select id="service" name="service" defaultValue="">
          <option value="">Select a service…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="other">Other / Not sure</option>
        </Select>
      </div>
      {!compact && (
        <div className={fieldGap}>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Briefly describe what you need…"
            rows={3}
          />
        </div>
      )}
      <Button type="submit" disabled={pending} size={compact ? "default" : "lg"} className="w-full">
        {pending ? "Sending…" : <>Submit Request <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} /></>}
      </Button>
      {!compact && (
        <p className="text-[10px] text-foreground-muted text-center leading-relaxed">
          By submitting, you agree to be contacted by our team. Your data is treated confidentially.
        </p>
      )}
    </form>
  );
}
