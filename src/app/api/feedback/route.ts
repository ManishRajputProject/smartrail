import { getServerSupabase } from "@/lib/supabase/server";
import { isRateLimited, getClientKey } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const OPTIONS = [
  "better_wl_predictor",
  "more_regional_languages",
  "whatsapp_reminders",
  "mobile_app",
  "fare_trend_analysis",
  "other",
];

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (isRateLimited(`feedback:${clientKey}`, 10, 60_000)) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const option = (payload as { option?: unknown })?.option;
  if (typeof option !== "string" || !OPTIONS.includes(option)) {
    return Response.json({ error: "Invalid option." }, { status: 400 });
  }

  const supabase = getServerSupabase();
  const { error } = await supabase.from("feedback_votes").insert({ option });

  if (error) {
    console.error("feedback_votes insert failed", error);
    return Response.json({ error: "Could not save vote." }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
