"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  FlaskConical, 
  Zap, 
  Eye, 
  RotateCcw, 
  Sliders, 
  Info,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

export default function LabsPage() {
  const [activeTab, setActiveTab] = useState<"circuit" | "optics" | "ph">("circuit");

  // Circuit Lab State
  const [voltage, setVoltage] = useState(12); // Volts
  const [resistance, setResistance] = useState(6); // Ohms
  const [circuitOpen, setCircuitOpen] = useState(false);

  const current = circuitOpen ? 0 : voltage / resistance;
  const power = circuitOpen ? 0 : voltage * current;
  const bulbBrightness = circuitOpen ? 0 : Math.min(100, (power / 35) * 100);
  const isOverloaded = power > 150;

  // Optics Lab State
  const [incidentAngle, setIncidentAngle] = useState(45); // degrees
  const [refractiveIndex, setRefractiveIndex] = useState(1.5); // Glass default
  const [mediumName, setMediumName] = useState("Crown Glass (कांच, n = 1.50)");

  const radIncident = (incidentAngle * Math.PI) / 180;
  const sinRefracted = Math.sin(radIncident) / refractiveIndex;
  const isTIR = sinRefracted > 1;
  const refractedAngle = isTIR ? 90 : Math.asin(sinRefracted) * (180 / Math.PI);

  // pH Lab State
  const [selectedSubstance, setSelectedSubstance] = useState<{
    name: string;
    nameHi: string;
    ph: number;
    color: string;
    type: string;
    desc: string;
    formula: string;
  }>({
    name: "Lemon Juice",
    nameHi: "नींबू का रस (Citric Acid)",
    ph: 2.2,
    color: "#ef4444", // Red
    type: "Strong Acid (अम्ल)",
    desc: "Contains Citric Acid. High concentration of H+ hydrogen ions. Turns blue litmus red.",
    formula: "C₆H₈O₇"
  });
  const [isDipped, setIsDipped] = useState(false);

  const PH_SOLUTIONS = [
    { name: "Hydrochloric Acid", nameHi: "हाइड्रोक्लोरिक अम्ल (HCl)", ph: 1.0, color: "#dc2626", type: "Strong Acid", desc: "Found in stomach for digestion. Full dissociation into H+ and Cl- ions.", formula: "HCl (aq)" },
    { name: "Lemon Juice", nameHi: "नींबू का रस (सिट्रिक अम्ल)", ph: 2.2, color: "#ef4444", type: "Acid", desc: "Citric acid makes it sour. Blue litmus turns red instantly.", formula: "C₆H₈O₇" },
    { name: "Vinegar", nameHi: "सिरका (एसिटिक अम्ल)", ph: 2.8, color: "#f97316", type: "Weak Acid", desc: "Common in food preservation. Contains 4-6% Ethanoic acid.", formula: "CH₃COOH" },
    { name: "Pure Water", nameHi: "शुद्ध जल (Neutral H₂O)", ph: 7.0, color: "#22c55e", type: "Neutral (उदासीन)", desc: "Equal concentration of H+ and OH- ions. No change on litmus.", formula: "H₂O" },
    { name: "Baking Soda Solution", nameHi: "मीठा सोडा घोल", ph: 8.5, color: "#3b82f6", type: "Mild Base (क्षार)", desc: "Sodium bicarbonate. Used as antacid to relieve acidity.", formula: "NaHCO₃" },
    { name: "Soap Solution", nameHi: "साबुन का घोल", ph: 10.0, color: "#6366f1", type: "Base (क्षार)", desc: "Slippery to touch. Turns red litmus paper blue.", formula: "R-COONa" },
    { name: "Sodium Hydroxide (Caustic)", nameHi: "कास्टिक सोडा घोल (NaOH)", ph: 13.5, color: "#9333ea", type: "Strong Base", desc: "Extremely alkaline. Very high concentration of OH- hydroxide ions.", formula: "NaOH (aq)" }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
        <Header />

        <main className="flex-grow">
          {/* Header Banner */}
          <section className="bg-gradient-to-b from-primary/10 via-background to-background py-8 border-b border-border/50">
            <div className="container mx-auto px-4 lg:px-8 max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 mb-2">
                  <FlaskConical className="h-3.5 w-3.5" /> PrayogShala STEM Simulator
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">Virtual STEM Experiment Labs</h1>
                <p className="text-xs text-muted-foreground">Hands-on physics and chemistry simulations designed for rural schools.</p>
              </div>

              {/* Lab Mode Tabs */}
              <div className="flex flex-wrap gap-2 p-1.5 bg-card rounded-2xl border border-border shadow-sm">
                <button
                  onClick={() => setActiveTab("circuit")}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "circuit" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Zap className="h-3.5 w-3.5" /> Ohm's DC Circuit
                </button>
                <button
                  onClick={() => setActiveTab("optics")}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "optics" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" /> Light Optics (Snell's)
                </button>
                <button
                  onClick={() => setActiveTab("ph")}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "ph" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <FlaskConical className="h-3.5 w-3.5" /> pH Acid-Base Lab
                </button>
              </div>
            </div>
          </section>

          {/* SIMULATION WORKBENCH */}
          <section className="container mx-auto px-4 lg:px-8 py-8 max-w-6xl">
            
            {/* TAB 1: OHM'S CIRCUIT */}
            {activeTab === "circuit" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 glass-card rounded-3xl p-6 border border-border bg-card flex flex-col justify-between shadow-lg">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${circuitOpen ? "bg-red-500" : "bg-green-500 animate-pulse"}`}></span>
                      <span className="text-xs font-bold text-foreground">
                        DC Circuit Simulator: V = I × R
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => { setVoltage(12); setResistance(6); setCircuitOpen(false); }}
                      className="rounded-xl h-7 px-2.5 text-xs gap-1"
                    >
                      <RotateCcw className="h-3 w-3" /> Reset
                    </Button>
                  </div>

                  {/* Circuit Graphic */}
                  <div className="py-6 flex flex-col items-center justify-center">
                    <svg className="w-full max-w-md h-52" viewBox="0 0 400 200">
                      {/* Wire Loop */}
                      <rect
                        x="40"
                        y="30"
                        width="320"
                        height="140"
                        rx="16"
                        fill="none"
                        stroke={circuitOpen ? "#64748b" : "#22c55e"}
                        strokeWidth="4"
                        strokeDasharray={circuitOpen ? "6 6" : "none"}
                      />

                      {/* Battery (Left) */}
                      <g transform="translate(30, 80)">
                        <rect x="0" y="0" width="20" height="40" fill="#1e293b" rx="4" />
                        <line x1="10" y1="0" x2="10" y2="-10" stroke="#22c55e" strokeWidth="4" />
                        <line x1="10" y1="40" x2="10" y2="50" stroke="#22c55e" strokeWidth="4" />
                        <text x="-5" y="25" fill="#e2e8f0" fontSize="10" fontWeight="bold">🔋 {voltage}V</text>
                      </g>

                      {/* Resistor (Top) */}
                      <g transform="translate(160, 20)">
                        <rect x="0" y="0" width="80" height="20" fill="#d97706" rx="4" />
                        <text x="18" y="14" fill="#ffffff" fontSize="10" fontWeight="bold">{resistance} Ω Resistor</text>
                      </g>

                      {/* Light Bulb (Right) */}
                      <g transform="translate(340, 85)">
                        <circle
                          cx="15"
                          cy="15"
                          r="20"
                          fill={circuitOpen ? "#334155" : `rgba(250, 204, 21, ${Math.min(1, bulbBrightness / 100 + 0.2)})`}
                          stroke="#eab308"
                          strokeWidth="2"
                          filter={bulbBrightness > 40 ? "drop-shadow(0px 0px 14px #facc15)" : "none"}
                        />
                        <text x="7" y="20" fontSize="14">💡</text>
                      </g>

                      {/* Switch (Bottom) */}
                      <g transform="translate(170, 160)" className="cursor-pointer" onClick={() => setCircuitOpen(!circuitOpen)}>
                        <circle cx="10" cy="10" r="4" fill="#64748b" />
                        <circle cx="50" cy="10" r="4" fill="#64748b" />
                        <line
                          x1="10"
                          y1="10"
                          x2="45"
                          y2={circuitOpen ? "-5" : "10"}
                          stroke={circuitOpen ? "#ef4444" : "#22c55e"}
                          strokeWidth="4"
                        />
                        <text x="60" y="14" fill="#94a3b8" fontSize="9" fontWeight="bold">
                          {circuitOpen ? "Switch: OPEN (Click to Close)" : "Switch: CLOSED (Connected)"}
                        </text>
                      </g>
                    </svg>

                    {isOverloaded && !circuitOpen && (
                      <div className="flex items-center gap-1.5 text-xs text-red-600 font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 mt-1">
                        <AlertTriangle className="h-3.5 w-3.5" /> High Power Output: {power.toFixed(1)} Watts! Bulb glowing at peak.
                      </div>
                    )}
                  </div>

                  {/* Meters */}
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border text-center">
                    <div className="bg-muted/40 p-3 rounded-2xl border border-border/50">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">Voltmeter (V)</span>
                      <p className="text-xl font-extrabold text-blue-600">{voltage.toFixed(1)} V</p>
                    </div>
                    <div className="bg-muted/40 p-3 rounded-2xl border border-border/50">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">Ammeter (I = V/R)</span>
                      <p className="text-xl font-extrabold text-green-600">{current.toFixed(2)} A</p>
                    </div>
                    <div className="bg-muted/40 p-3 rounded-2xl border border-border/50">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">Power (P = V×I)</span>
                      <p className="text-xl font-extrabold text-amber-500">{power.toFixed(1)} W</p>
                    </div>
                  </div>
                </div>

                {/* Controls Box */}
                <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-border bg-card space-y-5 shadow-lg">
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <Sliders className="h-4 w-4 text-primary" /> Circuit Controls
                  </h3>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Battery Voltage (V)</span>
                      <span className="text-primary font-bold">{voltage} Volts</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="48"
                      value={voltage}
                      onChange={(e) => setVoltage(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>1.5V (AA Cell)</span>
                      <span>12V (Battery)</span>
                      <span>48V (Solar)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Resistance (R)</span>
                      <span className="text-primary font-bold">{resistance} Ohms (Ω)</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="40"
                      value={resistance}
                      onChange={(e) => setResistance(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>1 Ω (Low R)</span>
                      <span>20 Ω (Med)</span>
                      <span>40 Ω (High R)</span>
                    </div>
                  </div>

                  <Button
                    variant={circuitOpen ? "destructive" : "default"}
                    className="w-full rounded-2xl h-11 font-bold text-xs"
                    onClick={() => setCircuitOpen(!circuitOpen)}
                  >
                    {circuitOpen ? "Close Circuit (Turn ON)" : "Open Circuit (Turn OFF)"}
                  </Button>

                  <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/20 space-y-1 text-xs">
                    <h5 className="font-bold text-primary flex items-center gap-1">
                      <Info className="h-3.5 w-3.5" /> Ohm's Formula:
                    </h5>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      <strong>I = V / R</strong>. धारा (Current) वोल्टेज के समानुपाती तथा प्रतिरोध (Resistance) के व्युत्क्रमानुपाती होती है।
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: LIGHT OPTICS */}
            {activeTab === "optics" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 glass-card rounded-3xl p-6 border border-border bg-card flex flex-col justify-between shadow-lg">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-xs font-bold text-foreground">
                      Snell's Law Light Refraction Simulator
                    </span>
                    <span className="text-xs text-primary font-bold">{mediumName}</span>
                  </div>

                  <div className="py-6 flex justify-center">
                    <svg className="w-full max-w-md h-56" viewBox="0 0 400 220">
                      <rect x="0" y="0" width="400" height="110" fill="rgba(59, 130, 246, 0.05)" />
                      <text x="15" y="25" fill="#64748b" fontSize="10" fontWeight="bold">Medium 1: Air (हवा, n₁ = 1.00)</text>

                      <rect x="0" y="110" width="400" height="110" fill="rgba(59, 130, 246, 0.2)" />
                      <text x="15" y="135" fill="#3b82f6" fontSize="10" fontWeight="bold">Medium 2: {mediumName}</text>

                      {/* Interface and Normal */}
                      <line x1="0" y1="110" x2="400" y2="110" stroke="#3b82f6" strokeWidth="2" />
                      <line x1="200" y1="10" x2="200" y2="210" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
                      <text x="205" y="25" fill="#94a3b8" fontSize="9">Normal (अभिलंब)</text>

                      {/* Incident Ray */}
                      {(() => {
                        const len = 95;
                        const x1 = 200 - len * Math.sin(radIncident);
                        const y1 = 110 - len * Math.cos(radIncident);
                        return (
                          <g>
                            <line x1={x1} y1={y1} x2="200" y2="110" stroke="#ef4444" strokeWidth="3.5" />
                            <circle cx={x1} cy={y1} r="4" fill="#ef4444" />
                            <text x={x1 - 10} y={y1 - 6} fill="#ef4444" fontSize="10" fontWeight="bold">
                              ∠i = {incidentAngle}°
                            </text>
                          </g>
                        );
                      })()}

                      {/* Refracted Ray */}
                      {!isTIR ? (
                        (() => {
                          const len = 95;
                          const radR = (refractedAngle * Math.PI) / 180;
                          const x2 = 200 + len * Math.sin(radR);
                          const y2 = 110 + len * Math.cos(radR);
                          return (
                            <g>
                              <line x1="200" y1="110" x2={x2} y2={y2} stroke="#22c55e" strokeWidth="3.5" />
                              <circle cx={x2} cy={y2} r="4" fill="#22c55e" />
                              <text x={x2 + 5} y={y2 + 10} fill="#22c55e" fontSize="10" fontWeight="bold">
                                ∠r = {refractedAngle.toFixed(1)}°
                              </text>
                            </g>
                          );
                        })()
                      ) : (
                        <text x="130" y="150" fill="#ef4444" fontSize="12" fontWeight="bold">
                          ⚠️ Total Internal Reflection (पूर्ण आंतरिक परावर्तन)
                        </text>
                      )}
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border text-center">
                    <div className="bg-muted/40 p-3 rounded-2xl border border-border/50">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">आपतन कोण (Angle ∠i)</span>
                      <p className="text-xl font-bold text-red-500">{incidentAngle}°</p>
                    </div>
                    <div className="bg-muted/40 p-3 rounded-2xl border border-border/50">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">अपवर्तन कोण (Angle ∠r)</span>
                      <p className="text-xl font-bold text-green-600">{refractedAngle.toFixed(1)}°</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-border bg-card space-y-4 shadow-lg">
                  <h3 className="font-bold text-sm text-foreground">Optics Controls</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Incident Angle (∠i)</span>
                      <span className="text-primary font-bold">{incidentAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="85"
                      value={incidentAngle}
                      onChange={(e) => setIncidentAngle(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold">Select Medium (अपवर्तनांक माध्यम):</label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { name: "Water (जल, n = 1.33)", n: 1.33 },
                        { name: "Crown Glass (कांच, n = 1.50)", n: 1.50 },
                        { name: "Flint Glass (सघन कांच, n = 1.66)", n: 1.66 },
                        { name: "Diamond (हीरा, n = 2.42)", n: 2.42 }
                      ].map((item) => (
                        <button
                          key={item.name}
                          onClick={() => {
                            setRefractiveIndex(item.n);
                            setMediumName(item.name);
                          }}
                          className={`text-xs px-3 py-2 rounded-xl text-left font-semibold transition-all ${
                            refractiveIndex === item.n
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "bg-muted/50 hover:bg-muted text-foreground border border-border/50"
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/20 space-y-1 text-xs">
                    <h5 className="font-bold text-primary">स्नेल का नियम:</h5>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      \`sin(i) / sin(r) = n\` ➔ प्रकाश विरल माध्यम (Air) से सघन माध्यम (Glass) में जाने पर अभिलंब की ओर मुड़ता है।
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: pH ACID-BASE */}
            {activeTab === "ph" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 glass-card rounded-3xl p-6 border border-border bg-card flex flex-col justify-between shadow-lg">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-xs font-bold text-foreground">
                      Universal Indicator pH Scale & Litmus Strip Test
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                      {selectedSubstance.name} ({selectedSubstance.formula})
                    </span>
                  </div>

                  {/* Beaker and Litmus */}
                  <div className="py-6 flex flex-col items-center justify-center">
                    <div className="relative w-64 h-64 flex flex-col items-center justify-end">
                      {/* Litmus Paper Strip */}
                      <div
                        className={`absolute top-0 w-8 h-36 rounded-md shadow-md border border-neutral-300 transition-all duration-700 cursor-pointer flex items-center justify-center text-[10px] font-bold text-white uppercase ${
                          isDipped ? "translate-y-16" : "translate-y-0"
                        }`}
                        style={{
                          backgroundColor: isDipped ? selectedSubstance.color : "#fbbf24"
                        }}
                        onClick={() => setIsDipped(!isDipped)}
                      >
                        <span className="-rotate-90 whitespace-nowrap">
                          {isDipped ? `pH ${selectedSubstance.ph}` : "pH Strip"}
                        </span>
                      </div>

                      {/* Beaker Container */}
                      <div className="w-48 h-44 rounded-b-3xl border-4 border-t-0 border-blue-200/80 bg-blue-50/20 backdrop-blur-sm relative overflow-hidden flex items-end shadow-lg">
                        <div
                          className="w-full h-28 opacity-80 transition-all duration-500 flex items-center justify-center text-xs font-bold text-white text-center px-2"
                          style={{ backgroundColor: selectedSubstance.color }}
                        >
                          {selectedSubstance.name}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      {isDipped ? "✅ स्ट्रिप डुबो दी गई है! रंग परिवर्तित हो गया।" : "👇 'स्ट्रिप डुबोएं' पर क्लिक करके अम्लता/क्षारीयता मापें।"}
                    </p>
                  </div>

                  {/* Metric Readouts */}
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border text-center">
                    <div className="bg-muted/40 p-3 rounded-2xl border border-border/50">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">pH मान (Value)</span>
                      <p className="text-2xl font-black" style={{ color: selectedSubstance.color }}>
                        {selectedSubstance.ph}
                      </p>
                    </div>
                    <div className="bg-muted/40 p-3 rounded-2xl border border-border/50">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">प्रकृति (Nature)</span>
                      <p className="text-xs font-bold text-foreground mt-1">{selectedSubstance.type}</p>
                    </div>
                    <div className="bg-muted/40 p-3 rounded-2xl border border-border/50">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">लिटमस प्रभाव</span>
                      <p className="text-xs font-bold text-foreground mt-1">
                        {selectedSubstance.ph < 7 ? "नीला लिटमस ➔ लाल" : selectedSubstance.ph === 7 ? "हरा (उदासीन)" : "लाल लिटमस ➔ नीला"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Solution Selector */}
                <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-border bg-card space-y-4 shadow-lg">
                  <h3 className="font-bold text-sm text-foreground">Select Solution to Test</h3>

                  <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                    {PH_SOLUTIONS.map((sol) => (
                      <button
                        key={sol.name}
                        onClick={() => {
                          setSelectedSubstance(sol);
                          setIsDipped(true);
                        }}
                        className={`w-full text-xs p-2.5 rounded-xl text-left transition-all flex items-center justify-between ${
                          selectedSubstance.name === sol.name
                            ? "border-2 border-primary bg-primary/10 font-bold"
                            : "bg-muted/40 hover:bg-muted border border-border/50"
                        }`}
                      >
                        <div>
                          <p className="font-semibold text-foreground">{sol.name}</p>
                          <p className="text-[10px] text-muted-foreground">{sol.nameHi}</p>
                        </div>
                        <span className="h-4 w-4 rounded-full shadow-sm" style={{ backgroundColor: sol.color }} />
                      </button>
                    ))}
                  </div>

                  <Button
                    className="w-full rounded-2xl h-11 bg-primary text-primary-foreground font-bold text-xs shadow-sm"
                    onClick={() => setIsDipped(!isDipped)}
                  >
                    {isDipped ? "स्ट्रिप बाहर निकालें (Remove)" : "स्ट्रिप घोल में डुबोएं (Dip Strip)"}
                  </Button>

                  <div className="p-3.5 rounded-2xl bg-card border border-border text-xs text-muted-foreground space-y-1">
                    <h5 className="font-bold text-foreground">रासायनिक विवरण:</h5>
                    <p className="text-[11px] leading-relaxed">{selectedSubstance.desc}</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
