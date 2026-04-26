import { PageScreen } from "@/components/page-screen";
import { pageContent } from "@/lib/navigation";
import { sampleItems } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

export default function ContactsPage() {
  const page = pageContent["/contacts"];
  return <PageScreen {...page} items={sampleItems} itemTypes={["contact"]} primaryAction="New contact" />;
}
