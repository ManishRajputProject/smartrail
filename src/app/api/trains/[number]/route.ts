import { NextResponse } from "next/server";
import { getTrainByNumber } from "@/lib/rail-data";
import { getSchedule } from "@/lib/schedules";
import { getLiveTrainDetails } from "@/lib/railradar";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ number: string }> }
) {
  const { number } = await params;
  const staticTrain = getTrainByNumber(number);

  // Live data first — freshest source, cached 24h. Falls back to the static
  // dataset on any failure (no key, network error, rate limit, bad shape),
  // so this never blocks a page from rendering.
  const live = await getLiveTrainDetails(number);
  if (live) {
    return NextResponse.json({
      train: {
        ...live.train,
        // RailRadar's train-details response doesn't carry coach classes;
        // keep those from our static dataset when we have a match for this
        // train number, since class list changes far less than timings.
        classes: staticTrain?.classes ?? [],
      },
      stops: live.stops,
      source: "live",
    });
  }

  if (!staticTrain) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const stops = getSchedule(number);
  return NextResponse.json({
    train: {
      number: staticTrain.number,
      name: staticTrain.name,
      fromCode: staticTrain.fromCode,
      fromName: staticTrain.fromName,
      toCode: staticTrain.toCode,
      toName: staticTrain.toName,
      dep: staticTrain.dep,
      arr: staticTrain.arr,
      type: staticTrain.type,
      classes: staticTrain.classes,
    },
    stops: stops.map((s) => ({
      code: s.code,
      name: s.name,
      arrival: s.arrival,
      departure: s.departure,
      day: s.day,
    })),
    source: "static",
  });
}
