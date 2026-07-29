import type { Locale } from "@/i18n/locales";
import { DEFAULT_LOCALE } from "@/i18n/locales";

/** Strings for the A–Z train browse index. Templates use {braces}. */
export interface TrainIndexStrings {
  /** Footer + hub link, and the index heading. */
  browseAZ: string;
  /** {count} */
  hubSubtitle: string;
  /** {letter} */
  letterHeading: string;
  /** {letter} {count} */
  letterSubtitle: string;
  jumpToLetter: string;
  backToFinder: string;
  otherLetters: string;
  /** {letter} — for the non-alphabetic bucket. */
  numberBucket: string;
}

const en: TrainIndexStrings = {
  browseAZ: "Browse trains A–Z",
  hubSubtitle: "Every Indian Railways train, grouped by name — {count} in total.",
  letterHeading: "Trains starting with {letter}",
  letterSubtitle: "{count} trains whose name begins with {letter}.",
  jumpToLetter: "Jump to a letter",
  backToFinder: "Back to Train Finder",
  otherLetters: "Other letters",
  numberBucket: "Other (0–9)",
};

const hi: TrainIndexStrings = {
  browseAZ: "ट्रेनें A–Z देखें",
  hubSubtitle: "हर भारतीय रेल ट्रेन, नाम के अनुसार समूहित — कुल {count}।",
  letterHeading: "{letter} से शुरू होने वाली ट्रेनें",
  letterSubtitle: "{count} ट्रेनें जिनका नाम {letter} से शुरू होता है।",
  jumpToLetter: "किसी अक्षर पर जाएँ",
  backToFinder: "ट्रेन फाइंडर पर वापस",
  otherLetters: "अन्य अक्षर",
  numberBucket: "अन्य (0–9)",
};

const bn: TrainIndexStrings = {
  browseAZ: "ট্রেন A–Z দেখুন",
  hubSubtitle: "প্রতিটি ভারতীয় রেল ট্রেন, নাম অনুযায়ী সাজানো — মোট {count}।",
  letterHeading: "{letter} দিয়ে শুরু হওয়া ট্রেন",
  letterSubtitle: "{count}টি ট্রেন যাদের নাম {letter} দিয়ে শুরু হয়।",
  jumpToLetter: "কোনো অক্ষরে যান",
  backToFinder: "ট্রেন ফাইন্ডারে ফিরুন",
  otherLetters: "অন্যান্য অক্ষর",
  numberBucket: "অন্যান্য (0–9)",
};

const mr: TrainIndexStrings = {
  browseAZ: "ट्रेन A–Z पाहा",
  hubSubtitle: "प्रत्येक भारतीय रेल्वे गाडी, नावानुसार गटबद्ध — एकूण {count}.",
  letterHeading: "{letter} ने सुरू होणाऱ्या गाड्या",
  letterSubtitle: "{count} गाड्या ज्यांचे नाव {letter} ने सुरू होते.",
  jumpToLetter: "एखाद्या अक्षरावर जा",
  backToFinder: "ट्रेन फाइंडरकडे परत",
  otherLetters: "इतर अक्षरे",
  numberBucket: "इतर (0–9)",
};

const ta: TrainIndexStrings = {
  browseAZ: "ரயில்கள் A–Z பார்க்க",
  hubSubtitle: "ஒவ்வொரு இந்திய ரயிலும், பெயர் வாரியாக — மொத்தம் {count}.",
  letterHeading: "{letter} இல் தொடங்கும் ரயில்கள்",
  letterSubtitle: "{letter} இல் பெயர் தொடங்கும் {count} ரயில்கள்.",
  jumpToLetter: "ஒரு எழுத்துக்குச் செல்",
  backToFinder: "ரயில் தேடுபொறிக்குத் திரும்பு",
  otherLetters: "பிற எழுத்துகள்",
  numberBucket: "பிற (0–9)",
};

const te: TrainIndexStrings = {
  browseAZ: "రైళ్లు A–Z చూడండి",
  hubSubtitle: "ప్రతి భారతీయ రైలు, పేరు వారీగా — మొత్తం {count}.",
  letterHeading: "{letter} తో మొదలయ్యే రైళ్లు",
  letterSubtitle: "{letter} తో పేరు మొదలయ్యే {count} రైళ్లు.",
  jumpToLetter: "ఒక అక్షరానికి వెళ్లండి",
  backToFinder: "రైలు ఫైండర్‌కు తిరిగి",
  otherLetters: "ఇతర అక్షరాలు",
  numberBucket: "ఇతర (0–9)",
};

const gu: TrainIndexStrings = {
  browseAZ: "ટ્રેનો A–Z જુઓ",
  hubSubtitle: "દરેક ભારતીય રેલવે ટ્રેન, નામ પ્રમાણે જૂથબદ્ધ — કુલ {count}.",
  letterHeading: "{letter} થી શરૂ થતી ટ્રેનો",
  letterSubtitle: "{count} ટ્રેનો જેમનું નામ {letter} થી શરૂ થાય છે.",
  jumpToLetter: "કોઈ અક્ષર પર જાઓ",
  backToFinder: "ટ્રેન ફાઇન્ડર પર પાછા",
  otherLetters: "અન્ય અક્ષરો",
  numberBucket: "અન્ય (0–9)",
};

const kn: TrainIndexStrings = {
  browseAZ: "ರೈಲುಗಳು A–Z ನೋಡಿ",
  hubSubtitle: "ಪ್ರತಿ ಭಾರತೀಯ ರೈಲು, ಹೆಸರಿನ ಪ್ರಕಾರ ಗುಂಪು — ಒಟ್ಟು {count}.",
  letterHeading: "{letter} ನಿಂದ ಪ್ರಾರಂಭವಾಗುವ ರೈಲುಗಳು",
  letterSubtitle: "{letter} ನಿಂದ ಹೆಸರು ಪ್ರಾರಂಭವಾಗುವ {count} ರೈಲುಗಳು.",
  jumpToLetter: "ಒಂದು ಅಕ್ಷರಕ್ಕೆ ಹೋಗಿ",
  backToFinder: "ರೈಲು ಹುಡುಕಾಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
  otherLetters: "ಇತರ ಅಕ್ಷರಗಳು",
  numberBucket: "ಇತರ (0–9)",
};

const MAP: Record<Locale, TrainIndexStrings> = { en, hi, bn, mr, ta, te, gu, kn };

export function trainIndexStrings(locale: Locale): TrainIndexStrings {
  return MAP[locale] ?? MAP[DEFAULT_LOCALE];
}
