import { getServerSupabase } from "@/lib/supabase/server";
import { sendEmail, emailConfigured } from "@/lib/email";
import { buildReminderEmail } from "@/lib/reminder-email";

export const dynamic = "force-dynamic";

// Cap per run so one invocation can't run long enough to hit a serverless
// timeout — if there's a backlog, the next scheduled run (every 15 min)
// picks up where this one left off, since unsent rows just stay "pending".
const BATCH_LIMIT = 50;

interface ReminderRow {
  id: string;
  journey_date: string;
  train_ref: string | null;
  reminder_type: "advance_booking" | "tatkal";
  channel: string[];
  contact_email: string | null;
}

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // fail closed — no secret configured means no one gets in
  const auth = request.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;
  const url = new URL(request.url);
  return url.searchParams.get("secret") === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!emailConfigured()) {
    return Response.json({ error: "RESEND_API_KEY is not set — no reminders sent." }, { status: 200 });
  }

  const supabase = getServerSupabase(true);
  const { data: due, error: fetchError } = await supabase
    .from("reminders")
    .select("id, journey_date, train_ref, reminder_type, channel, contact_email")
    .eq("status", "pending")
    .lte("fire_at", new Date().toISOString())
    .limit(BATCH_LIMIT);

  if (fetchError) {
    return Response.json({ error: fetchError.message }, { status: 500 });
  }

  const rows = (due ?? []) as ReminderRow[];
  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const row of rows) {
    if (!row.channel?.includes("email") || !row.contact_email) {
      skipped++;
      // Nothing to send on this channel — don't leave it pending forever.
      await supabase.from("reminders").update({ status: "failed" }).eq("id", row.id);
      continue;
    }

    const { subject, text, html } = buildReminderEmail(row);
    const result = await sendEmail({ to: row.contact_email, subject, text, html });

    await supabase
      .from("reminders")
      .update({ status: result.ok ? "sent" : "failed" })
      .eq("id", row.id);

    if (result.ok) sent++;
    else failed++;
  }

  return Response.json({ checked: rows.length, sent, failed, skipped });
}
