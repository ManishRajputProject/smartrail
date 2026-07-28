import type { Locale } from "@/i18n/locales";
import { DEFAULT_LOCALE } from "@/i18n/locales";

/**
 * Strings for the halt-by-halt schedule table. Templates use {braces} and are
 * filled with fill() from train-page-strings; placeholders may be reordered
 * freely per language.
 */
export interface ScheduleStrings {
  heading: string;
  /** {stops} {days} */
  summary: string;
  haltsOnlyNote: string;
  /** {stops} */
  stopCount: string;
  /** {km} */
  totalDistance: string;
  /** {days} */
  daysOnBoard: string;
  caption: string;
  colNum: string;
  colStation: string;
  colArrival: string;
  colDeparture: string;
  colHalt: string;
  colDay: string;
  colKm: string;
  origin: string;
  terminus: string;
  /** {m} */
  minutes: string;
  distanceNote: string;
  verifyNote: string;
}

const en: ScheduleStrings = {
  heading: "Full schedule",
  summary: "This train makes {stops} stops over {days} day(s).",
  haltsOnlyNote:
    "Only stations where the train actually halts are listed — points it passes through without stopping are left out, since you cannot board or alight there.",
  stopCount: "{stops} stops",
  totalDistance: "{km} km total",
  daysOnBoard: "{days} days on board",
  caption: "Station-by-station schedule with arrival, departure, halt time, day and distance.",
  colNum: "#",
  colStation: "Station",
  colArrival: "Arrival",
  colDeparture: "Departure",
  colHalt: "Halt",
  colDay: "Day",
  colKm: "km",
  origin: "Start",
  terminus: "End",
  minutes: "{m} min",
  distanceNote:
    "Distances are approximate, derived from the route geometry and calibrated to the official total, then rounded to the nearest 5 km. The total above is the published figure and is exact.",
  verifyNote:
    "Reference timetable data, not a live feed. Timings change — always confirm on IRCTC or NTES before travelling.",
};

const hi: ScheduleStrings = {
  heading: "पूरा शेड्यूल",
  summary: "यह ट्रेन {days} दिन में {stops} स्टेशनों पर रुकती है।",
  haltsOnlyNote:
    "यहाँ केवल वे स्टेशन दिए गए हैं जहाँ ट्रेन वास्तव में रुकती है — जिन स्टेशनों से यह बिना रुके गुज़रती है वे शामिल नहीं हैं, क्योंकि वहाँ आप न चढ़ सकते हैं न उतर सकते हैं।",
  stopCount: "{stops} ठहराव",
  totalDistance: "कुल {km} किमी",
  daysOnBoard: "{days} दिन की यात्रा",
  caption: "स्टेशन-दर-स्टेशन शेड्यूल: आगमन, प्रस्थान, ठहराव, दिन और दूरी।",
  colNum: "क्र.",
  colStation: "स्टेशन",
  colArrival: "आगमन",
  colDeparture: "प्रस्थान",
  colHalt: "ठहराव",
  colDay: "दिन",
  colKm: "किमी",
  origin: "आरंभ",
  terminus: "अंत",
  minutes: "{m} मिन",
  distanceNote:
    "दूरियाँ अनुमानित हैं — मार्ग की ज्यामिति से निकाली गईं, आधिकारिक कुल दूरी के अनुसार समायोजित और निकटतम 5 किमी तक पूर्णांकित। ऊपर दी गई कुल दूरी प्रकाशित आँकड़ा है और सटीक है।",
  verifyNote:
    "यह संदर्भ समय-सारणी है, लाइव फ़ीड नहीं। समय बदलते रहते हैं — यात्रा से पहले IRCTC या NTES पर अवश्य पुष्टि करें।",
};

const bn: ScheduleStrings = {
  heading: "সম্পূর্ণ সময়সূচি",
  summary: "এই ট্রেনটি {days} দিনে {stops}টি স্টেশনে থামে।",
  haltsOnlyNote:
    "এখানে কেবল সেই স্টেশনগুলি দেওয়া আছে যেখানে ট্রেনটি সত্যিই থামে — যেগুলির মধ্য দিয়ে না থেমে চলে যায় সেগুলি বাদ, কারণ সেখানে আপনি উঠতে বা নামতে পারবেন না।",
  stopCount: "{stops}টি স্টপ",
  totalDistance: "মোট {km} কিমি",
  daysOnBoard: "{days} দিনের যাত্রা",
  caption: "স্টেশন-ভিত্তিক সময়সূচি: আগমন, প্রস্থান, থামার সময়, দিন ও দূরত্ব।",
  colNum: "ক্র.",
  colStation: "স্টেশন",
  colArrival: "আগমন",
  colDeparture: "প্রস্থান",
  colHalt: "থামা",
  colDay: "দিন",
  colKm: "কিমি",
  origin: "শুরু",
  terminus: "শেষ",
  minutes: "{m} মিন",
  distanceNote:
    "দূরত্বগুলি আনুমানিক — রুটের জ্যামিতি থেকে নেওয়া, সরকারি মোট দূরত্ব অনুযায়ী সমন্বিত এবং নিকটতম ৫ কিমিতে পূর্ণসংখ্যা করা। উপরের মোট দূরত্বটি প্রকাশিত এবং নির্ভুল।",
  verifyNote:
    "এটি রেফারেন্স সময়সূচি, লাইভ ফিড নয়। সময় বদলায় — যাত্রার আগে IRCTC বা NTES-এ যাচাই করে নিন।",
};

const mr: ScheduleStrings = {
  heading: "संपूर्ण वेळापत्रक",
  summary: "ही गाडी {days} दिवसांत {stops} स्थानकांवर थांबते.",
  haltsOnlyNote:
    "इथे फक्त तीच स्थानके दिली आहेत जिथे गाडी प्रत्यक्षात थांबते — जिथून ती न थांबता जाते ती वगळली आहेत, कारण तिथे तुम्ही चढू किंवा उतरू शकत नाही.",
  stopCount: "{stops} थांबे",
  totalDistance: "एकूण {km} किमी",
  daysOnBoard: "{days} दिवसांचा प्रवास",
  caption: "स्थानकनिहाय वेळापत्रक: आगमन, प्रस्थान, थांबा, दिवस आणि अंतर.",
  colNum: "क्र.",
  colStation: "स्थानक",
  colArrival: "आगमन",
  colDeparture: "प्रस्थान",
  colHalt: "थांबा",
  colDay: "दिवस",
  colKm: "किमी",
  origin: "सुरुवात",
  terminus: "शेवट",
  minutes: "{m} मिन",
  distanceNote:
    "अंतरे अंदाजे आहेत — मार्गाच्या भूमितीवरून काढलेली, अधिकृत एकूण अंतरानुसार जुळवलेली आणि जवळच्या ५ किमीपर्यंत पूर्णांकित. वरील एकूण अंतर हे प्रकाशित आकडे असून अचूक आहे.",
  verifyNote:
    "हे संदर्भ वेळापत्रक आहे, थेट माहिती नाही. वेळा बदलतात — प्रवासापूर्वी IRCTC किंवा NTES वर खात्री करा.",
};

const ta: ScheduleStrings = {
  heading: "முழு அட்டவணை",
  summary: "இந்த ரயில் {days} நாட்களில் {stops} நிலையங்களில் நிற்கிறது.",
  haltsOnlyNote:
    "ரயில் உண்மையில் நிற்கும் நிலையங்கள் மட்டுமே இங்கு உள்ளன — நிற்காமல் கடந்து செல்லும் இடங்கள் நீக்கப்பட்டுள்ளன, ஏனெனில் அங்கு நீங்கள் ஏறவோ இறங்கவோ முடியாது.",
  stopCount: "{stops} நிறுத்தங்கள்",
  totalDistance: "மொத்தம் {km} கி.மீ.",
  daysOnBoard: "{days} நாள் பயணம்",
  caption: "நிலையவாரி அட்டவணை: வருகை, புறப்பாடு, நிற்கும் நேரம், நாள் மற்றும் தூரம்.",
  colNum: "எண்",
  colStation: "நிலையம்",
  colArrival: "வருகை",
  colDeparture: "புறப்பாடு",
  colHalt: "நிற்பு",
  colDay: "நாள்",
  colKm: "கி.மீ.",
  origin: "தொடக்கம்",
  terminus: "முடிவு",
  minutes: "{m} நிமி",
  distanceNote:
    "தூரங்கள் தோராயமானவை — பாதையின் வடிவவியலிலிருந்து பெறப்பட்டு, அதிகாரப்பூர்வ மொத்தத் தூரத்திற்கு ஏற்ப சரிசெய்யப்பட்டு, அருகிலுள்ள 5 கி.மீ.க்கு முழுமையாக்கப்பட்டவை. மேலே உள்ள மொத்தத் தூரம் வெளியிடப்பட்டது, துல்லியமானது.",
  verifyNote:
    "இது குறிப்பு கால அட்டவணை, நேரடி ஊட்டம் அல்ல. நேரங்கள் மாறும் — பயணத்திற்கு முன் IRCTC அல்லது NTES-இல் உறுதிப்படுத்துங்கள்.",
};

const te: ScheduleStrings = {
  heading: "పూర్తి షెడ్యూల్",
  summary: "ఈ రైలు {days} రోజుల్లో {stops} స్టేషన్లలో ఆగుతుంది.",
  haltsOnlyNote:
    "రైలు నిజంగా ఆగే స్టేషన్లు మాత్రమే ఇక్కడ ఉన్నాయి — ఆగకుండా దాటిపోయే ప్రాంతాలు తీసివేయబడ్డాయి, ఎందుకంటే అక్కడ మీరు ఎక్కలేరు లేదా దిగలేరు.",
  stopCount: "{stops} స్టాప్‌లు",
  totalDistance: "మొత్తం {km} కి.మీ.",
  daysOnBoard: "{days} రోజుల ప్రయాణం",
  caption: "స్టేషన్ల వారీ షెడ్యూల్: రాక, బయలుదేరుట, ఆగే సమయం, రోజు మరియు దూరం.",
  colNum: "సం.",
  colStation: "స్టేషన్",
  colArrival: "రాక",
  colDeparture: "బయలుదేరుట",
  colHalt: "ఆగుట",
  colDay: "రోజు",
  colKm: "కి.మీ.",
  origin: "ప్రారంభం",
  terminus: "ముగింపు",
  minutes: "{m} నిమి",
  distanceNote:
    "దూరాలు సుమారువి — మార్గ జ్యామితి నుండి తీసుకుని, అధికారిక మొత్తం దూరానికి సర్దుబాటు చేసి, సమీప 5 కి.మీ.కు గుండ్రం చేయబడ్డాయి. పైన ఉన్న మొత్తం దూరం ప్రచురితమైనది మరియు కచ్చితమైనది.",
  verifyNote:
    "ఇది సూచన టైమ్‌టేబుల్, ప్రత్యక్ష ఫీడ్ కాదు. సమయాలు మారతాయి — ప్రయాణానికి ముందు IRCTC లేదా NTESలో ధృవీకరించుకోండి.",
};

const gu: ScheduleStrings = {
  heading: "સંપૂર્ણ સમયપત્રક",
  summary: "આ ટ્રેન {days} દિવસમાં {stops} સ્ટેશનો પર ઊભી રહે છે.",
  haltsOnlyNote:
    "અહીં ફક્ત તે સ્ટેશનો છે જ્યાં ટ્રેન ખરેખર ઊભી રહે છે — જ્યાંથી તે ઊભા રહ્યા વગર પસાર થાય છે તે બાકાત છે, કારણ કે ત્યાં તમે ચઢી કે ઊતરી શકતા નથી.",
  stopCount: "{stops} સ્ટોપ",
  totalDistance: "કુલ {km} કિમી",
  daysOnBoard: "{days} દિવસનો પ્રવાસ",
  caption: "સ્ટેશન પ્રમાણે સમયપત્રક: આગમન, પ્રસ્થાન, થોભો, દિવસ અને અંતર.",
  colNum: "ક્રમ",
  colStation: "સ્ટેશન",
  colArrival: "આગમન",
  colDeparture: "પ્રસ્થાન",
  colHalt: "થોભો",
  colDay: "દિવસ",
  colKm: "કિમી",
  origin: "શરૂઆત",
  terminus: "અંત",
  minutes: "{m} મિ",
  distanceNote:
    "અંતર અંદાજિત છે — માર્ગની ભૂમિતિમાંથી મેળવેલ, સત્તાવાર કુલ અંતર પ્રમાણે ગોઠવેલ અને નજીકના ૫ કિમી સુધી પૂર્ણાંકિત. ઉપરનું કુલ અંતર પ્રકાશિત આંકડો છે અને ચોક્કસ છે.",
  verifyNote:
    "આ સંદર્ભ સમયપત્રક છે, જીવંત ફીડ નથી. સમય બદલાય છે — પ્રવાસ પહેલાં IRCTC કે NTES પર ખાતરી કરો.",
};

const kn: ScheduleStrings = {
  heading: "ಪೂರ್ಣ ವೇಳಾಪಟ್ಟಿ",
  summary: "ಈ ರೈಲು {days} ದಿನಗಳಲ್ಲಿ {stops} ನಿಲ್ದಾಣಗಳಲ್ಲಿ ನಿಲ್ಲುತ್ತದೆ.",
  haltsOnlyNote:
    "ರೈಲು ನಿಜವಾಗಿ ನಿಲ್ಲುವ ನಿಲ್ದಾಣಗಳನ್ನು ಮಾತ್ರ ಇಲ್ಲಿ ನೀಡಲಾಗಿದೆ — ನಿಲ್ಲದೆ ಹಾದುಹೋಗುವ ಸ್ಥಳಗಳನ್ನು ಕೈಬಿಡಲಾಗಿದೆ, ಏಕೆಂದರೆ ಅಲ್ಲಿ ನೀವು ಹತ್ತಲು ಅಥವಾ ಇಳಿಯಲು ಸಾಧ್ಯವಿಲ್ಲ.",
  stopCount: "{stops} ನಿಲುಗಡೆಗಳು",
  totalDistance: "ಒಟ್ಟು {km} ಕಿ.ಮೀ.",
  daysOnBoard: "{days} ದಿನಗಳ ಪ್ರಯಾಣ",
  caption: "ನಿಲ್ದಾಣವಾರು ವೇಳಾಪಟ್ಟಿ: ಆಗಮನ, ನಿರ್ಗಮನ, ನಿಲುಗಡೆ ಸಮಯ, ದಿನ ಮತ್ತು ದೂರ.",
  colNum: "ಕ್ರ.",
  colStation: "ನಿಲ್ದಾಣ",
  colArrival: "ಆಗಮನ",
  colDeparture: "ನಿರ್ಗಮನ",
  colHalt: "ನಿಲುಗಡೆ",
  colDay: "ದಿನ",
  colKm: "ಕಿ.ಮೀ.",
  origin: "ಆರಂಭ",
  terminus: "ಅಂತ್ಯ",
  minutes: "{m} ನಿಮಿ",
  distanceNote:
    "ದೂರಗಳು ಅಂದಾಜು — ಮಾರ್ಗದ ರೇಖಾಗಣಿತದಿಂದ ಪಡೆದು, ಅಧಿಕೃತ ಒಟ್ಟು ದೂರಕ್ಕೆ ಹೊಂದಿಸಿ, ಸಮೀಪದ 5 ಕಿ.ಮೀ.ಗೆ ದುಂಡಾಗಿಸಲಾಗಿದೆ. ಮೇಲಿನ ಒಟ್ಟು ದೂರ ಪ್ರಕಟಿತವಾಗಿದ್ದು ನಿಖರವಾಗಿದೆ.",
  verifyNote:
    "ಇದು ಉಲ್ಲೇಖ ವೇಳಾಪಟ್ಟಿ, ನೇರ ಫೀಡ್ ಅಲ್ಲ. ಸಮಯಗಳು ಬದಲಾಗುತ್ತವೆ — ಪ್ರಯಾಣಕ್ಕೂ ಮೊದಲು IRCTC ಅಥವಾ NTESನಲ್ಲಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
};

const MAP: Record<Locale, ScheduleStrings> = { en, hi, bn, mr, ta, te, gu, kn };

export function scheduleStrings(locale: Locale): ScheduleStrings {
  return MAP[locale] ?? MAP[DEFAULT_LOCALE];
}
