"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  User, 
  Phone, 
  GraduationCap, 
  MapPin, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("Class 10");
  const [language, setLanguage] = useState("Hindi");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);

    setTimeout(() => {
      login({
        name: name || "Student",
        phone: phone,
        role: "student",
        grade: grade,
        language: language
      });
      router.push("/");
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-primary text-primary-foreground shadow-md mb-2">
              <BookOpen className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Register Free Student Account</h1>
            <p className="text-xs text-muted-foreground">
              Instant access to offline courses, AI tutors, and STEM virtual labs.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-8 border border-border shadow-xl space-y-4 bg-card/80">
            {isSuccess ? (
              <div className="text-center py-8 space-y-3 animate-in zoom-in-95">
                <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto" />
                <h3 className="text-lg font-bold text-foreground">Registration Successful!</h3>
                <p className="text-xs text-muted-foreground">Unlocking your personalized learning platform...</p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-primary" /> Full Name (विद्यार्थी का नाम)
                  </label>
                  <Input
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="rounded-xl h-10 text-sm bg-card"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-primary" /> Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <span className="flex items-center px-3 rounded-xl bg-muted text-xs font-bold text-muted-foreground border border-border">
                      +91
                    </span>
                    <Input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      maxLength={10}
                      className="rounded-xl h-10 text-sm bg-card"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                      <GraduationCap className="h-3.5 w-3.5 text-primary" /> Class / Grade
                    </label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full bg-card border border-border text-foreground text-xs rounded-xl h-10 px-3 font-medium outline-none"
                    >
                      <option value="Class 6">Class 6th</option>
                      <option value="Class 7">Class 7th</option>
                      <option value="Class 8">Class 8th</option>
                      <option value="Class 9">Class 9th</option>
                      <option value="Class 10">Class 10th</option>
                      <option value="Class 11">Class 11th</option>
                      <option value="Class 12">Class 12th</option>
                      <option value="Skill Hub">Vocational & AgTech</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" /> Medium
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-card border border-border text-foreground text-xs rounded-xl h-10 px-3 font-medium outline-none"
                    >
                      <option value="Hindi">हिन्दी (Hindi)</option>
                      <option value="English">English</option>
                      <option value="Marathi">मराठी (Marathi)</option>
                      <option value="Tamil">தமிழ் (Tamil)</option>
                      <option value="Telugu">తెలుగు (Telugu)</option>
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-sm gap-2 mt-2"
                >
                  Register & Unlock Platform <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}

            <div className="pt-2 border-t border-border/50 text-center text-xs text-muted-foreground">
              Already registered?{" "}
              <Link href="/login" className="text-primary font-bold hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
