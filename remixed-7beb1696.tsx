import { useState, useEffect, useRef } from "react";

const T = {
  en: {
    appName: "KrishiSathi", appSub: "कृषि साथी",
    nav: ["Dashboard","Farmers","Buyers","Orders","Crop Calendar","Krishi Sathi","Admin"],
    dashboard: "Dashboard", farmers: "Farmer Management", buyers: "Buyer Network",
    orders: "Order Management", calendar: "Crop Calendar", sathi: "Krishi Sathi Portal", admin: "Admin Control",
    liveOverview: "Live Platform Overview", ashadh: "Ashadh 2081",
    registeredFarmers: "Registered Farmers", activeBuyers: "Active Buyers",
    monthlyVolume: "Monthly Volume", farmerEarnings: "Farmer Earnings",
    fieldAgents: "Field Agents", activeOrders: "Active Orders",
    districtsCovered: "districts covered", metricTons: "Metric tons traded",
    monthlyPayouts: "Monthly direct payouts", agentsActive: "Field agents active",
    acrossDistricts: "Across 18 districts", monthlyTrade: "Monthly Trade Volume (kg)",
    liveFeed: "Live Feed", searchFarmer: "Search farmer or crop...",
    allDistricts: "All Districts", registerFarmer: "+ Register Farmer",
    verified: "✓ Verified", organic: "🌿 Organic", matchBuyer: "Match Buyer →",
    buyerNetwork: "Buyer Network", searchBuyer: "Search buyers...",
    onboardBuyer: "+ Onboard Buyer", findFarmers: "Find Farmers →",
    completedOrders: "Completed Orders", totalPurchase: "Total Purchase",
    rank: "Rank", needs: "Needs", volume: "Volume", rating: "Rating",
    topBuyer: "🏆 Top Buyer", silver: "🥈 2nd Place", bronze: "🥉 3rd Place",
    active: "Active", contracts: "Contracts", history: "History",
    escrow: "Escrow-based payment protection for all transactions",
    inTransit: "In Transit", confirmed: "Confirmed", delivered: "Delivered",
    damaged: "Damaged", markDispatched: "Mark Dispatched", confirmDelivery: "Confirm Delivery",
    releasePayment: "Release Payment ✓", viewDetails: "View Details",
    cropCalendar: "Crop Availability Calendar", nepalAgri: "Nepal's agricultural seasons mapped",
    availableIn: "Available in", yearRound: "Year-round Availability",
    months: "mo", activeSathis: "Active Krishi Sathis", registrationForm: "Register Farmer (Field Form)",
    farmerName: "Farmer Name", phone: "Phone Number", quantity: "Quantity (kg)",
    harvestDate: "Harvest Date", price: "Price (Rs/kg)", district: "District",
    selectDistrict: "Select District", crop: "Crop", selectCrop: "Select Crop",
    registerPublish: "Register & Publish Listing", registered: "Farmer Registered!",
    listingPublished: "Listing published. Buyer matching started.", registerAnother: "Register Another",
    adminControl: "Admin Control Center", platformOverview: "Platform oversight, pricing intelligence & verifications",
    damagedOrders: "Damaged Order Record", damagedDesc: "Total damaged orders recorded till date",
    damagedOrds: "Damaged Orders", damageAmount: "Damage Amount",
    kalimati: "🏪 Kalimati Live Prices", updatedAgo: "Updated 15 min ago",
    pendingVerif: "⏳ Pending Verifications", approve: "Approve", reject: "Reject",
    revenueTracker: "💰 Revenue & Commission Tracker",
    gmv: "Total GMV This Month", commission: "Platform Commission (8%)",
    farmerPayouts: "Farmer Payouts", pendingEscrow: "Pending Escrow",
    today: "Today (Rs/kg)", yesterday: "Yesterday", change: "Change",
    esewaId: "eSewa ID", viewQR: "📷 View QR", hideQR: "Hide QR",
    scanEsewa: "Scan to pay via eSewa", createContract: "📋 Create Contract",
    matchToBuyer: "🤝 Match to Buyer", buyerRating: "buyer rating",
    farmers: "farmers", trades: "trades", historyDesc: "Last 180 days transaction history",
    totalOrders: "Total", damagedLabel: "Damaged",
  },
  ne: {
    appName: "कृषि साथी", appSub: "KrishiSathi",
    nav: ["ड्यासबोर्ड","किसान","खरिदकर्ता","अर्डर","बाली क्यालेन्डर","कृषि साथी","प्रशासन"],
    dashboard: "ड्यासबोर्ड", farmers: "किसान व्यवस्थापन", buyers: "खरिदकर्ता नेटवर्क",
    orders: "अर्डर व्यवस्थापन", calendar: "बाली क्यालेन्डर", sathi: "कृषि साथी पोर्टल", admin: "प्रशासन",
    liveOverview: "लाइभ प्लेटफर्म स्थिति", ashadh: "असार २०८१",
    registeredFarmers: "दर्ता किसान", activeBuyers: "सक्रिय खरिदकर्ता",
    monthlyVolume: "मासिक कारोबार", farmerEarnings: "किसान आम्दानी",
    fieldAgents: "कृषि साथी", activeOrders: "सक्रिय अर्डर",
    districtsCovered: "जिल्ला समेटिएको", metricTons: "मेट्रिक टन व्यापार",
    monthlyPayouts: "यो महिना प्रत्यक्ष भुक्तानी", agentsActive: "क्षेत्र प्रतिनिधि सक्रिय",
    acrossDistricts: "१८ जिल्लामा", monthlyTrade: "मासिक व्यापार मात्रा (किलो)",
    liveFeed: "लाइभ फिड", searchFarmer: "नाम वा बाली खोज्नुहोस्...",
    allDistricts: "सबै जिल्ला", registerFarmer: "+ नयाँ किसान दर्ता",
    verified: "✓ प्रमाणित", organic: "🌿 जैविक", matchBuyer: "खरिदकर्ता मिलाउनुस् →",
    buyerNetwork: "खरिदकर्ता नेटवर्क", searchBuyer: "खरिदकर्ता खोज्नुहोस्...",
    onboardBuyer: "+ खरिदकर्ता थप्नुस्", findFarmers: "किसान खोज्नुस् →",
    completedOrders: "पूरा अर्डर", totalPurchase: "कुल खरिद",
    rank: "स्थान", needs: "आवश्यकता", volume: "मात्रा", rating: "मूल्याङ्कन",
    topBuyer: "🏆 सर्वोत्तम", silver: "🥈 दोस्रो", bronze: "🥉 तेस्रो",
    active: "सक्रिय", contracts: "ठेक्का", history: "इतिहास",
    escrow: "सबै कारोबारमा एस्क्रो-आधारित भुक्तानी सुरक्षा",
    inTransit: "ढुवानीमा", confirmed: "पुष्टि भयो", delivered: "डेलिभर भयो",
    damaged: "क्षति भयो", markDispatched: "प्रेषण चिन्ह लगाउनुस्", confirmDelivery: "डेलिभरी पुष्टि गर्नुस्",
    releasePayment: "भुक्तानी जारी गर्नुस् ✓", viewDetails: "विवरण हेर्नुस्",
    cropCalendar: "बाली उपलब्धता क्यालेन्डर", nepalAgri: "नेपालको कृषि मौसम म्यापिङ",
    availableIn: "उपलब्ध", yearRound: "वार्षिक उपलब्धता",
    months: "महिना", activeSathis: "सक्रिय कृषि साथीहरू", registrationForm: "किसान दर्ता फारम",
    farmerName: "किसानको नाम", phone: "फोन नम्बर", quantity: "मात्रा (किलो)",
    harvestDate: "कटनी मिति", price: "मूल्य (रु/किलो)", district: "जिल्ला",
    selectDistrict: "जिल्ला छान्नुहोस्", crop: "बाली", selectCrop: "बाली छान्नुहोस्",
    registerPublish: "दर्ता गरी सूची प्रकाशित गर्नुस्", registered: "किसान दर्ता भयो!",
    listingPublished: "सूची प्रकाशित। खरिदकर्ता मिलान सुरु भयो।", registerAnother: "अर्को दर्ता गर्नुस्",
    adminControl: "प्रशासन नियन्त्रण केन्द्र", platformOverview: "प्लेटफर्म निगरानी, मूल्य बुद्धिमत्ता र प्रमाणीकरण",
    damagedOrders: "क्षतिग्रस्त अर्डर रेकर्ड", damagedDesc: "अहिलेसम्म कुल क्षतिग्रस्त अर्डरहरू",
    damagedOrds: "क्षतिग्रस्त अर्डर", damageAmount: "क्षति रकम",
    kalimati: "🏪 कालीमाटी लाइभ मूल्य", updatedAgo: "१५ मिनेट अघि अद्यावधिक",
    pendingVerif: "⏳ प्रमाणीकरण बाँकी", approve: "स्वीकृत", reject: "अस्वीकार",
    revenueTracker: "💰 राजस्व र कमिसन ट्र्याकर",
    gmv: "यो महिना कुल GMV", commission: "प्लेटफर्म कमिसन (८%)",
    farmerPayouts: "किसान भुक्तानी", pendingEscrow: "एस्क्रोमा बाँकी",
    today: "आजको (रु/किलो)", yesterday: "हिजो", change: "परिवर्तन",
    esewaId: "eSewa ID", viewQR: "📷 QR हेर्नुस्", hideQR: "QR लुकाउनुस्",
    scanEsewa: "eSewa मार्फत भुक्तानी गर्न स्क्यान गर्नुहोस्", createContract: "📋 ठेक्का बनाउनुस्",
    matchToBuyer: "🤝 खरिदकर्तासँग मिलाउनुस्", buyerRating: "खरिदकर्ता मूल्याङ्कन",
    farmers: "किसान", trades: "कारोबार", historyDesc: "पछिल्लो १८० दिनको लेनदेन इतिहास",
    totalOrders: "जम्मा", damagedLabel: "क्षतिग्रस्त",
  }
};

const C = {
  bg: "#0a1a0f", card: "#0f2318", cardHover: "#142b1e",
  glass: "rgba(255,255,255,0.04)", glassBorder: "rgba(255,255,255,0.08)",
  primary: "#1a5c35", primaryLight: "#2d8a52", primaryBright: "#3db870",
  gold: "#d4a017", goldLight: "#f0c040", goldGlow: "rgba(212,160,23,0.3)",
  text: "#e8f5ee", textMuted: "#7a9e87", textDim: "#4a6e57",
  danger: "#e63946", dangerDim: "rgba(230,57,70,0.15)",
  info: "#4fc3f7", purple: "#b39ddb",
  border: "rgba(61,184,112,0.15)", borderGold: "rgba(212,160,23,0.3)",
};

const DISTRICTS_EN = ["Kathmandu","Lalitpur","Bhaktapur","Kavre","Chitwan","Pokhara","Butwal","Biratnagar","Dharan","Hetauda","Jumla","Mustang","Solukhumbu","Kaski","Rupandehi","Bardiya","Surkhet","Dang","Makwanpur","Sindhupalchok"];
const DISTRICTS_NE = ["काठमाडौं","ललितपुर","भक्तपुर","काभ्रे","चितवन","पोखरा","बुटवल","बिराटनगर","धरान","हेटौडा","जुम्ला","मुस्ताङ","सोलुखुम्बु","कास्की","रुपन्देही","बर्दिया","सुर्खेत","दाङ","मकवानपुर","सिन्धुपाल्चोक"];

const CROPS_EN = ["Tomato","Potato","Rice","Cabbage","Apple","Ginger","Cauliflower","Onion"];
const CROPS_NE = ["गोलभेडा","आलु","धान","बन्दा","स्याउ","अदुवा","काउली","प्याज"];
const CROP_ICONS = ["🍅","🥔","🌾","🥬","🍎","🌿","🥦","🧅"];
const BASE_PRICES = [35,25,55,20,120,80,30,45];

const MONTHS_EN = ["Baisakh","Jestha","Ashadh","Shrawan","Bhadra","Ashwin","Kartik","Mangsir","Poush","Magh","Falgun","Chaitra"];
const MONTHS_NE = ["बैशाख","जेठ","असाढ","साउन","भाद्र","असोज","कार्तिक","मंसिर","पौष","माघ","फागुन","चैत"];
const CALENDAR_EN = {Baisakh:["Tomato","Cucumber","Bitter Gourd"],Jestha:["Tomato","Chili","Pumpkin"],Ashadh:["Rice","Ginger","Turmeric"],Shrawan:["Maize","Soybean"],Bhadra:["Apple","Walnut","Maize"],Ashwin:["Rice","Millet","Apple"],Kartik:["Potato","Ginger","Apple","Garlic"],Mangsir:["Wheat","Garlic","Onion"],Poush:["Mustard","Wheat"],Magh:["Cabbage","Cauliflower","Onion"],Falgun:["Cabbage","Peas","Strawberry"],Chaitra:["Onion","Garlic","Asparagus"]};
const CALENDAR_NE = {बैशाख:["गोलभेडा","काँक्रो","करेला"],जेठ:["गोलभेडा","खुर्सानी","फर्सी"],असाढ:["धान","अदुवा","बेसार"],साउन:["मकै","भटमास"],भाद्र:["स्याउ","ओखर","मकै"],असोज:["धान","कोदो","स्याउ"],कार्तिक:["आलु","अदुवा","स्याउ","लसुन"],मंसिर:["गहुँ","लसुन","प्याज"],पौष:["तोरी","गहुँ"],माघ:["बन्दा","काउली","प्याज"],फागुन:["बन्दा","केराउ","स्ट्रबेरी"],चैत:["प्याज","लसुन","कागती"]};

const BUYERS = [
  {id:1,nameEn:"Dwarika's Hotel",nameNe:"द्वारिका'ज् होटल",typeEn:"Hotel",typeNe:"होटल",districtEn:"Kathmandu",districtNe:"काठमाडौं",needEn:"Organic Vegetables",needNe:"जैविक तरकारी",volumeEn:"500kg/week",volumeNe:"५०० किलो/हप्ता",verified:true,rating:4.8,totalOrders:148,totalAmount:2840000},
  {id:2,nameEn:"Hyatt Regency",nameNe:"हायट रिजेन्सी",typeEn:"Hotel",typeNe:"होटल",districtEn:"Kathmandu",districtNe:"काठमाडौं",needEn:"Premium Produce",needNe:"उत्कृष्ट उपज",volumeEn:"600kg/week",volumeNe:"६०० किलो/हप्ता",verified:true,rating:4.5,totalOrders:136,totalAmount:2620000},
  {id:3,nameEn:"Army Hospital",nameNe:"सेना अस्पताल",typeEn:"Hospital",typeNe:"अस्पताल",districtEn:"Kathmandu",districtNe:"काठमाडौं",needEn:"All Vegetables",needNe:"सबै तरकारी",volumeEn:"800kg/week",volumeNe:"८०० किलो/हप्ता",verified:true,rating:4.7,totalOrders:124,totalAmount:2380000},
  {id:4,nameEn:"CARE Nepal",nameNe:"CARE नेपाल",typeEn:"NGO",typeNe:"गैसस",districtEn:"Kathmandu",districtNe:"काठमाडौं",needEn:"Mixed Vegetables",needNe:"मिश्रित तरकारी",volumeEn:"1000kg/month",volumeNe:"१००० किलो/महिना",verified:true,rating:4.9,totalOrders:98,totalAmount:1960000},
  {id:5,nameEn:"Prasadi School",nameNe:"प्रसादी स्कूल",typeEn:"School",typeNe:"स्कूल",districtEn:"Lalitpur",districtNe:"ललितपुर",needEn:"Rice & Dal",needNe:"चामल र दाल",volumeEn:"300kg/month",volumeNe:"३०० किलो/महिना",verified:true,rating:4.6,totalOrders:87,totalAmount:1540000},
  {id:6,nameEn:"Tribhuvan University",nameNe:"त्रिभुवन विश्वविद्यालय",typeEn:"Institution",typeNe:"संस्था",districtEn:"Kathmandu",districtNe:"काठमाडौं",needEn:"Bulk Staples",needNe:"थोक खाद्यान्न",volumeEn:"2000kg/month",volumeNe:"२००० किलो/महिना",verified:false,rating:4.3,totalOrders:72,totalAmount:1420000},
  {id:7,nameEn:"Pashupati Dev Fund",nameNe:"पशुपति विकास कोष",typeEn:"NGO",typeNe:"गैसस",districtEn:"Kathmandu",districtNe:"काठमाडौं",needEn:"Organic Produce",needNe:"जैविक उत्पादन",volumeEn:"400kg/week",volumeNe:"४०० किलो/हप्ता",verified:true,rating:4.7,totalOrders:65,totalAmount:1280000},
  {id:8,nameEn:"Kathmandu Guest House",nameNe:"काठमाडौं गेस्ट हाउस",typeEn:"Hotel",typeNe:"होटल",districtEn:"Kathmandu",districtNe:"काठमाडौं",needEn:"Fresh Vegetables",needNe:"ताजा तरकारी",volumeEn:"300kg/week",volumeNe:"३०० किलो/हप्ता",verified:true,rating:4.4,totalOrders:58,totalAmount:1100000},
  {id:9,nameEn:"Bir Hospital",nameNe:"वीर अस्पताल",typeEn:"Hospital",typeNe:"अस्पताल",districtEn:"Kathmandu",districtNe:"काठमाडौं",needEn:"All Produce",needNe:"सबै उत्पादन",volumeEn:"500kg/week",volumeNe:"५०० किलो/हप्ता",verified:true,rating:4.5,totalOrders:54,totalAmount:980000},
  {id:10,nameEn:"Nepal Red Cross",nameNe:"नेपाल रेडक्रस",typeEn:"NGO",typeNe:"गैसस",districtEn:"Lalitpur",districtNe:"ललितपुर",needEn:"Humanitarian Aid",needNe:"मानवीय सहायता",volumeEn:"700kg/month",volumeNe:"७०० किलो/महिना",verified:true,rating:4.8,totalOrders:48,totalAmount:860000},
  {id:11,nameEn:"Buddha Air Canteen",nameNe:"बुद्ध एयर क्यान्टिन",typeEn:"Institution",typeNe:"संस्था",districtEn:"Kathmandu",districtNe:"काठमाडौं",needEn:"Fresh Produce",needNe:"ताजा उपज",volumeEn:"200kg/week",volumeNe:"२०० किलो/हप्ता",verified:true,rating:4.2,totalOrders:41,totalAmount:720000},
  {id:12,nameEn:"Sagarmatha Lodge",nameNe:"सगरमाथा लज",typeEn:"Hotel",typeNe:"होटल",districtEn:"Solukhumbu",districtNe:"सोलुखुम्बु",needEn:"Himalayan Produce",needNe:"हिमाली उत्पादन",volumeEn:"150kg/week",volumeNe:"१५० किलो/हप्ता",verified:true,rating:4.6,totalOrders:36,totalAmount:580000},
  {id:13,nameEn:"Pokhara Lakeside Resort",nameNe:"पोखरा लेकसाइड रिसोर्ट",typeEn:"Hotel",typeNe:"होटल",districtEn:"Kaski",districtNe:"कास्की",needEn:"Local Vegetables",needNe:"स्थानीय तरकारी",volumeEn:"250kg/week",volumeNe:"२५० किलो/हप्ता",verified:false,rating:4.1,totalOrders:29,totalAmount:460000},
  {id:14,nameEn:"Janakpur Orphanage",nameNe:"जनकपुर अनाथालय",typeEn:"NGO",typeNe:"गैसस",districtEn:"Dhanusha",districtNe:"धनुषा",needEn:"Basic Essentials",needNe:"मूल आवश्यकता",volumeEn:"200kg/month",volumeNe:"२०० किलो/महिना",verified:true,rating:4.5,totalOrders:24,totalAmount:320000},
  {id:15,nameEn:"Nepal Army Welfare",nameNe:"नेपाल आर्मी वेल्फेयर",typeEn:"Institution",typeNe:"संस्था",districtEn:"Kathmandu",districtNe:"काठमाडौं",needEn:"Bulk Food",needNe:"थोक खाद्य",volumeEn:"1500kg/month",volumeNe:"१५०० किलो/महिना",verified:true,rating:4.6,totalOrders:19,totalAmount:280000},
  {id:16,nameEn:"Hetauda Industrial Corridor",nameNe:"हेटौडा औद्योगिक कोरिडोर",typeEn:"Institution",typeNe:"संस्था",districtEn:"Makwanpur",districtNe:"मकवानपुर",needEn:"Canteen Supplies",needNe:"क्यान्टिन सामग्री",volumeEn:"400kg/week",volumeNe:"४०० किलो/हप्ता",verified:true,rating:4.3,totalOrders:15,totalAmount:210000},
];

const FARMERS = [
  {id:1,nameEn:"Ram Bahadur Tamang",nameNe:"राम बहादुर तामाङ",districtEn:"Kavre",districtNe:"काभ्रे",crop:0,qtyEn:"800kg",qtyNe:"८०० किलो",price:38,harvestEn:"Ashadh 15",harvestNe:"असाढ १५",sathiEn:"Hari KC",sathiNe:"हरि के.सी.",verified:true,rating:4.7,organic:true,phone:"9841234567"},
  {id:2,nameEn:"Sita Rai",nameNe:"सिता राई",districtEn:"Chitwan",districtNe:"चितवन",crop:2,qtyEn:"2000kg",qtyNe:"२००० किलो",price:52,harvestEn:"Ashwin 1",harvestNe:"असोज १",sathiEn:"Binod Sharma",sathiNe:"बिनोद शर्मा",verified:true,rating:4.9,organic:false,phone:"9852345678"},
  {id:3,nameEn:"Kalu Magar",nameNe:"काले मगर",districtEn:"Sindhupalchok",districtNe:"सिन्धुपाल्चोक",crop:5,qtyEn:"500kg",qtyNe:"५०० किलो",price:75,harvestEn:"Kartik 10",harvestNe:"कार्तिक १०",sathiEn:"Sarita Thapa",sathiNe:"सरिता थापा",verified:true,rating:4.8,organic:true,phone:"9863456789"},
  {id:4,nameEn:"Maya Gurung",nameNe:"माया गुरुङ",districtEn:"Kaski",districtNe:"कास्की",crop:4,qtyEn:"1200kg",qtyNe:"१२०० किलो",price:110,harvestEn:"Kartik 5",harvestNe:"कार्तिक ५",sathiEn:"Dipak Gurung",sathiNe:"दिपक गुरुङ",verified:true,rating:4.6,organic:false,phone:"9874567890"},
  {id:5,nameEn:"Dhan Prasad Oli",nameNe:"धनप्रसाद ओली",districtEn:"Jumla",districtNe:"जुम्ला",crop:4,qtyEn:"3000kg",qtyNe:"३००० किलो",price:105,harvestEn:"Bhadra 25",harvestNe:"भाद्र २५",sathiEn:"Prakash Bohara",sathiNe:"प्रकाश बोहरा",verified:true,rating:4.9,organic:true,phone:"9885678901"},
  {id:6,nameEn:"Prem Karki",nameNe:"प्रेम कार्की",districtEn:"Makwanpur",districtNe:"मकवानपुर",crop:6,qtyEn:"600kg",qtyNe:"६०० किलो",price:28,harvestEn:"Falgun 1",harvestNe:"फागुन १",sathiEn:"Nirmala Karki",sathiNe:"निर्मला कार्की",verified:false,rating:4.4,organic:false,phone:"9896789012"},
  {id:7,nameEn:"Bishnu Shrestha",nameNe:"विष्णु श्रेष्ठ",districtEn:"Kavre",districtNe:"काभ्रे",crop:1,qtyEn:"1500kg",qtyNe:"१५०० किलो",price:24,harvestEn:"Falgun 10",harvestNe:"फागुन १०",sathiEn:"Hari KC",sathiNe:"हरि के.सी.",verified:true,rating:4.5,organic:false,phone:"9807890123"},
  {id:8,nameEn:"Kamala Thapa Magar",nameNe:"कमला थापा मगर",districtEn:"Chitwan",districtNe:"चितवन",crop:3,qtyEn:"900kg",qtyNe:"९०० किलो",price:18,harvestEn:"Magh 20",harvestNe:"माघ २०",sathiEn:"Binod Sharma",sathiNe:"बिनोद शर्मा",verified:true,rating:4.7,organic:true,phone:"9818901234"},
  {id:9,nameEn:"Arjun Basnet",nameNe:"अर्जुन बस्नेत",districtEn:"Makwanpur",districtNe:"मकवानपुर",crop:7,qtyEn:"700kg",qtyNe:"७०० किलो",price:42,harvestEn:"Chaitra 5",harvestNe:"चैत ५",sathiEn:"Nirmala Karki",sathiNe:"निर्मला कार्की",verified:true,rating:4.6,organic:false,phone:"9829012345"},
  {id:10,nameEn:"Rekha Paudel",nameNe:"रेखा पौडेल",districtEn:"Kaski",districtNe:"कास्की",crop:0,qtyEn:"450kg",qtyNe:"४५० किलो",price:40,harvestEn:"Jestha 8",harvestNe:"जेठ ८",sathiEn:"Dipak Gurung",sathiNe:"दिपक गुरुङ",verified:true,rating:4.8,organic:true,phone:"9840123456"},
  {id:11,nameEn:"Santosh Dahal",nameNe:"सन्तोष दाहाल",districtEn:"Kathmandu",districtNe:"काठमाडौं",crop:6,qtyEn:"300kg",qtyNe:"३०० किलो",price:32,harvestEn:"Poush 25",harvestNe:"पौष २५",sathiEn:"Sarita Thapa",sathiNe:"सरिता थापा",verified:false,rating:4.3,organic:false,phone:"9851234567"},
  {id:12,nameEn:"Ganga BK",nameNe:"गंगा बि.के.",districtEn:"Bardiya",districtNe:"बर्दिया",crop:2,qtyEn:"2500kg",qtyNe:"२५०० किलो",price:50,harvestEn:"Ashwin 15",harvestNe:"असोज १५",sathiEn:"Prakash Bohara",sathiNe:"प्रकाश बोहरा",verified:true,rating:4.7,organic:true,phone:"9862345678"},
  {id:13,nameEn:"Lalita Shah",nameNe:"ललिता शाह",districtEn:"Banke",districtNe:"बाँके",crop:5,qtyEn:"400kg",qtyNe:"४०० किलो",price:78,harvestEn:"Kartik 5",harvestNe:"कार्तिक ५",sathiEn:"Ram Hamal",sathiNe:"राम हमाल",verified:true,rating:4.5,organic:false,phone:"9873456789"},
  {id:14,nameEn:"Teknath Adhikari",nameNe:"टेकनाथ अधिकारी",districtEn:"Surkhet",districtNe:"सुर्खेत",crop:4,qtyEn:"1800kg",qtyNe:"१८०० किलो",price:115,harvestEn:"Bhadra 30",harvestNe:"भाद्र ३०",sathiEn:"Ram Hamal",sathiNe:"राम हमाल",verified:true,rating:4.9,organic:true,phone:"9884567890"},
  {id:15,nameEn:"Parbati Subedi",nameNe:"पार्वती सुवेदी",districtEn:"Dang",districtNe:"दाङ",crop:0,qtyEn:"650kg",qtyNe:"६५० किलो",price:36,harvestEn:"Ashadh 20",harvestNe:"असाढ २०",sathiEn:"Binod Sharma",sathiNe:"बिनोद शर्मा",verified:true,rating:4.6,organic:false,phone:"9895678901"},
  {id:16,nameEn:"Janak Rajbanshi",nameNe:"जनक राजवंशी",districtEn:"Siraha",districtNe:"सिरहा",crop:7,qtyEn:"1200kg",qtyNe:"१२०० किलो",price:44,harvestEn:"Chaitra 10",harvestNe:"चैत १०",sathiEn:"Ram Hamal",sathiNe:"राम हमाल",verified:true,rating:4.4,organic:false,phone:"9806789012"},
];

const ACTIVE_ORDERS = [
  {id:"ORD-001",farmerEn:"Ram Bahadur Tamang",farmerNe:"राम बहादुर तामाङ",buyerEn:"Dwarika's Hotel",buyerNe:"द्वारिका'ज् होटल",cropEn:"Tomato",cropNe:"गोलभेडा",qtyEn:"200kg",qtyNe:"२०० किलो",amount:7600,statusEn:"In Transit",statusNe:"ढुवानीमा",date:"2081-03-12",routeEn:"Kavre → Kathmandu",routeNe:"काभ्रे → काठमाडौं"},
  {id:"ORD-002",farmerEn:"Sita Rai",farmerNe:"सिता राई",buyerEn:"CARE Nepal",buyerNe:"CARE नेपाल",cropEn:"Rice",cropNe:"धान",qtyEn:"500kg",qtyNe:"५०० किलो",amount:26000,statusEn:"Confirmed",statusNe:"पुष्टि भयो",date:"2081-03-15",routeEn:"Chitwan → Kathmandu",routeNe:"चितवन → काठमाडौं"},
  {id:"ORD-003",farmerEn:"Kalu Magar",farmerNe:"काले मगर",buyerEn:"Army Hospital",buyerNe:"सेना अस्पताल",cropEn:"Ginger",cropNe:"अदुवा",qtyEn:"150kg",qtyNe:"१५० किलो",amount:11250,statusEn:"Delivered",statusNe:"डेलिभर भयो",date:"2081-03-10",routeEn:"Sindhupalchok → Kathmandu",routeNe:"सिन्धुपाल्चोक → काठमाडौं"},
];

const ORDER_HISTORY = [
  {id:"HIS-001",fE:"Dhan Prasad Oli",fN:"धनप्रसाद ओली",bE:"Hyatt Regency",bN:"हायट रिजेन्सी",cE:"Apple",cN:"स्याउ",qE:"300kg",qN:"३०० किलो",amount:31500,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-02-28",damaged:false},
  {id:"HIS-002",fE:"Maya Gurung",fN:"माया गुरुङ",bE:"Dwarika's Hotel",bN:"द्वारिका'ज् होटल",cE:"Apple",cN:"स्याउ",qE:"250kg",qN:"२५० किलो",amount:27500,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-02-25",damaged:false},
  {id:"HIS-003",fE:"Ram Bahadur Tamang",fN:"राम बहादुर तामाङ",bE:"CARE Nepal",bN:"CARE नेपाल",cE:"Tomato",cN:"गोलभेडा",qE:"400kg",qN:"४०० किलो",amount:15200,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-02-20",damaged:false},
  {id:"HIS-004",fE:"Sita Rai",fN:"सिता राई",bE:"Prasadi School",bN:"प्रसादी स्कूल",cE:"Rice",cN:"धान",qE:"300kg",qN:"३०० किलो",amount:15600,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-02-18",damaged:false},
  {id:"HIS-005",fE:"Kamala Thapa Magar",fN:"कमला थापा मगर",bE:"Army Hospital",bN:"सेना अस्पताल",cE:"Cabbage",cN:"बन्दा",qE:"500kg",qN:"५०० किलो",amount:9000,sE:"Damaged",sN:"क्षति भयो",date:"2081-02-15",damaged:true},
  {id:"HIS-006",fE:"Bishnu Shrestha",fN:"विष्णु श्रेष्ठ",bE:"Tribhuvan University",bN:"त्रिभुवन विश्वविद्यालय",cE:"Potato",cN:"आलु",qE:"800kg",qN:"८०० किलो",amount:19200,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-02-12",damaged:false},
  {id:"HIS-007",fE:"Kalu Magar",fN:"काले मगर",bE:"Nepal Red Cross",bN:"नेपाल रेडक्रस",cE:"Ginger",cN:"अदुवा",qE:"200kg",qN:"२०० किलो",amount:15000,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-02-10",damaged:false},
  {id:"HIS-008",fE:"Arjun Basnet",fN:"अर्जुन बस्नेत",bE:"Bir Hospital",bN:"वीर अस्पताल",cE:"Onion",cN:"प्याज",qE:"350kg",qN:"३५० किलो",amount:14700,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-02-08",damaged:false},
  {id:"HIS-009",fE:"Rekha Paudel",fN:"रेखा पौडेल",bE:"Kathmandu Guest House",bN:"काठमाडौं गेस्ट हाउस",cE:"Tomato",cN:"गोलभेडा",qE:"150kg",qN:"१५० किलो",amount:6000,sE:"Damaged",sN:"क्षति भयो",date:"2081-02-05",damaged:true},
  {id:"HIS-010",fE:"Ganga BK",fN:"गंगा बि.के.",bE:"CARE Nepal",bN:"CARE नेपाल",cE:"Rice",cN:"धान",qE:"600kg",qN:"६०० किलो",amount:30000,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-02-03",damaged:false},
  {id:"HIS-011",fE:"Dhan Prasad Oli",fN:"धनप्रसाद ओली",bE:"Pashupati Dev Fund",bN:"पशुपति विकास कोष",cE:"Apple",cN:"स्याउ",qE:"400kg",qN:"४०० किलो",amount:42000,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-01-28",damaged:false},
  {id:"HIS-012",fE:"Teknath Adhikari",fN:"टेकनाथ अधिकारी",bE:"Hyatt Regency",bN:"हायट रिजेन्सी",cE:"Apple",cN:"स्याउ",qE:"500kg",qN:"५०० किलो",amount:57500,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-01-25",damaged:false},
  {id:"HIS-013",fE:"Lalita Shah",fN:"ललिता शाह",bE:"Army Hospital",bN:"सेना अस्पताल",cE:"Ginger",cN:"अदुवा",qE:"125kg",qN:"१२५ किलो",amount:9750,sE:"Damaged",sN:"क्षति भयो",date:"2081-01-20",damaged:true},
  {id:"HIS-014",fE:"Santosh Dahal",fN:"सन्तोष दाहाल",bE:"Buddha Air Canteen",bN:"बुद्ध एयर क्यान्टिन",cE:"Cauliflower",cN:"काउली",qE:"200kg",qN:"२०० किलो",amount:6400,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-01-18",damaged:false},
  {id:"HIS-015",fE:"Parbati Subedi",fN:"पार्वती सुवेदी",bE:"Dwarika's Hotel",bN:"द्वारिका'ज् होटल",cE:"Tomato",cN:"गोलभेडा",qE:"325kg",qN:"३२५ किलो",amount:11700,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-01-15",damaged:false},
  {id:"HIS-016",fE:"Janak Rajbanshi",fN:"जनक राजवंशी",bE:"Nepal Army Welfare",bN:"नेपाल आर्मी वेल्फेयर",cE:"Onion",cN:"प्याज",qE:"500kg",qN:"५०० किलो",amount:22000,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-01-12",damaged:false},
  {id:"HIS-017",fE:"Maya Gurung",fN:"माया गुरुङ",bE:"Sagarmatha Lodge",bN:"सगरमाथा लज",cE:"Apple",cN:"स्याउ",qE:"180kg",qN:"१८० किलो",amount:19800,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-01-10",damaged:false},
  {id:"HIS-018",fE:"Kamala Thapa Magar",fN:"कमला थापा मगर",bE:"Janakpur Orphanage",bN:"जनकपुर अनाथालय",cE:"Cabbage",cN:"बन्दा",qE:"200kg",qN:"२०० किलो",amount:3600,sE:"Damaged",sN:"क्षति भयो",date:"2081-01-07",damaged:true},
  {id:"HIS-019",fE:"Prem Karki",fN:"प्रेम कार्की",bE:"Hetauda Industrial Corridor",bN:"हेटौडा औद्योगिक कोरिडोर",cE:"Cauliflower",cN:"काउली",qE:"300kg",qN:"३०० किलो",amount:8400,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-01-05",damaged:false},
  {id:"HIS-020",fE:"Bishnu Shrestha",fN:"विष्णु श्रेष्ठ",bE:"Pokhara Lakeside Resort",bN:"पोखरा लेकसाइड रिसोर्ट",cE:"Potato",cN:"आलु",qE:"450kg",qN:"४५० किलो",amount:10800,sE:"Delivered",sN:"डेलिभर भयो",date:"2081-01-02",damaged:false},
];

// Animated counter
function Counter({ target, prefix = "", suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{prefix}{val.toLocaleString()}{suffix}</span>;
}

function QRCode({ value, size = 100 }) {
  const seed = value.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const cells = 11;
  const cs = size / cells;
  const rng = n => ((seed * 9301 + 49297 * (n + 1)) % 233280) / 233280;
  const grid = Array.from({ length: cells }, (_, r) =>
    Array.from({ length: cells }, (_, c) => {
      if (r < 3 && c < 3) return true;
      if (r < 3 && c > cells - 4) return true;
      if (r > cells - 4 && c < 3) return true;
      return rng(r * cells + c) > 0.42;
    })
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="#fff" rx="4" />
      {grid.map((row, r) => row.map((filled, c) => filled ?
        <rect key={`${r}-${c}`} x={c * cs + 0.5} y={r * cs + 0.5} width={cs - 1} height={cs - 1} fill="#0a1a0f" rx="1" /> : null
      ))}
      <rect x={1} y={1} width={cs * 3 - 1} height={cs * 3 - 1} fill="none" stroke="#d4a017" strokeWidth={1.5} rx="2" />
      <rect x={(cells - 3) * cs + 1} y={1} width={cs * 3 - 2} height={cs * 3 - 1} fill="none" stroke="#d4a017" strokeWidth={1.5} rx="2" />
      <rect x={1} y={(cells - 3) * cs + 1} width={cs * 3 - 1} height={cs * 3 - 2} fill="none" stroke="#d4a017" strokeWidth={1.5} rx="2" />
    </svg>
  );
}

const glassCard = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16,
  backdropFilter: "blur(12px)",
};

const goldBtn = {
  background: "linear-gradient(135deg, #d4a017, #f0c040)",
  color: "#0a1a0f", border: "none", borderRadius: 8,
  cursor: "pointer", fontWeight: 700,
};

const greenBtn = {
  background: "linear-gradient(135deg, #1a5c35, #2d8a52)",
  color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600,
};

function NavBar({ active, setActive, lang, setLang, t }) {
  const ids = ["dashboard","farmers","buyers","orders","calendar","sathi","admin"];
  const icons = ["📊","🌾","🏪","📦","📅","🤝","⚙️"];
  return (
    <nav style={{ background: "rgba(10,26,15,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(212,160,23,0.2)", padding: "0 24px", display: "flex", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginRight: 28, padding: "12px 0", flexShrink: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #1a5c35, #d4a017)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 0 16px rgba(212,160,23,0.3)" }}>🌱</div>
        <div>
          <div style={{ color: C.goldLight, fontWeight: 800, fontSize: 17, letterSpacing: 0.5 }}>{t.appName}</div>
          <div style={{ color: C.textMuted, fontSize: 9, letterSpacing: 1.5 }}>{t.appSub}</div>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, gap: 0, overflowX: "auto" }}>
        {ids.map((id, i) => (
          <button key={id} onClick={() => setActive(id)} style={{ background: "none", color: active === id ? C.goldLight : C.textMuted, border: "none", padding: "18px 13px", cursor: "pointer", fontSize: 11.5, fontWeight: active === id ? 700 : 400, borderBottom: active === id ? `2px solid ${C.goldLight}` : "2px solid transparent", whiteSpace: "nowrap", transition: "all 0.25s", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 13 }}>{icons[i]}</span>{t.nav[i]}
          </button>
        ))}
      </div>
      <button onClick={() => setLang(lang === "en" ? "ne" : "en")} style={{ ...glassCard, color: C.goldLight, borderColor: C.borderGold, borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, marginLeft: 16, flexShrink: 0, transition: "all 0.2s" }}>
        {lang === "en" ? "🇳🇵 नेपाली" : "🇬🇧 English"}
      </button>
    </nav>
  );
}

function StatCard({ icon, label, value, sub, color, trend, animated, prefix, suffix }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ ...glassCard, padding: "22px 24px", borderLeft: `3px solid ${color}`, boxShadow: hov ? `0 8px 32px ${color}33, 0 0 0 1px ${color}44` : "0 4px 16px rgba(0,0,0,0.3)", transform: hov ? "translateY(-3px)" : "translateY(0)", transition: "all 0.3s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ fontSize: 30 }}>{icon}</div>
        {trend !== undefined && <div style={{ fontSize: 11, background: trend > 0 ? "rgba(61,184,112,0.15)" : "rgba(230,57,70,0.15)", color: trend > 0 ? C.primaryBright : C.danger, borderRadius: 20, padding: "3px 10px", fontWeight: 700, border: `1px solid ${trend > 0 ? "rgba(61,184,112,0.3)" : "rgba(230,57,70,0.3)"}` }}>{trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%</div>}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>
        {animated ? <Counter target={value} prefix={prefix} suffix={suffix} /> : `${prefix || ""}${value}${suffix || ""}`}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: C.textDim, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

function Dashboard({ t, lang }) {
  const chartData = [
    { m: lang === "en" ? "Magh" : "माघ", v: 12400 }, { m: lang === "en" ? "Falgun" : "फागुन", v: 18700 },
    { m: lang === "en" ? "Chaitra" : "चैत", v: 22100 }, { m: lang === "en" ? "Baisakh" : "बैशाख", v: 28900 },
    { m: lang === "en" ? "Jestha" : "जेठ", v: 31200 }, { m: lang === "en" ? "Ashadh" : "असाढ", v: 38700 },
  ];
  const maxV = 38700;
  const feeds = lang === "en" ? [
    { msg: "Ram Bahadur listed 800kg Tomato from Kavre", time: "2 min ago", dot: C.primaryBright },
    { msg: "Dwarika's Hotel placed Rs 38,000 order for organic vegetables", time: "8 min ago", dot: C.goldLight },
    { msg: "ORD-003 Delivered — Rs 11,250 released to Kalu Magar", time: "15 min ago", dot: C.purple },
    { msg: "Krishi Sathi Hari KC registered 3 new farmers in Kavre", time: "23 min ago", dot: C.earthLight },
    { msg: "CARE Nepal signed 6-month contract for 1000kg/month vegetables", time: "1 hr ago", dot: C.info },
  ] : [
    { msg: "राम बहादुरले काभ्रेबाट ८०० किलो गोलभेडा सूचीकृत गरे", time: "२ मिनेट अघि", dot: C.primaryBright },
    { msg: "द्वारिका'ज् होटलले रु ३८,०००को अर्डर गर्यो", time: "८ मिनेट अघि", dot: C.goldLight },
    { msg: "ORD-003 डेलिभर — रु ११,२५० काले मगरलाई भुक्तानी", time: "१५ मिनेट अघि", dot: C.purple },
    { msg: "कृषि साथी हरि के.सी.ले काभ्रेमा ३ नयाँ किसान दर्ता गरे", time: "२३ मिनेट अघि", dot: C.earthLight },
    { msg: "CARE नेपालले ६ महिनाको ठेक्का हस्ताक्षर गर्यो", time: "१ घण्टा अघि", dot: C.info },
  ];

  return (
    <div style={{ padding: "32px 36px" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, rgba(26,92,53,0.5) 0%, rgba(212,160,23,0.15) 100%)", borderRadius: 20, padding: "32px 36px", marginBottom: 32, border: "1px solid rgba(212,160,23,0.2)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(212,160,23,0.15), transparent 70%)", borderRadius: "50%" }}></div>
        <div style={{ position: "absolute", bottom: -60, left: -20, width: 250, height: 250, background: "radial-gradient(circle, rgba(61,184,112,0.1), transparent 70%)", borderRadius: "50%" }}></div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.text, margin: 0, letterSpacing: -0.5 }}>{t.liveOverview}</h1>
        <p style={{ color: C.textMuted, margin: "6px 0 0", fontSize: 14 }}>🟢 {t.ashadh}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))", gap: 14, marginBottom: 32 }}>
        <StatCard icon="👨‍🌾" label={t.registeredFarmers} value={2847} sub={`247 ${t.districtsCovered}`} color={C.primaryBright} trend={12} animated prefix="" suffix="" />
        <StatCard icon="🏪" label={t.activeBuyers} value={312} sub={lang === "en" ? "Hotels, NGOs, Schools" : "होटल, गैसस, स्कूल"} color={C.gold} trend={8} animated />
        <StatCard icon="📦" label={t.monthlyVolume} value="38.7T" sub={t.metricTons} color={C.info} trend={24} />
        <StatCard icon="💰" label={t.farmerEarnings} value={lang === "en" ? "Rs 4.2M" : "रु ४२ लाख"} sub={t.monthlyPayouts} color={C.purple} trend={31} />
        <StatCard icon="🤝" label={t.fieldAgents} value={184} sub={t.agentsActive} color="#C49A6C" trend={5} animated />
        <StatCard icon="🚚" label={t.activeOrders} value={94} sub={t.acrossDistricts} color={C.danger} trend={-3} animated />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20 }}>
        <div style={{ ...glassCard, padding: 28 }}>
          <h3 style={{ margin: "0 0 24px", fontSize: 14, fontWeight: 700, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase" }}>📈 {t.monthlyTrade}</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 170 }}>
            {chartData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 600 }}>{(d.v / 1000).toFixed(1)}k</div>
                <div style={{ width: "100%", background: `linear-gradient(to top, ${C.primary}, ${C.primaryLight})`, borderRadius: "6px 6px 0 0", height: `${(d.v / maxV) * 130}px`, minHeight: 6, boxShadow: i === chartData.length - 1 ? `0 0 12px ${C.primaryBright}66` : "none", transition: "height 0.8s cubic-bezier(0.34,1.56,0.64,1)", border: i === chartData.length - 1 ? `1px solid ${C.primaryBright}` : "none" }}></div>
                <div style={{ fontSize: 10, color: C.textDim }}>{d.m}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...glassCard, padding: 28 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase" }}>⚡ {t.liveFeed}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {feeds.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: i < feeds.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.dot, marginTop: 5, flexShrink: 0, boxShadow: `0 0 6px ${f.dot}` }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: C.text, lineHeight: 1.5 }}>{f.msg}</div>
                  <div style={{ fontSize: 10, color: C.textDim, marginTop: 2 }}>{f.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAB */}
      <div style={{ position: "fixed", bottom: 28, right: 28, display: "flex", flexDirection: "column", gap: 10, zIndex: 50 }}>
        <button style={{ ...goldBtn, width: 52, height: 52, borderRadius: "50%", fontSize: 20, boxShadow: `0 4px 20px ${C.goldGlow}`, display: "flex", alignItems: "center", justifyContent: "center" }} title="Quick Order">+</button>
      </div>
    </div>
  );
}

function FarmersPage({ t, lang }) {
  const [search, setSearch] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("all");
  const [selected, setSelected] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const districts = lang === "en" ? DISTRICTS_EN : DISTRICTS_NE;

  const filtered = FARMERS.filter(f => {
    const name = lang === "en" ? f.nameEn : f.nameNe;
    const crop = lang === "en" ? CROPS_EN[f.crop] : CROPS_NE[f.crop];
    const dist = lang === "en" ? f.districtEn : f.districtNe;
    const matchDist = filterDistrict === "all" || dist === filterDistrict;
    return matchDist && (name.toLowerCase().includes(search.toLowerCase()) || crop.toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <div style={{ padding: "32px 36px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: 0 }}>{t.farmers}</h1>
          <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 13 }}>{lang === "en" ? "Managed via Krishi Sathi field agents" : "कृषि साथी क्षेत्र प्रतिनिधिद्वारा व्यवस्थित"}</p>
        </div>
        <button style={{ ...goldBtn, padding: "10px 20px", fontSize: 13 }}>{t.registerFarmer}</button>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.searchFarmer} style={{ flex: 1, padding: "11px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 13, color: C.text, outline: "none" }} />
        <select value={filterDistrict} onChange={e => setFilterDistrict(e.target.value)} style={{ padding: "11px 16px", background: "#0f2318", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 13, color: C.text, cursor: "pointer" }}>
          <option value="all">{t.allDistricts}</option>
          {districts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 16 }}>
        {filtered.map(f => {
          const name = lang === "en" ? f.nameEn : f.nameNe;
          const dist = lang === "en" ? f.districtEn : f.districtNe;
          const crop = lang === "en" ? CROPS_EN[f.crop] : CROPS_NE[f.crop];
          const qty = lang === "en" ? f.qtyEn : f.qtyNe;
          const harvest = lang === "en" ? f.harvestEn : f.harvestNe;
          const sathi = lang === "en" ? f.sathiEn : f.sathiNe;
          return (
            <div key={f.id} onClick={() => { setSelected(f); setShowQR(false); }} style={{ ...glassCard, padding: 20, cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = `${C.primaryBright}44`; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px rgba(61,184,112,0.1)`; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`, display: "flex", alignItems: "center", justifyContent: "center", color: C.goldLight, fontWeight: 800, fontSize: 17, border: `2px solid ${C.primaryBright}44` }}>{name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{name}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>📍 {dist} · {sathi}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  {f.verified && <span style={{ background: "rgba(61,184,112,0.15)", color: C.primaryBright, fontSize: 10, borderRadius: 10, padding: "2px 8px", fontWeight: 700, border: "1px solid rgba(61,184,112,0.3)" }}>{t.verified}</span>}
                  {f.organic && <span style={{ background: "rgba(212,160,23,0.12)", color: C.goldLight, fontSize: 10, borderRadius: 10, padding: "2px 8px", fontWeight: 700, border: "1px solid rgba(212,160,23,0.25)" }}>{t.organic}</span>}
                </div>
              </div>
              <div style={{ background: "rgba(61,184,112,0.06)", borderRadius: 10, padding: "10px 14px", marginBottom: 14, border: "1px solid rgba(61,184,112,0.1)" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.primaryBright }}>{CROP_ICONS[f.crop]} {crop}</div>
                <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
                  <div style={{ fontSize: 11, color: C.textMuted }}>📦 {qty}</div>
                  <div style={{ fontSize: 11, color: C.goldLight, fontWeight: 600 }}>Rs {f.price}/kg</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>🗓️ {harvest}</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 12, color: C.textMuted }}>⭐ {f.rating}/5.0</div>
                <button onClick={e => e.stopPropagation()} style={{ ...goldBtn, padding: "6px 14px", fontSize: 11 }}>{t.matchBuyer}</button>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (() => {
        const name = lang === "en" ? selected.nameEn : selected.nameNe;
        const dist = lang === "en" ? selected.districtEn : selected.districtNe;
        const crop = lang === "en" ? CROPS_EN[selected.crop] : CROPS_NE[selected.crop];
        const qty = lang === "en" ? selected.qtyEn : selected.qtyNe;
        const harvest = lang === "en" ? selected.harvestEn : selected.harvestNe;
        const sathi = lang === "en" ? selected.sathiEn : selected.sathiNe;
        return (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, backdropFilter: "blur(8px)" }} onClick={() => setSelected(null)}>
            <div style={{ background: "#0f2318", border: "1px solid rgba(212,160,23,0.25)", borderRadius: 20, padding: 32, maxWidth: 460, width: "92%", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 50, height: 50, borderRadius: "50%", background: `linear-gradient(135deg, ${C.primary}, ${C.gold})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 20 }}>{name[0]}</div>
                  <div>
                    <h2 style={{ margin: 0, color: C.text, fontSize: 18, fontWeight: 800 }}>{name}</h2>
                    <div style={{ fontSize: 12, color: C.textMuted }}>📍 {dist}</div>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: C.textMuted, borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 20 }}>
                {[[lang === "en" ? "Crop" : "बाली", `${CROP_ICONS[selected.crop]} ${crop}`],[lang === "en" ? "Quantity" : "मात्रा", qty],[lang === "en" ? "Price" : "मूल्य", `Rs ${selected.price}/kg`],[lang === "en" ? "Harvest" : "कटनी", harvest],[lang === "en" ? "Krishi Sathi" : "कृषि साथी", sathi],[lang === "en" ? "Status" : "स्थिति", selected.verified ? "✅ " + t.verified : "⏳"],[lang === "en" ? "Organic" : "जैविक", selected.organic ? "🌿 " + (lang === "en" ? "Yes" : "हो") : lang === "en" ? "No" : "होइन"],[lang === "en" ? "Rating" : "मूल्याङ्कन", `⭐ ${selected.rating}/5.0`],[lang === "en" ? "Phone" : "फोन", `📞 ${selected.phone}`]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontSize: 12, color: C.textMuted, fontWeight: 500 }}>{k}</span>
                    <span style={{ fontSize: 12, color: C.text, fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
              {/* eSewa + QR */}
              <div style={{ background: "rgba(96,187,70,0.08)", borderRadius: 12, padding: "12px 16px", marginBottom: 14, border: "1px solid rgba(96,187,70,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ background: "#60BB46", borderRadius: 7, padding: "4px 9px", display: "flex", alignItems: "center", gap: 3 }}>
                    <span style={{ color: "#fff", fontWeight: 900, fontSize: 11 }}>e</span><span style={{ color: "#fff", fontWeight: 700, fontSize: 11 }}>Sewa</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 600 }}>{t.esewaId}</div>
                    <div style={{ fontSize: 12, color: C.text, fontWeight: 600 }}>{selected.phone}</div>
                  </div>
                </div>
                <button onClick={() => setShowQR(!showQR)} style={{ ...greenBtn, padding: "7px 14px", fontSize: 11 }}>{showQR ? t.hideQR : t.viewQR}</button>
              </div>
              {showQR && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: 12, marginBottom: 16, border: "1px solid rgba(212,160,23,0.15)" }}>
                  <QRCode value={`esewa:${selected.phone}:${name}`} size={130} />
                  <div style={{ fontSize: 11, color: C.textMuted }}>{t.scanEsewa}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.goldLight }}>{name}</div>
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <button style={{ ...greenBtn, padding: 12, fontSize: 13 }}>{t.createContract}</button>
                <button style={{ ...goldBtn, padding: 12, fontSize: 13 }}>{t.matchToBuyer}</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function BuyersPage({ t, lang }) {
  const [search, setSearch] = useState("");
  const typeColors = { Hotel: C.gold, School: C.info, NGO: C.primaryBright, Hospital: C.danger, Institution: "#C49A6C" };
  const typeIcons = { Hotel: "🏨", School: "🏫", NGO: "🌍", Hospital: "🏥", Institution: "🏛️" };

  const sorted = [...BUYERS].sort((a, b) => b.totalAmount - a.totalAmount);
  const filtered = sorted.filter(b => {
    const n = lang === "en" ? b.nameEn : b.nameNe;
    return n.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div style={{ padding: "32px 36px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: 0 }}>{t.buyerNetwork}</h1>
          <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 13 }}>{lang === "en" ? "Sorted by total purchase amount ↓" : "कुल खरिद रकम अनुसार घटदो क्रममा ↓"}</p>
        </div>
        <button style={{ ...goldBtn, padding: "10px 20px", fontSize: 13 }}>{t.onboardBuyer}</button>
      </div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.searchBuyer} style={{ width: "100%", padding: "11px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 13, color: C.text, outline: "none", marginBottom: 24, boxSizing: "border-box" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: 18 }}>
        {filtered.map(b => {
          const rank = sorted.findIndex(x => x.id === b.id);
          const isTop = rank === 0, isSilver = rank === 1, isBronze = rank === 2;
          const name = lang === "en" ? b.nameEn : b.nameNe;
          const type = lang === "en" ? b.typeEn : b.typeNe;
          const dist = lang === "en" ? b.districtEn : b.districtNe;
          const need = lang === "en" ? b.needEn : b.needNe;
          const vol = lang === "en" ? b.volumeEn : b.volumeNe;
          const tc = typeColors[b.typeEn] || "#888";
          return (
            <div key={b.id} style={{ ...glassCard, padding: 20, borderColor: isTop ? "rgba(212,160,23,0.4)" : isSilver ? "rgba(192,192,192,0.3)" : isBronze ? "rgba(205,127,50,0.3)" : "rgba(255,255,255,0.07)", boxShadow: isTop ? `0 0 32px rgba(212,160,23,0.15)` : "none", position: "relative", transition: "all 0.3s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
              {isTop && <div style={{ position: "absolute", top: -12, right: 16, background: "linear-gradient(135deg, #d4a017, #f0c040)", color: "#0a1a0f", fontSize: 10, borderRadius: 10, padding: "3px 12px", fontWeight: 800, boxShadow: "0 4px 12px rgba(212,160,23,0.4)" }}>{t.topBuyer}</div>}
              {isSilver && <div style={{ position: "absolute", top: -12, right: 16, background: "linear-gradient(135deg, #9e9e9e, #bdbdbd)", color: "#fff", fontSize: 10, borderRadius: 10, padding: "3px 12px", fontWeight: 700 }}>{t.silver}</div>}
              {isBronze && <div style={{ position: "absolute", top: -12, right: 16, background: "linear-gradient(135deg, #8d6e63, #a1887f)", color: "#fff", fontSize: 10, borderRadius: 10, padding: "3px 12px", fontWeight: 700 }}>{t.bronze}</div>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, marginTop: (isTop || isSilver || isBronze) ? 6 : 0 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: `linear-gradient(135deg, ${tc}22, ${tc}44)`, border: `1px solid ${tc}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{typeIcons[b.typeEn] || "🏢"}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{name}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>📍 {dist}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span style={{ background: `${tc}18`, color: tc, fontSize: 10, borderRadius: 10, padding: "2px 9px", fontWeight: 700, border: `1px solid ${tc}33` }}>{type}</span>
                  {b.verified && <span style={{ background: "rgba(61,184,112,0.12)", color: C.primaryBright, fontSize: 10, borderRadius: 10, padding: "2px 8px", fontWeight: 600 }}>{t.verified}</span>}
                </div>
              </div>
              <div style={{ background: "rgba(212,160,23,0.06)", borderRadius: 10, padding: "10px 14px", marginBottom: 12, border: "1px solid rgba(212,160,23,0.1)" }}>
                <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 3 }}>🛒 {t.needs}: <span style={{ color: C.text, fontWeight: 600 }}>{need}</span></div>
                <div style={{ fontSize: 11, color: C.textMuted }}>📦 {t.volume}: <span style={{ color: C.text, fontWeight: 600 }}>{vol}</span></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
                {[[t.completedOrders, b.totalOrders, C.info],[t.totalPurchase, `Rs ${(b.totalAmount/100000).toFixed(1)}L`, C.goldLight],[t.rank, `#${rank+1}`, C.primaryBright]].map(([label, val, col]) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "8px", textAlign: "center", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: col }}>{val}</div>
                    <div style={{ fontSize: 9, color: C.textDim, marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 11, color: C.textMuted }}>⭐ {b.rating} {t.buyerRating}</div>
                <button style={{ ...goldBtn, padding: "6px 14px", fontSize: 11 }}>{t.findFarmers}</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrdersPage({ t, lang }) {
  const [tab, setTab] = useState("active");
  const tabs = [["active", t.active], ["contracts", t.contracts], ["history", t.history]];

  const scol = (sE) => {
    if (sE === "Delivered") return { bg: "rgba(61,184,112,0.12)", text: "#3db870", border: "rgba(61,184,112,0.3)" };
    if (sE === "In Transit") return { bg: "rgba(255,152,0,0.12)", text: "#ffb74d", border: "rgba(255,152,0,0.3)" };
    if (sE === "Damaged") return { bg: "rgba(230,57,70,0.12)", text: "#ef5350", border: "rgba(230,57,70,0.3)" };
    return { bg: "rgba(79,195,247,0.12)", text: "#4fc3f7", border: "rgba(79,195,247,0.3)" };
  };

  return (
    <div style={{ padding: "32px 36px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: 0 }}>{t.orders}</h1>
        <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 13 }}>{t.escrow}</p>
      </div>
      <div style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        {tabs.map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ background: "none", border: "none", padding: "10px 22px", cursor: "pointer", fontWeight: tab === id ? 700 : 400, color: tab === id ? C.goldLight : C.textMuted, borderBottom: tab === id ? `2px solid ${C.goldLight}` : "2px solid transparent", marginBottom: -1, fontSize: 13, transition: "all 0.2s" }}>{label}</button>
        ))}
      </div>

      {tab === "active" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {ACTIVE_ORDERS.map(o => {
            const sc = scol(o.statusEn);
            const status = lang === "en" ? o.statusEn : o.statusNe;
            const farmer = lang === "en" ? o.farmerEn : o.farmerNe;
            const buyer = lang === "en" ? o.buyerEn : o.buyerNe;
            const crop = lang === "en" ? o.cropEn : o.cropNe;
            const qty = lang === "en" ? o.qtyEn : o.qtyNe;
            const route = lang === "en" ? o.routeEn : o.routeNe;
            return (
              <div key={o.id} style={{ ...glassCard, padding: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "7px 12px", fontSize: 12, fontWeight: 700, color: C.textMuted, border: "1px solid rgba(255,255,255,0.08)" }}>{o.id}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 5 }}>
                        <span style={{ color: C.primaryBright }}>🌾 {farmer}</span>
                        <span style={{ color: C.textDim, margin: "0 8px" }}>→</span>
                        <span style={{ color: C.goldLight }}>🏪 {buyer}</span>
                      </div>
                      <div style={{ fontSize: 12, color: C.textMuted }}>{crop} · {qty} · 🚚 {route}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                    <span style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, borderRadius: 10, padding: "3px 12px", fontSize: 11, fontWeight: 700 }}>{status}</span>
                    <div style={{ fontSize: 18, fontWeight: 800, color: C.goldLight }}>Rs {o.amount.toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                  {o.statusEn !== "Delivered" && <button style={{ ...greenBtn, padding: "7px 16px", fontSize: 12 }}>{o.statusEn === "Confirmed" ? t.markDispatched : t.confirmDelivery}</button>}
                  {o.statusEn === "Delivered" && <button style={{ background: "linear-gradient(135deg, #7b1fa2, #9c27b0)", color: "#fff", border: "none", borderRadius: 8, padding: "7px 16px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>{t.releasePayment}</button>}
                  <button style={{ background: "rgba(255,255,255,0.04)", color: C.textMuted, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "7px 16px", fontSize: 12, cursor: "pointer" }}>{t.viewDetails}</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "contracts" && (
        <div style={{ ...glassCard, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                {[lang === "en" ? "Farmer" : "किसान", lang === "en" ? "Buyer" : "खरिदकर्ता", lang === "en" ? "Crop" : "बाली", lang === "en" ? "Qty/Month" : "मात्रा/महिना", lang === "en" ? "Duration" : "अवधि", lang === "en" ? "Value" : "मूल्य", lang === "en" ? "Status" : "स्थिति"].map(h => (
                  <th key={h} style={{ padding: "14px 16px", textAlign: "left", color: C.textMuted, fontWeight: 600, fontSize: 11, borderBottom: "1px solid rgba(255,255,255,0.06)", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [lang === "en" ? "Sita Rai" : "सिता राई", lang === "en" ? "CARE Nepal" : "CARE नेपाल", lang === "en" ? "Rice" : "धान", lang === "en" ? "500kg" : "५०० किलो", lang === "en" ? "6 months" : "६ महिना", "Rs 1,56,000", lang === "en" ? "Active" : "सक्रिय"],
                [lang === "en" ? "Ram Bahadur" : "राम बहादुर", lang === "en" ? "Dwarika's Hotel" : "द्वारिका'ज् होटल", lang === "en" ? "Tomato" : "गोलभेडा", lang === "en" ? "200kg" : "२०० किलो", lang === "en" ? "3 months" : "३ महिना", "Rs 22,800", lang === "en" ? "Active" : "सक्रिय"],
                [lang === "en" ? "Dhan Prasad" : "धनप्रसाद", lang === "en" ? "Hyatt Regency" : "हायट रिजेन्सी", lang === "en" ? "Apple" : "स्याउ", lang === "en" ? "300kg" : "३०० किलो", lang === "en" ? "2 months" : "२ महिना", "Rs 63,000", lang === "en" ? "Pending" : "बाँकी"],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: "12px 16px", color: C.text }}>
                      {j === 6 ? <span style={{ background: (lang === "en" ? cell === "Active" : cell === "सक्रिय") ? "rgba(61,184,112,0.12)" : "rgba(255,152,0,0.12)", color: (lang === "en" ? cell === "Active" : cell === "सक्रिय") ? C.primaryBright : "#ffb74d", padding: "2px 10px", borderRadius: 10, fontWeight: 700, fontSize: 11 }}>{cell}</span> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "history" && (
        <div style={{ ...glassCard, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.textMuted }}>{t.historyDesc}</span>
            <span style={{ fontSize: 12, color: C.textMuted }}>{t.totalOrders}: {ORDER_HISTORY.length} · <span style={{ color: C.danger }}>{t.damagedLabel}: {ORDER_HISTORY.filter(o => o.damaged).length}</span></span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                  {["ID", lang === "en" ? "Farmer" : "किसान", lang === "en" ? "Buyer" : "खरिदकर्ता", lang === "en" ? "Crop" : "बाली", lang === "en" ? "Qty" : "मात्रा", lang === "en" ? "Amount" : "रकम", lang === "en" ? "Date" : "मिति", lang === "en" ? "Status" : "स्थिति"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: C.textMuted, fontWeight: 600, fontSize: 11, borderBottom: "1px solid rgba(255,255,255,0.06)", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ORDER_HISTORY.map((o, i) => {
                  const sc = scol(o.sE);
                  return (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", background: o.damaged ? "rgba(230,57,70,0.04)" : "transparent" }}>
                      <td style={{ padding: "9px 14px", color: C.textMuted, fontWeight: 700, whiteSpace: "nowrap" }}>{o.id}</td>
                      <td style={{ padding: "9px 14px", color: C.primaryBright, whiteSpace: "nowrap" }}>{lang === "en" ? o.fE : o.fN}</td>
                      <td style={{ padding: "9px 14px", color: C.goldLight, whiteSpace: "nowrap" }}>{lang === "en" ? o.bE : o.bN}</td>
                      <td style={{ padding: "9px 14px", color: C.text }}>{lang === "en" ? o.cE : o.cN}</td>
                      <td style={{ padding: "9px 14px", color: C.textMuted }}>{lang === "en" ? o.qE : o.qN}</td>
                      <td style={{ padding: "9px 14px", fontWeight: 700, color: C.goldLight, whiteSpace: "nowrap" }}>Rs {o.amount.toLocaleString()}</td>
                      <td style={{ padding: "9px 14px", color: C.textDim, whiteSpace: "nowrap" }}>{o.date}</td>
                      <td style={{ padding: "9px 14px" }}><span style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, borderRadius: 8, padding: "2px 9px", fontSize: 10, fontWeight: 700, whiteSpace: "nowrap" }}>{lang === "en" ? o.sE : o.sN}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function CropCalendar({ t, lang }) {
  const months = lang === "en" ? MONTHS_EN : MONTHS_NE;
  const calendar = lang === "en" ? CALENDAR_EN : CALENDAR_NE;
  const [sel, setSel] = useState(months[2]);
  const crops = lang === "en" ? CROPS_EN : CROPS_NE;

  useEffect(() => { setSel(months[2]); }, [lang]);

  return (
    <div style={{ padding: "32px 36px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: 0 }}>{t.cropCalendar}</h1>
        <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 13 }}>{t.nepalAgri}</p>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {months.map(m => (
          <button key={m} onClick={() => setSel(m)} style={{ background: sel === m ? "linear-gradient(135deg, #1a5c35, #2d8a52)" : "rgba(255,255,255,0.04)", color: sel === m ? "#fff" : C.textMuted, border: `1px solid ${sel === m ? C.primaryBright + "44" : "rgba(255,255,255,0.08)"}`, borderRadius: 20, padding: "7px 18px", cursor: "pointer", fontSize: 12, fontWeight: sel === m ? 700 : 400, transition: "all 0.2s", boxShadow: sel === m ? "0 0 12px rgba(61,184,112,0.2)" : "none" }}>{m}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div style={{ ...glassCard, padding: 24 }}>
          <h3 style={{ margin: "0 0 16px", color: C.textMuted, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>🌱 {t.availableIn} {sel}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {(calendar[sel] || []).map(crop => {
              const idx = crops.indexOf(crop);
              const icon = idx >= 0 ? CROP_ICONS[idx] : "🌿";
              const price = idx >= 0 ? BASE_PRICES[idx] : 0;
              return (
                <div key={crop} style={{ background: "rgba(61,184,112,0.08)", borderRadius: 12, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, border: "1px solid rgba(61,184,112,0.15)" }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{crop}</div>
                    {price > 0 && <div style={{ fontSize: 10, color: C.goldLight }}>Rs {price}/kg</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ ...glassCard, padding: 24 }}>
          <h3 style={{ margin: "0 0 16px", color: C.textMuted, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>📊 {t.yearRound}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {crops.map((c, i) => {
              const cal = lang === "en" ? CALENDAR_EN : CALENDAR_NE;
              const mo = Object.values(cal).filter(arr => arr.includes(c)).length;
              return (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 22 }}>{CROP_ICONS[i]}</span>
                  <span style={{ fontSize: 12, color: C.textMuted, width: 85, flexShrink: 0 }}>{c}</span>
                  <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 8, overflow: "hidden" }}>
                    <div style={{ width: `${(mo / 12) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${C.primary}, ${C.primaryBright})`, borderRadius: 4 }}></div>
                  </div>
                  <span style={{ fontSize: 11, color: C.textDim, width: 50, textAlign: "right" }}>{mo} {t.months}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function KrishiSathi({ t, lang }) {
  const [form, setForm] = useState({ farmerName: "", district: "", crop: "", quantity: "", harvest: "", price: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const districts = lang === "en" ? DISTRICTS_EN : DISTRICTS_NE;
  const crops = lang === "en" ? CROPS_EN : CROPS_NE;
  const sathis = [
    { nameEn: "Hari KC", nameNe: "हरि के.सी.", districtEn: "Kavre", districtNe: "काभ्रे", farmers: 34, trades: 89, earningEn: "Rs 12,400", earningNe: "रु १२,४००", active: true },
    { nameEn: "Binod Sharma", nameNe: "बिनोद शर्मा", districtEn: "Chitwan", districtNe: "चितवन", farmers: 28, trades: 67, earningEn: "Rs 9,800", earningNe: "रु ९,८००", active: true },
    { nameEn: "Sarita Thapa", nameNe: "सरिता थापा", districtEn: "Sindhupalchok", districtNe: "सिन्धुपाल्चोक", farmers: 22, trades: 45, earningEn: "Rs 7,200", earningNe: "रु ७,२००", active: true },
    { nameEn: "Dipak Gurung", nameNe: "दिपक गुरुङ", districtEn: "Kaski", districtNe: "कास्की", farmers: 19, trades: 38, earningEn: "Rs 5,900", earningNe: "रु ५,९००", active: false },
    { nameEn: "Ram Hamal", nameNe: "राम हमाल", districtEn: "Surkhet", districtNe: "सुर्खेत", farmers: 15, trades: 29, earningEn: "Rs 4,200", earningNe: "रु ४,२००", active: true },
  ];
  return (
    <div style={{ padding: "32px 36px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: 0 }}>{t.sathi}</h1>
        <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 13 }}>{lang === "en" ? "Field agents who register farmers and manage listings on their behalf" : "क्षेत्र प्रतिनिधिहरू जसले किसान दर्ता र सूचीकरण व्यवस्थापन गर्छन्"}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase", marginTop: 0, marginBottom: 16 }}>🤝 {t.activeSathis}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {sathis.map((s, i) => (
              <div key={i} style={{ ...glassCard, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${C.earth}, ${C.earthLight})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>{(lang === "en" ? s.nameEn : s.nameNe)[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{lang === "en" ? s.nameEn : s.nameNe}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>📍 {lang === "en" ? s.districtEn : s.districtNe} · {s.farmers} {t.farmers}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.goldLight }}>{lang === "en" ? s.earningEn : s.earningNe}</div>
                  <div style={{ fontSize: 10, color: C.textDim }}>{s.trades} {t.trades}</div>
                  <span style={{ background: s.active ? "rgba(61,184,112,0.12)" : "rgba(230,57,70,0.12)", color: s.active ? C.primaryBright : C.danger, fontSize: 10, borderRadius: 8, padding: "1px 8px", fontWeight: 700 }}>{s.active ? "● " + (lang === "en" ? "Active" : "सक्रिय") : "○ " + (lang === "en" ? "Offline" : "अनलाइन छैन")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...glassCard, padding: 28 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase", marginTop: 0, marginBottom: 20 }}>{t.registrationForm}</h3>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 52, marginBottom: 14 }}>✅</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.primaryBright, marginBottom: 8 }}>{t.registered}</div>
              <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 24 }}>{t.listingPublished}</div>
              <button onClick={() => { setSubmitted(false); setForm({ farmerName: "", district: "", crop: "", quantity: "", harvest: "", price: "", phone: "" }); }} style={{ ...goldBtn, padding: "10px 28px", fontSize: 13 }}>{t.registerAnother}</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[[["farmerName", t.farmerName, "text"], ["phone", t.phone, "text"]], [["quantity", t.quantity, "number"], ["price", t.price, "number"]], [["harvest", t.harvestDate, "text"]]].map((row, ri) => (
                <div key={ri} style={{ display: "grid", gridTemplateColumns: `repeat(${row.length}, 1fr)`, gap: 10 }}>
                  {row.map(([k, label, type]) => (
                    <div key={k}>
                      <label style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, display: "block", marginBottom: 5 }}>{label}</label>
                      <input type={type} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} style={{ width: "100%", padding: "9px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                </div>
              ))}
              {[["district", t.district, t.selectDistrict, districts], ["crop", t.crop, t.selectCrop, crops]].map(([k, label, placeholder, opts]) => (
                <div key={k}>
                  <label style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, display: "block", marginBottom: 5 }}>{label}</label>
                  <select value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} style={{ width: "100%", padding: "9px 12px", background: "#0f2318", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 13, color: C.text, cursor: "pointer" }}>
                    <option value="">{placeholder}</option>
                    {opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <button onClick={() => setSubmitted(true)} style={{ ...goldBtn, padding: "13px", fontSize: 14, marginTop: 6, boxShadow: `0 4px 16px ${C.goldGlow}` }}>{t.registerPublish}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminPage({ t, lang }) {
  const damagedCount = ORDER_HISTORY.filter(o => o.damaged).length;
  const damagedAmt = ORDER_HISTORY.filter(o => o.damaged).reduce((s, o) => s + o.amount, 0);
  const prices = lang === "en"
    ? [["Tomato",42,38,"+10.5%"],["Potato",28,30,"-6.7%"],["Onion",55,52,"+5.8%"],["Cabbage",18,20,"-10%"],["Cauliflower",35,32,"+9.4%"],["Ginger",88,90,"-2.2%"]]
    : [["गोलभेडा",42,38,"+१०.५%"],["आलु",28,30,"-६.७%"],["प्याज",55,52,"+५.८%"],["बन्दा",18,20,"-१०%"],["काउली",35,32,"+९.४%"],["अदुवा",88,90,"-२.२%"]];
  const verifs = lang === "en"
    ? [["Tribhuvan University","Buyer","Institution ID","2hr ago"],["Prem Karki","Farmer","Land Ownership","5hr ago"],["Bhavana Panta","Krishi Sathi","Identity Card","1 day ago"]]
    : [["त्रिभुवन विश्वविद्यालय","खरिदकर्ता","संस्था परिचयपत्र","२ घण्टा अघि"],["प्रेम कार्की","किसान","जग्गा स्वामित्व","५ घण्टा अघि"],["भवना पन्त","कृषि साथी","परिचयपत्र","१ दिन अघि"]];

  return (
    <div style={{ padding: "32px 36px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: 0 }}>{t.adminControl}</h1>
        <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 13 }}>{t.platformOverview}</p>
      </div>

      {/* Damaged Banner */}
      <div style={{ background: "linear-gradient(135deg, rgba(230,57,70,0.15), rgba(183,28,28,0.1))", border: "1px solid rgba(230,57,70,0.3)", borderRadius: 16, padding: "20px 28px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 40 }}>⚠️</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, color: C.danger }}>{t.damagedOrders}</div>
            <div style={{ fontSize: 13, color: "#ef9a9a", marginTop: 3 }}>{t.damagedDesc}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: C.danger }}>{damagedCount}</div>
            <div style={{ fontSize: 11, color: "#ef9a9a" }}>{t.damagedOrds}</div>
          </div>
          <div style={{ width: 1, background: "rgba(230,57,70,0.3)" }}></div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: C.danger }}>Rs {damagedAmt.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: "#ef9a9a" }}>{t.damageAmount}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={{ ...glassCard, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase" }}>{t.kalimati}</h3>
            <span style={{ fontSize: 11, color: C.textDim }}>{t.updatedAgo}</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>{[t.today.split("(")[0].trim(), lang === "en" ? "Today" : "आजको", t.yesterday, t.change].map(h => <th key={h} style={{ padding: "6px 8px", textAlign: "left", color: C.textDim, fontWeight: 600, fontSize: 10, borderBottom: "1px solid rgba(255,255,255,0.05)", letterSpacing: 0.5 }}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {prices.map(([crop, today, yest, change], i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td style={{ padding: "9px 8px", color: C.text, fontWeight: 500, fontSize: 12 }}>{crop}</td>
                  <td style={{ padding: "9px 8px", fontWeight: 800, color: C.goldLight, fontSize: 12 }}>Rs {today}</td>
                  <td style={{ padding: "9px 8px", color: C.textMuted, fontSize: 12 }}>Rs {yest}</td>
                  <td style={{ padding: "9px 8px" }}><span style={{ color: String(change).startsWith("+") ? C.primaryBright : C.danger, fontWeight: 700, fontSize: 12 }}>{change}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ ...glassCard, padding: 24 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 700, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase" }}>{t.pendingVerif}</h3>
          {verifs.map((v, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < verifs.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{v[0]}</div>
                <div style={{ fontSize: 11, color: C.textDim }}>{v[1]} · {v[2]} · {v[3]}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ background: "rgba(61,184,112,0.12)", color: C.primaryBright, border: "1px solid rgba(61,184,112,0.25)", borderRadius: 7, padding: "5px 12px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>{t.approve}</button>
                <button style={{ background: "rgba(230,57,70,0.12)", color: C.danger, border: "1px solid rgba(230,57,70,0.25)", borderRadius: 7, padding: "5px 12px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>{t.reject}</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...glassCard, padding: 24 }}>
        <h3 style={{ margin: "0 0 20px", fontSize: 13, fontWeight: 700, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase" }}>{t.revenueTracker}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[[t.gmv, "Rs 42,80,000", "📈", C.primaryBright],[t.commission, "Rs 3,42,400", "💵", C.purple],[t.farmerPayouts, "Rs 38,20,000", "👨‍🌾", C.gold],[t.pendingEscrow, "Rs 6,40,000", "🔒", "#C49A6C"]].map(([label, val, icon, col]) => (
            <div key={label} style={{ background: `${col}0d`, borderRadius: 12, padding: "18px 16px", border: `1px solid ${col}22` }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: col }}>{val}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 5 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [lang, setLang] = useState("ne");
  const [prevActive, setPrevActive] = useState("dashboard");
  const t = T[lang];

  const handleSetActive = (id) => { setPrevActive(active); setActive(id); };
  const pages = { dashboard: Dashboard, farmers: FarmersPage, buyers: BuyersPage, orders: OrdersPage, calendar: CropCalendar, sathi: KrishiSathi, admin: AdminPage };
  const Page = pages[active] || Dashboard;

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: C.bg, minHeight: "100vh", color: C.text }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
        ::-webkit-scrollbar-thumb { background: rgba(61,184,112,0.3); border-radius: 3px; }
        input::placeholder { color: rgba(122,158,135,0.5); }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .page-enter { animation: fadeSlide 0.3s ease forwards; }
        button:hover { opacity: 0.9; }
      `}</style>
      <NavBar active={active} setActive={handleSetActive} lang={lang} setLang={setLang} t={t} />
      <main className="page-enter" key={active}>
        <Page t={t} lang={lang} />
      </main>
    </div>
  );
}
