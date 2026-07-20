import { getServerSupabase } from "@/lib/supabase/server";
import { isRateLimited, getClientKey } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

interface ReminderBody {
  journeyDate: string;
  trainRef?: string;
  reminderType: "advance_booking" | "tatkal";
  fireAt: string;
  channel: string[];
  contactEmail?: string;
  contactPhone?: string;
}

function isValidBody(b: unknown): b is ReminderBody {
  if (!b || typeof b !== "object") return false;
  const body = b as Record<string, unknown>;
  return (
    typeof body.journeyDate === "string" &&
    typeof body.reminderType === "string" &&
    ["advance_booking", "tatkal"].includes(body.reminderType) &&
    typeof body.fireAt === "string" &&
    Array.isArray(body.channel) &&
    (typeof body.contactEmail === "string" || typeof body.contactPhone === "string")
  );
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (isRateLimited(`reminders:${clientKey}`, 5, 60_000)) {
    return Response.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isValidBody(body)) {
    return Response.json({ error: "Missing or invalid fields." }, { status: 400 });
  }

  const supabase = getServerSupabase();
  const { error } = await supabase.from("reminders").insert({
    journey_date: body.journeyDate,
    train_ref: body.trainRef ?? null,
    reminder_type: body.reminderType,
    fire_at: body.fireAt,
    channel: body.channel,
    contact_email: body.contactEmail ?? null,
    contact_phone: body.contactPhone ?? null,
  });

  if (error) {
    console.error("reminders insert failed", error);
    return Response.json({ error: "Could not save reminder. Please try again." }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
