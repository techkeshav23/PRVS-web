import { AdminPageHeader } from "@/components/admin/page-header";
import { SettingsForm } from "@/components/admin/settings-form";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <AdminPageHeader
        title="Site Settings"
        description="Configure your website's content, contact info and branding."
      />
      <SettingsForm settings={settings} />
    </div>
  );
}
