# Roadmap — Phased Implementation Plan

Companion to [BUILD_PROMPT.md](./BUILD_PROMPT.md). Each phase ships something
usable/deployable on its own — don't wait for the whole roadmap to launch.

**Locked infra (as of 2026-07-20):**
- **Framework:** Next.js 15 (App Router) + TypeScript + Tailwind — locked, see
  [BUILD_PROMPT.md](./BUILD_PROMPT.md#2-tech-stack--locked).
- **Database:** Supabase project `RailProject` (`ckysmmiuzualjxzjiiwv`) — Postgres 17.6,
  region `ap-south-1` (Mumbai), empty, connected to Claude Code.
- **GitHub** connected to Claude Code; pair with Vercel for deploy-on-push.
- ⚠️ There's a second, unused Supabase project (`doazubeulsonrdztpfto`, region
  `ap-northeast-1`/Tokyo) from before the region was fixed. It's empty — pause or delete
  it from the Supabase dashboard when convenient so it doesn't cause confusion later
  (not done automatically here since deleting a project is irreversible).

---

## Phase 0 — Foundations (1–2 weeks)
- [ ] Repo scaffold on the connected GitHub: Next.js 15 (App Router) + TypeScript +
      Tailwind, connect to Vercel for CI/CD on push.
- [ ] Wire `@supabase/supabase-js` against `RailProject` (`ckysmmiuzualjxzjiiwv`) + env
      vars (URL, anon key, service role key kept server-only).
- [ ] Pause/delete the unused Tokyo Supabase project (`doazubeulsonrdztpfto`) from the
      dashboard.
- [ ] Write `irctc-rules.ts`: research and pin current values for ARP days, Tatkal
      opening times, refund slabs, chart-prep timing — cite official sources, date-stamp
      each value.
- [ ] Brand: name, logo, color system, typography — original, not derivative of any
      competitor's visual identity.
- [ ] Legal skeleton: Terms, Privacy Policy, Disclaimer pages (minimal v1 is fine, expand
      later — needed before Phase 5 collects any personal data).
- [ ] Basic analytics (Plausible/PostHog).

## Phase 1 — Core Calculators (2–3 weeks)
No database needed yet — this phase alone is a shippable MVP.
- [ ] Shared `CalculatorPage` layout (input → instant result → explainer → FAQ →
      related tools).
- [ ] Booking Date (ARP) Calculator
- [ ] Tatkal Time Calculator
- [ ] Tatkal Charge Calculator
- [ ] Refund Calculator
- [ ] Chart Preparation Time Calculator
- [ ] Train Fare Calculator
- [ ] **Multi-Passenger / Group Fare Calculator** (extends the fare calculator — same
      rule engine, batch input)
- [ ] **Luggage & Baggage Allowance Calculator** (free allowance + excess charge by
      class — pure policy rules, same pattern as the rest of this phase)
- [ ] Unit tests for every rule function in `irctc-rules.ts` — this is the part that
      must never be silently wrong.
- [ ] Homepage v1: hero, live "today you can book up to..." widget, calculator grid.
- **Ship checkpoint:** deploy publicly, start collecting real search traffic — content/SEO
  compounds, don't hold it back for later phases.

## Phase 2 — Content, Trust & Polish (2 weeks, overlaps Phase 1)
- [ ] Guide content system (MDX in-repo is simplest — git-versioned, no extra service)
      + `/guides/` index with search.
- [ ] Write 6–10 initial guide articles (ARP explainer, Tatkal AC/Sleeper timing,
      cancellation charges, GNWL/RLWL/PQWL meaning, chart prep) — original writing.
- [ ] **Concession & Special Category Guide** (senior citizen, divyangjan, student) —
      content page + a small eligibility-checker tool.
- [ ] FAQ page with categorized accordion + FAQPage structured data.
- [ ] Dark mode.
- [ ] Finalize legal pages (Terms/Privacy/Disclaimer/Contact), footer disclaimer
      ("not affiliated with IRCTC/Indian Railways").
- [ ] Sitemap, robots.txt, per-page metadata audit.

## Phase 3 — Decision Tools (2 weeks)
Pure client-side, no external data dependency — good ROI before tackling train data.
- [ ] WL Confirmation Predictor (rule-band engine, transparent methodology copy).
- [ ] Quota Selector (branching quiz).
- [ ] Journey Checklist generator.
- [ ] Long Weekend Planner.
- [ ] Plan Ticket calendar (needs an Indian holiday-dates dataset per year — source and
      maintain this; ARP status computed from Phase 1's rule module).
- [ ] **Trip Cost Estimator** (fare + hotel/food/local-transport ballpark) — first tool
      designed explicitly as an affiliate surface (hotels, forex cards, travel insurance).
- [ ] **Train vs Flight vs Bus Comparator** (time/cost across modes) — second affiliate
      surface (flight/bus OTA affiliate programs).
- **First Supabase table this phase:** `feedback_votes` (see schema below) if you want
  the "help shape the roadmap" voting widget live this early — otherwise defer to Phase 6.

## Phase 4 — Train Data Tools (3–5 weeks; highest uncertainty, start sourcing early)
- [ ] **Data sourcing spike (do this first, in parallel with earlier phases):**
      evaluate data.gov.in rail datasets vs licensed third-party rail-data APIs;
      confirm licensing/ToS allow the intended use; budget for a paid API if needed.
      Do **not** default to scraping IRCTC/NTES — see the disclaimer/scope discussion.
- [ ] Data pipeline: ingest + normalize into Supabase (`trains`, `stations`,
      `train_stops` tables — see schema below), scheduled refresh (daily/weekly via a
      Supabase Edge Function or Vercel Cron), not fetched live per request.
- [ ] Train Schedule (`/trains/[number]/`) — full stop-by-stop timetable.
- [ ] Trains Between Stations — station autocomplete + route search.
- [ ] Station Trains — departures/arrivals by station.
- [ ] **Station Directory / Code Lookup** — cheap to ship alongside this phase, same
      `stations` table, good long-tail SEO.
- [ ] Festival Special Trains listing.
- [ ] Data-accuracy disclaimer component reused across all train-data pages.
- [ ] Live PNR/running-status/seat-availability: **not in this phase.** Only revisit if
      you've separately budgeted for a licensed live-data vendor — don't scrape for these.

## Phase 5 — Reminders System (3–4 weeks; start WhatsApp provisioning immediately)
- [ ] **Kick off WhatsApp Business API verification with Meta in parallel with Phase 1**
      — longest external lead time in the whole roadmap.
- [ ] `reminders` table in Supabase (see schema below).
- [ ] `.ics` calendar export — ship first, zero backend dependency.
- [ ] Email reminders (Resend/SES) + a cron sweep (Supabase Edge Function on a schedule,
      or Vercel Cron) that fires due reminders and marks them sent.
- [ ] WhatsApp reminders once template approval lands.
- [ ] Data Deletion page/flow (required before WhatsApp goes live, and good DPDP hygiene
      regardless).
- [ ] Reminder form embedded contextually on calculator pages, in addition to the
      standalone `/reminders/` page.
- [ ] **Weekly Travel Digest** (email/WhatsApp) — long-weekend/festival highlights,
      reuses this phase's delivery infra; needs a `newsletter_subscribers` table.

## Phase 6 — Engagement, UGC & Monetization (2–3 weeks, can start after Phase 2)
- [ ] Ad slots (AdSense or a travel-ad network) — reserve layout space, measure CLS impact.
- [ ] Affiliate placements on the Phase 3 Trip Cost Estimator / Mode Comparator, with
      clearly visible "Affiliate" labeling (ASCI requires the label on the link itself,
      not just a footer disclaimer).
- [ ] "My Journeys" localStorage mini-dashboard on homepage.
- [ ] Public roadmap block (Released/In Progress/Planned) + `feedback_votes`-backed
      anonymous feature-voting widget.
- [ ] **UGC "Journey Reports"** — moderated, crowdsourced traveler reports (Tatkal
      experience, delay experience, coach comfort). `journey_reports` table below. This
      is also your safe path to a future "which platform does this train usually arrive
      at" feature — built from your own users' data, not scraped from IRCTC/NTES.
  - [ ] Basic moderation: a `status` column (pending/approved/rejected) + a simple
        admin view before anything public-facing goes live, to avoid spam/abuse.
- [ ] Social presence (set up accounts, link in footer) once there's something worth
      posting.

## Phase 7 — i18n & Regional Content (2–3 weeks)
- [ ] Hindi translation pass using i18n scaffolding from Phase 0.
- [ ] Expand to 1–2 more regional languages (Tamil, Bengali, Marathi — pick by where your
      early traffic actually comes from, check analytics before committing translation
      effort).
- [ ] Regional-language guide content (not just UI strings) — this is the real SEO moat,
      UI translation alone won't move traffic much.

## Phase 8 — Launch Hardening (2 weeks)
- [ ] Mobile bottom tab nav polish, full mobile QA pass.
- [ ] Lighthouse/perf pass on top 10 pages by expected traffic.
- [ ] Re-verify every constant in `irctc-rules.ts` against current official rules right
      before public launch — rules may have shifted since Phase 0 research.
- [ ] Monitoring/alerting on the reminder cron job (a silently-broken reminder system is
      worse than not having one).
- [ ] Row-Level Security audit on every Supabase table (see schema notes below) before
      going public — this is the step most likely to be skipped and most likely to hurt.

---

## Supabase schema plan

Sketch, not final DDL — refine column types when you actually build each phase. All
tables live in `public` unless noted. No user accounts/login by design, so most tables
are keyed by a random token or contact info, not a `user_id`.

```sql
-- Phase 5
reminders (
  id uuid primary key default gen_random_uuid(),
  journey_date date not null,
  train_ref text,                    -- train number or free-text remarks
  reminder_type text not null,       -- 'advance_booking' | 'tatkal'
  fire_at timestamptz not null,      -- IST-aware, computed at insert time
  channel text[] not null,           -- subset of {'email','whatsapp','calendar'}
  contact_email text,
  contact_phone text,
  status text not null default 'pending',  -- 'pending' | 'sent' | 'failed'
  created_at timestamptz not null default now()
)

-- Phase 5
newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  phone text unique,
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz
)

-- Phase 3/6
feedback_votes (
  id uuid primary key default gen_random_uuid(),
  option text not null,              -- e.g. 'better_wl_predictor', 'mobile_app'
  created_at timestamptz not null default now()
  -- anonymous by design: no contact info, just a tally
)

-- Phase 6
journey_reports (
  id uuid primary key default gen_random_uuid(),
  train_ref text,
  journey_date date,
  category text not null,            -- 'tatkal_experience' | 'delay' | 'coach_comfort' | ...
  rating int,
  body text,
  status text not null default 'pending',  -- moderation gate before public display
  created_at timestamptz not null default now()
)

-- Phase 4 (from your licensed/open data source, not user-submitted)
stations ( code text primary key, name text not null, state text, lat numeric, lon numeric )
trains ( number text primary key, name text not null, source_code text, dest_code text, runs_on text[] )
train_stops ( train_number text references trains(number), station_code text references stations(code),
              stop_sequence int, arrival_time time, departure_time time, day_offset int )
```

**Row-Level Security:** every table above accepts anonymous public writes (no login), so
RLS policies matter a lot here — e.g. `reminders`/`feedback_votes`/`journey_reports`
should allow `insert` from the public anon key but **not** `select`/`update`/`delete`
(those go through server-side routes using the service role key). `stations`/`trains`/
`train_stops` are read-only to the public (`select` only, writes only via your data
pipeline's service-role job). Set this up per-table as you create it, not as a retrofit.

---

## Sequencing notes

- **Phase 1 is the MVP.** Everything after it is additive — go live and start earning
  SEO traffic after ~3–5 weeks instead of waiting for the full build.
- **Two external dependencies have long lead times and should start in Phase 0, not when
  their phase "arrives":** (1) sourcing/licensing a train-schedule dataset, (2) WhatsApp
  Business API verification. Both can take weeks and will bottleneck Phases 4–5 if
  started late.
- **Data accuracy is the product's core trust asset.** Budget real time for verifying
  IRCTC rules before each launch milestone, not just once at the start.
- **UGC (Phase 6) is your main durable differentiator** against sites that only compile
  public data — it's the one data source a competitor can't just copy from a government
  website, and it sidesteps the scraping/licensing risk entirely.
