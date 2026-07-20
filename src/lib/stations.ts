/**
 * A curated list of major Indian Railways station codes — long-standing,
 * widely published reference facts (not sourced from any single proprietary
 * dataset). Not exhaustive; covers the stations travellers search for most.
 */
export interface Station {
  code: string;
  name: string;
  city: string;
  state: string;
}

export const STATIONS: Station[] = [
  { code: "NDLS", name: "New Delhi", city: "New Delhi", state: "Delhi" },
  { code: "DLI", name: "Old Delhi", city: "New Delhi", state: "Delhi" },
  { code: "NZM", name: "Hazrat Nizamuddin", city: "New Delhi", state: "Delhi" },
  { code: "CSMT", name: "Chhatrapati Shivaji Maharaj Terminus", city: "Mumbai", state: "Maharashtra" },
  { code: "BCT", name: "Mumbai Central", city: "Mumbai", state: "Maharashtra" },
  { code: "LTT", name: "Lokmanya Tilak Terminus", city: "Mumbai", state: "Maharashtra" },
  { code: "MAS", name: "Chennai Central", city: "Chennai", state: "Tamil Nadu" },
  { code: "MS", name: "Chennai Egmore", city: "Chennai", state: "Tamil Nadu" },
  { code: "HWH", name: "Howrah Junction", city: "Kolkata", state: "West Bengal" },
  { code: "SDAH", name: "Sealdah", city: "Kolkata", state: "West Bengal" },
  { code: "KOAA", name: "Kolkata", city: "Kolkata", state: "West Bengal" },
  { code: "SBC", name: "KSR Bengaluru City Junction", city: "Bengaluru", state: "Karnataka" },
  { code: "YPR", name: "Yesvantpur Junction", city: "Bengaluru", state: "Karnataka" },
  { code: "SC", name: "Secunderabad Junction", city: "Hyderabad", state: "Telangana" },
  { code: "HYB", name: "Hyderabad Deccan", city: "Hyderabad", state: "Telangana" },
  { code: "PUNE", name: "Pune Junction", city: "Pune", state: "Maharashtra" },
  { code: "ADI", name: "Ahmedabad Junction", city: "Ahmedabad", state: "Gujarat" },
  { code: "BRC", name: "Vadodara Junction", city: "Vadodara", state: "Gujarat" },
  { code: "ST", name: "Surat", city: "Surat", state: "Gujarat" },
  { code: "JP", name: "Jaipur Junction", city: "Jaipur", state: "Rajasthan" },
  { code: "JU", name: "Jodhpur Junction", city: "Jodhpur", state: "Rajasthan" },
  { code: "LKO", name: "Lucknow Charbagh", city: "Lucknow", state: "Uttar Pradesh" },
  { code: "CNB", name: "Kanpur Central", city: "Kanpur", state: "Uttar Pradesh" },
  { code: "PRYJ", name: "Prayagraj Junction", city: "Prayagraj", state: "Uttar Pradesh" },
  { code: "BSB", name: "Varanasi Junction", city: "Varanasi", state: "Uttar Pradesh" },
  { code: "PNBE", name: "Patna Junction", city: "Patna", state: "Bihar" },
  { code: "GAYA", name: "Gaya Junction", city: "Gaya", state: "Bihar" },
  { code: "BBS", name: "Bhubaneswar", city: "Bhubaneswar", state: "Odisha" },
  { code: "PURI", name: "Puri", city: "Puri", state: "Odisha" },
  { code: "NGP", name: "Nagpur Junction", city: "Nagpur", state: "Maharashtra" },
  { code: "BPL", name: "Bhopal Junction", city: "Bhopal", state: "Madhya Pradesh" },
  { code: "INDB", name: "Indore Junction", city: "Indore", state: "Madhya Pradesh" },
  { code: "JBP", name: "Jabalpur", city: "Jabalpur", state: "Madhya Pradesh" },
  { code: "ASR", name: "Amritsar Junction", city: "Amritsar", state: "Punjab" },
  { code: "LDH", name: "Ludhiana Junction", city: "Ludhiana", state: "Punjab" },
  { code: "CDG", name: "Chandigarh", city: "Chandigarh", state: "Chandigarh" },
  { code: "UMB", name: "Ambala Cantt Junction", city: "Ambala", state: "Haryana" },
  { code: "DDN", name: "Dehradun", city: "Dehradun", state: "Uttarakhand" },
  { code: "HW", name: "Haridwar Junction", city: "Haridwar", state: "Uttarakhand" },
  { code: "JAT", name: "Jammu Tawi", city: "Jammu", state: "Jammu & Kashmir" },
  { code: "GHY", name: "Guwahati", city: "Guwahati", state: "Assam" },
  { code: "NJP", name: "New Jalpaiguri", city: "Siliguri", state: "West Bengal" },
  { code: "RNC", name: "Ranchi", city: "Ranchi", state: "Jharkhand" },
  { code: "DHN", name: "Dhanbad Junction", city: "Dhanbad", state: "Jharkhand" },
  { code: "TATA", name: "Tatanagar Junction", city: "Jamshedpur", state: "Jharkhand" },
  { code: "RPRR", name: "Raipur Junction", city: "Raipur", state: "Chhattisgarh" },
  { code: "BZA", name: "Vijayawada Junction", city: "Vijayawada", state: "Andhra Pradesh" },
  { code: "VSKP", name: "Visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh" },
  { code: "TPTY", name: "Tirupati", city: "Tirupati", state: "Andhra Pradesh" },
  { code: "CBE", name: "Coimbatore Junction", city: "Coimbatore", state: "Tamil Nadu" },
  { code: "MDU", name: "Madurai Junction", city: "Madurai", state: "Tamil Nadu" },
  { code: "TVC", name: "Thiruvananthapuram Central", city: "Thiruvananthapuram", state: "Kerala" },
  { code: "ERS", name: "Ernakulam Junction", city: "Kochi", state: "Kerala" },
  { code: "CLT", name: "Kozhikode", city: "Kozhikode", state: "Kerala" },
  { code: "MAO", name: "Madgaon Junction", city: "Margao", state: "Goa" },
  { code: "AGC", name: "Agra Cantt", city: "Agra", state: "Uttar Pradesh" },
  { code: "GKP", name: "Gorakhpur Junction", city: "Gorakhpur", state: "Uttar Pradesh" },
  { code: "MYS", name: "Mysuru Junction", city: "Mysuru", state: "Karnataka" },
  { code: "UBL", name: "Hubballi Junction", city: "Hubballi", state: "Karnataka" },
  { code: "RJT", name: "Rajkot Junction", city: "Rajkot", state: "Gujarat" },
  { code: "BKN", name: "Bikaner Junction", city: "Bikaner", state: "Rajasthan" },
  { code: "AJMER", name: "Ajmer Junction", city: "Ajmer", state: "Rajasthan" },
  { code: "KOTA", name: "Kota Junction", city: "Kota", state: "Rajasthan" },
  { code: "GWL", name: "Gwalior Junction", city: "Gwalior", state: "Madhya Pradesh" },
];

export function searchStations(query: string, limit = 10): Station[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return STATIONS.filter(
    (s) =>
      s.code.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q)
  ).slice(0, limit);
}
