"use client";

import { useState, useTransition } from "react";
import { Phone, Mail, MessageSquare, Calendar, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateLeadStatus, deleteLead } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-700" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-100 text-yellow-700" },
  { value: "in_progress", label: "In Progress", color: "bg-purple-100 text-purple-700" },
  { value: "converted", label: "Converted", color: "bg-accent-100 text-accent-700" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-700" },
];

type Lead = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  status: string;
  notes?: string;
  createdAt: string;
};

export function LeadRow({ lead }: { lead: Lead }) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [pending, startTransition] = useTransition();

  function update(newStatus: string) {
    setStatus(newStatus);
    startTransition(async () => {
      try {
        await updateLeadStatus(lead._id, newStatus, notes);
        toast.success("Status updated");
      } catch {
        toast.error("Failed to update");
      }
    });
  }

  function saveNotes() {
    startTransition(async () => {
      try {
        await updateLeadStatus(lead._id, status, notes);
        toast.success("Notes saved");
      } catch {
        toast.error("Failed to save");
      }
    });
  }

  function remove() {
    if (!confirm("Delete this lead permanently?")) return;
    startTransition(async () => {
      try {
        await deleteLead(lead._id);
        toast.success("Lead deleted");
      } catch {
        toast.error("Failed to delete");
      }
    });
  }

  const statusInfo = statusOptions.find((o) => o.value === status) ?? statusOptions[0];

  return (
    <div className="bg-card border rounded-2xl overflow-hidden hover:border-brand-300 transition-colors">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex flex-wrap items-center gap-4 hover:bg-muted/30"
      >
        <div className="flex-1 min-w-[180px]">
          <div className="font-semibold">{lead.name}</div>
          <div className="text-xs text-muted-foreground">{lead.phone}</div>
        </div>
        <div className="hidden md:block text-sm text-muted-foreground flex-1">
          {lead.service || "—"}
        </div>
        <span
          className={cn(
            "px-2.5 py-1 rounded-full text-xs font-semibold",
            statusInfo.color
          )}
        >
          {statusInfo.label}
        </span>
        <span className="text-xs text-muted-foreground hidden sm:flex items-center gap-1">
          <Calendar className="w-3 h-3" /> {formatDate(lead.createdAt)}
        </span>
      </button>

      {expanded && (
        <div className="p-5 border-t space-y-4 bg-muted/20">
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href={`tel:${lead.phone}`}
              className="flex items-center gap-2 text-sm text-brand-600 hover:underline"
            >
              <Phone className="w-4 h-4" /> {lead.phone}
            </a>
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center gap-2 text-sm text-brand-600 hover:underline break-all"
              >
                <Mail className="w-4 h-4" /> {lead.email}
              </a>
            )}
          </div>

          {lead.service && (
            <div>
              <span className="text-xs text-muted-foreground">Service:</span>
              <p className="text-sm font-medium">{lead.service}</p>
            </div>
          )}

          {lead.message && (
            <div>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MessageSquare className="w-3 h-3" /> Message
              </span>
              <p className="text-sm bg-card border rounded-lg p-3 mt-1">{lead.message}</p>
            </div>
          )}

          <div>
            <span className="text-xs text-muted-foreground">Update Status</span>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => update(opt.value)}
                  disabled={pending}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
                    status === opt.value
                      ? opt.color + " ring-2 ring-offset-1 ring-current"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs text-muted-foreground">Internal Notes</span>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this lead..."
              rows={3}
              className="mt-1.5"
            />
            <div className="flex justify-between items-center mt-2">
              <Button
                type="button"
                size="sm"
                onClick={saveNotes}
                disabled={pending}
              >
                Save Notes
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={remove}
                disabled={pending}
                className="text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
