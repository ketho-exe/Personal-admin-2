import { Dashboard } from "@/components/dashboard";
import { ModuleList } from "@/components/module-list";
import { createDashboardSummary } from "@/lib/dashboard";
import { modules, sampleItems } from "@/lib/sample-data";

export default function Home() {
  const summary = createDashboardSummary(sampleItems, new Date("2026-04-26T10:00:00Z"));

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
      <Dashboard summary={summary} />
      <ModuleList modules={modules} />
    </main>
  );
}
