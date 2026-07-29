import { NextResponse } from "next/server";
import { getTrainByNumber } from "@/lib/rail-data";
import { getSchedule } from "@/lib/schedules";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ number: string }> }
) {
  const { number } = await params;
  const train = getTrainByNumber(number);
  if (!train) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const stops = getSchedule(number);
  return NextResponse.json({
    train: {
      number: train.number,
      name: train.name,
      fromCode: train.fromCode,
      fromName: train.fromName,
      toCode: train.toCode,
      toName: train.toName,
      dep: train.dep,
      arr: train.arr,
      type: train.type,
    },
    stops: stops.map((s) => ({
      code: s.code,
      name: s.name,
      arrival: s.arrival,
      departure: s.departure,
      day: s.day,
    })),
  });
}
