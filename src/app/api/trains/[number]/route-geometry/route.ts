import { NextResponse } from "next/server";
import { getLiveRouteGeometry } from "@/lib/railradar";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ number: string }> }
) {
  const { number } = await params;
  const coordinates = await getLiveRouteGeometry(number);
  if (!coordinates) {
    return NextResponse.json({ available: false }, { status: 200 });
  }
  return NextResponse.json({ available: true, coordinates });
}
