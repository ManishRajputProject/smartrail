import type { Locale } from "@/i18n/locales";
import { DEFAULT_LOCALE } from "@/i18n/locales";

/** Strings for train-category hub pages (/trains/category/[slug]). Templates use {braces}. */
export interface TrainCategoryStrings {
  browseByType: string;
  /** {name} {count} */
  subtitle: string;
  backToFinder: string;
  otherCategories: string;
}

const en: TrainCategoryStrings = {
  browseByType: "Browse by train type",
  subtitle: "{count} {name} trains in our directory — routes, timings and live status.",
  backToFinder: "Back to Train Finder",
  otherCategories: "Other categories",
};

const hi: TrainCategoryStrings = {
  browseByType: "ट्रेन प्रकार के अनुसार देखें",
  subtitle: "हमारी डायरेक्टरी में {count} {name} ट्रेनें — रूट, समय और लाइव स्थिति।",
  backToFinder: "ट्रेन फाइंडर पर वापस",
  otherCategories: "अन्य श्रेणियां",
};

const bn: TrainCategoryStrings = {
  browseByType: "ট্রেনের ধরন অনুযায়ী দেখুন",
  subtitle: "আমাদের ডিরেক্টরিতে {count}টি {name} ট্রেন — রুট, সময় এবং লাইভ স্ট্যাটাস।",
  backToFinder: "ট্রেন ফাইন্ডারে ফিরুন",
  otherCategories: "অন্যান্য বিভাগ",
};

const mr: TrainCategoryStrings = {
  browseByType: "गाडीच्या प्रकारानुसार पाहा",
  subtitle: "आमच्या डिरेक्टरीत {count} {name} गाड्या — मार्ग, वेळा आणि लाइव्ह स्थिती.",
  backToFinder: "ट्रेन फाइंडरकडे परत",
  otherCategories: "इतर श्रेणी",
};

const ta: TrainCategoryStrings = {
  browseByType: "ரயில் வகை வாரியாக பார்க்க",
  subtitle: "எங்கள் அடைவில் {count} {name} ரயில்கள் — பாதைகள், நேரங்கள் மற்றும் நேரலை நிலை.",
  backToFinder: "ரயில் தேடுபொறிக்குத் திரும்பு",
  otherCategories: "பிற வகைகள்",
};

const te: TrainCategoryStrings = {
  browseByType: "రైలు రకం వారీగా చూడండి",
  subtitle: "మా డైరెక్టరీలో {count} {name} రైళ్లు — మార్గాలు, సమయాలు మరియు ప్రత్యక్ష స్థితి.",
  backToFinder: "రైలు ఫైండర్‌కు తిరిగి",
  otherCategories: "ఇతర వర్గాలు",
};

const gu: TrainCategoryStrings = {
  browseByType: "ટ્રેનના પ્રકાર પ્રમાણે જુઓ",
  subtitle: "અમારી ડિરેક્ટરીમાં {count} {name} ટ્રેનો — રૂટ, સમય અને લાઇવ સ્થિતિ.",
  backToFinder: "ટ્રેન ફાઇન્ડર પર પાછા",
  otherCategories: "અન્ય શ્રેણીઓ",
};

const kn: TrainCategoryStrings = {
  browseByType: "ರೈಲು ಪ್ರಕಾರದ ಪ್ರಕಾರ ನೋಡಿ",
  subtitle: "ನಮ್ಮ ಡೈರೆಕ್ಟರಿಯಲ್ಲಿ {count} {name} ರೈಲುಗಳು — ಮಾರ್ಗಗಳು, ಸಮಯಗಳು ಮತ್ತು ನೇರ ಸ್ಥಿತಿ.",
  backToFinder: "ರೈಲು ಹುಡುಕಾಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
  otherCategories: "ಇತರ ವರ್ಗಗಳು",
};

const MAP: Record<Locale, TrainCategoryStrings> = { en, hi, bn, mr, ta, te, gu, kn };

export function trainCategoryStrings(locale: Locale): TrainCategoryStrings {
  return MAP[locale] ?? MAP[DEFAULT_LOCALE];
}
