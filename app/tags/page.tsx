import { PageScreen } from "@/components/page-screen";
import { pageContent } from "@/lib/navigation";
import { sampleItems } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

export default function TagsPage() {
  const page = pageContent["/tags"];
  return <PageScreen {...page} items={sampleItems} itemTypes={["task", "document", "note", "contact", "record"]} primaryAction="New tag" />;
}
