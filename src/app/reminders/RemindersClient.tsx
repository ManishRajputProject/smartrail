"use client";

import { useMemo, useState } from "react";
import { bookingOpenDate, tatkalOpenDateTime } from "@/lib/irctc-rules";
import { downloadReminderIcs } from "@/lib/ics-download";

type ReminderType = "advance_booking" | "tatkal";

export function RemindersClient() {
  const [journeyDate, setJourneyDate] = useState("");
  const [trainRef, setTrainRef] = useState("");
  const [reminderType, setReminderType] = useState<ReminderType>("advance_booking");
  const [travelClass, setTravelClass] = useState("SL");
  const [wantEmail, setWantEmail] = useState(true);
  const [wantCalendar, setWantCalendar] = useState(true);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const suggestedFireAt = useMemo(() => {
    if (!journeyDate) return null;
    const [y, m, d] = journeyDate.split("-").map(Number);
    const journey = new Date(y, m - 1, d);
    if (reminderType === "advance_booking") {
      const open = bookingOpenDate(journey);
      open.setHours(7, 45, 0, 0); // 15 min before the 8 AM window
      return open;
    }
    const open = tatkalOpenDateTime(journey, travelClass);
    open.setMinutes(open.getMinutes() - 15);
    return open;
  }, [journeyDate, reminderType, travelClass]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!journeyDate || !suggestedFireAt) return;
    if (!wantEmail && !wantCalendar) return;

    if (wantCalendar) {
      downloadReminderIcs({
        title: reminderType === "advance_booking" ? "IRCTC Advance Booking Opens" : "IRCTC Tatkal Booking Opens",
        description: `Journey date: ${journeyDate}${trainRef ? ` · Train: ${trainRef}` : ""}. Booking window opens around now — head to IRCTC.`,
        start: suggestedFireAt,
      });
    }

    if (wantEmail) {
      if (!email) {
        setErrorMsg("Enter an email address for the email reminder.");
        setStatus("error");
        return;
      }
      setStatus("saving");
      try {
        const res = await fetch("/api/reminders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            journeyDate,
            trainRef: trainRef || undefined,
            reminderType,
            fireAt: suggestedFireAt.toISOString(),
            channel: ["email"],
            contactEmail: email,
          }),
        });
        if (!res.ok) throw new Error("request failed");
        setStatus("saved");
      } catch {
        setStatus("error");
        setErrorMsg("Couldn't save your reminder. Please try again.");
      }
    } else {
      setStatus("saved");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="rm-date" className="block text-sm font-medium mb-1">Journey Date *</label>
        <input
          id="rm-date"
          type="date"
          required
          value={journeyDate}
          onChange={(e) => setJourneyDate(e.target.value)}
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        />
      </div>
      <div>
        <label htmlFor="rm-train" className="block text-sm font-medium mb-1">Train Number / Remarks</label>
        <input
          id="rm-train"
          type="text"
          value={trainRef}
          onChange={(e) => setTrainRef(e.target.value)}
          placeholder="e.g. 12951 or 'Delhi to Mumbai trip'"
          className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
        />
      </div>

      <fieldset>
        <legend className="block text-sm font-medium mb-1">Reminder Type *</legend>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setReminderType("advance_booking")}
            className={`rounded-lg border px-3 py-2.5 text-sm text-left ${reminderType === "advance_booking" ? "border-primary bg-primary/5" : "border-border"}`}
          >
            <span className="font-medium block">Advance Booking</span>
            <span className="text-xs text-muted">Opens 60 days before</span>
          </button>
          <button
            type="button"
            onClick={() => setReminderType("tatkal")}
            className={`rounded-lg border px-3 py-2.5 text-sm text-left ${reminderType === "tatkal" ? "border-primary bg-primary/5" : "border-border"}`}
          >
            <span className="font-medium block">Tatkal</span>
            <span className="text-xs text-muted">1 day before journey</span>
          </button>
        </div>
      </fieldset>

      {reminderType === "tatkal" && (
        <div>
          <label htmlFor="rm-class" className="block text-sm font-medium mb-1">Travel Class</label>
          <select
            id="rm-class"
            value={travelClass}
            onChange={(e) => setTravelClass(e.target.value)}
            className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
          >
            <option value="3A">AC classes (opens 10 AM)</option>
            <option value="SL">Non-AC classes (opens 11 AM)</option>
          </select>
        </div>
      )}

      {suggestedFireAt && (
        <p className="text-xs text-muted rounded-lg bg-surface-2 px-3 py-2">
          We&apos;ll suggest reminding you at{" "}
          <strong>{suggestedFireAt.toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}</strong>
          {" "}— about 15 minutes before the window opens.
        </p>
      )}

      <fieldset>
        <legend className="block text-sm font-medium mb-1">How to Get Reminded *</legend>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm rounded-lg border border-border px-3 py-2.5">
            <input type="checkbox" checked={wantEmail} onChange={(e) => setWantEmail(e.target.checked)} />
            Email
          </label>
          <label className="flex items-center gap-2 text-sm rounded-lg border border-border px-3 py-2.5">
            <input type="checkbox" checked={wantCalendar} onChange={(e) => setWantCalendar(e.target.checked)} />
            Download calendar reminder (.ics)
          </label>
        </div>
      </fieldset>

      {wantEmail && (
        <div>
          <label htmlFor="rm-email" className="block text-sm font-medium mb-1">Email Address *</label>
          <input
            id="rm-email"
            type="email"
            required={wantEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2.5 text-base"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={status === "saving"}
        className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {status === "saving" ? "Saving…" : "Set Reminder"}
      </button>

      {status === "saved" && (
        <p className="text-sm text-success text-center">
          Done! {wantCalendar && "Your calendar file has downloaded. "}
          {wantEmail && "We'll email you before the window opens."}
        </p>
      )}
      {status === "error" && <p className="text-sm text-danger text-center">{errorMsg}</p>}

      <p className="text-xs text-muted text-center">WhatsApp reminders are coming soon — email and calendar are available now.</p>
    </form>
  );
}
