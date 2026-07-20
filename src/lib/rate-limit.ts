/**
 * Minimal in-memory per-IP throttle for public write routes (reminders,
 * feedback, journey reports, newsletter). Resets on cold start / redeploy —
 * good enough as a v1 abuse guard, upgrade to Upstash/Vercel KV if this
 * project gets real traffic and needs throttling that survives across
 * serverless instances.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > limit;
}

export function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}
