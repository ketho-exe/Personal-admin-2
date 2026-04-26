import { PageScreen } from "@/components/page-screen";
import { pageContent } from "@/lib/navigation";
import { sampleItems } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

export default function TasksPage() {
  const page = pageContent["/tasks"];
  return <PageScreen {...page} items={sampleItems} itemTypes={["task"]} primaryAction="New task" />;
}
