import Link from "next/link";
import { Edit, Star } from "lucide-react";
import { dbConnect } from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteTestimonial } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  await dbConnect();
  const docs = await Testimonial.find({}).sort({ order: 1, createdAt: -1 }).lean();
  const items = JSON.parse(JSON.stringify(docs)) as Array<{
    _id: string;
    name: string;
    role?: string;
    company?: string;
    message: string;
    rating: number;
    isActive: boolean;
  }>;

  return (
    <div>
      <AdminPageHeader
        title="Testimonials"
        description="Manage customer reviews shown on the homepage."
        actionLabel="Add Testimonial"
        actionHref="/admin/testimonials/new"
      />

      {items.length === 0 ? (
        <div className="bg-card border rounded-2xl p-12 text-center">
          <p className="text-muted-foreground mb-4">No testimonials yet.</p>
          <Link href="/admin/testimonials/new">
            <Button>Add First Testimonial</Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((t) => (
            <div key={t._id} className="bg-card border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                {!t.isActive && <Badge variant="warning">Hidden</Badge>}
              </div>
              <p className="text-sm line-clamp-3 mb-4">&ldquo;{t.message}&rdquo;</p>
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground mb-4">
                {t.role}
                {t.role && t.company && " · "}
                {t.company}
              </div>
              <div className="flex justify-end gap-1 pt-3 border-t">
                <Link href={`/admin/testimonials/${t._id}`}>
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <DeleteButton id={t._id} onDelete={deleteTestimonial} label="testimonial" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
