import type { LegalDocs } from "@/i18n/legal/types";

const UPDATED = "Last updated: 20 July 2026";
const EMAIL = "hello@smartrail.in";

/** English source of record. Every other locale is a convenience translation
 *  of this text and defers to it in case of discrepancy. */
export const en: LegalDocs = {
  terms: {
    title: "Terms of Use",
    updated: UPDATED,
    sections: [
      {
        heading: "Using this site",
        paragraphs: [
          "SmartRail provides free calculators, planning tools and reminders for Indian Railways travellers. By using this site you agree to use it for lawful, personal purposes and not to attempt to disrupt, scrape at scale, or abuse the reminder and community-submission features (for example, submitting spam or automated bulk entries).",
        ],
      },
      {
        heading: "No warranty",
        paragraphs: [
          'Tools and content are provided "as is" without warranty of any kind. See our Disclaimer for detail on accuracy limitations.',
        ],
      },
      {
        heading: "Community content",
        paragraphs: [
          "Journey Reports you submit may be displayed publicly after moderation. Don't submit anything defamatory, false, or that identifies another private individual without their consent. We may remove any submission at our discretion.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "We may update these terms from time to time; continued use of the site after a change constitutes acceptance of the updated terms.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of India, with exclusive jurisdiction in the competent courts of India.",
        ],
      },
      { heading: "Contact", paragraphs: [EMAIL] },
    ],
  },

  "privacy-policy": {
    title: "Privacy Policy",
    updated: UPDATED,
    intro: [
      "SmartRail is designed to be usable without an account. Most tools on this site — the calculators, the quota selector, the checklist generator — process everything in your browser and send nothing to our servers. This policy covers the few features that do collect data.",
    ],
    sections: [
      {
        heading: "What we collect",
        list: [
          "Booking reminders: journey date, an optional train reference, your email address, and (if you opt in) a phone number for future WhatsApp reminders.",
          "Journey reports: the train reference, journey date, category and text you choose to submit. We don't require or knowingly collect your name or contact details for this feature.",
          "Feedback votes: fully anonymous — no contact information is collected.",
          "Analytics: aggregate, privacy-respecting usage analytics (pages viewed, general location by country/region) to understand what's useful. We do not sell this data.",
        ],
      },
      {
        heading: "Why we collect it",
        paragraphs: [
          "Solely to operate the feature you used it for — sending you the reminder you asked for, or displaying moderated community reports. We do not use your email or phone number for unrelated marketing without separate, explicit opt-in.",
        ],
      },
      {
        heading: "Advertising",
        paragraphs: [
          "This site is supported by display advertising and, in places, affiliate links (clearly labelled as such). Ad providers may use cookies to serve relevant ads — you can control this through your browser settings or any consent banner shown on the site.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You can ask us to delete any data associated with your email or phone number at any time — see our Data Deletion page for how. We process such requests under India's Digital Personal Data Protection Act, 2023 and its rules.",
        ],
      },
      { heading: "Contact", paragraphs: [`Questions about this policy, or a data request: ${EMAIL}`] },
    ],
  },

  disclaimer: {
    title: "Disclaimer",
    updated: UPDATED,
    sections: [
      {
        heading: "1. No Government Affiliation",
        paragraphs: [
          "SmartRail is a privately operated, independent informational service. We have no formal affiliation, authorisation, licence, or endorsement from Indian Railways, IRCTC (Indian Railway Catering and Tourism Corporation), the Ministry of Railways, or any governmental or quasi-governmental entity. All tools, calculators and guides on this site are created and maintained independently, for general informational and convenience purposes only.",
          "For official services — ticket booking, PNR status, live train schedules and cancellations — use the official IRCTC website at irctc.co.in.",
        ],
      },
      {
        heading: "2. Accuracy of Information",
        paragraphs: [
          "We make no warranties, express or implied, about the completeness, accuracy, reliability or availability of any information, tool or content on this site. Railway fares, schedules, quotas, refund rules and booking policies are subject to change at any time without notice. Fare and trip-cost figures shown by our calculators are illustrative estimates, not quotes.",
          "Always verify critical information — booking windows, refund amounts, cancellation rules, and train schedules — directly through IRCTC or official Indian Railways channels before making a booking or travel decision.",
        ],
      },
      {
        heading: "3. Live Tracking Data",
        paragraphs: [
          "Live train position, delay, platform and station-board information shown on SmartRail is sourced from a third-party crowdsourced GPS telemetry provider, not directly from Indian Railways, IRCTC, or the National Train Enquiry System (NTES). This data can be incomplete, delayed, or occasionally inaccurate, especially for trains with limited GPS reporting.",
          "Live data is a convenience feature, not a booking or boarding authority. Always confirm platform and timing on the official station announcement system or with railway staff before boarding.",
        ],
      },
      {
        heading: "4. Community Content",
        paragraphs: [
          "Journey Reports are submitted by site visitors and reflect individual experiences, not verified data. We moderate submissions for spam and abuse but do not independently verify the accuracy of any individual report.",
        ],
      },
      {
        heading: "5. Limitation of Liability",
        paragraphs: [
          "To the fullest extent permitted by applicable law, SmartRail, its operators and contributors are not liable for any direct, indirect, incidental or consequential loss, damage, cost or inconvenience arising from use of, or reliance on, any information, tool or content on this site. Use of this site is entirely at your own risk.",
        ],
      },
      {
        heading: "6. Trademarks",
        paragraphs: [
          '"IRCTC", "Indian Railways" and related names and marks are the registered trademarks of their respective owners. Any reference to these names on SmartRail is strictly descriptive and informational and does not imply affiliation, association or endorsement.',
        ],
      },
      {
        heading: "7. Governing Law",
        paragraphs: [
          "This Disclaimer is governed by the laws of India, with exclusive jurisdiction in the competent courts of India.",
        ],
      },
      { heading: "8. Contact", paragraphs: [`Questions about this Disclaimer: ${EMAIL}`] },
    ],
  },

  about: {
    eyebrow: "About",
    title: "Who we are & how we keep the numbers right",
    sections: [
      {
        heading: "Why we built this",
        paragraphs: [
          "Every Tatkal season plays out the same way: the window opens, and thousands of people scramble across a dozen browser tabs — old forum threads, screenshots forwarded on WhatsApp, half-updated blog posts — just to answer three questions. When exactly does booking open for my journey? What time does Tatkal open for my class? If I have to cancel, what do I actually get back? The official rules exist, but they're scattered across circulars and FAQ pages that don't always keep pace with what changes.",
          "SmartRail started as a small set of scripts built to answer those three questions without the tab-hunting — nothing more. It grew into a full set of tools because the same handful of questions come up for practically every traveller, every single day: not just when to book, but whether a waitlisted ticket is worth holding onto, what a refund will really look like, and which quota actually applies to a given trip.",
          "It stays free, login-free, and ad-supported on purpose. The moment a tool this ordinary needs an account or a subscription, it's stopped solving the problem it was built for.",
        ],
      },
      {
        heading: "What SmartRail is",
        paragraphs: [
          "SmartRail is an independent, free set of calculators and planning tools for Indian Railways travellers — booking dates, Tatkal timing, refund estimates, waitlist outlooks and reminders. It is built and maintained as a solo project, is supported by advertising, and requires no login for any tool.",
          "We are not affiliated with, endorsed by, or connected to IRCTC, Indian Railways, or the Government of India in any way. For official bookings and live data, always use irctc.co.in.",
        ],
      },
      {
        heading: "How rules are verified",
        list: [
          "Every rule the calculators use — the 60-day advance window, Tatkal opening times, refund slabs, chart-prep timing — lives in a single, version-controlled module with a \"last verified\" date.",
          "Rules are checked against official IRCTC and Indian Railways announcements, not against other third-party sites.",
          "The rule module is covered by automated tests that run before every deployment, so a change in one calculator can't silently break another.",
          "Each guide lists the sources its facts were checked against and shows both its publish and last review dates.",
        ],
      },
      {
        heading: "What we deliberately don't do",
        list: [
          "No fake precision. The waitlist tool gives an honest outlook band instead of an invented percentage, because real confirmation depends on cancellation data nobody outside railways has.",
          "No scraping of IRCTC systems. Train-schedule features will ship only when backed by properly licensed or open data.",
          "No dark patterns. Estimates are labelled as estimates, and every page that touches money says \"verify on IRCTC before deciding\".",
        ],
      },
      {
        heading: "Spotted an error?",
        paragraphs: [
          `Railway rules change, and when they do we want to be fast. If a number here disagrees with what IRCTC shows you, email ${EMAIL} with a screenshot — corrections ship within days and the affected page's "last reviewed" date is updated.`,
        ],
      },
    ],
  },

  contact: {
    title: "Contact",
    intro: [
      "SmartRail is an independent project, not affiliated with IRCTC or Indian Railways. For official booking support, use IRCTC's own customer care channels.",
    ],
    sections: [
      {
        list: [
          `General & feedback: ${EMAIL}`,
          `Privacy / data requests: ${EMAIL} (see the Data Deletion page)`,
        ],
      },
    ],
  },

  "data-deletion": {
    title: "Data Deletion Request",
    intro: [
      "Since SmartRail doesn't require an account, the only data we hold tied to you is whatever email or phone number you gave us when setting a reminder.",
    ],
    sections: [
      {
        heading: "How to request deletion",
        paragraphs: [
          `Email ${EMAIL} from the email address (or mentioning the phone number) you used, with the subject line "Data Deletion Request". We'll verify the request and delete all associated reminder and subscription records within 30 days, and confirm once it's done.`,
        ],
      },
      {
        heading: "What gets deleted",
        list: [
          "Pending and past reminder requests linked to your email/phone.",
          "Newsletter subscription records linked to your email/phone.",
        ],
        paragraphs: [
          "Journey Reports are not linked to contact information at submission, so we generally cannot locate or remove a specific report unless you can identify it directly (e.g. by pasting the exact text) — include that in your request if applicable.",
        ],
      },
    ],
  },
};
