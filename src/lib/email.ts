import { Resend } from "resend";

/**
 * Email sending, gated the same way ads are: an explicit switch plus a real
 * key, so a misconfigured environment fails closed (no send attempt, no
 * crash) instead of silently trying and failing per-request.
 */
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const EMAIL_FROM = process.env.EMAIL_FROM ?? "RailSetu <reminders@railsetu.in>";

export function emailConfigured(): boolean {
  return RESEND_API_KEY.length > 0;
}

let client: Resend | null = null;
function getClient(): Resend {
  if (!client) client = new Resend(RESEND_API_KEY);
  return client;
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!emailConfigured()) {
    return { ok: false, error: "RESEND_API_KEY is not set" };
  }
  const { error } = await getClient().emails.send({ from: EMAIL_FROM, to, subject, text, html });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
