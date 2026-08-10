import type { Locale } from "@/i18n/locales";
import { DEFAULT_LOCALE } from "@/i18n/locales";

/** UI strings for the per-route "Trains Between" landing pages
 *  (trains-between/[route]). Templated the same way as train-page-strings.ts
 *  since it's the same pattern: one small set of translated sentences filled
 *  with real station names per route, rather than per-route translation. */
export interface RoutePageStrings {
  /** {fromLabel} {toLabel} */
  heading: string;
  /** {fromLabel} {from} {toLabel} {to} */
  intro: string;
  /** {variants} */
  alsoSearchedAs: string;
  noTrainsFound: string;
  searchDifferentRoute: string;
}

const en: RoutePageStrings = {
  heading: "{fromLabel} to {toLabel} Trains",
  intro: "Every train running from {fromLabel} ({from}) to {toLabel} ({to}), with live timings where available.",
  alsoSearchedAs: "Also searched as {variants}.",
  noTrainsFound: "No live trains found right now — try the full search tool below.",
  searchDifferentRoute: "Search a different route",
};

const hi: RoutePageStrings = {
  heading: "{fromLabel} से {toLabel} ट्रेनें",
  intro: "{fromLabel} ({from}) से {toLabel} ({to}) के बीच चलने वाली हर ट्रेन, जहां उपलब्ध हो वहां लाइव समय के साथ।",
  alsoSearchedAs: "इसे {variants} के नाम से भी खोजा जाता है।",
  noTrainsFound: "अभी कोई लाइव ट्रेन नहीं मिली — नीचे दिए पूर्ण सर्च टूल का उपयोग करें।",
  searchDifferentRoute: "दूसरा मार्ग खोजें",
};

const bn: RoutePageStrings = {
  heading: "{fromLabel} থেকে {toLabel} ট্রেন",
  intro: "{fromLabel} ({from}) থেকে {toLabel} ({to}) পর্যন্ত চলাচলকারী প্রতিটি ট্রেন, উপলব্ধ থাকলে লাইভ সময়সহ।",
  alsoSearchedAs: "এটি {variants} নামেও অনুসন্ধান করা হয়।",
  noTrainsFound: "এখন কোনো লাইভ ট্রেন পাওয়া যায়নি — নিচের সম্পূর্ণ সার্চ টুল ব্যবহার করুন।",
  searchDifferentRoute: "অন্য রুট খুঁজুন",
};

const mr: RoutePageStrings = {
  heading: "{fromLabel} ते {toLabel} गाड्या",
  intro: "{fromLabel} ({from}) ते {toLabel} ({to}) दरम्यान धावणारी प्रत्येक गाडी, उपलब्ध असल्यास लाइव्ह वेळेसह.",
  alsoSearchedAs: "हे {variants} म्हणूनही शोधले जाते.",
  noTrainsFound: "सध्या कोणतीही लाइव्ह गाडी सापडली नाही — खालील पूर्ण शोध साधन वापरा.",
  searchDifferentRoute: "वेगळा मार्ग शोधा",
};

const ta: RoutePageStrings = {
  heading: "{fromLabel} முதல் {toLabel} ரயில்கள்",
  intro: "{fromLabel} ({from}) முதல் {toLabel} ({to}) வரை இயங்கும் ஒவ்வொரு ரயிலும், கிடைக்கும் இடத்தில் நேரடி நேரத்துடன்.",
  alsoSearchedAs: "இது {variants} என்றும் தேடப்படுகிறது.",
  noTrainsFound: "தற்போது நேரடி ரயில்கள் எதுவும் இல்லை — கீழே உள்ள முழு தேடல் கருவியைப் பயன்படுத்தவும்.",
  searchDifferentRoute: "வேறு பாதையைத் தேடுங்கள்",
};

const te: RoutePageStrings = {
  heading: "{fromLabel} నుండి {toLabel} రైళ్లు",
  intro: "{fromLabel} ({from}) నుండి {toLabel} ({to}) వరకు నడిచే ప్రతి రైలు, అందుబాటులో ఉన్నచోట ప్రత్యక్ష సమయాలతో.",
  alsoSearchedAs: "దీన్ని {variants} అని కూడా వెతుకుతారు.",
  noTrainsFound: "ప్రస్తుతం ప్రత్యక్ష రైళ్లు కనుగొనబడలేదు — దిగువ పూర్తి శోధన సాధనాన్ని ఉపయోగించండి.",
  searchDifferentRoute: "వేరే మార్గం వెతకండి",
};

const gu: RoutePageStrings = {
  heading: "{fromLabel} થી {toLabel} ટ્રેનો",
  intro: "{fromLabel} ({from}) થી {toLabel} ({to}) વચ્ચે દોડતી દરેક ટ્રેન, ઉપલબ્ધ હોય ત્યાં લાઇવ સમય સાથે.",
  alsoSearchedAs: "આ {variants} તરીકે પણ શોધાય છે.",
  noTrainsFound: "હમણાં કોઈ લાઇવ ટ્રેન મળી નથી — નીચે આપેલ સંપૂર્ણ શોધ સાધનનો ઉપયોગ કરો.",
  searchDifferentRoute: "અલગ માર્ગ શોધો",
};

const kn: RoutePageStrings = {
  heading: "{fromLabel} ನಿಂದ {toLabel} ರೈಲುಗಳು",
  intro: "{fromLabel} ({from}) ನಿಂದ {toLabel} ({to}) ವರೆಗೆ ಓಡುವ ಪ್ರತಿ ರೈಲು, ಲಭ್ಯವಿರುವಲ್ಲಿ ಲೈವ್ ಸಮಯದೊಂದಿಗೆ.",
  alsoSearchedAs: "ಇದನ್ನು {variants} ಎಂದೂ ಹುಡುಕಲಾಗುತ್ತದೆ.",
  noTrainsFound: "ಈಗ ಯಾವುದೇ ಲೈವ್ ರೈಲುಗಳು ಕಂಡುಬಂದಿಲ್ಲ — ಕೆಳಗಿನ ಪೂರ್ಣ ಹುಡುಕಾಟ ಸಾಧನವನ್ನು ಬಳಸಿ.",
  searchDifferentRoute: "ಬೇರೆ ಮಾರ್ಗವನ್ನು ಹುಡುಕಿ",
};

const STRINGS: Record<Locale, RoutePageStrings> = { en, hi, bn, mr, ta, te, gu, kn };

export function routePageStrings(locale: Locale): RoutePageStrings {
  return STRINGS[locale] ?? STRINGS[DEFAULT_LOCALE];
}
