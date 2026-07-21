import { getServerSupabase } from "@/lib/supabase/server";
import { isRateLimited, getClientKey } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (isRateLimited(`newsletter:${clientKey}`, 5, 60_000)) {
    return Response.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = (payload as { email?: unknown })?.email;
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const supabase = getServerSupabase();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: email.trim().toLowerCase() });

  // 23505 = unique violation: already subscribed, which is a success from the
  // user's point of view — don't leak that the address is already on file.
  if (error && error.code !== "23505") {
    console.error("newsletter insert failed", error);
    return Response.json({ error: "Could not subscribe. Please try again." }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
