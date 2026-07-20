import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StationSearchClient } from "./StationSearchClient";
import { STATIONS } from "@/lib/stations";

export const metadata: Metadata = buildMetadata({
  title: "Indian Railway Station Code Directory",
  description: "Look up Indian Railways station codes for major cities — a quick reference directory.",
  path: "/stations",
  keywords: ["railway station code list", "IRCTC station code lookup", "NDLS BCT MAS station codes"],
});

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-12 pb-24 md:pb-12">
      <Breadcrumb items={[{ name: "Station Directory", href: "/stations" }]} />
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Station Code Directory</h1>
      <p className="mt-3 text-muted max-w-2xl">
        A quick-reference list of major Indian Railways station codes. Not exhaustive — covers the stations
        travellers search for most.
      </p>
      <div className="mt-6">
        <StationSearchClient stations={STATIONS} />
      </div>
    </div>
  );
}
