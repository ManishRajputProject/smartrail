import { NextResponse } from "next/server";
import { getLiveTrainStatus } from "@/lib/railradar";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ number: string }> }
) {
  const { number } = await params;
  const status = await getLiveTrainStatus(number);
  if (!status) {
    return NextResponse.json({ available: false }, { status: 200 });
  }
  return NextResponse.json({ available: true, ...status });
}
