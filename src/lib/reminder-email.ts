import { getTrainByNumber } from "@/lib/rail-data";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

interface ReminderRow {
  journey_date: string;
  train_ref: string | null;
  reminder_type: "advance_booking" | "tatkal";
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function buildReminderEmail(row: ReminderRow): { subject: string; text: string; html: string } {
  const journeyDate = formatDate(row.journey_date);
  const train = row.train_ref ? getTrainByNumber(row.train_ref) : undefined;
  const trainLine = train ? `${train.number} ${train.name} (${train.fromName} → ${train.toName})` : row.train_ref;

  const isTatkal = row.reminder_type === "tatkal";
  const subject = isTatkal
    ? `Tatkal booking opens today for your ${journeyDate} journey`
    : `Advance booking opens today for your ${journeyDate} journey`;

  const bodyLine = isTatkal
    ? "Tatkal booking opens at 10:00 AM for AC classes and 11:00 AM for Non-AC classes, one day before your journey date."
    : "Today is the day IRCTC's advance booking window opens for your journey date.";

  const trainSection = trainLine ? `\nTrain: ${trainLine}\n` : "";
  const text = [
    `This is your reminder from ${SITE_NAME}.`,
    "",
    `Journey date: ${journeyDate}`,
    trainSection.trim(),
    bodyLine,
    "",
    `Book on IRCTC: https://www.irctc.co.in`,
    `${SITE_NAME}: ${SITE_URL}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:480px;margin:0 auto;color:#0e1628;">
      <p style="font-size:15px;">This is your reminder from <strong>${SITE_NAME}</strong>.</p>
      <p style="font-size:15px;"><strong>Journey date:</strong> ${journeyDate}</p>
      ${trainLine ? `<p style="font-size:15px;"><strong>Train:</strong> ${trainLine}</p>` : ""}
      <p style="font-size:15px;">${bodyLine}</p>
      <p style="margin-top:24px;">
        <a href="https://www.irctc.co.in" style="display:inline-block;background:#335fff;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;">Book on IRCTC</a>
      </p>
      <p style="font-size:12px;color:#6b7280;margin-top:24px;">
        Sent by ${SITE_NAME} (${SITE_URL}) — an independent tool, not affiliated with IRCTC or Indian Railways.
      </p>
    </div>
  `;

  return { subject, text, html };
}
