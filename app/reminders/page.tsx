import { PageScreen } from "@/components/page-screen";
import { pageContent } from "@/lib/navigation";
import { sampleItems } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

export default function RemindersPage() {
  const page = pageContent["/reminders"];
  return <PageScreen {...page} items={sampleItems} itemTypes={["reminder"]} primaryAction="New reminder" />;
}
