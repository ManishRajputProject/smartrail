# Build Prompt — Indian Railways Booking-Assistant Website

Use this as the master spec / prompt to hand to an AI coding agent (or to follow yourself)
to build an original product **in the same category** as railwise.in: a free, no-login
toolkit that helps Indian Railways / IRCTC passengers figure out booking dates, Tatkal
timing, refunds, waitlist odds and train info, plus a reminder system so they don't miss
booking windows.

> This is a functional/structural spec, not a copy of any live site's text or design.
> Write all UI copy, brand name, logo, and visual design **from scratch**. Do not reuse
> another site's exact wording, images, or layout pixel-for-pixel.

---

## 1. Product Summary

**Problem:** Indian Railways (IRCTC) booking rules are date/time-sensitive and confusing
(60-day advance window, Tatkal opening at fixed hours, tiered cancellation refunds,
opaque waitlist confirmation odds). Travelers miss booking windows or overpay on
cancellations because the rules are scattered across gov't pages.

**Solution:** A fast, ad-supported, no-login web app that is a single home for:
- A set of deterministic **calculators** built on IRCTC's public rules (no ML needed).
- A **reminder system** (email/WhatsApp/calendar) that pings users before a booking
  window opens.
- **Train lookup tools** (schedules, station departures, route search) backed by a
  static/periodically-refreshed train database.
- **Educational guide content** for SEO and trust-building (explains ARP, Tatkal, WL
  types, quotas, chart prep).

**Business model:** Free forever, monetized via display ads + (later) affiliate/partner
placements. No login required for any core tool — this is a deliberate trust/friction
decision, keep it.

---

## 2. Tech Stack — Locked

- **Framework:** Next.js 15 (App Router) + TypeScript + Tailwind CSS. SSG for
  calculator/guide pages (SEO is the primary traffic channel), API routes / Route
  Handlers for the reminder backend and any server-side Supabase writes.
- **Database:** Supabase (Postgres 17) — project `RailProject`
  (`ckysmmiuzualjxzjiiwv`), region `ap-south-1` (Mumbai). Use `@supabase/supabase-js`
  with the anon key client-side (RLS-gated) and the service-role key only in server-side
  route handlers / scheduled jobs, never shipped to the browser.
- **Hosting/CI:** Vercel, connected to the GitHub repo for deploy-on-push. Pairs
  natively with Next.js and with Vercel Cron for the reminder scheduler.
- **Scheduler:** Vercel Cron (or a Supabase Edge Function on a schedule) to fire due
  reminders at the right IST time.
- **Email:** Resend / SES / Postmark.
- **WhatsApp:** WhatsApp Business Cloud API (Meta) — requires business verification and
  pre-approved message templates; this is the slowest-to-provision piece, start early.
- **i18n:** next-intl for English + Hindi (and later regional languages) from day one.
- **Analytics:** privacy-light analytics (Plausible/PostHog) — avoid heavy trackers,
  keep pages fast.
- **Ads:** Google AdSense or a railway-travel ad network, inserted as a non-blocking
  slot, never above the fold on a calculator's primary input.

---

## 3. Information Architecture

```
/                          Homepage — hero + live booking-window widget + tool grid
/booking-date-calculator/  60-day ARP calculator
/tatkal-time-calculator/   Tatkal opening-time calculator
/tatkal-charge-calculator/ Tatkal surcharge calculator
/refund-calculator/        Cancellation refund estimator
/chart-preparation-time/   Chart prep time calculator
/fare-calculator/          Fare estimator by class/distance
/waitlist-predictor/       Rule-based WL confirmation "outlook" (not fake %)
/quota-selector/           3-question quiz -> recommends a booking quota
/journey-checklist/        Pre-travel checklist generator
/long-weekend-planner/     Highlights long-weekend travel dates
/plan-ticket/              400-day calendar: booking status + holidays + long weekends
/trains/                   Train number -> full schedule/timetable
/trains-between/           Station A -> Station B -> matching trains
/station/                  Station -> all departing/arriving trains
/special-trains/           Festival/holiday special train listings
/disruptions/              Known disruptions/cancellations (if a data feed exists)
/reminders/                Set a booking/Tatkal reminder (email/WhatsApp/calendar)
/guides/                   Guide index + search
/guides/[slug]/            Individual long-form guide articles
/faq/                      Categorized FAQ (accordion, tabbed sections)
/terms/ /privacy-policy/ /disclaimer/ /data-deletion/ /contact/   Legal + trust pages
```

Global chrome:
- Header: logo, Tools dropdown (all tool links), Guides dropdown, Plan Ticket, Reminders,
  FAQ, language switch, dark-mode toggle.
- Mobile: bottom tab bar (Home / Trains / Tools / Reminders / More).
- Footer: tool links, guide links, legal links, social links, "not affiliated with
  IRCTC/Indian Railways" disclaimer (**required** — do not imply official affiliation).

---

## 4. Core Business Logic (public IRCTC rules — verify current values before shipping)

Encode these as pure, unit-tested functions — they are the product's actual value, keep
them accurate and cite the rule source in code comments.

- **Advance Reservation Period (ARP):** booking opens 60 days before the journey date
  (excluding the journey day itself), at 08:00 IST. *(Reduced from 120 to 60 days by
  Indian Railways effective 1 Nov 2024 — verify current value at build time, this number
  has changed before and can change again.)*
- **Tatkal opening times:** AC classes (1A/2A/3A/CC/EC) open at 10:00 IST; non-AC
  (SL/2S) open at 11:00 IST — both exactly 1 day before the journey date (from the train's
  source station).
- **Cancellation refund slabs:** tiered by hours-before-departure (e.g. >72h flat charge
  by class, 72–24h ~25% of fare, 24–8h ~50% of fare, <8h no refund) — **verify exact
  current slabs against the live IRCTC refund rules before launch**, these are revised
  periodically.
- **Chart preparation time:** typically hours before departure, with a different rule for
  early-morning-departure trains (chart may be prepared the previous night) — verify
  current rule.
- **Waitlist types:** GNWL (origin quota, best odds), RLWL (remote-location, segment-only
  cancellations help), PQWL (pooled quota, clears poorly), RSWL, TQWL (Tatkal WL, rarely
  clears). Build the predictor as **transparent rule bands** ("Very Likely / Likely /
  Uncertain / Unlikely / Very Unlikely") driven by class capacity, WL type, and days-to-
  departure — explicitly avoid presenting a fake precise percentage; be upfront in the UI
  copy that real confirmation depends on live cancellation data you don't have.
- **Quota types to model:** General, Tatkal, Premium Tatkal, Senior Citizen/Lower Berth,
  Ladies, Defence, Student/Concession, Current Booking, Emergency — each with eligibility
  and a one-line explanation.

Put every constant in one `irctc-rules.ts` (or `.config`) module with a `last_verified`
date and a link to the source, so future rule changes are a one-file update.

---

## 5. Feature Specs by Tool

### 5.1 Calculators (client-side, no backend required)
Each calculator page: H1 + short value prop, input form, instant result, a plain-language
"how this works" explainer, a small FAQ (schema.org FAQPage markup for SEO), and 3–4
"related tools" links. This pattern repeats — build one shared `CalculatorPage` layout
component.

### 5.2 WL Confirmation Predictor
Inputs: current WL number, journey date, class, WL type. Output: one of 5 outlook bands
+ a plain-language explanation of the WL type entered. No login, no history storage
required for v1.

### 5.3 Quota Selector
A 2–3 question branching quiz (e.g. urgency, traveler profile) resolving to a
recommended quota with a short reason. Implement as a small local state machine, not a
generic form.

### 5.4 Plan Ticket (booking calendar)
For each of the next ~400 days: compute booking-open status from the ARP rule, flag
Indian national/religious holidays and long weekends (needs a maintained
holiday-dates dataset per year), and let the user filter (Open Now / Opening Soon /
Long Weekends / Holidays / Weekends / Weekdays) and jump straight to "set a reminder"
for any date. Paginate ("show more") rather than rendering all rows at once.

### 5.5 Trains Between Stations / Train Schedule / Station Trains / Festival Specials
These need a **train + station dataset** (train number, name, source/destination,
intermediate stops with arrival/departure/day-offset, running days, class availability).
This is the hardest data problem in the whole build:
- Do **not** scrape IRCTC/NTES directly without checking their Terms of Service —
  many prohibit automated scraping.
- Look for a legitimate open dataset (e.g. data.gov.in rail datasets, or a licensed
  third-party rail-data API) and budget for a paid data API if a free one isn't
  reliable enough.
- Whatever source you use, **always show a visible disclaimer**: data may not be fully
  current, verify on IRCTC/NTES before booking/travel. This is a legal-exposure control,
  not boilerplate — keep it.
- Cache aggressively and refresh on a schedule (daily/weekly), don't hit the data source
  on every page load.

### 5.6 Reminders (email / WhatsApp / calendar)
Form: journey date, train number or free-text remarks, reminder type (Advance Booking vs
Tatkal — each has different default lead-time options), a computed "remind me at" time
suggestion, delivery channel checkboxes (email / WhatsApp / add-to-calendar `.ics`
download), contact field.
- No login: identify reminders by email/phone + a random token, not an account.
- Backend: store reminder row with target-fire timestamp (IST-aware), a cron sweep
  fires due reminders, marks them sent.
- WhatsApp requires an approved message template from Meta — plan a multi-week lead
  time for business verification before this channel can ship.
- `.ics` calendar export needs no backend at all — ship this first, it's the cheapest
  channel.
- Because you're collecting phone/email, you need a **Data Deletion** page/flow and a
  **Privacy Policy** before this feature goes live (required by Meta's WhatsApp
  platform policy if you use it, and generally good practice regardless).

### 5.7 Guides & FAQ
Guides: MDX or headless-CMS-backed long-form articles, each with a category tag, read
time, "last updated" date, and inline CTA links back to the relevant calculator. FAQ:
grouped into categories (Booking Dates / Tatkal / Cancellation & Refunds / Waiting List
/ Counter & PRS) as an accordion, each answer using FAQPage structured data.

### 5.8 "My Journeys" mini-dashboard (optional, v2)
A localStorage-backed (no account) list of saved journeys so a returning visitor sees
their tracked dates/reminders on the homepage. Purely client-side for v1; can graduate
to a lightweight account system later if there's demand.

### 5.9 Feedback / roadmap widget (nice-to-have)
A public "Released / In Progress / Planned" roadmap block plus a single-click, anonymous
"vote for what we build next" widget. Backed by a simple votes table, no auth. Good for
engagement and cheap qualitative product signal.

---

## 6. Non-Functional Requirements

- **SEO-first:** SSR/SSG every content and calculator page, unique title/meta per page,
  FAQPage/HowTo structured data where applicable, sitemap.xml, fast Core Web Vitals
  (these pages should be simple enough to hit 95+ Lighthouse).
- **No login for any core tool.** This is a stated trust/conversion decision — don't
  relitigate it without a strong reason.
- **Accuracy discipline:** every rule (ARP days, Tatkal times, refund slabs) must have a
  single source of truth in code with a documented "verified as of" date, because Indian
  Railways revises these periodically and stale calculators actively harm users.
- **Legal disclaimers:** "not affiliated with IRCTC/Indian Railways" in the footer, a
  data-accuracy disclaimer on any train-schedule page, Terms/Privacy/Disclaimer pages
  before collecting any personal data (email/phone for reminders).
- **i18n-ready** even if you ship English-only first — route structure and copy should
  not assume English-only strings baked into logic.
- **Mobile-first:** majority of Indian rail-booking traffic is mobile; bottom tab nav,
  large tap targets, dark mode.
- **Ad-slot friendly but not intrusive:** reserve layout space for ads so they don't
  cause layout shift, never block the primary calculator input above the fold.

---

## 7. What to Explicitly Avoid

- Don't copy another product's exact marketing copy, brand name, logo, or pixel-level
  visual design — build original creative from this functional spec.
- Don't claim real-time train data unless you actually have a live feed — if the
  backing dataset is periodically refreshed, say so.
- Don't present the waitlist predictor as a guaranteed percentage — Indian Railways
  waitlist clearing is inherently uncertain; misrepresenting confidence is a trust risk.
- Don't scrape IRCTC/NTES in violation of their terms of service.
- Don't collect phone/email for reminders without a live Privacy Policy and (if using
  WhatsApp) a Data Deletion flow.
