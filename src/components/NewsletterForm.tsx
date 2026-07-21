"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "failed");
      setStatus("done");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error && err.message !== "failed" ? err.message : "Couldn't subscribe — please try again.");
    }
  }

  if (status === "done") {
    return (
      <p className="text-[13px] text-success font-medium">
        You&apos;re subscribed — we&apos;ll send long-weekend and booking-window alerts.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2.5 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 focus:ring-4 focus:ring-white/10 transition"
      />
      <button type="submit" disabled={status === "saving"} className="btn-primary !py-2.5 !px-5 !text-[14px] disabled:opacity-60">
        {status === "saving" ? "…" : "Subscribe"}
      </button>
      {status === "error" && <p className="text-[12px] text-danger sm:basis-full">{message}</p>}
    </form>
  );
}
