import { getServerSupabase } from "@/lib/supabase/server";
import { isRateLimited, getClientKey } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const CATEGORIES = ["tatkal_experience", "delay", "coach_comfort", "waitlist_confirmation", "other"];

interface ReportBody {
  trainRef?: string;
  journeyDate?: string;
  category: string;
  rating?: number;
  body?: string;
}

function isValidBody(b: unknown): b is ReportBody {
  if (!b || typeof b !== "object") return false;
  const body = b as Record<string, unknown>;
  return typeof body.category === "string" && CATEGORIES.includes(body.category);
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (isRateLimited(`journey-reports:${clientKey}`, 5, 60_000)) {
    return Response.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isValidBody(payload)) {
    return Response.json({ error: "Missing or invalid category." }, { status: 400 });
  }

  const supabase = getServerSupabase();
  const { error } = await supabase.from("journey_reports").insert({
    train_ref: payload.trainRef ?? null,
    journey_date: payload.journeyDate ?? null,
    category: payload.category,
    rating: payload.rating ?? null,
    body: payload.body?.slice(0, 1000) ?? null,
    status: "pending",
  });

  if (error) {
    console.error("journey_reports insert failed", error);
    return Response.json({ error: "Could not submit report." }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
