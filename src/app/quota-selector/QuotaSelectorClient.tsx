"use client";

import { useState } from "react";
import { QUOTAS, type QuotaInfo } from "@/lib/irctc-rules";

type Answers = { urgency?: "urgent" | "planned"; profile?: string };

function recommend(answers: Answers): QuotaInfo[] {
  if (answers.urgency === "urgent") {
    return QUOTAS.filter((q) => ["TQ", "PT", "CK"].includes(q.code));
  }
  if (answers.profile === "senior") return QUOTAS.filter((q) => q.code === "LD");
  if (answers.profile === "women") return QUOTAS.filter((q) => q.code === "LQ");
  if (answers.profile === "defence") return QUOTAS.filter((q) => q.code === "DF");
  if (answers.profile === "student") return QUOTAS.filter((q) => q.code === "SS");
  return QUOTAS.filter((q) => q.code === "GN");
}

export function QuotaSelectorClient() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);

  const done = answers.urgency === "urgent" || (answers.urgency === "planned" && answers.profile);
  const results = done ? recommend(answers) : [];

  function reset() {
    setAnswers({});
    setStep(0);
  }

  return (
    <div>
      {!done && step === 0 && (
        <fieldset>
          <legend className="text-sm font-medium mb-3">How urgently do you need to travel?</legend>
          <div className="grid gap-2">
            <button
              type="button"
              className="rounded-lg border border-border px-4 py-3 text-left hover:border-primary hover:bg-surface"
              onClick={() => { setAnswers({ urgency: "urgent" }); }}
            >
              Very urgently — within the next 1–2 days
            </button>
            <button
              type="button"
              className="rounded-lg border border-border px-4 py-3 text-left hover:border-primary hover:bg-surface"
              onClick={() => { setAnswers({ urgency: "planned" }); setStep(1); }}
            >
              Planning ahead — 3 or more days away
            </button>
          </div>
        </fieldset>
      )}

      {!done && step === 1 && answers.urgency === "planned" && (
        <fieldset>
          <legend className="text-sm font-medium mb-3">Which best describes you?</legend>
          <div className="grid gap-2">
            {[
              { key: "senior", label: "Senior citizen (60+ men, 58+ women)" },
              { key: "women", label: "Woman travelling alone or in a group" },
              { key: "defence", label: "Active Defence / CAPF personnel" },
              { key: "student", label: "Student with a concession certificate" },
              { key: "general", label: "None of the above" },
            ].map((opt) => (
              <button
                key={opt.key}
                type="button"
                className="rounded-lg border border-border px-4 py-3 text-left hover:border-primary hover:bg-surface"
                onClick={() => setAnswers((a) => ({ ...a, profile: opt.key }))}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {done && (
        <div className="space-y-3">
          {results.map((q) => (
            <div key={q.code} className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <p className="text-xs font-semibold text-primary uppercase">{q.code}</p>
              <p className="font-semibold mt-0.5">{q.name}</p>
              <p className="text-sm text-muted mt-1">{q.description}</p>
            </div>
          ))}
          <button type="button" onClick={reset} className="text-sm font-medium text-primary underline underline-offset-2">
            Start over
          </button>
        </div>
      )}
    </div>
  );
}
