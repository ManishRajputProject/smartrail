export interface GuideSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
  /** Raw inline SVG markup for a diagram/illustration under this section.
   *  Inline (not an <img>) so it's crawlable, needs no image hosting, and
   *  scales cleanly at any width via its viewBox — no separate mobile art. */
  illustrationSvg?: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  /** One-sentence direct answer shown in a highlight box — written to be
   *  quotable by search/AI engines (GEO) and instantly useful to readers. */
  quickAnswer: string;
  category: "Booking" | "Tatkal" | "Waitlist" | "Cancellation" | "Chart" | "Quota" | "Travel";
  readMins: number;
  published: string;
  updated: string;
  sections: GuideSection[];
  /** Official/public sources the guide's facts were checked against (EEAT). */
  sources?: { label: string; url: string }[];
  relatedTool?: { href: string; label: string };
  /** Raw inline SVG banner shown at the top of the article, below the H1. */
  bannerSvg?: string;
}

const OFFICIAL_SOURCES = {
  irctc: { label: "IRCTC official website", url: "https://www.irctc.co.in" },
  indianRail: { label: "Indian Railways (railnet)", url: "https://indianrailways.gov.in" },
};

export const GUIDES: Guide[] = [
  {
    slug: "advance-reservation-period-explained",
    title: "What Is the 60-Day Advance Reservation Period (ARP)?",
    description:
      "How IRCTC's 60-day advance booking window works, when it opens each day, and what changed when it was cut down from 120 days.",
    quickAnswer:
      "IRCTC opens reserved train booking exactly 60 days before the journey date (excluding the journey day), at 8:00 AM IST — reduced from 120 days in November 2024.",
    category: "Booking",
    readMins: 6,
    published: "2026-07-20",
    updated: "2026-07-21",
    sections: [
      {
        paragraphs: [
          "Indian Railways lets you book a reserved ticket up to 60 days before your journey date, not counting the day of travel itself. This window is called the Advance Reservation Period, or ARP, and it opens at 08:00 IST on the ARP date.",
          "So if you're travelling on 30 September, the booking window for that date opens at 8 AM IST on 1 August — exactly 60 days earlier.",
        ],
      },
      {
        heading: "Why 60 days and not 120?",
        paragraphs: [
          "Until late 2024, Indian Railways allowed booking up to 120 days in advance. The window was shortened to 60 days to reduce the number of stale bookings, no-shows, and touting linked to very long booking horizons. If you see an old guide or calculator quoting a 120-day window, it's out of date.",
          "Tickets already booked under the old 120-day window at the time of the change remained valid — the new rule applied to fresh bookings from the changeover date onward.",
        ],
      },
      {
        heading: "What counts as the journey date?",
        paragraphs: [
          "The ARP is calculated from the train's departure date at its source station, not from the station where you're boarding. If you're boarding at an intermediate station a day after the train actually starts its journey, the booking window still opens based on the source-station departure date.",
          "This trips up a lot of travellers on long-distance trains: a train that leaves its origin at 11 PM on Monday may reach your boarding station on Tuesday morning. Your booking window is anchored to Monday, so it opens a day earlier than you might expect.",
        ],
      },
      {
        heading: "Exceptions worth knowing",
        paragraphs: [
          "A few categories sit outside the standard 60-day rule:",
        ],
        list: [
          "Tatkal quota — opens only 1 day before the journey (10 AM AC, 11 AM non-AC), regardless of ARP.",
          "Foreign Tourist quota — has a longer booking horizon than the general quota, aimed at travellers planning international trips well ahead.",
          "Certain intercity day-trains with shorter ARPs — a handful of short-distance trains have always used a shorter window; the ticket search will simply not offer dates beyond their limit.",
          "Same-day travel — handled by the Current Booking window shortly before departure, not by ARP.",
        ],
      },
      {
        heading: "Practical booking strategy",
        paragraphs: [
          "For high-demand routes (festival weeks, long weekends, popular overnight corridors), seats in Sleeper and 3A can be gone within the first hour of the window opening. Three habits make a real difference:",
        ],
        list: [
          "Know your exact opening date in advance — use the calculator rather than counting on your fingers; off-by-one errors are the most common reason people miss the window.",
          "Log in to IRCTC before 8 AM with passenger details saved in your master list, so booking takes seconds, not minutes.",
          "Set a reminder for 15 minutes before the window opens — by 8:05 AM on a popular date, you may already be on the waitlist.",
        ],
      },
    ],
    sources: [OFFICIAL_SOURCES.irctc, OFFICIAL_SOURCES.indianRail],
    relatedTool: { href: "/booking-date-calculator", label: "Booking Date Calculator" },
  },
  {
    slug: "tatkal-timing-ac-vs-non-ac",
    title: "Tatkal Booking Time: AC vs Non-AC Classes",
    description:
      "Tatkal opens at two different times depending on class — here's exactly when, and why timing to the second matters.",
    quickAnswer:
      "Tatkal booking opens one day before the journey: 10:00 AM IST for AC classes (1A, 2A, 3A, CC, EC) and 11:00 AM IST for non-AC classes (SL, 2S).",
    category: "Tatkal",
    readMins: 6,
    published: "2026-07-20",
    updated: "2026-07-21",
    sections: [
      {
        paragraphs: [
          "Tatkal booking opens exactly one day before the journey date, but the opening time depends on the class of travel.",
        ],
        list: [
          "AC classes (1A, 2A, 3A, Chair Car, Executive Chair) — Tatkal opens at 10:00 AM IST.",
          "Non-AC classes (Sleeper, Second Sitting) — Tatkal opens at 11:00 AM IST.",
        ],
      },
      {
        heading: "Why the two times are staggered",
        paragraphs: [
          "The AC and non-AC windows were split deliberately to spread the login surge across two peaks instead of one. Before the split, the 10 AM rush covered every class at once and the resulting load made the site noticeably slower at exactly the moment speed mattered most. Two windows halve the simultaneous demand.",
        ],
      },
      {
        heading: "Why does it matter to the second?",
        paragraphs: [
          "High-demand Tatkal quotas on popular routes can sell out within a couple of minutes of opening. Being logged in, with your passenger details pre-filled and payment method ready, before the clock hits the opening second is the single biggest factor in whether you get a confirmed Tatkal seat.",
          "A reminder set for a few minutes before your class's opening time is the simplest way to make sure you're not still logging in when the quota opens.",
        ],
      },
      {
        heading: "A realistic Tatkal preparation checklist",
        paragraphs: ["What experienced Tatkal bookers do the night before:"],
        list: [
          "Save every passenger in the IRCTC master list so names auto-fill instead of being typed under pressure.",
          "Decide the exact train and class in advance — and a backup train — so no time is lost searching.",
          "Keep a UPI app open and ready; slow payment is where most 'I had it in my cart' stories end.",
          "Log in 5–10 minutes early. Session queues form before the window opens, not after.",
          "If the first train shows a long Tatkal waitlist within a minute, switch to the backup immediately — TQWL clears poorly, so an early WL number on a second-choice train often beats a deep WL on the first choice.",
        ],
      },
      {
        heading: "Tatkal rules to remember",
        paragraphs: [],
        list: [
          "Tatkal tickets carry a surcharge on top of the base fare, bounded per class.",
          "Confirmed Tatkal tickets are non-refundable on normal cancellation.",
          "A maximum of four passengers can be booked per Tatkal PNR.",
          "No concessions (senior citizen, student, etc.) apply within the Tatkal quota.",
          "ID details entered at booking must match the ID carried during travel.",
        ],
      },
    ],
    sources: [OFFICIAL_SOURCES.irctc],
    relatedTool: { href: "/tatkal-time-calculator", label: "Tatkal Time Calculator" },
  },
  {
    slug: "cancellation-refund-rules",
    title: "IRCTC Ticket Cancellation Charges, Explained",
    description:
      "How much you get back when you cancel a confirmed ticket, broken down by how close to departure you cancel.",
    quickAnswer:
      "Cancelling a confirmed IRCTC ticket costs a flat per-class charge if done more than 48 hours before departure, about 25% of fare between 48–12 hours, about 50% between 12–4 hours, and there is no refund inside 4 hours.",
    category: "Cancellation",
    readMins: 7,
    published: "2026-07-20",
    updated: "2026-07-21",
    sections: [
      {
        paragraphs: [
          "Cancellation charges on a confirmed ticket scale with how close to departure you cancel. The later you cancel, the more you lose.",
        ],
        list: [
          "More than 48 hours before departure — a flat cancellation charge per class is deducted, the rest is refunded.",
          "Between 48 and 12 hours before departure — roughly 25% of the fare is deducted as cancellation charge.",
          "Between 12 and 4 hours before departure — roughly 50% of the fare is deducted.",
          "Less than 4 hours before departure — no refund on a confirmed ticket.",
        ],
      },
      {
        heading: "RAC and waitlisted tickets",
        paragraphs: [
          "RAC and waitlisted tickets follow a different, generally more lenient, refund path than confirmed tickets. A waitlisted ticket that never confirms by chart preparation is cancelled automatically with a refund, minus a small clerkage charge per passenger.",
          "If your ticket is still RAC or waitlisted and you cancel it yourself before the cutoff, you also lose only the clerkage charge — not the percentage slabs that apply to confirmed tickets.",
        ],
      },
      {
        heading: "When to file a TDR instead",
        paragraphs: [
          "A Ticket Deposit Receipt (TDR) is the route for refund situations a normal online cancellation can't handle — for example, if the train was cancelled by railways, delayed by more than three hours and you chose not to travel, or you were unable to travel on a confirmed ticket after chart preparation for a covered reason.",
          "TDR refunds are not instant; they go through a review process that can take days to weeks. File as soon as possible after the journey date — TDR windows are short, often within hours of the scheduled departure for most reasons.",
        ],
      },
      {
        heading: "Common refund mistakes",
        paragraphs: [],
        list: [
          "Waiting until the last hour to cancel a confirmed ticket you know you won't use — every slab you slip past costs you more.",
          "Assuming a Tatkal ticket refunds like a normal ticket — confirmed Tatkal tickets are non-refundable on normal cancellation.",
          "Forgetting that partial cancellation is possible — on a multi-passenger PNR you can cancel just one passenger and keep the rest.",
          "Missing that the refund lands back on the original payment method, which can take several working days depending on the bank.",
        ],
      },
      {
        heading: "Rules change — verify before you rely on a number",
        paragraphs: [
          "Indian Railways revises fare and refund rules from time to time. Use the calculator for a same-day estimate, but always check the cancellation screen on IRCTC for the exact amount before you confirm.",
        ],
      },
    ],
    sources: [OFFICIAL_SOURCES.irctc, OFFICIAL_SOURCES.indianRail],
    relatedTool: { href: "/refund-calculator", label: "Refund Calculator" },
  },
  {
    slug: "waiting-list-types-explained",
    title: "GNWL, RLWL, PQWL, TQWL — What Do They Mean?",
    description:
      "The waiting-list code on your ticket tells you a lot about your real confirmation odds. Here's what each one means.",
    quickAnswer:
      "GNWL (origin-station waitlist) clears best; RLWL and PQWL (intermediate-station pools) clear slower; TQWL (Tatkal waitlist) rarely clears because Tatkal tickets are almost never cancelled.",
    category: "Waitlist",
    readMins: 7,
    published: "2026-07-20",
    updated: "2026-07-21",
    sections: [
      {
        paragraphs: [
          "When you book a waitlisted ticket, IRCTC assigns it to one of several waiting-list pools depending on where you're boarding and which quota you booked under. The pool matters more than the raw number — a GNWL/20 and a PQWL/20 have very different odds.",
        ],
        list: [
          "GNWL (General Waiting List) — for passengers boarding at or near the train's origin. Draws from the largest cancellation pool, generally the best odds.",
          "RLWL (Remote Location Waiting List) — for specific intermediate boarding stations. Only cancellations on your exact segment help.",
          "PQWL (Pooled Quota Waiting List) — a quota shared across several intermediate stations, clears more slowly than GNWL.",
          "RSWL (Road Side Waiting List) — a very small quota at smaller intermediate stations, historically the slowest to clear.",
          "TQWL (Tatkal Quota Waiting List) — waitlist within the Tatkal quota. Since Tatkal tickets are non-refundable, they're rarely cancelled, so TQWL confirms only occasionally.",
        ],
      },
      {
        heading: "Reading the numbers on your ticket",
        paragraphs: [
          "A status like GNWL 34/WL 12 has two parts: the first number is the waitlist position when you booked; the second is your current position. Only the second number matters — it falls as people ahead of you cancel or get bumped up. Track the current number, not the booking number.",
        ],
      },
      {
        heading: "What actually clears a waitlist",
        paragraphs: [
          "Waitlisted tickets confirm as confirmed passengers cancel, and — at chart preparation — as unsold quota seats (like unfilled Tatkal or pooled quotas) are released back to the general pool. Chart preparation, usually a few hours before departure, is the cutoff: any ticket still waitlisted at that point is auto-cancelled and refunded. You cannot board on a fully waitlisted e-ticket.",
        ],
      },
      {
        heading: "Improving your odds",
        paragraphs: [],
        list: [
          "Prefer GNWL over RLWL/PQWL when you have a choice of boarding stations — sometimes boarding one station earlier moves you into the origin quota.",
          "Sleeper and 3A have the most seats, so their waitlists clear fastest; 2A and 1A waitlists move slowly simply because there are fewer berths.",
          "Book the moment the 60-day window opens; a low WL number early often confirms weeks before travel.",
          "Check alternate trains on the same route — a WL 5 on a less famous train usually beats WL 40 on the popular one.",
        ],
      },
    ],
    sources: [OFFICIAL_SOURCES.irctc],
    relatedTool: { href: "/waitlist-predictor", label: "WL Confirmation Outlook" },
  },
  {
    slug: "chart-preparation-time-explained",
    title: "When Is the Train Chart Prepared?",
    description:
      "Chart preparation is the moment your waitlisted ticket's fate is decided. Here's roughly when it happens.",
    quickAnswer:
      "The first reservation chart is prepared about 4 hours before departure — but for trains leaving between midnight and 8 AM, it's prepared the previous evening around 9 PM. A second chart follows closer to departure.",
    category: "Chart",
    readMins: 5,
    published: "2026-07-20",
    updated: "2026-07-21",
    sections: [
      {
        paragraphs: [
          "The 'chart' is the final passenger list and berth allocation for a train. Once it's prepared, seat/berth assignments are locked in, and any ticket still on the waiting list is automatically cancelled and refunded.",
          "As a general rule, the first chart is prepared about 4 hours before the train's scheduled departure from its source station.",
        ],
      },
      {
        heading: "The early-morning exception",
        paragraphs: [
          "For trains scheduled to depart in the early morning (roughly midnight to 8 AM), preparing the chart 4 hours ahead would mean doing it in the middle of the night — so railways instead prepare the chart the previous evening, typically around 9 PM.",
          "A second, final chart is usually prepared closer to departure (around 30 minutes before) to account for any very last cancellations. Seats that open up between the two charts can be bought through the Current Booking window at the station or online.",
        ],
      },
      {
        heading: "What chart time means for you",
        paragraphs: [],
        list: [
          "Waitlisted? Your realistic last chance to confirm is the first chart. If you're still WL after it, your e-ticket is auto-cancelled.",
          "Want a last-minute seat? Check Current Booking right after the first chart — released quota seats appear there at normal fare.",
          "Cancelling? The refund slabs are computed against departure time, but a confirmed ticket cancelled after chart preparation generally needs a TDR instead of a normal cancellation.",
          "Boarding mid-route? Chart timing still follows the source station's departure, so your berth may be locked in many hours before your own boarding time.",
        ],
      },
    ],
    sources: [OFFICIAL_SOURCES.irctc],
    relatedTool: { href: "/chart-preparation-time", label: "Chart Preparation Time Calculator" },
  },
  {
    slug: "railway-quota-types-guide",
    title: "Every Indian Railways Booking Quota, Explained",
    description:
      "General, Tatkal, Ladies, Senior Citizen, Defence and more — what each quota is for and who's eligible.",
    quickAnswer:
      "Indian Railways splits every train's seats into quotas: General (largest, opens 60 days out), Tatkal (1 day out, surcharge), plus reserved pools for women, senior citizens, defence personnel, students, and last-minute Current Booking.",
    category: "Quota",
    readMins: 6,
    published: "2026-07-20",
    updated: "2026-07-21",
    sections: [
      {
        paragraphs: [
          "Indian Railways reserves seats across several distinct quotas, each meant for a different kind of traveller or situation. Booking under the right quota can meaningfully change your odds of getting a confirmed seat.",
        ],
      },
      {
        heading: "The quotas most travellers actually use",
        paragraphs: [],
        list: [
          "General (GN) — the default and largest pool; opens 60 days before the journey at 8 AM IST.",
          "Tatkal (TQ) — last-minute quota opening 1 day before travel, with a class-dependent surcharge and no refund on confirmed cancellations.",
          "Premium Tatkal (PT) — a dynamically priced slice of Tatkal on select trains; fares rise with demand.",
          "Ladies (LQ) — a small pool of lower berths for women travelling alone or in all-women groups, mainly in SL and 3A.",
          "Senior Citizen / Lower Berth (LD) — lower berths earmarked for senior citizens (men 60+, women 58+) and eligible travellers with mobility needs.",
        ],
      },
      {
        heading: "Special-eligibility quotas",
        paragraphs: [],
        list: [
          "Defence (DF) — serving Defence and CAPF personnel travelling on duty or warrant.",
          "Student concessions (SS) — discounted fares for students carrying a valid institution concession certificate; applies to base fare, not Tatkal.",
          "Divyangjan (physically challenged) concession — substantial fare concessions with a railway-issued concession card, plus an escort concession on most classes.",
          "Emergency (EQ) — released case-by-case by railway officials for genuine emergencies; not directly bookable on IRCTC.",
          "Current Booking (CK) — unsold seats released shortly before departure at normal fare, bookable online or at the station counter.",
        ],
      },
      {
        heading: "Quota strategy in practice",
        paragraphs: [
          "If you're eligible for a special quota, use it — the pools are small but so is the competition. A senior citizen booking under LD frequently gets a confirmed lower berth on trains where the general quota is already waitlisted. Likewise, two women travelling together should always try the Ladies quota before settling for a general-quota waitlist.",
        ],
      },
    ],
    sources: [OFFICIAL_SOURCES.irctc, OFFICIAL_SOURCES.indianRail],
    relatedTool: { href: "/quota-selector", label: "Quota Selector" },
  },
  {
    slug: "senior-citizen-concession-guide",
    title: "Senior Citizen Railway Concessions & Lower Berth Rules",
    description:
      "Who counts as a senior citizen on Indian Railways, what concessions exist, and how the lower-berth quota works.",
    quickAnswer:
      "Indian Railways treats men 60+ and women 58+ as senior citizens: they get priority for the lower-berth quota at booking, and berth preference during allocation — verify the current fare-concession status on IRCTC, as it has changed over the years.",
    category: "Quota",
    readMins: 5,
    published: "2026-07-21",
    updated: "2026-07-21",
    sections: [
      {
        paragraphs: [
          "Senior citizens are one of the few traveller groups with their own dedicated berth quota, and the rules are worth knowing precisely — they decide whether a 70-year-old ends up climbing to an upper berth.",
        ],
      },
      {
        heading: "Who qualifies",
        paragraphs: [],
        list: [
          "Men aged 60 and above on the date of journey.",
          "Women aged 58 and above on the date of journey.",
          "Age is validated against the ID carried during travel — carry the same ID used at booking.",
        ],
      },
      {
        heading: "The lower-berth quota",
        paragraphs: [
          "A set of lower berths in Sleeper, 3A and 2A is earmarked for senior citizens, women aged 45+, and pregnant women. To use it, select the 'Lower berth' preference at booking — the quota is applied automatically when eligibility criteria are met and berths remain.",
          "Even outside the quota, the reservation system's allocation logic gives lower-berth preference to senior citizens when the passenger list makes it possible. Booking early matters: the quota is small and exhausts quickly on popular trains.",
        ],
      },
      {
        heading: "Fare concessions — check current status",
        paragraphs: [
          "Senior-citizen fare concessions have been suspended and revised at various points in recent years, so treat any specific percentage you read online with caution. Before assuming a discount, check the fare shown at booking on IRCTC — the fare screen always reflects the currently applicable concession, if any.",
        ],
      },
      {
        heading: "Practical tips",
        paragraphs: [],
        list: [
          "Book under the Lower Berth quota option rather than just noting a preference in the general quota when eligible.",
          "On overnight trains, 3A is often the sweet spot: cheaper than 2A but with the same lower-berth quota mechanics.",
          "If no lower berth is available at booking, ask the TTE on board — berth swaps at chart time are common when other passengers' preferences free one up.",
        ],
      },
    ],
    sources: [OFFICIAL_SOURCES.irctc],
    relatedTool: { href: "/quota-selector", label: "Quota Selector" },
  },
  {
    slug: "first-time-irctc-booking-guide",
    title: "How to Book a Train Ticket on IRCTC: First-Timer's Guide",
    description:
      "From creating an account to picking the right class and quota — a start-to-finish walkthrough for your first online train booking.",
    quickAnswer:
      "To book on IRCTC: create an account with a verified mobile and email, search trains by route and date, pick a class and quota, add passengers, pay, and download the e-ticket — carry the booked ID during travel.",
    category: "Booking",
    readMins: 8,
    published: "2026-07-21",
    updated: "2026-07-21",
    sections: [
      {
        paragraphs: [
          "Booking a train ticket online in India is straightforward once you understand the sequence. This guide walks through it end-to-end, with the small details that first-timers usually learn the hard way.",
        ],
      },
      {
        heading: "1. Set up your account properly",
        paragraphs: [
          "Register on IRCTC with a mobile number and email you control — both get verified with OTPs. Do it days before you actually need a ticket, not at 9:55 AM on a Tatkal morning. Once logged in, add every regular co-traveller to the master list with name, age, gender and ID details; this turns passenger entry into a two-click step at booking time.",
        ],
      },
      {
        heading: "2. Search smart, not just by city",
        paragraphs: [],
        list: [
          "Big cities have multiple stations (Delhi alone has several) — search by station code when you can; our station directory lists the major codes.",
          "Use the 'flexible with date' view for long routes; shifting a day often turns a waitlist into a confirmed seat.",
          "Check both the fastest trains and the slower ones — the famous trains waitlist first.",
        ],
      },
      {
        heading: "3. Understand class and quota before paying",
        paragraphs: [
          "Class decides comfort; quota decides competition. SL is the budget overnight class, 3A the mid-range air-conditioned one, 2A quieter with more privacy, and CC/EC daytime seating. On the quota side, the general quota is the default; use special quotas (Ladies, Senior Citizen lower berth) whenever eligible, and reach for Tatkal only when you missed the advance window.",
          "Berth status codes matter at this step: AVAILABLE means confirmed on payment, RAC means you board with a shared berth that usually upgrades, and WL means you're queuing for cancellations — read our waitlist guide before paying for a deep WL number.",
        ],
      },
      {
        heading: "4. Pay and secure the ticket",
        paragraphs: [
          "UPI is generally the fastest, most reliable payment path — speed matters for high-demand bookings where seats can sell out during a slow card 3-D Secure redirect. After payment, the e-ticket (ERS) appears under 'My Bookings'; download or screenshot it. You don't need a printout — the e-ticket on your phone plus the original photo ID of any one passenger on the PNR is enough.",
        ],
      },
      {
        heading: "5. After booking",
        paragraphs: [],
        list: [
          "Track your PNR status if you're RAC or waitlisted — status changes right up to chart preparation.",
          "Note your coach and berth after the chart is prepared; platform boards and the coach-position apps help you stand at the right spot.",
          "Cancelling? Do it as early as possible — cancellation charges climb in slabs as departure approaches.",
        ],
      },
    ],
    sources: [OFFICIAL_SOURCES.irctc],
    relatedTool: { href: "/booking-date-calculator", label: "Booking Date Calculator" },
  },
  {
    slug: "train-coach-position-composition-guide",
    title: "Train Coach Position: How to Find Your Coach on the Platform",
    description:
      "How Indian Railways orders coaches from engine to rear, how to read a coach position board, and how to check your exact train's live formation before it arrives.",
    quickAnswer:
      "Indian Railways trains are made up of a fixed sequence of coaches — usually General/Unreserved near the engine, then Sleeper, then AC classes, then a pantry car, with another General or SLR coach at the far end — but the exact order and which end faces which platform varies by train, so it's worth checking your specific train's live coach position rather than assuming.",
    category: "Travel",
    readMins: 7,
    published: "2026-08-10",
    updated: "2026-08-10",
    bannerSvg: `<svg viewBox="0 0 760 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Simplified diagram of a typical Indian Railways coach composition from engine to rear">
      <rect width="760" height="170" fill="var(--surface-2)"/>
      <rect x="0" y="132" width="760" height="8" fill="var(--border)"/>
      <rect x="0" y="140" width="760" height="3" fill="var(--border)" opacity="0.5"/>
      <g font-family="inherit" font-weight="700" text-anchor="middle">
        <rect x="24" y="58" width="86" height="60" rx="10" fill="var(--foreground)" opacity="0.82"/>
        <text x="67" y="94" font-size="14" fill="var(--surface-2)">ENG</text>
        <g>
          <rect x="122" y="64" width="72" height="52" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
          <text x="158" y="96" font-size="13" fill="var(--foreground)">GEN</text>
        </g>
        <g>
          <rect x="202" y="64" width="72" height="52" rx="8" fill="var(--primary-soft)" stroke="var(--primary)" stroke-width="2"/>
          <text x="238" y="96" font-size="13" fill="var(--primary)">S1</text>
        </g>
        <g>
          <rect x="282" y="64" width="72" height="52" rx="8" fill="var(--primary-soft)" stroke="var(--primary)" stroke-width="2"/>
          <text x="318" y="96" font-size="13" fill="var(--primary)">S2</text>
        </g>
        <g>
          <rect x="362" y="64" width="72" height="52" rx="8" fill="var(--secondary-soft, var(--primary-soft))" stroke="var(--secondary, var(--primary))" stroke-width="2"/>
          <text x="398" y="96" font-size="13" fill="var(--secondary, var(--primary))">B2</text>
        </g>
        <g>
          <rect x="442" y="64" width="72" height="52" rx="8" fill="var(--secondary-soft, var(--primary-soft))" stroke="var(--secondary, var(--primary))" stroke-width="2"/>
          <text x="478" y="96" font-size="13" fill="var(--secondary, var(--primary))">B1</text>
        </g>
        <g>
          <rect x="522" y="64" width="72" height="52" rx="8" fill="var(--accent-soft, var(--primary-soft))" stroke="var(--accent, var(--primary))" stroke-width="2"/>
          <text x="558" y="96" font-size="13" fill="var(--accent, var(--primary))">A1</text>
        </g>
        <g>
          <rect x="602" y="64" width="66" height="52" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 3"/>
          <text x="635" y="96" font-size="12" fill="var(--muted)">PC</text>
        </g>
        <g>
          <rect x="676" y="64" width="60" height="52" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
          <text x="706" y="96" font-size="12" fill="var(--foreground)">SLR</text>
        </g>
      </g>
      <text x="380" y="30" font-size="13" fill="var(--muted)" text-anchor="middle">Engine end</text>
      <text x="24" y="150" font-size="10" fill="var(--muted)">Illustrative order only — always confirm against your PNR / live coach position</text>
    </svg>`,
    sections: [
      {
        paragraphs: [
          "You're standing on a 600-metre platform with two minutes before your train pulls in, and you have no idea whether coach S4 will stop at the end you're standing on. This is one of the most common small stresses of Indian train travel — and almost entirely avoidable once you understand how coach composition works.",
          "\"Coach position\" (sometimes called coach composition or train formation) simply means the order in which coaches are attached, from the engine at one end to the last coach at the other. Indian Railways doesn't randomise this — every train runs a fixed, published sequence — but the sequence differs from train to train, and which end of the platform faces the engine can flip depending on how the train enters the station.",
        ],
      },
      {
        heading: "The general pattern most trains follow",
        paragraphs: [
          "While every train has its own exact composition, most long-distance Indian Railways trains follow a broadly similar logic, working outward from the engine:",
        ],
        list: [
          "General (unreserved) coaches, often closest to the engine — they're used by passengers without reserved seats and tend to get crowded fastest, so they're placed for quick platform access.",
          "Sleeper class (SL) coaches next, numbered sequentially (S1, S2, S3...) — the backbone of most trains, non-AC with open windows.",
          "AC coaches after that — Third AC (B1, B2...), Second AC (A1, A2...), and First AC (H1) where the train carries it, roughly in ascending order of class.",
          "A pantry car (PC) on trains that serve cooked meals, usually positioned centrally so catering staff can reach both directions.",
          "One more General coach or an SLR (a combined luggage/guard coach) at the far end, opposite the engine.",
        ],
      },
      {
        heading: "Why you can't just memorise \"S1 is always near the engine\"",
        paragraphs: [
          "The pattern above is a rough default, not a rule. Real trains deviate from it constantly: some run with the engine at what would normally be the \"rear\" based on which direction the return journey needs; some stations require a train to reverse, which flips the entire formation relative to the platform; and special trains, holiday specials, and rakes borrowed from other trains sometimes carry a completely different coach count and order than the timetable implies.",
          "This is exactly why relying on memory or a general rule is risky for trains you don't travel on often. The composition that mattered for your journey six months ago may not be the one running today.",
        ],
      },
      {
        heading: "The reliable way: check the live coach position for your train",
        paragraphs: [
          "Rather than guessing, look up your specific train number on SmartRail's Train Finder. Where RailRadar's live feed has coach data for that train, the train's page shows a real-time coach formation — the actual order of coaches as reported for that specific run, not a generic template. It's the same kind of information railway staff use to guide passengers on busy platforms.",
          "If live coach data isn't available for a particular train (coverage depends on what's being reported for that specific service), your safest fallback is the coach position display board at the station itself, or asking platform staff — both reflect the day's actual formation rather than an assumption.",
        ],
      },
      {
        heading: "Reading a station's coach position indicator board",
        paragraphs: [
          "Most major stations post a coach position chart near the platform entrance or on pillars along the platform — usually a horizontal strip showing coach codes in order, sometimes marked against numbered platform sections (like \"S4 stops between pillar 12 and 13\"). These boards are specific to that train and that day's rake, so they're generally more reliable in the moment than any app, live data included — treat live coach position as your planning tool before you leave for the station, and the platform board as your final confirmation once you're there.",
        ],
      },
      {
        heading: "Why this connects to chart preparation",
        paragraphs: [
          "One subtlety worth knowing: your own coach and berth number are only finalised at chart preparation, a few hours before departure — not at the moment of booking. If you're still waitlisted or RAC when you check coach position, your eventual coach may not even be assigned yet. It's worth checking our chart preparation time guide alongside this one if you're travelling on a partially confirmed ticket, so you know exactly when your final coach and berth lock in.",
        ],
      },
      {
        heading: "Terms that get mixed up with \"coach position\"",
        paragraphs: [
          "A few related terms cause confusion because they sound similar but answer different questions. \"Coach position\" is about where a coach physically sits in the train, relative to the engine and to the platform. Your \"berth number\" is about where you sit inside that coach, and is a completely separate piece of information assigned at chart preparation. \"Seat/berth layout\" refers to how bays and berths are arranged within a class (for example, how a 3A coach's eight-berth bays differ from a 2A coach's six-berth bays with curtains) — that's a class-design question, not a coach-position one. Knowing which question you're actually asking makes it much faster to find the right answer instead of scrolling through unrelated information.",
        ],
      },
      {
        heading: "Why composition can differ from what you remember",
        paragraphs: [
          "Two structural reasons explain most of the variation: rake type and operational adjustments. Trains running on older ICF (Integral Coach Factory) rakes and newer LHB (Linke-Hofmann-Busch) rakes can have different coach counts and slightly different standard orderings even on similar routes, because the two rake types aren't interchangeable in composition. Separately, railway divisions sometimes adjust a specific service's composition temporarily — adding or removing coaches for a festival rush, or substituting a rake with a different one during maintenance — without that being reflected in general-purpose route guides. Neither of these is something a traveller can predict from first principles; they're exactly why checking the live, specific data for your train number beats relying on memory or a generic diagram, including this one.",
        ],
      },
      {
        heading: "Quick checklist before you head to the platform",
        paragraphs: [],
        list: [
          "Look up your train number on SmartRail and check the live coach position, if available.",
          "Note both your coach code (e.g. B2) and, once assigned, your berth number.",
          "Arrive early enough to walk the platform if you're unsure — general coaches fill first, so don't linger near them if that's not your class.",
          "Cross-check against the station's own coach position board on arrival; it reflects that day's actual rake.",
          "Remember the formation can differ on the return leg of the same train number — don't assume symmetry.",
        ],
      },
    ],
    sources: [OFFICIAL_SOURCES.irctc, OFFICIAL_SOURCES.indianRail],
    relatedTool: { href: "/trains", label: "Train Finder & Live Coach Position" },
  },
  {
    slug: "vande-bharat-express-booking-rules-guide",
    title: "Vande Bharat Express: Booking Rules, Classes & What to Know Before You Travel",
    description:
      "How Vande Bharat Express booking actually works — classes, quotas, catering, luggage and cancellation — separating what's genuinely different about it from what's just standard IRCTC rules.",
    quickAnswer:
      "Vande Bharat Express uses the same IRCTC booking window, Tatkal timing and cancellation rules as any other reserved train — what's different is the train itself: fully air-conditioned chair-car seating only (CC and EC classes, no sleeper berths), an onboard catering charge usually bundled into the fare by default, and semi-high-speed daytime schedules rather than overnight travel.",
    category: "Booking",
    readMins: 8,
    published: "2026-08-10",
    updated: "2026-08-10",
    bannerSvg: `<svg viewBox="0 0 760 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Simplified side-profile illustration of a Vande Bharat Express train">
      <rect width="760" height="170" fill="var(--surface-2)"/>
      <rect x="0" y="140" width="760" height="6" fill="var(--border)"/>
      <path d="M40 100 Q10 100 10 78 Q10 58 55 58 L700 58 Q730 58 730 82 L730 100 Z" fill="var(--primary)"/>
      <path d="M700 58 Q730 58 730 82 L730 100 L690 100 L690 60 Z" fill="var(--accent, var(--primary))" opacity="0.85"/>
      <g fill="var(--surface)" opacity="0.92">
        <rect x="70" y="70" width="34" height="20" rx="4"/>
        <rect x="116" y="70" width="34" height="20" rx="4"/>
        <rect x="162" y="70" width="34" height="20" rx="4"/>
        <rect x="208" y="70" width="34" height="20" rx="4"/>
        <rect x="254" y="70" width="34" height="20" rx="4"/>
        <rect x="300" y="70" width="34" height="20" rx="4"/>
        <rect x="346" y="70" width="34" height="20" rx="4"/>
        <rect x="392" y="70" width="34" height="20" rx="4"/>
        <rect x="438" y="70" width="34" height="20" rx="4"/>
        <rect x="484" y="70" width="34" height="20" rx="4"/>
        <rect x="530" y="70" width="34" height="20" rx="4"/>
        <rect x="576" y="70" width="34" height="20" rx="4"/>
        <rect x="622" y="70" width="34" height="20" rx="4"/>
      </g>
      <circle cx="120" cy="102" r="14" fill="var(--foreground)" opacity="0.75"/>
      <circle cx="220" cy="102" r="14" fill="var(--foreground)" opacity="0.75"/>
      <circle cx="540" cy="102" r="14" fill="var(--foreground)" opacity="0.75"/>
      <circle cx="640" cy="102" r="14" fill="var(--foreground)" opacity="0.75"/>
      <text x="380" y="130" font-size="13" fill="var(--muted)" text-anchor="middle" font-weight="700">Chair Car (CC) &amp; Executive Chair Car (EC) — no sleeper classes</text>
    </svg>`,
    sections: [
      {
        paragraphs: [
          "Vande Bharat Express gets asked about differently from most trains — partly because it's newer and unfamiliar, and partly because its marketing (premium, semi-high-speed, indigenously built) makes people assume the booking process itself must be special too. It mostly isn't. Almost everything about how you book a Vande Bharat ticket is identical to booking any other reserved IRCTC train; the differences that do exist are about the train's design, not the booking system.",
        ],
      },
      {
        heading: "What actually makes Vande Bharat different",
        paragraphs: [
          "Vande Bharat is a self-propelled train set — there's no separate locomotive pulling it, which is part of how it achieves faster acceleration and shorter halt times. Every coach is fully air-conditioned. It runs seated classes only: Chair Car (CC) and Executive Chair Car (EC), the latter with wider seats and extra legroom. There is no Sleeper class and no berths of any kind, which matters if you were expecting to book an overnight journey the way you would on a Rajdhani or a regular Sleeper/3A train — Vande Bharat routes are generally scheduled as long day journeys, not overnight ones.",
        ],
      },
      {
        heading: "Booking window and Tatkal — no special rules here",
        paragraphs: [
          "Vande Bharat tickets open exactly like any other reserved train: within the standard 60-day Advance Reservation Period, and through Tatkal the day before travel at the usual 10:00 AM (AC classes) opening — see our ARP guide and Tatkal timing guide for the exact mechanics, since they apply here without modification. There is no separate \"Vande Bharat quota\" or earlier booking window; if a route is in high demand, the difference you'll feel is competition for seats, not a different set of rules.",
        ],
      },
      {
        heading: "Catering: the one thing people most often get wrong",
        paragraphs: [
          "Onboard catering is commonly included in the base fare on many Vande Bharat routes by default, rather than being a pay-as-you-go option like on a typical Sleeper or 3A journey. That default has been a frequent source of billing confusion — passengers who don't want the meal, or who are travelling short distances where it's not served, have sometimes been surprised by the included charge. IRCTC does generally allow opting out of catering during or shortly after booking on eligible routes, which can reduce the fare and is worth actively checking for rather than assuming. Because this behaviour has changed over time and can vary by specific train and zone, always check the exact catering terms shown at the time of booking on IRCTC directly rather than relying on a fixed rule.",
        ],
      },
      {
        heading: "Luggage and general conduct rules",
        paragraphs: [
          "Luggage allowances follow the same Indian Railways limits that apply to any AC chair-car class — there's no separate, stricter Vande Bharat-specific limit publicly documented beyond standard AC class rules. Because it's a fully enclosed, higher-footfall train with automatic doors and large picture windows, practical common sense matters more than on older trains: keep bags in the overhead/under-seat space provided, and be mindful that boarding/alighting windows at stops can be shorter given the train's faster halt times.",
        ],
      },
      {
        heading: "Cancellations, refunds and checking your PNR",
        paragraphs: [
          "Cancellation charges and the refund slab structure follow the same rules as any other AC-class reserved ticket — see our cancellation and refund guide for the exact numbers by how close to departure you cancel. If you're waitlisted, the same PNR status codes and confirmation logic apply as on any other train; our PNR Status Decoder explains what each code means, and the Waitlist Confirmation Outlook tool gives an honest, pattern-based read on your odds rather than a guess.",
        ],
      },
      {
        heading: "Checking routes, timings and live status",
        paragraphs: [
          "Because Vande Bharat routes have expanded quickly and new corridors are added periodically, the most reliable way to confirm whether a route exists, what its timings are, and whether it's running on schedule today is to search the specific train on SmartRail's Train Finder rather than relying on a list that may already be out of date. Live running status, platform and delay information — where available — updates in real time on the train's page.",
        ],
      },
      {
        heading: "How Vande Bharat compares to Rajdhani and Shatabdi",
        paragraphs: [
          "It's easy to lump India's premium trains together, but they serve different journeys. Rajdhani Express is built for long-distance overnight travel between state capitals and Delhi, running full AC sleeper classes (1A/2A/3A) so you can actually lie down across the night. Shatabdi Express is an older-generation same-day AC chair-car train, typically covering shorter intercity distances with a return same evening. Vande Bharat sits closest to Shatabdi in format — day journey, chair-car seating only, no berths — but uses newer self-propelled rolling stock aimed at faster acceleration and shorter station halts, and its route network has grown to cover both short and considerably longer day-journey corridors than Shatabdi traditionally ran. If your journey needs an overnight sleeping berth, Vande Bharat is the wrong category regardless of route availability — that's what Rajdhani, Duronto or a standard Sleeper/3A train are for.",
        ],
      },
      {
        heading: "Practical tips for a more comfortable journey",
        paragraphs: [],
        list: [
          "Book a window seat if scenery or photography matters to you — the large windows are one of the more distinctive features of the coach design.",
          "Carry a charging cable — most Vande Bharat coaches include onboard charging points at or near every seat, but bringing your own cable avoids relying on it.",
          "Automatic doors between vestibules mean less manual effort moving between coaches, but also mean less time to react if you're rushing to detrain at a short halt — be at the door a stop ahead if you're getting off.",
          "Since there's no sleeper class, don't plan a Vande Bharat leg as your overnight rest on a multi-city itinerary — pair it with a hotel or a proper overnight train for that portion instead.",
        ],
      },
    ],
    sources: [OFFICIAL_SOURCES.irctc, OFFICIAL_SOURCES.indianRail],
    relatedTool: { href: "/trains", label: "Find Vande Bharat Routes & Live Status" },
  },
  {
    slug: "irctc-regret-meaning-explained",
    title: "IRCTC \"Regret\" Meaning: Why Your Booking Failed and What To Do Next",
    description:
      "What \"Regret\" actually means when IRCTC can't complete your booking, how it's different from a waitlisted ticket or a failed payment, and what to try next.",
    quickAnswer:
      "\"Regret\" on IRCTC means the system could not complete your booking request — almost always because there is no seat and no further waiting-list position available in the class and quota you selected for that train and date. It happens before any payment is taken, so it's different from a waitlisted ticket (which is booked) or a payment failure (where money may have moved).",
    category: "Booking",
    readMins: 7,
    published: "2026-08-10",
    updated: "2026-08-10",
    bannerSvg: `<svg viewBox="0 0 760 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flowchart of an IRCTC booking attempt ending in Confirmed, Waitlisted, or Regret">
      <rect width="760" height="210" fill="var(--surface-2)"/>
      <g font-weight="700" text-anchor="middle">
        <rect x="300" y="18" width="160" height="46" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
        <text x="380" y="46" font-size="13" fill="var(--foreground)">Submit Booking</text>
        <path d="M380 64 L380 84" stroke="var(--border)" stroke-width="2" marker-end="url(#arrow)"/>
        <path d="M380 84 L150 110" stroke="var(--border)" stroke-width="2"/>
        <path d="M380 84 L380 110" stroke="var(--border)" stroke-width="2"/>
        <path d="M380 84 L610 110" stroke="var(--border)" stroke-width="2"/>
        <rect x="60" y="112" width="180" height="70" rx="10" fill="var(--success-soft, var(--primary-soft))" stroke="var(--success, var(--primary))" stroke-width="2"/>
        <text x="150" y="140" font-size="13" fill="var(--success, var(--primary))">Confirmed</text>
        <text x="150" y="160" font-size="10" font-weight="500" fill="var(--muted)">Seat booked</text>
        <rect x="290" y="112" width="180" height="70" rx="10" fill="var(--accent-soft, var(--primary-soft))" stroke="var(--accent, var(--primary))" stroke-width="2"/>
        <text x="380" y="140" font-size="13" fill="var(--accent, var(--primary))">Waitlisted (WL)</text>
        <text x="380" y="160" font-size="10" font-weight="500" fill="var(--muted)">Ticket booked, not confirmed yet</text>
        <rect x="520" y="112" width="180" height="70" rx="10" fill="var(--surface)" stroke="var(--muted)" stroke-width="2" stroke-dasharray="4 3"/>
        <text x="610" y="140" font-size="13" fill="var(--foreground)">Regret</text>
        <text x="610" y="160" font-size="10" font-weight="500" fill="var(--muted)">No seat, no WL slot — not booked</text>
      </g>
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--border)"/>
        </marker>
      </defs>
    </svg>`,
    sections: [
      {
        paragraphs: [
          "You've filled in every passenger detail, double-checked the date, and hit the final booking button — and instead of a confirmation, IRCTC shows a message with the word \"Regret\" in it. No payment screen appears. It reads like an error, and the instinct is to assume something went wrong technically. Almost always, nothing did — Regret is IRCTC telling you, plainly, that there was nothing left to sell you.",
        ],
      },
      {
        heading: "What \"Regret\" actually means",
        paragraphs: [
          "Regret is IRCTC's standard response when a booking request can't be fulfilled because the train, class, quota and date combination you selected has zero seats and zero further waiting-list positions available. It's a capacity message, not a system fault. Crucially, it happens before payment — you are never charged for a Regret, because the booking never reaches the payment stage.",
        ],
      },
      {
        heading: "Regret vs. Waitlisted vs. \"booking failed, money deducted\" — three different things",
        paragraphs: [
          "These three get confused constantly, and they're worth separating clearly because the right next step is different for each:",
        ],
        list: [
          "Regret: the booking never completed. No seat, no waitlist slot, no charge. You need to try a different class, quota, train or date.",
          "Waitlisted (WL): the booking did complete — you have a valid ticket and PNR, you were charged, and you're queued for a seat that may confirm as others cancel. This is a successful booking with an unconfirmed status, not a failure.",
          "Booking failed with money deducted: a payment or gateway issue where money left your account but IRCTC didn't register a completed booking. This is a banking/reconciliation issue, not a seat-availability issue, and it's usually auto-refunded within a few business days — if it isn't, it needs to be raised with IRCTC/your bank directly rather than treated as a Regret.",
        ],
      },
      {
        heading: "Common reasons you hit Regret specifically",
        paragraphs: [],
        list: [
          "The class you searched (say, 3A) is completely full for that train and date, and the waitlist quota for that class has also been exhausted — a hard cap exists on how many waitlisted tickets IRCTC issues per class.",
          "You selected a specific quota (like a Ladies or Senior Citizen quota) that has its own small, separate allocation, which can run out even while other quotas on the same train still have room.",
          "High-demand periods — festival weeks, long weekends — can exhaust waitlist capacity within minutes of the booking window opening, especially on popular overnight trains.",
          "You're trying to book very close to chart preparation, when remaining inventory is at its lowest and most classes may already be shut for booking entirely.",
        ],
      },
      {
        heading: "What to actually do next",
        paragraphs: [
          "Don't just retry the identical search — nothing will have changed in the seconds since. Instead:",
        ],
        list: [
          "Switch class: if 3A is Regret, check Sleeper or 2A on the same train — different classes have separate, independent inventories.",
          "Switch quota: if you're eligible for Tatkal (next-day travel) or a special quota you haven't tried, use our Quota Selector to find which one actually fits your situation.",
          "Check nearby trains on the same route and date with SmartRail's Trains Between Stations tool — a less popular train on the same corridor often still has room.",
          "Shift your date by a day or two if your plans allow it — demand is rarely identical across consecutive days.",
          "If you do get onto a waitlist elsewhere, use the Waitlist Confirmation Outlook to get an honest, pattern-based sense of your odds before deciding whether to book it or keep looking.",
        ],
      },
      {
        heading: "Does Regret mean the train is permanently full?",
        paragraphs: [
          "No. Cancellations happen continuously, right up to chart preparation, and each one can open a seat or a fresh waitlist slot. If a route matters to you, it's worth rechecking periodically rather than assuming Regret today means Regret forever — particularly in the day or two after the booking window first opens, when early bookings sometimes get cancelled once travellers finalise other plans.",
        ],
      },
      {
        heading: "When Regret is actually a selection mistake, not real capacity",
        paragraphs: [
          "A smaller share of Regret messages trace back to something in the search itself rather than genuine full capacity — worth ruling out before you conclude a train is truly sold out:",
        ],
        list: [
          "Quota mismatch: selecting a quota you're not eligible for (Ladies quota with a male-only passenger list, for instance) can behave as though that quota has no room for you specifically.",
          "Session timeouts on a slow connection: if the booking page sat open for several minutes while you filled in passenger details, the specific inventory snapshot behind the page can go stale, and resubmitting re-checks against the current, possibly lower, count.",
          "Browser back-button resubmission: navigating back after an earlier failed attempt and resubmitting the same form can sometimes carry over an outdated availability check rather than a fresh one — starting the search again from scratch is more reliable than retrying via back/forward.",
        ],
      },
      {
        heading: "Reducing how often you hit Regret",
        paragraphs: [],
        list: [
          "Book as close to the exact moment the window opens as you can for high-demand dates — inventory for popular trains genuinely depletes within minutes on festival and long-weekend dates.",
          "Keep your passenger master list saved in advance so you're not typing details during the highest-competition minute.",
          "Check whether you're eligible for Tatkal or Premium Tatkal as a fallback plan before travel day, so you're not discovering Regret with no backup option left.",
          "Compare quotas with our Quota Selector before you search, so you're checking the quota most likely to have room for your situation rather than defaulting to General every time.",
        ],
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "A Regret message is IRCTC being direct with you rather than vague — it's telling you plainly that this exact combination of train, date, class and quota has nothing left to offer, not that something is broken. Reading it that way turns it from a dead end into a prompt to change one variable — class, quota, train or date — rather than repeating the same search and hoping for a different result.",
        ],
      },
    ],
    sources: [OFFICIAL_SOURCES.irctc],
    relatedTool: { href: "/quota-selector", label: "Quota Selector" },
  },
  {
    slug: "irctc-booking-timings-maintenance-window-guide",
    title: "IRCTC Booking Timings & Daily Maintenance Window, Explained",
    description:
      "When IRCTC is actually available for booking, why it sometimes goes offline overnight, and what to do — including tools that still work — when it does.",
    quickAnswer:
      "IRCTC's reserved-ticket booking is generally available across the day, with Tatkal opening at fixed times (10:00 AM for AC classes, 11:00 AM for non-AC) — but IRCTC has historically run a nightly maintenance window, commonly reported as falling in the very late night to early morning IST hours, during which booking can be unavailable. The exact timing isn't published as a fixed guarantee and has changed over time, so treat any specific hour as indicative rather than certain, and check IRCTC's own status if booking seems down.",
    category: "Booking",
    readMins: 6,
    published: "2026-08-10",
    updated: "2026-08-10",
    bannerSvg: `<svg viewBox="0 0 760 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="24-hour timeline showing a typical late-night maintenance window and the Tatkal opening times">
      <rect width="760" height="170" fill="var(--surface-2)"/>
      <rect x="40" y="80" width="680" height="14" rx="7" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
      <rect x="40" y="80" width="30" height="14" rx="7" fill="var(--muted)" opacity="0.55"/>
      <circle cx="342" cy="87" r="6" fill="var(--primary)"/>
      <circle cx="370" cy="87" r="6" fill="var(--accent, var(--primary))"/>
      <text x="55" y="66" font-size="11" fill="var(--muted)" text-anchor="middle">00:00</text>
      <text x="342" y="66" font-size="11" fill="var(--primary)" text-anchor="middle" font-weight="700">10:00 AC Tatkal</text>
      <text x="370" y="112" font-size="11" fill="var(--accent, var(--primary))" text-anchor="middle" font-weight="700">11:00 Non-AC</text>
      <text x="720" y="66" font-size="11" fill="var(--muted)" text-anchor="middle">24:00</text>
      <text x="55" y="112" font-size="10" fill="var(--muted)" text-anchor="middle">Typical* nightly window</text>
      <text x="40" y="150" font-size="10" fill="var(--muted)">*Illustrative only — IRCTC does not publish a fixed guaranteed maintenance schedule</text>
    </svg>`,
    sections: [
      {
        paragraphs: [
          "\"Is IRCTC down for maintenance right now?\" is one of the most common late-night searches from anyone trying to book a train ticket. The honest answer has two parts: yes, IRCTC does take the booking system offline periodically for maintenance, and no, there isn't a single fixed, officially guaranteed window you can rely on with certainty every single night — the timing has shifted over the years and can change without much advance notice.",
        ],
      },
      {
        heading: "What \"maintenance\" actually covers",
        paragraphs: [
          "IRCTC's maintenance downtime generally falls into two categories. The first is a shorter, more routine nightly window used for backend processing — this is the one most people mean when they search \"IRCTC maintenance time,\" and it has commonly been reported as falling somewhere in the very late night to early morning IST hours, though the exact start and end have varied over time and are not published as a fixed public commitment. The second is occasional, longer planned downtime for major system upgrades, which IRCTC typically announces in advance through its official channels rather than following the routine nightly pattern.",
        ],
      },
      {
        heading: "What you can rely on with more confidence",
        paragraphs: [
          "Rather than memorising an exact maintenance time that may already be outdated, it's more useful to know the parts of IRCTC's schedule that are fixed and dependable:",
        ],
        list: [
          "Tatkal booking opens at a fixed time every day: 10:00 AM IST for AC classes, 11:00 AM IST for non-AC classes — this has been stable and doesn't move with maintenance windows.",
          "General (advance) reservation booking is available across most of the day and night outside of any maintenance window, without a separate fixed opening time of its own.",
          "The Advance Reservation Period itself (currently 60 days) governs which journey dates you can book at all — see our ARP guide — and is independent of daily maintenance timing.",
        ],
      },
      {
        heading: "If IRCTC seems unavailable right now",
        paragraphs: [],
        list: [
          "Don't repeatedly resubmit the same payment — if a page seems frozen mid-payment, retrying immediately raises the risk of a duplicate charge rather than fixing the issue. Wait a few minutes and check your bank/UPI app before trying again.",
          "Check IRCTC's official channels (their website status or official social media) for an outage or maintenance notice before assuming your own connection or device is at fault.",
          "If you only need to check rules, timings or your booking window — not actually complete a booking — SmartRail's calculators work independently of IRCTC's own uptime, since they compute the published rules directly rather than depending on IRCTC's servers.",
          "Try again a little later rather than continuously refreshing; routine nightly maintenance windows are typically short.",
        ],
      },
      {
        heading: "Why we don't publish one fixed \"maintenance time\" as a guaranteed fact",
        paragraphs: [
          "You'll find pages elsewhere quoting a precise nightly maintenance window as though it's a permanent rule. We're deliberately more careful here: IRCTC's own published terms don't commit to a fixed nightly downtime schedule, and travellers have reported the actual window shifting over time. Rather than repeat a number that may quietly be wrong by the time you read it, this guide focuses on what's actually dependable — Tatkal's fixed opening times, the ARP rule, and where to check IRCTC's own status directly when something seems off.",
        ],
      },
      {
        heading: "Booking hours vs. the physical reservation counter",
        paragraphs: [
          "Online booking availability and the reservation counters you'd visit in person at a station follow separate schedules entirely. Physical PRS (Passenger Reservation System) counters at stations operate on their own posted business hours, which are typically limited to specific daytime windows and vary by station — they aren't a 24-hour fallback for whenever IRCTC's website happens to be down. If online booking is briefly unavailable and your journey is time-sensitive, checking a counter's local timing (rather than assuming it's always open) will save a wasted trip.",
        ],
      },
      {
        heading: "Planning around the uncertainty",
        paragraphs: [
          "Since there's no guaranteed hour when IRCTC is definitely available, the more resilient habit is to avoid depending on booking succeeding in a narrow late-night window in the first place. If a journey date and class matter enough that missing the exact ARP-opening minute would hurt, plan to book during comfortable daytime or evening hours whenever the date allows it, rather than waiting until close to midnight out of habit. For Tatkal specifically, the fixed 10 AM/11 AM opening times remove this uncertainty entirely — that's the one part of IRCTC's daily schedule you can plan against with real confidence, maintenance windows notwithstanding.",
        ],
      },
      {
        heading: "If you only need to plan, not book, right now",
        paragraphs: [
          "A lot of \"is IRCTC down\" searches happen when someone just wants to confirm their booking date or Tatkal opening time — not actually complete a booking at that exact moment. SmartRail's Booking Date Calculator and Tatkal Time Calculator compute these dates and times directly from the published rules, entirely independent of IRCTC's own servers, so they work exactly the same whether IRCTC is fully up, mid-maintenance, or experiencing unrelated slowness. Bookmarking your journey's exact opening date ahead of time means a temporary IRCTC outage costs you nothing but a short wait.",
        ],
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "If booking seems unavailable late at night, the most likely explanation is routine maintenance rather than a real fault on your end — the practical fix is almost always to wait a short while and try again, not to keep resubmitting payments or assume your account is affected. Save the fixed, dependable parts of IRCTC's schedule to memory (10 AM/11 AM Tatkal, the 60-day ARP) and treat any specific nightly maintenance hour you read online, including anywhere on this page, as a rough guide rather than a promise.",
        ],
      },
    ],
    sources: [OFFICIAL_SOURCES.irctc],
    relatedTool: { href: "/tatkal-time-calculator", label: "Tatkal Time Calculator" },
  },
  {
    slug: "irctc-current-availability-explained",
    title: "IRCTC Current Availability Explained: What It Means & How to Use It",
    description:
      "The difference between \"Current Availability\" and a regular seat search on IRCTC, how live it really is, and how to use it to your advantage close to travel.",
    quickAnswer:
      "\"Current Availability\" on IRCTC shows the real-time seat count for a specific train, class, date and quota as of right now — including seats freed up by recent cancellations — which makes it more useful than a general search when you're checking close to your travel date or trying to catch a last-minute opening.",
    category: "Booking",
    readMins: 6,
    published: "2026-08-10",
    updated: "2026-08-10",
    bannerSvg: `<svg viewBox="0 0 760 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a live seat availability counter ticking as seats are booked and cancelled">
      <rect width="760" height="170" fill="var(--surface-2)"/>
      <rect x="270" y="35" width="220" height="90" rx="16" fill="var(--surface)" stroke="var(--primary)" stroke-width="2.5"/>
      <text x="380" y="70" font-size="12" fill="var(--muted)" text-anchor="middle" font-weight="700">CURRENT AVAILABILITY</text>
      <text x="380" y="105" font-size="30" fill="var(--primary)" text-anchor="middle" font-weight="800">AVL 7</text>
      <circle cx="460" cy="48" r="6" fill="var(--success, var(--primary))"/>
      <circle cx="460" cy="48" r="10" fill="none" stroke="var(--success, var(--primary))" stroke-width="2" opacity="0.5"/>
      <g stroke="var(--border)" stroke-width="2" fill="none">
        <path d="M60 130 L60 100 L150 110 L150 80 L240 95"/>
      </g>
      <g stroke="var(--border)" stroke-width="2" fill="none">
        <path d="M520 95 L610 75 L610 105 L700 60"/>
      </g>
      <text x="150" y="145" font-size="10" fill="var(--muted)" text-anchor="middle">Seats fluctuate as</text>
      <text x="610" y="145" font-size="10" fill="var(--muted)" text-anchor="middle">bookings/cancellations happen</text>
    </svg>`,
    sections: [
      {
        paragraphs: [
          "Search for the same train twice on IRCTC — once a week before travel, once the night before — and you'll sometimes see two different numbers for the same class. That's not a bug. \"Current Availability\" is designed specifically to reflect the seat count at this exact moment, and that number genuinely moves as other passengers book and cancel around you.",
        ],
      },
      {
        heading: "What \"Current Availability\" actually is",
        paragraphs: [
          "When you check a train's availability on IRCTC, the result you see for a given class, date and quota is a live count pulled from the reservation system at that instant — not a cached figure from earlier in the day. It reflects every completed booking and every cancellation processed up to that point, which is what makes it noticeably more dynamic close to chart preparation, when cancellations and last-minute bookings both spike.",
        ],
      },
      {
        heading: "Current Availability vs. a Waitlist Confirmation Outlook — not the same thing",
        paragraphs: [
          "These serve two different questions, and mixing them up leads to bad decisions:",
        ],
        list: [
          "Current Availability answers \"how many seats are open right now?\" — a live, factual count, not a prediction.",
          "A Waitlist Confirmation Outlook (like SmartRail's) answers a different question — \"if I'm already waitlisted at position 12, what are my realistic odds of confirming?\" — a pattern-based estimate, not a guarantee, and explicitly not a live seat count.",
        ],
      },
      {
        heading: "How live is it, really?",
        paragraphs: [
          "Current Availability updates continuously as bookings and cancellations are processed — there's no fixed refresh delay built in by design. In practice, the number is most volatile in two situations: right after the booking window opens for a high-demand date (seats can drop from dozens to zero within minutes), and in the hours approaching chart preparation, when late cancellations and Tatkal activity both add churn. Outside those windows, for a train that isn't in especially high demand, the count tends to move more slowly and is a reasonably stable read of where things stand.",
        ],
      },
      {
        heading: "How to actually use it",
        paragraphs: [],
        list: [
          "If a class shows Regret or a long waitlist a week out, don't assume that's final — recheck Current Availability closer to your travel date, since cancellations concentrate in the final 24–48 hours before departure.",
          "Use it to compare quotas at a glance — General, Tatkal and any special quota you're eligible for often show meaningfully different current counts for the exact same train and class.",
          "Treat a favourable Current Availability number as a signal to book promptly rather than wait — because it's live, a seat showing available now isn't reserved for you until you complete the booking.",
          "Combine it with the Waitlist Confirmation Outlook if you're already on a list: check current availability improving in the class you want, and cross-reference how that trend typically plays out for your specific quota and waitlist type.",
        ],
      },
      {
        heading: "Reading RAC and Waitlist counts alongside Current Availability",
        paragraphs: [
          "A single search result usually shows more than one number, and each means something different. \"AVL\" followed by a count is straightforward confirmed availability. \"RAC\" followed by a count means that many Reservation Against Cancellation berths remain — booking one gets you a shared berth immediately, not a queue position. \"WL\" followed by a number is the live waitlist position that would be assigned if you book right now — it tells you where in line you'd land, not whether you'll confirm. All three can be visible for the same train, class and date simultaneously, and they update independently of each other as different categories of seats move.",
        ],
      },
      {
        heading: "Quota-specific quirks worth knowing",
        paragraphs: [
          "Current Availability is calculated per quota, not just per class — General, Tatkal, Ladies, Senior Citizen, and Divyaang (persons with disabilities) quotas each carry their own separate, usually much smaller, seat allocation on most trains. It's common to see General quota fully waitlisted while a Senior Citizen quota on the exact same train and class still shows confirmed seats, simply because far fewer passengers search that quota specifically. If you're eligible for a special quota, checking its Current Availability separately — rather than only looking at the default General quota result — can surface seats you'd otherwise miss entirely.",
        ],
      },
      {
        heading: "Mistakes to avoid when reading it",
        paragraphs: [],
        list: [
          "Treating RAC as equivalent to a confirmed seat — it guarantees you can board and travel, but on a shared berth, not your own.",
          "Assuming an AVL number holds while you finish filling in passenger details — it's a live count, and it can drop to zero in the time it takes to complete a slow form, especially for popular trains.",
          "Confusing a favourable Current Availability with a favourable Waitlist Confirmation Outlook — they're unrelated numbers answering different questions, and a high current count says nothing about how fast a waitlist you're already holding will clear.",
          "Checking only once, days in advance, and not rechecking — the number you saw a week ago is not the number that matters when you're deciding whether to book today.",
        ],
      },
      {
        heading: "A note on accuracy",
        paragraphs: [
          "Current Availability is only as reliable as IRCTC's own live system at the moment you check it — third-party sites, including this one, don't have a separate live feed into IRCTC's seat inventory, so always confirm the actual number on IRCTC directly before making a booking decision based on it. SmartRail's role is to help you understand what the number means and how to act on it, not to replace checking it at the source.",
          "Used well, Current Availability turns a single yes/no booking attempt into an ongoing decision you can time — checking it once when you first plan a trip, then again a few days before travel, and once more in the final day or two if you're still on a waitlist, gives you a realistic read of how a specific train's inventory is actually moving rather than a single snapshot that may already be stale by the time you act on it.",
        ],
      },
    ],
    sources: [OFFICIAL_SOURCES.irctc],
    relatedTool: { href: "/waitlist-predictor", label: "WL Confirmation Outlook" },
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
