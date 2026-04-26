import { PageScreen } from "@/components/page-screen";
import { pageContent } from "@/lib/navigation";
import { sampleItems } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  const page = pageContent["/search"];
  return <PageScreen {...page} items={sampleItems} itemTypes={["task", "reminder", "document", "note", "contact", "record", "event"]} primaryAction="Save search" />;
}
