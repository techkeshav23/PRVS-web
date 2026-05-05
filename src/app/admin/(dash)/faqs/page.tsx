import Link from "next/link";
import { Edit } from "lucide-react";
import { dbConnect } from "@/lib/mongodb";
import { Faq } from "@/models/Faq";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteFaq } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  await dbConnect();
  const docs = await Faq.find({}).sort({ order: 1 }).lean();
  const faqs = JSON.parse(JSON.stringify(docs)) as Array<{
    _id: string;
    question: string;
    answer: string;
    category?: string;
    isActive: boolean;
  }>;

  return (
    <div>
      <AdminPageHeader
        title="FAQs"
        description="Manage frequently asked questions."
        actionLabel="Add FAQ"
        actionHref="/admin/faqs/new"
      />

      {faqs.length === 0 ? (
        <div className="bg-card border rounded-2xl p-12 text-center">
          <p className="text-muted-foreground mb-4">No FAQs yet.</p>
          <Link href="/admin/faqs/new">
            <Button>Add First FAQ</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((f) => (
            <div key={f._id} className="bg-card border rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-semibold">{f.question}</h3>
                {!f.isActive && <Badge variant="warning">Hidden</Badge>}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{f.answer}</p>
              <div className="flex items-center justify-between pt-3 border-t">
                <Badge variant="outline">{f.category}</Badge>
                <div className="flex gap-1">
                  <Link href={`/admin/faqs/${f._id}`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <DeleteButton id={f._id} onDelete={deleteFaq} label="FAQ" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
