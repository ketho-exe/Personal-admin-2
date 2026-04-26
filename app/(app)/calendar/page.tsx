import { PageScreen } from "@/components/page-screen";
import { pageContent } from "@/lib/navigation";
import { sampleItems } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

export default function CalendarPage() {
  const page = pageContent["/calendar"];
  return <PageScreen {...page} items={sampleItems} itemTypes={["event", "task", "reminder", "document"]} primaryAction="New event" />;
}
