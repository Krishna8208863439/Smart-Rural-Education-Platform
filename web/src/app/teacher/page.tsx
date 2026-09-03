"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  School, 
  Users, 
  CheckCircle, 
  WifiOff, 
  Sparkles, 
  Download, 
  Printer,
  TrendingUp,
  FileSpreadsheet,
  Plus,
  BookOpen,
  Check
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  rollNo: string;
  attendance: string;
  avgScore: number;
  offlineDownloads: number;
  lastActive: string;
}

const INITIAL_ROSTER: Student[] = [
  { id: "st-1", name: "Aarav Kumar (आरव)", rollNo: "1001", attendance: "96%", avgScore: 88, offlineDownloads: 14, lastActive: "Today, 10:15 AM" },
  { id: "st-2", name: "Priya Sharma (प्रिया)", rollNo: "1002", attendance: "94%", avgScore: 92, offlineDownloads: 18, lastActive: "Today, 09:30 AM" },
  { id: "st-3", name: "Ramesh Patel (रमेश)", rollNo: "1003", attendance: "85%", avgScore: 74, offlineDownloads: 9, lastActive: "Yesterday" },
  { id: "st-4", name: "Sunita Yadav (सुनीता)", rollNo: "1004", attendance: "98%", avgScore: 90, offlineDownloads: 22, lastActive: "Today, 11:00 AM" },
  { id: "st-5", name: "Vikram Singh (विक्रम)", rollNo: "1005", attendance: "80%", avgScore: 68, offlineDownloads: 6, lastActive: "2 days ago" }
];

interface GeneratedPaper {
  title: string;
  grade: string;
  subject: string;
  totalMarks: number;
  timeLimit: string;
  sections: {
    name: string;
    marks: string;
    questions: string[];
  }[];
}

export default function TeacherPage() {
  const [students, setStudents] = useState<Student[]>(INITIAL_ROSTER);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced">("idle");
  const [lastSyncTime, setLastSyncTime] = useState("Just now");
  
  // AI Exam Paper Generator
  const [hwTopic, setHwTopic] = useState("Class 10 Science: Light Reflection & Snell's Law");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPaper, setGeneratedPaper] = useState<GeneratedPaper | null>({
    title: "Quarterly Assessment Test (त्रैमासिक मूल्यांकन परीक्षा)",
    grade: "Class 10th",
    subject: "Science & Physics (विज्ञान)",
    totalMarks: 25,
    timeLimit: "45 Minutes",
    sections: [
      {
        name: "Section A: Multiple Choice Questions (1 Mark Each)",
        marks: "5 Marks",
        questions: [
          "Q1: When light enters from air to glass, what happens to its speed? (a) Increases (b) Decreases (c) Remains same (d) Becomes zero",
          "Q2: Formula for Snell's law of refraction is: (a) sin i / sin r = n (b) V = IR (c) F = ma (d) E = mc²",
          "Q3: An object is placed at 2F of a convex lens. The image formed is: (a) Virtual (b) Real & same size at 2F (c) Magnified (d) Diminished"
        ]
      },
      {
        name: "Section B: Short Answer Questions (2 Marks Each)",
        marks: "8 Marks",
        questions: [
          "Q4: State the two fundamental laws of reflection of light with a neat diagram.",
          "Q5: Why do rear-view mirrors in vehicles use convex mirrors instead of plane mirrors?"
        ]
      },
      {
        name: "Section C: Numerical & Applied Questions (4 Marks Each)",
        marks: "12 Marks",
        questions: [
          "Q6: A ray of light enters from air into diamond having refractive index 2.42. If angle of incidence in air is 30°, calculate angle of refraction.",
          "Q7: A concave mirror produces three times magnified real image of an object placed at 10 cm in front of it. Find mirror focal length."
        ]
      }
    ]
  });

  const handleGeneratePaper = () => {
    if (!hwTopic.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      setGeneratedPaper({
        title: `Unit Test: ${hwTopic}`,
        grade: "Class 10th / 9th",
        subject: "Bilingual Science & STEM",
        totalMarks: 20,
        timeLimit: "40 Minutes",
        sections: [
          {
            name: "Section A: Objective Questions (1 Mark)",
            marks: "4 Marks",
            questions: [
              `Q1: Define the primary scientific principle involved in ${hwTopic}.`,
              "Q2: Write the SI unit of the relevant physical quantity.",
              "Q3: Identify the correct mathematical relation governing this concept."
            ]
          },
          {
            name: "Section B: Conceptual & Analytical (3 Marks)",
            marks: "6 Marks",
            questions: [
              `Q4: Explain the practical real-life application of ${hwTopic} in rural technology with neat illustration.`,
              "Q5: Distinguish between ideal and real-world conditions for this phenomenon."
            ]
          },
          {
            name: "Section C: Comprehensive Problem Solving (5 Marks)",
            marks: "10 Marks",
            questions: [
              `Q6: Solve step-by-step numerical problem based on formula application of ${hwTopic}.`,
              "Q7: Draw and label complete experiment apparatus setup."
            ]
          }
        ]
      });
      setIsGenerating(false);
    }, 800);
  };

  const handleMeshSync = () => {
    setSyncStatus("syncing");
    setTimeout(() => {
      setSyncStatus("synced");
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      alert("✅ Gram Panchayat Local Wi-Fi Mesh Node Synchronized! 14 new student quiz records and offline assignments downloaded.");
    }, 1000);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
        <Header />

        <main className="flex-grow container mx-auto px-4 lg:px-8 py-8 max-w-6xl space-y-8">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 mb-1">
                <School className="h-3.5 w-3.5" /> Gram Panchayat & School Teacher Portal
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">Teacher Command & Offline Mesh Sync</h1>
              <p className="text-xs text-muted-foreground">Manage classroom rosters, AI exam paper generator, and offline sync.</p>
            </div>

            <Button
              variant={syncStatus === "synced" ? "default" : "outline"}
              size="sm"
              onClick={handleMeshSync}
              disabled={syncStatus === "syncing"}
              className="rounded-xl text-xs gap-1.5 h-9"
            >
              <WifiOff className="h-4 w-4 text-primary" />
              {syncStatus === "syncing" ? "Syncing Node..." : syncStatus === "synced" ? `Synced at ${lastSyncTime}` : "Sync Local Mesh Node"}
            </Button>
          </div>

          {/* 3 Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-5 rounded-3xl border border-border bg-card shadow-sm">
              <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary" /> Class 10-A Strength
              </span>
              <p className="text-2xl font-extrabold text-foreground mt-2">{students.length} Registered</p>
              <p className="text-[11px] text-green-600 font-semibold mt-1">Active Batch 2026</p>
            </div>

            <div className="glass-card p-5 rounded-3xl border border-border bg-card shadow-sm">
              <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-secondary" /> Daily Attendance Rate
              </span>
              <p className="text-2xl font-extrabold text-foreground mt-2">92.8%</p>
              <p className="text-[11px] text-muted-foreground mt-1">Village smart attendance device active</p>
            </div>

            <div className="glass-card p-5 rounded-3xl border border-border bg-card shadow-sm">
              <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                <Download className="h-4 w-4 text-amber-500" /> Offline Cached Packs
              </span>
              <p className="text-2xl font-extrabold text-foreground mt-2">182 Modules</p>
              <p className="text-[11px] text-muted-foreground mt-1">Synced to student tablets</p>
            </div>
          </div>

          {/* AI Exam Paper & Homework Generator */}
          <div className="glass-card rounded-3xl p-6 border border-border bg-card space-y-5 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">AI Bilingual Exam Paper & Test Generator</h3>
                <p className="text-xs text-muted-foreground">Instantly create chapter-wise test papers with answer keys aligned to NCERT curriculum.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <Input
                placeholder="Enter chapter or topic (e.g. Class 10 Light Refraction, 25 Marks test)..."
                value={hwTopic}
                onChange={(e) => setHwTopic(e.target.value)}
                className="sm:col-span-9 h-11 rounded-xl text-xs md:text-sm bg-muted/40"
              />
              <Button
                onClick={handleGeneratePaper}
                disabled={isGenerating || !hwTopic.trim()}
                className="sm:col-span-3 h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-sm gap-1.5"
              >
                <Sparkles className="h-4 w-4" />
                {isGenerating ? "Generating Test..." : "Generate Test Paper"}
              </Button>
            </div>

            {/* Generated Paper Layout */}
            {generatedPaper && (
              <div className="p-6 rounded-2xl bg-muted/30 border border-border/80 space-y-5 animate-in fade-in">
                {/* Paper Header Layout */}
                <div className="border-b border-border pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-center sm:text-left">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      Govt High School Assessment Test (PM eVidya)
                    </span>
                    <h4 className="text-base font-extrabold text-foreground">{generatedPaper.title}</h4>
                    <p className="text-xs text-muted-foreground">{generatedPaper.subject} • {generatedPaper.grade}</p>
                  </div>

                  <div className="text-left sm:text-right text-xs">
                    <p className="font-bold text-foreground">Max Marks: {generatedPaper.totalMarks}</p>
                    <p className="text-muted-foreground">Time: {generatedPaper.timeLimit}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => alert("Opening printable PDF print dialog for village classroom!")}
                      className="mt-2 rounded-xl text-xs gap-1.5 h-8"
                    >
                      <Printer className="h-3.5 w-3.5" /> Print / Save PDF
                    </Button>
                  </div>
                </div>

                {/* Question Sections */}
                <div className="space-y-4">
                  {generatedPaper.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-foreground bg-card p-2 rounded-xl border border-border/50">
                        <span>{sec.name}</span>
                        <span className="text-primary">{sec.marks}</span>
                      </div>
                      <div className="space-y-1.5 pl-2">
                        {sec.questions.map((q, qIdx) => (
                          <p key={qIdx} className="text-xs text-foreground font-medium bg-card/60 p-2.5 rounded-xl border border-border/40">
                            {q}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Student Roster Table */}
          <div className="glass-card rounded-3xl p-6 border border-border bg-card space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-foreground">Class 10-A Student Performance & Offline Sync</h3>
                <p className="text-xs text-muted-foreground">Real-time marks and offline sync status of village learners</p>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => alert("Exporting student marks roster to Excel (.xlsx)")}
                className="rounded-xl text-xs h-8 px-3 gap-1.5"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" /> Export Marksheet
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground font-semibold">
                    <th className="pb-3 font-bold">Roll No</th>
                    <th className="pb-3 font-bold">Student Name</th>
                    <th className="pb-3 font-bold">Attendance</th>
                    <th className="pb-3 font-bold">Avg STEM Score</th>
                    <th className="pb-3 font-bold">Offline Downloads</th>
                    <th className="pb-3 font-bold">Last Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {students.map((st) => (
                    <tr key={st.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 font-bold text-foreground">{st.rollNo}</td>
                      <td className="py-3 font-semibold text-foreground">{st.name}</td>
                      <td className="py-3 text-green-600 font-bold">{st.attendance}</td>
                      <td className="py-3 font-bold">
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {st.avgScore}%
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">{st.offlineDownloads} lessons cached</td>
                      <td className="py-3 text-muted-foreground">{st.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
