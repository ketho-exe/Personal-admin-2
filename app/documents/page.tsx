import { PageScreen } from "@/components/page-screen";
import { pageContent } from "@/lib/navigation";
import { sampleItems } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

export default function DocumentsPage() {
  const page = pageContent["/documents"];
  return <PageScreen {...page} items={sampleItems} itemTypes={["document"]} primaryAction="Upload document" />;
}
