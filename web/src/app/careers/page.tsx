"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Sparkles, 
  Tractor, 
  Sun, 
  HeartPulse, 
  ShieldAlert, 
  Laptop, 
  Store, 
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  FileCheck,
  ExternalLink,
  Award,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

interface CareerPath {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  salary: string;
  qualification: string;
  icon: any;
  schemes: string[];
  govtPortal: string;
  desc: string;
  syllabusTopics: string[];
  steps: string[];
}

const CAREER_PATHS: CareerPath[] = [
  {
    id: "ag-tech",
    title: "Smart AgTech & Kisan Drone Specialist",
    titleHi: "स्मार्ट कृषि एवं ड्रोन/ड्रिप सिंचाई विशेषज्ञ",
    category: "AgTech & Agriculture",
    salary: "₹25,000 - ₹50,000 / माह",
    qualification: "10वीं / 12वीं पास",
    icon: Tractor,
    schemes: ["Kisan Drone Scheme", "PM-KUSUM", "PMKSY"],
    govtPortal: "https://agricoop.nic.in",
    desc: "Operate agricultural spraying drones, soil moisture IoT sensors, and automated drip irrigation networks.",
    syllabusTopics: ["DGCA Drone Regulations & Flying Drills", "Liquid Nano-Urea Precision Spraying", "Soil NPK Chemistry & Moisture Sensors"],
    steps: [
      "Complete ShikshaSetu AgTech Foundation Module",
      "Get DGCA-approved Drone Pilot Certification (5-7 days)",
      "Set up Village Custom Hiring Center with Gram Panchayat grant"
    ]
  },
  {
    id: "solar-tech",
    title: "Solar Installation & Microgrid Maintenance",
    titleHi: "सोलर पैनल स्थापना एवं ग्रिड तकनीशियन",
    category: "Green Energy",
    salary: "₹20,000 - ₹45,000 / माह",
    qualification: "10वीं / ITI / 12वीं",
    icon: Sun,
    schemes: ["PM Surya Ghar Muft Bijli", "Suryamitra Scheme"],
    govtPortal: "https://pmsuryaghar.gov.in",
    desc: "Install, wire, and service rooftop solar panels, village streetlights, and solar irrigation pumps.",
    syllabusTopics: ["Photovoltaic Cell Basics & Inverters", "DC-to-AC Wiring & Earthing Safety", "Battery Storage (Lithium vs Lead-Acid)"],
    steps: [
      "Practice Circuit Labs in ShikshaSetu PrayogShala",
      "Enroll in free 90-day Suryamitra Skill Certification",
      "Register as Solar Vendor with state Discom"
    ]
  },
  {
    id: "rural-health",
    title: "Community Healthcare & Telemedicine Paramedic",
    titleHi: "सामुदायिक स्वास्थ्य सहायक / टेलीमेडिसिन ऑपरेटर",
    category: "Healthcare",
    salary: "₹18,000 - ₹35,000 / माह",
    qualification: "12वीं (बायोलॉजी/साइंस)",
    icon: HeartPulse,
    schemes: ["Ayushman Bharat", "National Health Mission (NHM)"],
    govtPortal: "https://pmjay.gov.in",
    desc: "Assist primary health centers (PHC), diagnostic sample collection, emergency first-aid, and doctor video tele-consultation.",
    syllabusTopics: ["Vital Signs Monitoring (BP, Pulse, Sugar)", "Emergency CPR & First Aid Protocol", "Tele-health Software & Digital Health ID (ABHA)"],
    steps: [
      "Study Biology & Human Physiology foundation courses",
      "Complete GNM / DMLT / Arogya Mitra certification",
      "Work at Health & Wellness Centers or Jan Aushadhi Kendras"
    ]
  },
  {
    id: "defense-forces",
    title: "Armed Forces & Police Recruitment (Agniveer)",
    titleHi: "भारतीय सेना, पुलिस एवं अर्धसैनिक बल (अग्निवीर)",
    category: "Defense & Security",
    salary: "₹30,000 - ₹40,000 + भत्ते",
    qualification: "10वीं / 12वीं पास",
    icon: ShieldAlert,
    schemes: ["Agniveer Yojna", "SSC GD Constable", "State Police"],
    govtPortal: "https://joinindianarmy.nic.in",
    desc: "Physical fitness training, mock written exams, general science, and mental reasoning for Armed Forces rallies.",
    syllabusTopics: ["Daily 1600m Running & Physical Endurance", "NCERT Class 10 Science & Math Problem Solving", "Current Affairs & General Awareness"],
    steps: [
      "Practice daily timed test papers on ShikshaSetu",
      "Maintain physical training regimen & medical fitness",
      "Apply during regional Army Recruitment Rallies"
    ]
  },
  {
    id: "remote-it",
    title: "Digital Freelancer & CSC Village Operator",
    titleHi: "डिजिटल फ्रीलांसर एवं CSC ग्राम स्तरीय उद्यमी (VLE)",
    category: "Information Technology",
    salary: "₹15,000 - ₹60,000 / माह",
    qualification: "10वीं / 12वीं",
    icon: Laptop,
    schemes: ["Digital India", "CSC VLE Scheme", "FutureSkills"],
    govtPortal: "https://csc.gov.in",
    desc: "Provide online govt services (Aadhaar, PAN, DBT, Banking), data entry, vernacular translation, and AI data labeling.",
    syllabusTopics: ["Computer Basics, MS Excel & Fast Typing", "Government Portal Navigation & Aadhaar Banking", "AI Prompting & Digital Payments (UPI)"],
    steps: [
      "Take Digital Literacy & English Communication courses",
      "Register CSC VLE ID with Village Panchayat",
      "Offer banking, certificates, and online freelancing from home"
    ]
  },
  {
    id: "artisan-biz",
    title: "Handloom & Rural E-Commerce Entrepreneur",
    titleHi: "हस्तशिल्प एवं ग्रामीण ई-कॉमर्स उद्यमी",
    category: "Entrepreneurship",
    salary: "₹20,000 - ₹1,00,000+ मुनाफा",
    qualification: "योग्यता की कोई शर्त नहीं",
    icon: Store,
    schemes: ["PM Vishwakarma", "ODOP (One District One Product)"],
    govtPortal: "https://pmvishwakarma.gov.in",
    desc: "Sell traditional village handicrafts, organic pickles/spices/honey, and handloom textiles directly on ONDC and Amazon.",
    syllabusTopics: ["Smartphone Product Photography & Cataloging", "Digital Packaging & ONDC Seller Registration", "Online Payment Gateways & Customer Care"],
    steps: [
      "Apply for PM Vishwakarma ₹15,000 toolkit grant & low-interest loan",
      "Photograph products and list on ONDC e-market",
      "Ship village products across India with India Post Speed Post"
    ]
  }
];

export default function CareerHubPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeQuizStep, setActiveQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    interest: "",
    qualification: "",
    preference: ""
  });
  const [recommendedCareer, setRecommendedCareer] = useState<CareerPath | null>(null);
  const [selectedCareerModal, setSelectedCareerModal] = useState<CareerPath | null>(null);

  const categories = ["All", "AgTech & Agriculture", "Green Energy", "Healthcare", "Defense & Security", "Information Technology", "Entrepreneurship"];

  const filteredPaths = selectedCategory === "All"
    ? CAREER_PATHS
    : CAREER_PATHS.filter(p => p.category === selectedCategory);

  const handleQuizAnswer = (key: "interest" | "qualification" | "preference", val: string) => {
    const updated = { ...quizAnswers, [key]: val };
    setQuizAnswers(updated);

    if (activeQuizStep < 2) {
      setActiveQuizStep(activeQuizStep + 1);
    } else {
      // Accurate matching logic
      if (updated.interest.includes("Farming") || updated.interest.includes("Drone")) {
        setRecommendedCareer(CAREER_PATHS[0]);
      } else if (updated.interest.includes("Solar") || updated.interest.includes("Wiring")) {
        setRecommendedCareer(CAREER_PATHS[1]);
      } else if (updated.interest.includes("Health")) {
        setRecommendedCareer(CAREER_PATHS[2]);
      } else if (updated.interest.includes("Defense")) {
        setRecommendedCareer(CAREER_PATHS[3]);
      } else if (updated.interest.includes("Computer")) {
        setRecommendedCareer(CAREER_PATHS[4]);
      } else {
        setRecommendedCareer(CAREER_PATHS[5]);
      }
      setActiveQuizStep(3);
    }
  };

  const resetQuiz = () => {
    setActiveQuizStep(0);
    setQuizAnswers({ interest: "", qualification: "", preference: "" });
    setRecommendedCareer(null);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
        <Header />

        <main className="flex-grow">
          {/* Header Banner */}
          <section className="bg-gradient-to-b from-primary/10 via-background to-background py-10 border-b border-border/50">
            <div className="container mx-auto px-4 lg:px-8 max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                  <Sparkles className="h-3.5 w-3.5" /> Margdarshak Career & Skills Guidance
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
                  High-Growth Rural Career Roadmaps
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground max-w-xl">
                  Accurate career roadmaps, salary expectations, and government training schemes (PMKVY, Suryaghar, PM Vishwakarma).
                </p>
              </div>

              {/* Quiz Trigger Box */}
              <div className="glass-card p-5 rounded-3xl border border-primary/30 w-full md:w-80 shadow-lg bg-card space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Sparkles className="h-4 w-4 text-amber-500" /> AI 1-Min Career Matcher
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Answer 3 quick questions to discover your best-fit career pathway.
                </p>
                <Button
                  onClick={() => {
                    document.getElementById("career-matcher")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full rounded-xl text-xs font-bold h-9 bg-primary text-primary-foreground gap-1.5"
                >
                  Start Career Quiz <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </section>

          {/* Interactive AI Career Matcher Quiz */}
          <section id="career-matcher" className="container mx-auto px-4 lg:px-8 py-8 max-w-4xl">
            <div className="glass-card rounded-3xl p-6 md:p-8 border border-primary/30 shadow-xl bg-card/80 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <h3 className="text-base font-bold text-foreground">Personalized Career Matcher</h3>
                  <p className="text-xs text-muted-foreground">Step {Math.min(activeQuizStep + 1, 3)} of 3</p>
                </div>
                {activeQuizStep > 0 && (
                  <Button variant="ghost" size="sm" onClick={resetQuiz} className="text-xs">
                    Reset
                  </Button>
                )}
              </div>

              {/* Step 0 */}
              {activeQuizStep === 0 && (
                <div className="space-y-3 animate-in fade-in">
                  <h4 className="text-sm font-bold text-foreground">1. किस प्रकार का कार्य आपको सबसे अधिक आकर्षित करता है?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { label: "🌾 खेती, ड्रोन और आधुनिक सिंचाई तकनीक", val: "Farming" },
                      { label: "⚡ सोलर पैनल, वायरिंग और बिजली उपकरण", val: "Solar" },
                      { label: "🏥 अस्पताल, नर्सिंग और मरीजों की सेवा", val: "Healthcare" },
                      { label: "🛡️ भारतीय सेना, पुलिस और शारीरिक फिटनेस", val: "Defense" },
                      { label: "💻 कंप्यूटर, टाइपिंग और ऑनलाइन कार्य", val: "Computer" },
                      { label: "🏪 अपना खुद का गांव का व्यवसाय / दुकान", val: "Business" }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => handleQuizAnswer("interest", opt.val)}
                        className="p-3.5 rounded-2xl bg-muted/40 hover:bg-primary/10 border border-border/70 text-left text-xs font-semibold text-foreground transition-all hover:scale-[1.01]"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1 */}
              {activeQuizStep === 1 && (
                <div className="space-y-3 animate-in fade-in">
                  <h4 className="text-sm font-bold text-foreground">2. आपकी वर्तमान शैक्षणिक योग्यता क्या है?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { label: "10वीं कक्षा (अध्ययनरत / पास)", val: "10th" },
                      { label: "12वीं कक्षा (आर्ट्स / कॉमर्स)", val: "12th Arts" },
                      { label: "12वीं कक्षा (साइंस / PCM / PCB)", val: "12th Science" },
                      { label: "ITI / डिप्लोमा / स्नातक (Graduate)", val: "Graduate" }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => handleQuizAnswer("qualification", opt.val)}
                        className="p-3.5 rounded-2xl bg-muted/40 hover:bg-primary/10 border border-border/70 text-left text-xs font-semibold text-foreground transition-all"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {activeQuizStep === 2 && (
                <div className="space-y-3 animate-in fade-in">
                  <h4 className="text-sm font-bold text-foreground">3. आप कहाँ काम करना पसंद करेंगे?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { label: "🏡 अपने गांव / ग्राम पंचायत में रहकर", val: "Village" },
                      { label: "🏙️ नजदीकी ब्लॉक या जिला मुख्यालय में", val: "District" },
                      { label: "🇮🇳 पूरे भारत में कहीं भी (सशस्त्र बल)", val: "National" },
                      { label: "🌐 100% ऑनलाइन स्मार्टफोन/लैपटॉप से", val: "Remote" }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => handleQuizAnswer("preference", opt.val)}
                        className="p-3.5 rounded-2xl bg-muted/40 hover:bg-primary/10 border border-border/70 text-left text-xs font-semibold text-foreground transition-all"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Result */}
              {activeQuizStep === 3 && recommendedCareer && (
                <div className="space-y-5 animate-in zoom-in-95">
                  <div className="p-5 rounded-2xl bg-primary/10 border border-primary/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-primary text-primary-foreground">
                        <recommendedCareer.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-primary uppercase">Top Matched Roadmap</span>
                        <h4 className="text-base font-bold text-foreground">{recommendedCareer.title}</h4>
                        <p className="text-xs text-muted-foreground">{recommendedCareer.titleHi}</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[11px] text-muted-foreground">अनुमानित आय:</span>
                      <p className="text-base font-extrabold text-green-600">{recommendedCareer.salary}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-foreground uppercase">आपके अगले 3 कदम (Action Steps):</h5>
                    {recommendedCareer.steps.map((st, idx) => (
                      <div key={st} className="p-2.5 rounded-xl bg-card border border-border flex items-center gap-2.5 text-xs">
                        <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground font-bold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-foreground">{st}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Link href="/courses">
                      <Button className="rounded-xl h-10 px-5 text-xs font-bold bg-primary text-primary-foreground">
                        तैयारी कोर्स शुरू करें
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={resetQuiz} className="rounded-xl h-10 px-4 text-xs">
                      पुनः टेस्ट लें
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* All Career Cards */}
          <section className="container mx-auto px-4 lg:px-8 py-8 max-w-6xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-foreground">Explore All Career Roadmaps</h2>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaths.map((career) => {
                const Icon = career.icon;
                return (
                  <div
                    key={career.id}
                    className="glass-card rounded-3xl p-6 border border-border bg-card flex flex-col justify-between hover:-translate-y-1 transition-all shadow-md"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-500/10 px-2.5 py-0.5 rounded-full border border-green-500/20">
                          {career.salary}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-bold text-base text-foreground leading-snug">{career.title}</h3>
                        <p className="text-xs text-primary font-semibold mt-0.5">{career.titleHi}</p>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {career.desc}
                      </p>

                      <div className="space-y-1 pt-2 border-t border-border/40 text-xs">
                        <span className="text-[11px] font-bold text-muted-foreground">Govt Schemes:</span>
                        <div className="flex flex-wrap gap-1">
                          {career.schemes.map((s) => (
                            <span key={s} className="text-[10px] bg-muted px-2 py-0.5 rounded font-medium text-foreground">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-2">
                      <Button
                        onClick={() => setSelectedCareerModal(career)}
                        className="w-full rounded-xl text-xs font-bold h-10 bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5"
                      >
                        <FileCheck className="h-4 w-4" /> View Full Roadmap & Syllabus
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Career Roadmap Detail Modal */}
          {selectedCareerModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-card text-card-foreground border border-border rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
                <div className="flex items-start justify-between border-b border-border pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{selectedCareerModal.title}</h3>
                    <p className="text-xs text-primary font-medium">{selectedCareerModal.titleHi}</p>
                  </div>
                  <button onClick={() => setSelectedCareerModal(null)} className="p-1 rounded-full hover:bg-muted text-muted-foreground">
                    <ChevronRight className="h-5 w-5 rotate-90" />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-muted/40 border border-border">
                      <span className="text-muted-foreground font-semibold">Eligibility:</span>
                      <p className="font-bold text-foreground mt-0.5">{selectedCareerModal.qualification}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/40 border border-border">
                      <span className="text-muted-foreground font-semibold">Monthly Earning:</span>
                      <p className="font-bold text-green-600 mt-0.5">{selectedCareerModal.salary}</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-foreground mb-1.5">Free Training Syllabus Topics:</h5>
                    <ul className="space-y-1.5 pl-2">
                      {selectedCareerModal.syllabusTopics.map((top, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{top}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-foreground mb-1.5">Action Checklist:</h5>
                    <div className="space-y-1.5">
                      {selectedCareerModal.steps.map((st, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-card border border-border flex items-center gap-2">
                          <span className="h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span>{st}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex gap-2">
                  <Link href="/courses" className="flex-1">
                    <Button className="w-full rounded-xl bg-primary text-primary-foreground text-xs font-bold h-10">
                      Start Preparation Course
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={() => setSelectedCareerModal(null)} className="rounded-xl text-xs h-10">
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
