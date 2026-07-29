import type { Locale } from "@/i18n/locales";
import { DEFAULT_LOCALE } from "@/i18n/locales";

/** Strings for the A–Z station code glossary. Templates use {braces}. */
export interface StationIndexStrings {
  /** Footer + hub link, and the index heading. */
  browseAZ: string;
  /** {count} */
  hubSubtitle: string;
  /** {letter} */
  letterHeading: string;
  /** {letter} {count} */
  letterSubtitle: string;
  jumpToLetter: string;
  backToDirectory: string;
  otherLetters: string;
  /** {letter} — for the non-alphabetic bucket. */
  numberBucket: string;
}

const en: StationIndexStrings = {
  browseAZ: "Browse station codes A–Z",
  hubSubtitle: "Every Indian Railways station code, alphabetically — {count} in total.",
  letterHeading: "Station codes starting with {letter}",
  letterSubtitle: "{count} station codes beginning with {letter}.",
  jumpToLetter: "Jump to a letter",
  backToDirectory: "Back to Station Directory",
  otherLetters: "Other letters",
  numberBucket: "Other (0–9)",
};

const hi: StationIndexStrings = {
  browseAZ: "स्टेशन कोड A–Z देखें",
  hubSubtitle: "हर भारतीय रेल स्टेशन कोड, वर्णानुक्रम में — कुल {count}।",
  letterHeading: "{letter} से शुरू होने वाले स्टेशन कोड",
  letterSubtitle: "{count} स्टेशन कोड जो {letter} से शुरू होते हैं।",
  jumpToLetter: "किसी अक्षर पर जाएँ",
  backToDirectory: "स्टेशन डायरेक्टरी पर वापस",
  otherLetters: "अन्य अक्षर",
  numberBucket: "अन्य (0–9)",
};

const bn: StationIndexStrings = {
  browseAZ: "স্টেশন কোড A–Z দেখুন",
  hubSubtitle: "প্রতিটি ভারতীয় রেল স্টেশন কোড, বর্ণানুক্রমে — মোট {count}।",
  letterHeading: "{letter} দিয়ে শুরু হওয়া স্টেশন কোড",
  letterSubtitle: "{count}টি স্টেশন কোড যা {letter} দিয়ে শুরু হয়।",
  jumpToLetter: "কোনো অক্ষরে যান",
  backToDirectory: "স্টেশন ডিরেক্টরিতে ফিরুন",
  otherLetters: "অন্যান্য অক্ষর",
  numberBucket: "অন্যান্য (0–9)",
};

const mr: StationIndexStrings = {
  browseAZ: "स्थानक कोड A–Z पाहा",
  hubSubtitle: "प्रत्येक भारतीय रेल्वे स्थानक कोड, वर्णानुक्रमे — एकूण {count}.",
  letterHeading: "{letter} ने सुरू होणारे स्थानक कोड",
  letterSubtitle: "{count} स्थानक कोड जे {letter} ने सुरू होतात.",
  jumpToLetter: "एखाद्या अक्षरावर जा",
  backToDirectory: "स्थानक डिरेक्टरीकडे परत",
  otherLetters: "इतर अक्षरे",
  numberBucket: "इतर (0–9)",
};

const ta: StationIndexStrings = {
  browseAZ: "நிலைய குறியீடுகள் A–Z பார்க்க",
  hubSubtitle: "ஒவ்வொரு இந்திய ரயில் நிலைய குறியீடும், எழுத்து வரிசையில் — மொத்தம் {count}.",
  letterHeading: "{letter} இல் தொடங்கும் நிலைய குறியீடுகள்",
  letterSubtitle: "{letter} இல் தொடங்கும் {count} நிலைய குறியீடுகள்.",
  jumpToLetter: "ஒரு எழுத்துக்குச் செல்",
  backToDirectory: "நிலைய அடைவுக்குத் திரும்பு",
  otherLetters: "பிற எழுத்துகள்",
  numberBucket: "பிற (0–9)",
};

const te: StationIndexStrings = {
  browseAZ: "స్టేషన్ కోడ్‌లు A–Z చూడండి",
  hubSubtitle: "ప్రతి భారతీయ రైల్వే స్టేషన్ కోడ్, అక్షర క్రమంలో — మొత్తం {count}.",
  letterHeading: "{letter} తో మొదలయ్యే స్టేషన్ కోడ్‌లు",
  letterSubtitle: "{letter} తో మొదలయ్యే {count} స్టేషన్ కోడ్‌లు.",
  jumpToLetter: "ఒక అక్షరానికి వెళ్లండి",
  backToDirectory: "స్టేషన్ డైరెక్టరీకి తిరిగి",
  otherLetters: "ఇతర అక్షరాలు",
  numberBucket: "ఇతర (0–9)",
};

const gu: StationIndexStrings = {
  browseAZ: "સ્ટેશન કોડ A–Z જુઓ",
  hubSubtitle: "દરેક ભારતીય રેલવે સ્ટેશન કોડ, અક્ષરાનુક્રમે — કુલ {count}.",
  letterHeading: "{letter} થી શરૂ થતા સ્ટેશન કોડ",
  letterSubtitle: "{count} સ્ટેશન કોડ જે {letter} થી શરૂ થાય છે.",
  jumpToLetter: "કોઈ અક્ષર પર જાઓ",
  backToDirectory: "સ્ટેશન ડિરેક્ટરી પર પાછા",
  otherLetters: "અન્ય અક્ષરો",
  numberBucket: "અન્ય (0–9)",
};

const kn: StationIndexStrings = {
  browseAZ: "ನಿಲ್ದಾಣ ಕೋಡ್‌ಗಳು A–Z ನೋಡಿ",
  hubSubtitle: "ಪ್ರತಿ ಭಾರತೀಯ ರೈಲ್ವೆ ನಿಲ್ದಾಣ ಕೋಡ್, ಅಕ್ಷರಾನುಕ್ರಮದಲ್ಲಿ — ಒಟ್ಟು {count}.",
  letterHeading: "{letter} ನಿಂದ ಪ್ರಾರಂಭವಾಗುವ ನಿಲ್ದಾಣ ಕೋಡ್‌ಗಳು",
  letterSubtitle: "{letter} ನಿಂದ ಪ್ರಾರಂಭವಾಗುವ {count} ನಿಲ್ದಾಣ ಕೋಡ್‌ಗಳು.",
  jumpToLetter: "ಒಂದು ಅಕ್ಷರಕ್ಕೆ ಹೋಗಿ",
  backToDirectory: "ನಿಲ್ದಾಣ ಡೈರೆಕ್ಟರಿಗೆ ಹಿಂತಿರುಗಿ",
  otherLetters: "ಇತರ ಅಕ್ಷರಗಳು",
  numberBucket: "ಇತರ (0–9)",
};

const MAP: Record<Locale, StationIndexStrings> = { en, hi, bn, mr, ta, te, gu, kn };

export function stationIndexStrings(locale: Locale): StationIndexStrings {
  return MAP[locale] ?? MAP[DEFAULT_LOCALE];
}
