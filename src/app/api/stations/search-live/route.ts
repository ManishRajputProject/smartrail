import { NextRequest, NextResponse } from "next/server";
import { searchLiveStations } from "@/lib/railradar";
import { searchStationsFull } from "@/lib/rail-data";

/**
 * Station search backed by RailRadar's own station codes — used wherever a
 * picked code feeds a live endpoint (trains-between, station board), since
 * our static station codes don't always match RailRadar's (see
 * searchLiveStations' doc comment). Falls back to the static directory only
 * if RailRadar's lookup is unreachable, so the picker still works.
 */
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const live = await searchLiveStations(q, 8);
  if (live.length > 0) {
    return NextResponse.json({ results: live, source: "live" });
  }
  const results = searchStationsFull(q, 8).map((s) => ({ code: s.code, name: s.name }));
  return NextResponse.json({ results, source: "static" });
}
