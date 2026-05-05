"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Props = {
  onDelete: (id: string) => Promise<void>;
  id: string;
  label?: string;
};

export function DeleteButton({ onDelete, id, label = "this item" }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  function doDelete() {
    startTransition(async () => {
      try {
        await onDelete(id);
        toast.success("Deleted successfully");
      } catch {
        toast.error("Failed to delete");
      }
      setConfirming(false);
    });
  }

  if (!confirming) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setConfirming(true)}
        aria-label={`Delete ${label}`}
      >
        <Trash2 className="w-4 h-4 text-red-600" />
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="destructive"
        size="sm"
        disabled={pending}
        onClick={doDelete}
      >
        {pending ? "..." : "Confirm"}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setConfirming(false)}
      >
        Cancel
      </Button>
    </div>
  );
}
