import { NextResponse } from "next/server";
import { getLiveStationBoard } from "@/lib/railradar";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const board = await getLiveStationBoard(code);
  if (!board) {
    return NextResponse.json({ available: false }, { status: 200 });
  }
  return NextResponse.json({ available: true, ...board });
}
