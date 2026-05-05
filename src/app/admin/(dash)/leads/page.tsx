import { dbConnect } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { AdminPageHeader } from "@/components/admin/page-header";
import { LeadRow } from "@/components/admin/lead-row";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  await dbConnect();
  const docs = await Lead.find({}).sort({ createdAt: -1 }).limit(200).lean();
  const leads = JSON.parse(JSON.stringify(docs)) as Array<{
    _id: string;
    name: string;
    phone: string;
    email?: string;
    service?: string;
    message?: string;
    status: string;
    notes?: string;
    createdAt: string;
  }>;

  return (
    <div>
      <AdminPageHeader
        title="Leads"
        description="Manage customer inquiries and track conversions."
      />

      {leads.length === 0 ? (
        <div className="bg-card border rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">
            No leads yet. They will appear here when customers fill out forms.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <LeadRow key={lead._id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  );
}
