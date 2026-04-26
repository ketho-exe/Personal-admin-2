import { PageScreen } from "@/components/page-screen";
import { pageContent } from "@/lib/navigation";
import { sampleItems } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

export default function RecordsPage() {
  const page = pageContent["/records"];
  return <PageScreen {...page} items={sampleItems} itemTypes={["record"]} primaryAction="New record" />;
}
