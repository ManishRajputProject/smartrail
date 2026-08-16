import type { Locale } from "@/i18n/locales";
import { DEFAULT_LOCALE } from "@/i18n/locales";

/**
 * UI strings for the per-train reference pages. These pages are generated from
 * the dataset for thousands of trains, so the wording lives here once rather
 * than inline, and every locale gets a real translation instead of English.
 *
 * Templates use {braces}; see fill() below. Placeholders may be reordered
 * freely per language.
 */
export interface TrainStrings {
  /** Appended to "<number> <name>" in the page title. */
  metaTitleSuffix: string;
  /** {from} {to} */
  metaRoute: string;
  /** {dep} {arr} {duration} */
  metaTimes: string;
  /** {classes} */
  metaClasses: string;
  /** {number} {time} — the single most-searched query pattern for these
   *  pages ("<number> chart preparation time"), so it gets its own,
   *  specific, computed-time sentence near the front of the description
   *  rather than only the generic mention inside metaTail. */
  metaChartPrep: string;
  metaTail: string;
  trainFinder: string;
  quickAnswer: string;
  chartPrepHeading: string;
  /** {number} {name} {fromCode} {dep} {date} */
  chartPrepIntro: string;
  chartPrepGuideLink: string;
  from: string;
  to: string;
  duration: string;
  zone: string;
  trainType: string;
  classesAvailable: string;

  /** {number} {name} {fromName} {dep} {toName} {arr} {duration} */
  summary: string;
  summaryNoTimes: string;

  journeyProfile: string;
  overnightTitle: string;
  dayTitle: string;
  /** {nights} */
  overnightBody: string;
  overnightBodyMulti: string;
  dayBody: string;
  /** {km} */
  straightLine: string;
  straightLineNote: string;

  classesHeading: string;
  classesBody: string;
  compareClasses: string;
  acNote: string;
  nonAcNote: string;

  bookingHeading: string;
  /** {days} */
  bookingArp: string;
  tatkalAc: string;
  tatkalNonAc: string;

  /** {fromName} {toName} */
  otherTrains: string;
  otherTrainsNote: string;
  returnDirection: string;
  returnDirectionNote: string;

  checkBookingDate: string;
  setReminder: string;
  browseAllTrains: string;

  dayParts: Record<string, string>;
}

/** Replace {key} placeholders. Missing keys are left untouched, so a template
 *  that a translation forgot to interpolate degrades visibly rather than
 *  silently rendering "undefined". */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k) =>
    k in vars ? String(vars[k]) : m
  );
}

const en: TrainStrings = {
  metaTitleSuffix: "Live Status, Chart Prep & Timings",
  metaRoute: "{from} to {to}.",
  metaTimes: "Departs {dep}, arrives {arr} ({duration}).",
  metaClasses: "Classes: {classes}.",
  metaChartPrep: "{number} chart preparation time: expected around {time}.",
  metaTail: "Live running status, booking window, Tatkal timing and direct alternatives.",
  trainFinder: "Train Finder",
  quickAnswer: "Quick answer",
  chartPrepHeading: "Chart Preparation Time",
  chartPrepIntro: "{number} {name} departs {fromCode} at {dep}. For the next departure ({date}), the chart is expected to be prepared:",
  chartPrepGuideLink: "How chart preparation works",
  from: "From",
  to: "To",
  duration: "Duration",
  zone: "Zone",
  trainType: "Type",
  classesAvailable: "Classes available",

  summary:
    "{number} {name} departs {fromName} at {dep} and is scheduled to reach {toName} at {arr}, a run of {duration}.",
  summaryNoTimes:
    "{number} {name} runs between {fromName} and {toName}.",

  journeyProfile: "Journey profile",
  overnightTitle: "Overnight journey",
  dayTitle: "Daytime journey",
  overnightBody:
    "This service crosses one night on board, so a berth is worth having rather than a seat. Sleeper and AC berth classes are the practical choice; chair-car seating on an overnight run is tiring.",
  overnightBodyMulti:
    "This service spends {nights} nights on board, so a berth rather than a seat matters a great deal. Carry your own water and a light blanket — bedding is provided in AC classes but not in Sleeper.",
  dayBody:
    "This is a daytime run with no night on board, so seating classes are perfectly comfortable and usually cheaper than reserving a berth you will not sleep in.",
  straightLine: "About {km} km apart in a straight line",
  straightLineNote:
    "Straight-line distance between the two stations. The actual rail route is longer, and the scheduled time above includes intermediate halts.",

  classesHeading: "Classes on this train",
  classesBody:
    "Class decides comfort and fare; the quota you book under decides competition. See our class comparison if you are unsure which suits the journey.",
  compareClasses: "Compare all train classes",
  acNote:
    "This train carries air-conditioned accommodation, so its Tatkal quota opens at 10:00 AM IST.",
  nonAcNote:
    "This train carries non-AC accommodation, whose Tatkal quota opens at 11:00 AM IST.",

  bookingHeading: "Booking this train",
  bookingArp:
    "General-quota booking opens {days} days before the departure date at 8:00 AM IST, counted from this train's departure from its source station — not from the station where you board.",
  tatkalAc: "Tatkal for AC classes opens at 10:00 AM IST, one day before travel.",
  tatkalNonAc: "Tatkal for non-AC classes opens at 11:00 AM IST, one day before travel.",

  otherTrains: "Other direct trains from {fromName} to {toName}",
  otherTrainsNote:
    "Trains that start and end at the same pair of stations. Services that merely pass through both are not listed — that needs stop-level schedule data we do not publish.",
  returnDirection: "Return direction",
  returnDirectionNote: "The direct service running the opposite way.",

  checkBookingDate: "Check booking date",
  setReminder: "Set a reminder",
  browseAllTrains: "Browse all trains",

  dayParts: {
    earlyMorning: "early morning",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
};

const hi: TrainStrings = {
  metaTitleSuffix: "लाइव स्टेटस, चार्ट तैयारी और समय",
  metaRoute: "{from} से {to} तक।",
  metaTimes: "{dep} बजे प्रस्थान, {arr} बजे आगमन ({duration})।",
  metaClasses: "श्रेणियां: {classes}।",
  metaChartPrep: "{number} चार्ट तैयार होने का समय: लगभग {time} तक।",
  metaTail: "लाइव स्टेटस, बुकिंग विंडो, तत्काल समय और अन्य सीधी ट्रेनें।",
  trainFinder: "ट्रेन फाइंडर",
  quickAnswer: "संक्षिप्त उत्तर",
  chartPrepHeading: "चार्ट तैयार होने का समय",
  chartPrepIntro: "{number} {name} {fromCode} से {dep} बजे रवाना होती है। अगली रवानगी ({date}) के लिए चार्ट इस समय तक तैयार होने की उम्मीद है:",
  chartPrepGuideLink: "चार्ट तैयार होने की प्रक्रिया जानें",
  from: "से",
  to: "तक",
  duration: "अवधि",
  zone: "ज़ोन",
  trainType: "प्रकार",
  classesAvailable: "उपलब्ध श्रेणियां",

  summary:
    "{number} {name} {fromName} से {dep} बजे चलती है और {toName} {arr} बजे पहुँचने का समय है, कुल {duration} की यात्रा।",
  summaryNoTimes: "{number} {name} {fromName} और {toName} के बीच चलती है।",

  journeyProfile: "यात्रा का स्वरूप",
  overnightTitle: "रातभर की यात्रा",
  dayTitle: "दिन की यात्रा",
  overnightBody:
    "यह ट्रेन एक रात सफ़र में बिताती है, इसलिए सीट के बजाय बर्थ लेना बेहतर है। स्लीपर और AC बर्थ श्रेणियां व्यावहारिक विकल्प हैं; रातभर की यात्रा में चेयर कार थकाऊ होती है।",
  overnightBodyMulti:
    "यह ट्रेन {nights} रातें सफ़र में बिताती है, इसलिए सीट नहीं बल्कि बर्थ बहुत मायने रखती है। अपना पानी और हल्का कंबल साथ रखें — AC श्रेणियों में बिस्तर मिलता है, स्लीपर में नहीं।",
  dayBody:
    "यह दिन की यात्रा है, रात सफ़र में नहीं बितानी पड़ती, इसलिए बैठने वाली श्रेणियां पूरी तरह आरामदायक हैं और उस बर्थ से सस्ती भी जिस पर आप सोएँगे ही नहीं।",
  straightLine: "सीधी रेखा में लगभग {km} किमी की दूरी",
  straightLineNote:
    "यह दोनों स्टेशनों के बीच सीधी रेखा की दूरी है। वास्तविक रेल मार्ग इससे लंबा होता है, और ऊपर दिया गया समय बीच के ठहरावों सहित है।",

  classesHeading: "इस ट्रेन की श्रेणियां",
  classesBody:
    "श्रेणी आराम और किराया तय करती है; जिस कोटा में आप बुक करते हैं वह प्रतिस्पर्धा तय करता है। कौन-सी श्रेणी इस यात्रा के लिए ठीक है, इसमें संदेह हो तो हमारी श्रेणी तुलना देखें।",
  compareClasses: "सभी ट्रेन श्रेणियों की तुलना करें",
  acNote: "इस ट्रेन में वातानुकूलित श्रेणियां हैं, इसलिए इसका तत्काल कोटा सुबह 10:00 बजे IST खुलता है।",
  nonAcNote: "इस ट्रेन में नॉन-AC श्रेणियां हैं, जिनका तत्काल कोटा सुबह 11:00 बजे IST खुलता है।",

  bookingHeading: "इस ट्रेन की बुकिंग",
  bookingArp:
    "सामान्य कोटा की बुकिंग प्रस्थान तारीख से {days} दिन पहले सुबह 8:00 बजे IST खुलती है, और यह गिनती इस ट्रेन के प्रारंभिक स्टेशन से प्रस्थान के अनुसार होती है — उस स्टेशन से नहीं जहाँ से आप चढ़ते हैं।",
  tatkalAc: "AC श्रेणियों का तत्काल यात्रा से एक दिन पहले सुबह 10:00 बजे IST खुलता है।",
  tatkalNonAc: "नॉन-AC श्रेणियों का तत्काल यात्रा से एक दिन पहले सुबह 11:00 बजे IST खुलता है।",

  otherTrains: "{fromName} से {toName} तक की अन्य सीधी ट्रेनें",
  otherTrainsNote:
    "वे ट्रेनें जो इन्हीं दो स्टेशनों से शुरू होकर वहीं समाप्त होती हैं। जो ट्रेनें केवल दोनों से होकर गुज़रती हैं वे यहाँ नहीं हैं — उसके लिए ठहराव-स्तर का शेड्यूल डेटा चाहिए जो हम प्रकाशित नहीं करते।",
  returnDirection: "वापसी दिशा",
  returnDirectionNote: "विपरीत दिशा में चलने वाली सीधी ट्रेन।",

  checkBookingDate: "बुकिंग तारीख देखें",
  setReminder: "रिमाइंडर सेट करें",
  browseAllTrains: "सभी ट्रेनें देखें",

  dayParts: {
    earlyMorning: "सुबह जल्दी",
    morning: "सुबह",
    afternoon: "दोपहर",
    evening: "शाम",
    night: "रात",
  },
};

const bn: TrainStrings = {
  metaTitleSuffix: "লাইভ স্ট্যাটাস, চার্ট প্রস্তুতি ও সময়সূচি",
  metaRoute: "{from} থেকে {to}।",
  metaTimes: "{dep}-এ ছাড়ে, {arr}-এ পৌঁছায় ({duration})।",
  metaClasses: "শ্রেণি: {classes}।",
  metaChartPrep: "{number} চার্ট তৈরির সময়: আনুমানিক {time}।",
  metaTail: "লাইভ স্ট্যাটাস, বুকিং উইন্ডো, তৎকাল সময় ও অন্যান্য সরাসরি ট্রেন।",
  trainFinder: "ট্রেন ফাইন্ডার",
  quickAnswer: "সংক্ষিপ্ত উত্তর",
  chartPrepHeading: "চার্ট তৈরির সময়",
  chartPrepIntro: "{number} {name} {fromCode} থেকে {dep}-এ ছাড়ে। পরবর্তী যাত্রার ({date}) জন্য চার্ট তৈরি হওয়ার সম্ভাব্য সময়:",
  chartPrepGuideLink: "চার্ট তৈরির প্রক্রিয়া জানুন",
  from: "থেকে",
  to: "পর্যন্ত",
  duration: "সময়কাল",
  zone: "জোন",
  trainType: "ধরন",
  classesAvailable: "উপলব্ধ শ্রেণি",

  summary:
    "{number} {name} {fromName} থেকে {dep}-টায় ছাড়ে এবং {toName}-এ {arr}-টায় পৌঁছানোর কথা, মোট {duration}-এর যাত্রা।",
  summaryNoTimes: "{number} {name} {fromName} ও {toName}-এর মধ্যে চলে।",

  journeyProfile: "যাত্রার ধরন",
  overnightTitle: "রাত্রিকালীন যাত্রা",
  dayTitle: "দিনের যাত্রা",
  overnightBody:
    "এই ট্রেনটি এক রাত পথে কাটায়, তাই আসনের বদলে বার্থ নেওয়াই ভালো। স্লিপার ও AC বার্থ শ্রেণি বাস্তবসম্মত পছন্দ; রাতের যাত্রায় চেয়ার কার ক্লান্তিকর।",
  overnightBodyMulti:
    "এই ট্রেনটি {nights} রাত পথে কাটায়, তাই আসন নয়, বার্থ অনেক বেশি জরুরি। নিজের জল ও হালকা কম্বল সঙ্গে রাখুন — AC শ্রেণিতে বিছানা দেওয়া হয়, স্লিপারে নয়।",
  dayBody:
    "এটি দিনের যাত্রা, রাত পথে কাটাতে হয় না, তাই বসার শ্রেণিগুলি বেশ আরামদায়ক এবং যে বার্থে আপনি ঘুমাবেনই না তার চেয়ে সস্তাও।",
  straightLine: "সরলরেখায় প্রায় {km} কিমি দূরত্ব",
  straightLineNote:
    "এটি দুই স্টেশনের মধ্যে সরলরেখার দূরত্ব। প্রকৃত রেলপথ এর চেয়ে দীর্ঘ, এবং উপরের সময়ে মাঝের স্টপগুলিও ধরা আছে।",

  classesHeading: "এই ট্রেনের শ্রেণিসমূহ",
  classesBody:
    "শ্রেণি আরাম ও ভাড়া ঠিক করে; আপনি যে কোটায় বুক করেন তা প্রতিযোগিতা ঠিক করে। কোন শ্রেণি এই যাত্রার জন্য উপযুক্ত সন্দেহ থাকলে আমাদের শ্রেণি তুলনা দেখুন।",
  compareClasses: "সব ট্রেন শ্রেণির তুলনা করুন",
  acNote: "এই ট্রেনে শীতাতপ নিয়ন্ত্রিত শ্রেণি আছে, তাই এর তৎকাল কোটা সকাল ১০:০০ IST-তে খোলে।",
  nonAcNote: "এই ট্রেনে নন-AC শ্রেণি আছে, যার তৎকাল কোটা সকাল ১১:০০ IST-তে খোলে।",

  bookingHeading: "এই ট্রেনের বুকিং",
  bookingArp:
    "সাধারণ কোটার বুকিং ছাড়ার তারিখের {days} দিন আগে সকাল ৮:০০ IST-তে খোলে, এবং এই গণনা এই ট্রেনের উৎস স্টেশন থেকে ছাড়ার ভিত্তিতে — আপনি যে স্টেশন থেকে ওঠেন তার ভিত্তিতে নয়।",
  tatkalAc: "AC শ্রেণির তৎকাল যাত্রার একদিন আগে সকাল ১০:০০ IST-তে খোলে।",
  tatkalNonAc: "নন-AC শ্রেণির তৎকাল যাত্রার একদিন আগে সকাল ১১:০০ IST-তে খোলে।",

  otherTrains: "{fromName} থেকে {toName} পর্যন্ত অন্যান্য সরাসরি ট্রেন",
  otherTrainsNote:
    "যে ট্রেনগুলি এই একই দুই স্টেশন থেকে শুরু হয়ে সেখানেই শেষ হয়। যেগুলি কেবল দুটির মধ্য দিয়ে যায় সেগুলি এখানে নেই — তার জন্য স্টপ-স্তরের সময়সূচি প্রয়োজন যা আমরা প্রকাশ করি না।",
  returnDirection: "ফেরার দিক",
  returnDirectionNote: "বিপরীত দিকে চলা সরাসরি ট্রেন।",

  checkBookingDate: "বুকিং তারিখ দেখুন",
  setReminder: "রিমাইন্ডার সেট করুন",
  browseAllTrains: "সব ট্রেন দেখুন",

  dayParts: {
    earlyMorning: "ভোরবেলা",
    morning: "সকাল",
    afternoon: "দুপুর",
    evening: "সন্ধ্যা",
    night: "রাত",
  },
};

const mr: TrainStrings = {
  metaTitleSuffix: "लाइव्ह स्टेटस, चार्ट तयारी आणि वेळापत्रक",
  metaRoute: "{from} ते {to}.",
  metaTimes: "{dep} वाजता सुटते, {arr} वाजता पोहोचते ({duration}).",
  metaClasses: "श्रेणी: {classes}.",
  metaChartPrep: "{number} चार्ट तयार होण्याची वेळ: अंदाजे {time}.",
  metaTail: "लाइव्ह स्टेटस, बुकिंग विंडो, तत्काळ वेळ आणि इतर थेट गाड्या.",
  trainFinder: "ट्रेन फाइंडर",
  quickAnswer: "थोडक्यात उत्तर",
  chartPrepHeading: "चार्ट तयार होण्याची वेळ",
  chartPrepIntro: "{number} {name} {fromCode} वरून {dep} वाजता सुटते. पुढील प्रवासासाठी ({date}) चार्ट साधारण या वेळेपर्यंत तयार होईल:",
  chartPrepGuideLink: "चार्ट तयार होण्याची प्रक्रिया जाणून घ्या",
  from: "पासून",
  to: "पर्यंत",
  duration: "कालावधी",
  zone: "विभाग",
  trainType: "प्रकार",
  classesAvailable: "उपलब्ध श्रेणी",

  summary:
    "{number} {name} {fromName} येथून {dep} वाजता सुटते आणि {toName} येथे {arr} वाजता पोहोचणे अपेक्षित आहे, एकूण {duration} चा प्रवास.",
  summaryNoTimes: "{number} {name} ही {fromName} आणि {toName} दरम्यान धावते.",

  journeyProfile: "प्रवासाचे स्वरूप",
  overnightTitle: "रात्रीचा प्रवास",
  dayTitle: "दिवसाचा प्रवास",
  overnightBody:
    "ही गाडी एक रात्र प्रवासात घालवते, त्यामुळे आसनाऐवजी बर्थ घेणे चांगले. स्लीपर आणि AC बर्थ श्रेणी हा व्यावहारिक पर्याय; रात्रीच्या प्रवासात चेअर कार थकवणारी ठरते.",
  overnightBodyMulti:
    "ही गाडी {nights} रात्री प्रवासात घालवते, त्यामुळे आसन नव्हे तर बर्थ खूप महत्त्वाची. स्वतःचे पाणी आणि हलकी चादर सोबत ठेवा — AC श्रेणींमध्ये अंथरूण मिळते, स्लीपरमध्ये नाही.",
  dayBody:
    "हा दिवसाचा प्रवास आहे, रात्र प्रवासात घालवावी लागत नाही, त्यामुळे बसण्याच्या श्रेणी पूर्णपणे आरामदायक आहेत आणि ज्या बर्थवर तुम्ही झोपणारच नाही तिच्यापेक्षा स्वस्तही.",
  straightLine: "सरळ रेषेत सुमारे {km} किमी अंतर",
  straightLineNote:
    "हे दोन्ही स्थानकांमधील सरळ रेषेतील अंतर आहे. प्रत्यक्ष रेल्वेमार्ग यापेक्षा लांब असतो, आणि वरील वेळेत मधले थांबेही धरलेले आहेत.",

  classesHeading: "या गाडीतील श्रेणी",
  classesBody:
    "श्रेणी सोय आणि भाडे ठरवते; तुम्ही ज्या कोट्यात बुक करता तो स्पर्धा ठरवतो. या प्रवासासाठी कोणती श्रेणी योग्य याबद्दल शंका असल्यास आमची श्रेणी तुलना पाहा.",
  compareClasses: "सर्व ट्रेन श्रेणींची तुलना करा",
  acNote: "या गाडीत वातानुकूलित श्रेणी आहेत, त्यामुळे तिचा तत्काळ कोटा सकाळी १०:०० IST वाजता उघडतो.",
  nonAcNote: "या गाडीत नॉन-AC श्रेणी आहेत, ज्यांचा तत्काळ कोटा सकाळी ११:०० IST वाजता उघडतो.",

  bookingHeading: "या गाडीचे बुकिंग",
  bookingArp:
    "सामान्य कोट्याचे बुकिंग सुटण्याच्या तारखेच्या {days} दिवस आधी सकाळी ८:०० IST वाजता उघडते, आणि ही मोजणी या गाडीच्या मूळ स्थानकावरून सुटण्यानुसार होते — तुम्ही ज्या स्थानकावरून चढता त्यानुसार नाही.",
  tatkalAc: "AC श्रेणींचा तत्काळ प्रवासाच्या एक दिवस आधी सकाळी १०:०० IST वाजता उघडतो.",
  tatkalNonAc: "नॉन-AC श्रेणींचा तत्काळ प्रवासाच्या एक दिवस आधी सकाळी ११:०० IST वाजता उघडतो.",

  otherTrains: "{fromName} ते {toName} दरम्यानच्या इतर थेट गाड्या",
  otherTrainsNote:
    "याच दोन स्थानकांपासून सुरू होऊन तिथेच संपणाऱ्या गाड्या. फक्त दोन्हींमधून जाणाऱ्या गाड्या इथे नाहीत — त्यासाठी थांबा-स्तरीय वेळापत्रक लागते जे आम्ही प्रकाशित करत नाही.",
  returnDirection: "परतीची दिशा",
  returnDirectionNote: "विरुद्ध दिशेने धावणारी थेट गाडी.",

  checkBookingDate: "बुकिंग तारीख पाहा",
  setReminder: "स्मरणपत्र लावा",
  browseAllTrains: "सर्व गाड्या पाहा",

  dayParts: {
    earlyMorning: "पहाटे",
    morning: "सकाळी",
    afternoon: "दुपारी",
    evening: "संध्याकाळी",
    night: "रात्री",
  },
};

const ta: TrainStrings = {
  metaTitleSuffix: "நேரடி நிலை, சார்ட் தயாரிப்பு மற்றும் நேரம்",
  metaRoute: "{from} இலிருந்து {to}.",
  metaTimes: "{dep}-க்குப் புறப்படும், {arr}-க்கு வந்தடையும் ({duration}).",
  metaClasses: "வகுப்புகள்: {classes}.",
  metaChartPrep: "{number} சார்ட் தயாராகும் நேரம்: சுமார் {time}.",
  metaTail: "நேரடி நிலை, முன்பதிவு நேரம், தத்கால் நேரம் மற்றும் பிற நேரடி ரயில்கள்.",
  trainFinder: "ரயில் தேடுபொறி",
  quickAnswer: "சுருக்கமான பதில்",
  chartPrepHeading: "சார்ட் தயாராகும் நேரம்",
  chartPrepIntro: "{number} {name} {fromCode}-இலிருந்து {dep}-க்குப் புறப்படுகிறது. அடுத்த பயணத்திற்கு ({date}) சார்ட் இந்த நேரத்திற்குள் தயாராகும் என எதிர்பார்க்கப்படுகிறது:",
  chartPrepGuideLink: "சார்ட் தயாராகும் விதத்தை அறிக",
  from: "இருந்து",
  to: "வரை",
  duration: "பயண நேரம்",
  zone: "மண்டலம்",
  trainType: "வகை",
  classesAvailable: "கிடைக்கும் வகுப்புகள்",

  summary:
    "{number} {name} ரயில் {fromName}-இலிருந்து {dep} மணிக்குப் புறப்பட்டு {toName}-ஐ {arr} மணிக்கு அடையும், மொத்தம் {duration} பயணம்.",
  summaryNoTimes: "{number} {name} ரயில் {fromName} மற்றும் {toName} இடையே இயங்குகிறது.",

  journeyProfile: "பயணத்தின் தன்மை",
  overnightTitle: "இரவுப் பயணம்",
  dayTitle: "பகல் பயணம்",
  overnightBody:
    "இந்த ரயில் ஒரு இரவைப் பயணத்தில் கழிக்கிறது, எனவே இருக்கையை விடப் படுக்கை எடுப்பதே நல்லது. ஸ்லீப்பர் மற்றும் AC படுக்கை வகுப்புகள் நடைமுறையான தேர்வு; இரவுப் பயணத்தில் சேர் கார் சோர்வளிக்கும்.",
  overnightBodyMulti:
    "இந்த ரயில் {nights} இரவுகளைப் பயணத்தில் கழிக்கிறது, எனவே இருக்கை அல்ல, படுக்கையே மிக முக்கியம். சொந்தத் தண்ணீரும் மெல்லிய போர்வையும் எடுத்துச் செல்லுங்கள் — AC வகுப்புகளில் படுக்கை விரிப்பு வழங்கப்படும், ஸ்லீப்பரில் இல்லை.",
  dayBody:
    "இது பகல் பயணம், இரவைப் பயணத்தில் கழிக்க வேண்டியதில்லை, எனவே இருக்கை வகுப்புகள் முற்றிலும் வசதியானவை, மேலும் நீங்கள் தூங்கவே போவதில்லாத படுக்கையை விட மலிவானவை.",
  straightLine: "நேர்கோட்டில் சுமார் {km} கி.மீ. இடைவெளி",
  straightLineNote:
    "இது இரு நிலையங்களுக்கு இடையிலான நேர்கோட்டு தூரம். உண்மையான ரயில் பாதை இதை விட நீளமானது, மேலும் மேலே உள்ள நேரத்தில் இடைநிறுத்தங்களும் அடங்கும்.",

  classesHeading: "இந்த ரயிலின் வகுப்புகள்",
  classesBody:
    "வகுப்பு வசதியையும் கட்டணத்தையும் தீர்மானிக்கிறது; நீங்கள் பதிவு செய்யும் ஒதுக்கீடு போட்டியைத் தீர்மானிக்கிறது. இந்தப் பயணத்திற்கு எந்த வகுப்பு பொருத்தம் என்பதில் ஐயம் இருந்தால் எங்கள் வகுப்பு ஒப்பீட்டைப் பாருங்கள்.",
  compareClasses: "அனைத்து ரயில் வகுப்புகளையும் ஒப்பிடுங்கள்",
  acNote: "இந்த ரயிலில் குளிரூட்டப்பட்ட வகுப்புகள் உள்ளன, எனவே இதன் தத்கால் ஒதுக்கீடு காலை 10:00 IST-க்குத் திறக்கிறது.",
  nonAcNote: "இந்த ரயிலில் AC அல்லாத வகுப்புகள் உள்ளன, அவற்றின் தத்கால் ஒதுக்கீடு காலை 11:00 IST-க்குத் திறக்கிறது.",

  bookingHeading: "இந்த ரயிலை முன்பதிவு செய்தல்",
  bookingArp:
    "பொது ஒதுக்கீட்டு முன்பதிவு புறப்படும் தேதிக்கு {days} நாட்கள் முன்பு காலை 8:00 IST-க்குத் திறக்கிறது, இந்தக் கணக்கு இந்த ரயில் தனது தொடக்க நிலையத்திலிருந்து புறப்படுவதன் அடிப்படையில் — நீங்கள் ஏறும் நிலையத்தின் அடிப்படையில் அல்ல.",
  tatkalAc: "AC வகுப்புகளுக்கான தத்கால் பயணத்திற்கு ஒரு நாள் முன்பு காலை 10:00 IST-க்குத் திறக்கிறது.",
  tatkalNonAc: "AC அல்லாத வகுப்புகளுக்கான தத்கால் பயணத்திற்கு ஒரு நாள் முன்பு காலை 11:00 IST-க்குத் திறக்கிறது.",

  otherTrains: "{fromName}-இலிருந்து {toName} செல்லும் பிற நேரடி ரயில்கள்",
  otherTrainsNote:
    "இதே இரு நிலையங்களில் தொடங்கி அங்கேயே முடியும் ரயில்கள். இரண்டையும் கடந்து செல்பவை மட்டும் இங்கு இல்லை — அதற்கு நிறுத்த அளவிலான கால அட்டவணை தேவை, அதை நாங்கள் வெளியிடுவதில்லை.",
  returnDirection: "திரும்பும் திசை",
  returnDirectionNote: "எதிர்த் திசையில் இயங்கும் நேரடி ரயில்.",

  checkBookingDate: "முன்பதிவு தேதியைப் பாருங்கள்",
  setReminder: "நினைவூட்டல் வையுங்கள்",
  browseAllTrains: "அனைத்து ரயில்களையும் பாருங்கள்",

  dayParts: {
    earlyMorning: "அதிகாலை",
    morning: "காலை",
    afternoon: "மதியம்",
    evening: "மாலை",
    night: "இரவு",
  },
};

const te: TrainStrings = {
  metaTitleSuffix: "ప్రత్యక్ష స్థితి, చార్ట్ తయారీ మరియు సమయాలు",
  metaRoute: "{from} నుండి {to}.",
  metaTimes: "{dep}కు బయలుదేరుతుంది, {arr}కు చేరుతుంది ({duration}).",
  metaClasses: "తరగతులు: {classes}.",
  metaChartPrep: "{number} చార్ట్ తయారీ సమయం: సుమారు {time}.",
  metaTail: "ప్రత్యక్ష స్థితి, బుకింగ్ విండో, తత్కాల్ సమయం మరియు ఇతర ప్రత్యక్ష రైళ్లు.",
  trainFinder: "రైలు ఫైండర్",
  quickAnswer: "సంక్షిప్త సమాధానం",
  chartPrepHeading: "చార్ట్ తయారీ సమయం",
  chartPrepIntro: "{number} {name} {fromCode} నుండి {dep}కి బయలుదేరుతుంది. తదుపరి ప్రయాణానికి ({date}) చార్ట్ ఈ సమయానికి సిద్ధమవుతుందని అంచనా:",
  chartPrepGuideLink: "చార్ట్ తయారీ ఎలా జరుగుతుందో తెలుసుకోండి",
  from: "నుండి",
  to: "వరకు",
  duration: "ప్రయాణ సమయం",
  zone: "జోన్",
  trainType: "రకం",
  classesAvailable: "అందుబాటులో ఉన్న తరగతులు",

  summary:
    "{number} {name} రైలు {fromName} నుండి {dep} గంటలకు బయలుదేరి {toName}కు {arr} గంటలకు చేరుకోవాల్సి ఉంది, మొత్తం {duration} ప్రయాణం.",
  summaryNoTimes: "{number} {name} రైలు {fromName} మరియు {toName} మధ్య నడుస్తుంది.",

  journeyProfile: "ప్రయాణ స్వరూపం",
  overnightTitle: "రాత్రి ప్రయాణం",
  dayTitle: "పగటి ప్రయాణం",
  overnightBody:
    "ఈ రైలు ఒక రాత్రి ప్రయాణంలో గడుపుతుంది, కాబట్టి సీటు కంటే బెర్త్ తీసుకోవడమే మేలు. స్లీపర్ మరియు AC బెర్త్ తరగతులు ఆచరణాత్మక ఎంపిక; రాత్రి ప్రయాణంలో చైర్ కార్ అలసటగా ఉంటుంది.",
  overnightBodyMulti:
    "ఈ రైలు {nights} రాత్రులు ప్రయాణంలో గడుపుతుంది, కాబట్టి సీటు కాదు, బెర్త్ చాలా ముఖ్యం. మీ స్వంత నీరు మరియు తేలికపాటి దుప్పటి తీసుకువెళ్లండి — AC తరగతులలో పరుపు ఇస్తారు, స్లీపర్‌లో ఇవ్వరు.",
  dayBody:
    "ఇది పగటి ప్రయాణం, రాత్రి ప్రయాణంలో గడపనవసరం లేదు, కాబట్టి కూర్చునే తరగతులు పూర్తిగా సౌకర్యంగా ఉంటాయి మరియు మీరు నిద్రపోని బెర్త్ కంటే చౌకగా కూడా ఉంటాయి.",
  straightLine: "సరళ రేఖలో దాదాపు {km} కి.మీ. దూరం",
  straightLineNote:
    "ఇది రెండు స్టేషన్ల మధ్య సరళ రేఖ దూరం. అసలు రైలు మార్గం దీని కంటే పొడవు, మరియు పైన ఇచ్చిన సమయంలో మధ్య ఆగే స్టాప్‌లు కూడా కలిసి ఉన్నాయి.",

  classesHeading: "ఈ రైలులోని తరగతులు",
  classesBody:
    "తరగతి సౌకర్యాన్ని మరియు ఛార్జీని నిర్ణయిస్తుంది; మీరు బుక్ చేసే కోటా పోటీని నిర్ణయిస్తుంది. ఈ ప్రయాణానికి ఏ తరగతి సరిపోతుందో సందేహం ఉంటే మా తరగతుల పోలికను చూడండి.",
  compareClasses: "అన్ని రైలు తరగతులను పోల్చండి",
  acNote: "ఈ రైలులో ఎయిర్ కండిషన్డ్ తరగతులు ఉన్నాయి, కాబట్టి దీని తత్కాల్ కోటా ఉదయం 10:00 IST కు తెరుచుకుంటుంది.",
  nonAcNote: "ఈ రైలులో నాన్-AC తరగతులు ఉన్నాయి, వాటి తత్కాల్ కోటా ఉదయం 11:00 IST కు తెరుచుకుంటుంది.",

  bookingHeading: "ఈ రైలు బుకింగ్",
  bookingArp:
    "సాధారణ కోటా బుకింగ్ బయలుదేరే తేదీకి {days} రోజుల ముందు ఉదయం 8:00 IST కు తెరుచుకుంటుంది, ఈ లెక్క ఈ రైలు తన మూల స్టేషన్ నుండి బయలుదేరడం ఆధారంగా — మీరు ఎక్కే స్టేషన్ ఆధారంగా కాదు.",
  tatkalAc: "AC తరగతుల తత్కాల్ ప్రయాణానికి ఒక రోజు ముందు ఉదయం 10:00 IST కు తెరుచుకుంటుంది.",
  tatkalNonAc: "నాన్-AC తరగతుల తత్కాల్ ప్రయాణానికి ఒక రోజు ముందు ఉదయం 11:00 IST కు తెరుచుకుంటుంది.",

  otherTrains: "{fromName} నుండి {toName}కు ఇతర ప్రత్యక్ష రైళ్లు",
  otherTrainsNote:
    "ఇవే రెండు స్టేషన్ల నుండి మొదలై అక్కడే ముగిసే రైళ్లు. కేవలం రెండింటి గుండా వెళ్లేవి ఇక్కడ లేవు — దానికి స్టాప్-స్థాయి షెడ్యూల్ డేటా కావాలి, దాన్ని మేము ప్రచురించము.",
  returnDirection: "తిరుగు దిశ",
  returnDirectionNote: "వ్యతిరేక దిశలో నడిచే ప్రత్యక్ష రైలు.",

  checkBookingDate: "బుకింగ్ తేదీ చూడండి",
  setReminder: "రిమైండర్ పెట్టండి",
  browseAllTrains: "అన్ని రైళ్లు చూడండి",

  dayParts: {
    earlyMorning: "తెల్లవారుజామున",
    morning: "ఉదయం",
    afternoon: "మధ్యాహ్నం",
    evening: "సాయంత్రం",
    night: "రాత్రి",
  },
};

const gu: TrainStrings = {
  metaTitleSuffix: "લાઇવ સ્ટેટસ, ચાર્ટ તૈયારી અને સમય",
  metaRoute: "{from} થી {to}.",
  metaTimes: "{dep} વાગ્યે ઉપડે છે, {arr} વાગ્યે પહોંચે છે ({duration}).",
  metaClasses: "વર્ગો: {classes}.",
  metaChartPrep: "{number} ચાર્ટ તૈયાર થવાનો સમય: આશરે {time}.",
  metaTail: "લાઇવ સ્ટેટસ, બુકિંગ વિન્ડો, તત્કાલ સમય અને અન્ય સીધી ટ્રેનો.",
  trainFinder: "ટ્રેન ફાઇન્ડર",
  quickAnswer: "ટૂંકો જવાબ",
  chartPrepHeading: "ચાર્ટ તૈયાર થવાનો સમય",
  chartPrepIntro: "{number} {name} {fromCode} થી {dep} વાગ્યે ઉપડે છે. આગામી પ્રયાણ ({date}) માટે ચાર્ટ આ સમય સુધીમાં તૈયાર થવાની અપેક્ષા છે:",
  chartPrepGuideLink: "ચાર્ટ તૈયાર થવાની પ્રક્રિયા જાણો",
  from: "થી",
  to: "સુધી",
  duration: "સમયગાળો",
  zone: "ઝોન",
  trainType: "પ્રકાર",
  classesAvailable: "ઉપલબ્ધ વર્ગો",

  summary:
    "{number} {name} {fromName} થી {dep} વાગ્યે ઉપડે છે અને {toName} પર {arr} વાગ્યે પહોંચવાની અપેક્ષા છે, કુલ {duration} નો પ્રવાસ.",
  summaryNoTimes: "{number} {name} {fromName} અને {toName} વચ્ચે દોડે છે.",

  journeyProfile: "પ્રવાસનું સ્વરૂપ",
  overnightTitle: "રાત્રિ પ્રવાસ",
  dayTitle: "દિવસનો પ્રવાસ",
  overnightBody:
    "આ ટ્રેન એક રાત પ્રવાસમાં વિતાવે છે, તેથી બેઠકને બદલે બર્થ લેવી સારી. સ્લીપર અને AC બર્થ વર્ગો વ્યવહારુ પસંદગી છે; રાત્રિ પ્રવાસમાં ચેર કાર થકવનારી બને છે.",
  overnightBodyMulti:
    "આ ટ્રેન {nights} રાત પ્રવાસમાં વિતાવે છે, તેથી બેઠક નહીં પણ બર્થ ઘણી મહત્ત્વની. પોતાનું પાણી અને હળવી ચાદર સાથે રાખો — AC વર્ગોમાં પથારી મળે છે, સ્લીપરમાં નહીં.",
  dayBody:
    "આ દિવસનો પ્રવાસ છે, રાત પ્રવાસમાં વિતાવવી પડતી નથી, તેથી બેસવાના વર્ગો સંપૂર્ણપણે આરામદાયક છે અને જે બર્થ પર તમે સૂવાના જ નથી તેના કરતાં સસ્તા પણ.",
  straightLine: "સીધી રેખામાં આશરે {km} કિમીનું અંતર",
  straightLineNote:
    "આ બંને સ્ટેશનો વચ્ચેનું સીધી રેખાનું અંતર છે. વાસ્તવિક રેલમાર્ગ આના કરતાં લાંબો હોય છે, અને ઉપરના સમયમાં વચ્ચેના થોભા પણ સામેલ છે.",

  classesHeading: "આ ટ્રેનના વર્ગો",
  classesBody:
    "વર્ગ સુવિધા અને ભાડું નક્કી કરે છે; તમે જે ક્વોટામાં બુક કરો છો તે સ્પર્ધા નક્કી કરે છે. આ પ્રવાસ માટે કયો વર્ગ યોગ્ય છે તે અંગે શંકા હોય તો અમારી વર્ગ સરખામણી જુઓ.",
  compareClasses: "બધા ટ્રેન વર્ગોની સરખામણી કરો",
  acNote: "આ ટ્રેનમાં વાતાનુકૂલિત વર્ગો છે, તેથી તેનો તત્કાલ ક્વોટા સવારે ૧૦:૦૦ IST વાગ્યે ખૂલે છે.",
  nonAcNote: "આ ટ્રેનમાં નોન-AC વર્ગો છે, જેનો તત્કાલ ક્વોટા સવારે ૧૧:૦૦ IST વાગ્યે ખૂલે છે.",

  bookingHeading: "આ ટ્રેનનું બુકિંગ",
  bookingArp:
    "સામાન્ય ક્વોટાનું બુકિંગ ઉપડવાની તારીખના {days} દિવસ પહેલાં સવારે ૮:૦૦ IST વાગ્યે ખૂલે છે, અને આ ગણતરી આ ટ્રેનના મૂળ સ્ટેશનેથી ઉપડવા મુજબ થાય છે — તમે જ્યાંથી ચઢો છો તે સ્ટેશન મુજબ નહીં.",
  tatkalAc: "AC વર્ગોનો તત્કાલ પ્રવાસના એક દિવસ પહેલાં સવારે ૧૦:૦૦ IST વાગ્યે ખૂલે છે.",
  tatkalNonAc: "નોન-AC વર્ગોનો તત્કાલ પ્રવાસના એક દિવસ પહેલાં સવારે ૧૧:૦૦ IST વાગ્યે ખૂલે છે.",

  otherTrains: "{fromName} થી {toName} સુધીની અન્ય સીધી ટ્રેનો",
  otherTrainsNote:
    "આ જ બે સ્ટેશનોથી શરૂ થઈને ત્યાં જ પૂરી થતી ટ્રેનો. જે માત્ર બંનેમાંથી પસાર થાય છે તે અહીં નથી — તેના માટે થોભા-સ્તરનું સમયપત્રક જોઈએ જે અમે પ્રકાશિત કરતા નથી.",
  returnDirection: "પરત દિશા",
  returnDirectionNote: "વિરુદ્ધ દિશામાં દોડતી સીધી ટ્રેન.",

  checkBookingDate: "બુકિંગ તારીખ જુઓ",
  setReminder: "રિમાઇન્ડર સેટ કરો",
  browseAllTrains: "બધી ટ્રેનો જુઓ",

  dayParts: {
    earlyMorning: "વહેલી સવારે",
    morning: "સવારે",
    afternoon: "બપોરે",
    evening: "સાંજે",
    night: "રાત્રે",
  },
};

const kn: TrainStrings = {
  metaTitleSuffix: "ಲೈವ್ ಸ್ಥಿತಿ, ಚಾರ್ಟ್ ತಯಾರಿ ಮತ್ತು ಸಮಯ",
  metaRoute: "{from} ಇಂದ {to}.",
  metaTimes: "{dep}ಕ್ಕೆ ಹೊರಡುತ್ತದೆ, {arr}ಕ್ಕೆ ತಲುಪುತ್ತದೆ ({duration}).",
  metaClasses: "ದರ್ಜೆಗಳು: {classes}.",
  metaChartPrep: "{number} ಚಾರ್ಟ್ ತಯಾರಿ ಸಮಯ: ಸುಮಾರು {time}.",
  metaTail: "ಲೈವ್ ಸ್ಥಿತಿ, ಬುಕಿಂಗ್ ವಿಂಡೋ, ತತ್ಕಾಲ್ ಸಮಯ ಮತ್ತು ಇತರ ನೇರ ರೈಲುಗಳು.",
  trainFinder: "ರೈಲು ಹುಡುಕಾಟ",
  quickAnswer: "ಸಂಕ್ಷಿಪ್ತ ಉತ್ತರ",
  chartPrepHeading: "ಚಾರ್ಟ್ ತಯಾರಿ ಸಮಯ",
  chartPrepIntro: "{number} {name} {fromCode} ನಿಂದ {dep} ಗೆ ಹೊರಡುತ್ತದೆ. ಮುಂದಿನ ಪ್ರಯಾಣಕ್ಕೆ ({date}) ಚಾರ್ಟ್ ಈ ಸಮಯದೊಳಗೆ ಸಿದ್ಧವಾಗುವ ನಿರೀಕ್ಷೆಯಿದೆ:",
  chartPrepGuideLink: "ಚಾರ್ಟ್ ತಯಾರಿ ಹೇಗೆ ನಡೆಯುತ್ತದೆ ಎಂದು ತಿಳಿಯಿರಿ",
  from: "ಇಂದ",
  to: "ವರೆಗೆ",
  duration: "ಪ್ರಯಾಣ ಅವಧಿ",
  zone: "ವಲಯ",
  trainType: "ಬಗೆ",
  classesAvailable: "ಲಭ್ಯವಿರುವ ದರ್ಜೆಗಳು",

  summary:
    "{number} {name} ರೈಲು {fromName} ಇಂದ {dep} ಗಂಟೆಗೆ ಹೊರಡುತ್ತದೆ ಮತ್ತು {toName} ಅನ್ನು {arr} ಗಂಟೆಗೆ ತಲುಪಬೇಕಿದೆ, ಒಟ್ಟು {duration} ಪ್ರಯಾಣ.",
  summaryNoTimes: "{number} {name} ರೈಲು {fromName} ಮತ್ತು {toName} ನಡುವೆ ಸಂಚರಿಸುತ್ತದೆ.",

  journeyProfile: "ಪ್ರಯಾಣದ ಸ್ವರೂಪ",
  overnightTitle: "ರಾತ್ರಿ ಪ್ರಯಾಣ",
  dayTitle: "ಹಗಲಿನ ಪ್ರಯಾಣ",
  overnightBody:
    "ಈ ರೈಲು ಒಂದು ರಾತ್ರಿಯನ್ನು ಪ್ರಯಾಣದಲ್ಲಿ ಕಳೆಯುತ್ತದೆ, ಆದ್ದರಿಂದ ಆಸನಕ್ಕಿಂತ ಬರ್ತ್ ಪಡೆಯುವುದೇ ಉತ್ತಮ. ಸ್ಲೀಪರ್ ಮತ್ತು AC ಬರ್ತ್ ದರ್ಜೆಗಳು ಪ್ರಾಯೋಗಿಕ ಆಯ್ಕೆ; ರಾತ್ರಿ ಪ್ರಯಾಣದಲ್ಲಿ ಚೇರ್ ಕಾರ್ ಆಯಾಸಕರ.",
  overnightBodyMulti:
    "ಈ ರೈಲು {nights} ರಾತ್ರಿಗಳನ್ನು ಪ್ರಯಾಣದಲ್ಲಿ ಕಳೆಯುತ್ತದೆ, ಆದ್ದರಿಂದ ಆಸನವಲ್ಲ, ಬರ್ತ್ ಬಹಳ ಮುಖ್ಯ. ಸ್ವಂತ ನೀರು ಮತ್ತು ಹಗುರ ಹೊದಿಕೆ ತೆಗೆದುಕೊಂಡು ಹೋಗಿ — AC ದರ್ಜೆಗಳಲ್ಲಿ ಹಾಸಿಗೆ ನೀಡಲಾಗುತ್ತದೆ, ಸ್ಲೀಪರ್‌ನಲ್ಲಿ ಇಲ್ಲ.",
  dayBody:
    "ಇದು ಹಗಲಿನ ಪ್ರಯಾಣ, ರಾತ್ರಿಯನ್ನು ಪ್ರಯಾಣದಲ್ಲಿ ಕಳೆಯಬೇಕಿಲ್ಲ, ಆದ್ದರಿಂದ ಕುಳಿತುಕೊಳ್ಳುವ ದರ್ಜೆಗಳು ಸಂಪೂರ್ಣ ಆರಾಮದಾಯಕ ಮತ್ತು ನೀವು ಮಲಗದ ಬರ್ತ್‌ಗಿಂತ ಅಗ್ಗವೂ ಹೌದು.",
  straightLine: "ನೇರ ರೇಖೆಯಲ್ಲಿ ಸುಮಾರು {km} ಕಿ.ಮೀ. ಅಂತರ",
  straightLineNote:
    "ಇದು ಎರಡು ನಿಲ್ದಾಣಗಳ ನಡುವಿನ ನೇರ ರೇಖೆಯ ಅಂತರ. ನಿಜವಾದ ರೈಲು ಮಾರ್ಗ ಇದಕ್ಕಿಂತ ಉದ್ದವಾಗಿರುತ್ತದೆ, ಮತ್ತು ಮೇಲಿನ ಸಮಯದಲ್ಲಿ ಮಧ್ಯದ ನಿಲುಗಡೆಗಳೂ ಸೇರಿವೆ.",

  classesHeading: "ಈ ರೈಲಿನ ದರ್ಜೆಗಳು",
  classesBody:
    "ದರ್ಜೆ ಸೌಕರ್ಯ ಮತ್ತು ದರವನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ; ನೀವು ಬುಕ್ ಮಾಡುವ ಕೋಟಾ ಸ್ಪರ್ಧೆಯನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ. ಈ ಪ್ರಯಾಣಕ್ಕೆ ಯಾವ ದರ್ಜೆ ಸೂಕ್ತ ಎಂಬ ಸಂದೇಹವಿದ್ದರೆ ನಮ್ಮ ದರ್ಜೆ ಹೋಲಿಕೆಯನ್ನು ನೋಡಿ.",
  compareClasses: "ಎಲ್ಲಾ ರೈಲು ದರ್ಜೆಗಳನ್ನು ಹೋಲಿಸಿ",
  acNote: "ಈ ರೈಲಿನಲ್ಲಿ ಹವಾನಿಯಂತ್ರಿತ ದರ್ಜೆಗಳಿವೆ, ಆದ್ದರಿಂದ ಇದರ ತತ್ಕಾಲ್ ಕೋಟಾ ಬೆಳಗ್ಗೆ 10:00 IST ಕ್ಕೆ ತೆರೆಯುತ್ತದೆ.",
  nonAcNote: "ಈ ರೈಲಿನಲ್ಲಿ AC ಅಲ್ಲದ ದರ್ಜೆಗಳಿವೆ, ಅವುಗಳ ತತ್ಕಾಲ್ ಕೋಟಾ ಬೆಳಗ್ಗೆ 11:00 IST ಕ್ಕೆ ತೆರೆಯುತ್ತದೆ.",

  bookingHeading: "ಈ ರೈಲಿನ ಬುಕಿಂಗ್",
  bookingArp:
    "ಸಾಮಾನ್ಯ ಕೋಟಾ ಬುಕಿಂಗ್ ಹೊರಡುವ ದಿನಾಂಕಕ್ಕಿಂತ {days} ದಿನ ಮೊದಲು ಬೆಳಗ್ಗೆ 8:00 IST ಕ್ಕೆ ತೆರೆಯುತ್ತದೆ, ಈ ಲೆಕ್ಕ ಈ ರೈಲು ತನ್ನ ಮೂಲ ನಿಲ್ದಾಣದಿಂದ ಹೊರಡುವುದನ್ನು ಆಧರಿಸಿದೆ — ನೀವು ಹತ್ತುವ ನಿಲ್ದಾಣವನ್ನಲ್ಲ.",
  tatkalAc: "AC ದರ್ಜೆಗಳ ತತ್ಕಾಲ್ ಪ್ರಯಾಣಕ್ಕೆ ಒಂದು ದಿನ ಮೊದಲು ಬೆಳಗ್ಗೆ 10:00 IST ಕ್ಕೆ ತೆರೆಯುತ್ತದೆ.",
  tatkalNonAc: "AC ಅಲ್ಲದ ದರ್ಜೆಗಳ ತತ್ಕಾಲ್ ಪ್ರಯಾಣಕ್ಕೆ ಒಂದು ದಿನ ಮೊದಲು ಬೆಳಗ್ಗೆ 11:00 IST ಕ್ಕೆ ತೆರೆಯುತ್ತದೆ.",

  otherTrains: "{fromName} ಇಂದ {toName} ಗೆ ಇತರ ನೇರ ರೈಲುಗಳು",
  otherTrainsNote:
    "ಇದೇ ಎರಡು ನಿಲ್ದಾಣಗಳಿಂದ ಆರಂಭವಾಗಿ ಅಲ್ಲಿಯೇ ಮುಗಿಯುವ ರೈಲುಗಳು. ಕೇವಲ ಎರಡರ ಮೂಲಕ ಹಾದುಹೋಗುವವು ಇಲ್ಲಿಲ್ಲ — ಅದಕ್ಕೆ ನಿಲುಗಡೆ-ಮಟ್ಟದ ವೇಳಾಪಟ್ಟಿ ಬೇಕು, ಅದನ್ನು ನಾವು ಪ್ರಕಟಿಸುವುದಿಲ್ಲ.",
  returnDirection: "ಹಿಂತಿರುಗುವ ದಿಕ್ಕು",
  returnDirectionNote: "ವಿರುದ್ಧ ದಿಕ್ಕಿನಲ್ಲಿ ಸಂಚರಿಸುವ ನೇರ ರೈಲು.",

  checkBookingDate: "ಬುಕಿಂಗ್ ದಿನಾಂಕ ನೋಡಿ",
  setReminder: "ಜ್ಞಾಪನೆ ಇರಿಸಿ",
  browseAllTrains: "ಎಲ್ಲಾ ರೈಲುಗಳನ್ನು ನೋಡಿ",

  dayParts: {
    earlyMorning: "ನಸುಕಿನಲ್ಲಿ",
    morning: "ಬೆಳಗ್ಗೆ",
    afternoon: "ಮಧ್ಯಾಹ್ನ",
    evening: "ಸಂಜೆ",
    night: "ರಾತ್ರಿ",
  },
};

const MAP: Record<Locale, TrainStrings> = { en, hi, bn, mr, ta, te, gu, kn };

export function trainStrings(locale: Locale): TrainStrings {
  return MAP[locale] ?? MAP[DEFAULT_LOCALE];
}
