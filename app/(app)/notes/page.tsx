import { PageScreen } from "@/components/page-screen";
import { pageContent } from "@/lib/navigation";
import { sampleItems } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

export default function NotesPage() {
  const page = pageContent["/notes"];
  return <PageScreen {...page} items={sampleItems} itemTypes={["note"]} primaryAction="New note" />;
}
