import { NextRequest, NextResponse } from "next/server";
import { trainsBetween } from "@/lib/rail-data";
import { getLiveTrainsBetween } from "@/lib/railradar";

export async function GET(request: NextRequest) {
  const from = request.nextUrl.searchParams.get("from")?.trim().toUpperCase() ?? "";
  const to = request.nextUrl.searchParams.get("to")?.trim().toUpperCase() ?? "";
  if (!from || !to) {
    return NextResponse.json({ error: "missing_params" }, { status: 400 });
  }

  const live = await getLiveTrainsBetween(from, to);
  if (live) {
    return NextResponse.json({ trains: live, source: "live" });
  }

  const trains = trainsBetween(from, to).map((t) => ({
    number: t.number,
    name: t.name,
    type: t.type,
    fromCode: t.fromCode,
    fromName: t.fromName,
    dep: t.dep,
    toCode: t.toCode,
    toName: t.toName,
    arr: t.arr,
  }));
  return NextResponse.json({ trains, source: "static" });
}
