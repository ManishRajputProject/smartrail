import { NextRequest, NextResponse } from "next/server";
import { searchTrains } from "@/lib/rail-data";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const results = searchTrains(q, 8).map((t) => ({
    number: t.number,
    name: t.name,
    fromCode: t.fromCode,
    fromName: t.fromName,
    toCode: t.toCode,
    toName: t.toName,
    dep: t.dep,
    arr: t.arr,
    type: t.type,
  }));
  return NextResponse.json({ results });
}
