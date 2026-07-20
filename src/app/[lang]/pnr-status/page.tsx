import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CalculatorShell } from "@/components/CalculatorShell";
import { PnrDecoderClient } from "./PnrDecoderClient";
import { PNR_STATUS_TABLE, BOARD_LABEL } from "@/lib/pnr-status";

export const metadata: Metadata = buildMetadata({
  title: "PNR Status Decoder — What Does Your Booking Status Mean?",
  description:
    "Decode every Indian Railways PNR status code — CNF, RAC, WL, GNWL, PQWL, RLWL, TQWL and more. Know if you can board and what to do next.",
  path: "/pnr-status",
  keywords: ["PNR status meaning", "CNF RAC WL", "GNWL PQWL RLWL", "what does my train status mean"],
});

const faqs = [
  { question: "What does CNF mean on a train ticket?", answer: "CNF means Confirmed. Your seat is reserved; the coach and berth number are assigned at chart preparation, typically about 4 hours before departure." },
  { question: "Can I travel on an RAC ticket?", answer: "Yes. RAC (Reservation Against Cancellation) passengers can board and are given a shared side-berth. You may get a full berth if a confirmed passenger cancels or doesn't show." },
  { question: "What happens if my WL ticket is not confirmed?", answer: "If a waiting-list e-ticket isn't confirmed by chart preparation, you cannot board and an automatic refund is processed to your original payment method." },
  { question: "Is GNWL better than PQWL?", answer: "Yes — GNWL draws from the largest cancellation pool and confirms more reliably, while PQWL is shared across many intermediate stations and clears more slowly." },
];

export default function Page() {
  return (
    <CalculatorShell
      eyebrow="PNR Status Decoder"
      title="What Does Your PNR Status Mean?"
      breadcrumbLabel="PNR Status Decoder"
      breadcrumbHref="/pnr-status"
      description="Decode any Indian Railways booking status — CNF, RAC, and every waiting-list type — to know whether you can board and what to do next."
      badges={["Every status code", "Instant plain-English answer", "No login"]}
      faqs={faqs}
      relatedTools={[
        { href: "/waitlist-predictor", label: "WL Confirmation Outlook", description: "Estimate your waitlist confirmation odds." },
        { href: "/chart-preparation-time", label: "Chart Preparation Time", description: "When your status is finally locked in." },
        { href: "/refund-calculator", label: "Refund Calculator", description: "What you get back if you cancel." },
      ]}
      explainer={
        <>
          <h2 className="text-xl font-bold tracking-tight mb-3">Complete PNR status reference</h2>
          <div className="card overflow-x-auto">
            <table className="w-full text-[13px] min-w-[520px]">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="px-3 py-2 font-semibold">Code</th>
                  <th className="px-3 py-2 font-semibold">Full form</th>
                  <th className="px-3 py-2 font-semibold whitespace-nowrap">Can board?</th>
                  <th className="px-3 py-2 font-semibold">What it means</th>
                </tr>
              </thead>
              <tbody>
                {PNR_STATUS_TABLE.map((c) => (
                  <tr key={c.code} className="border-b border-border last:border-0 align-top">
                    <td className="px-3 py-2 font-mono font-bold text-primary whitespace-nowrap">{c.code}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{c.full}</td>
                    <td className={`px-3 py-2 font-semibold whitespace-nowrap ${BOARD_LABEL[c.board].className}`}>{BOARD_LABEL[c.board].text}</td>
                    <td className="px-3 py-2 text-muted">{c.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold tracking-tight mb-2 mt-8">What happens at chart preparation</h2>
          <ul className="space-y-1.5">
            {[
              "Charts are prepared about 4 hours before departure (previous night for early-morning trains). Waiting-list tickets are confirmed or cancelled at this point.",
              "If your WL ticket isn't confirmed at chart preparation, you cannot board and receive an automatic refund.",
              "RAC passengers can board and may get a full berth if others cancel or don't show up.",
              "Always carry a valid photo ID (Aadhaar, PAN, Passport, Driving Licence). The TTE may check it.",
            ].map((t, i) => (
              <li key={i} className="flex gap-2 text-[15px] text-muted leading-relaxed">
                <span className="text-primary mt-0.5 shrink-0" aria-hidden="true">▸</span>{t}
              </li>
            ))}
          </ul>
        </>
      }
    >
      <PnrDecoderClient />
    </CalculatorShell>
  );
}
