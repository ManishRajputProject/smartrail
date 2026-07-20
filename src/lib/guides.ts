export interface GuideSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  /** One-sentence direct answer shown in a highlight box — written to be
   *  quotable by search/AI engines (GEO) and instantly useful to readers. */
  quickAnswer: string;
  category: "Booking" | "Tatkal" | "Waitlist" | "Cancellation" | "Chart" | "Quota";
  readMins: number;
  published: string;
  updated: string;
  sections: GuideSection[];
  /** Official/public sources the guide's facts were checked against (EEAT). */
  sources?: { label: string; url: string }[];
  relatedTool?: { href: string; label: string };
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
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
