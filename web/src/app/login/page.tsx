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
  Phone, 
  Lock, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");
  const [phone, setPhone] = useState("9876543210");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setOtp("2026"); // Mock auto-filled OTP for convenience
    }, 500);
  };

  const handleVerifyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login({
        name: role === "teacher" ? "Shri Sharma (Teacher)" : role === "admin" ? "Principal Verma (Admin)" : "Aarav Kumar",
        phone: phone,
        role: role,
        grade: role === "student" ? "Class 10" : undefined,
        language: "Hindi / English"
      });

      setIsLoading(false);
      router.push("/");
    }, 600);
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
            <h1 className="text-2xl font-bold text-foreground">Sign In to ShikshaSetu</h1>
            <p className="text-xs text-muted-foreground">
              Login to unlock courses, AI multilingual tutors, virtual labs & career pathways.
            </p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-muted/60 border border-border text-xs font-semibold">
            <button
              onClick={() => setRole("student")}
              className={`py-2 rounded-xl transition-all ${
                role === "student"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              🎓 Student
            </button>
            <button
              onClick={() => setRole("teacher")}
              className={`py-2 rounded-xl transition-all ${
                role === "teacher"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              👩‍🏫 Teacher
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`py-2 rounded-xl transition-all ${
                role === "admin"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              🏛️ School Admin
            </button>
          </div>

          {/* Form Card */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-border shadow-xl space-y-5 bg-card/80">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-primary" /> Mobile Number (मोबाइल नंबर)
                  </label>
                  <div className="flex gap-2">
                    <span className="flex items-center px-3 rounded-xl bg-muted text-xs font-bold text-muted-foreground border border-border">
                      +91
                    </span>
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      maxLength={10}
                      className="rounded-xl h-11 text-sm bg-card"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Free OTP delivery for all rural telecom networks.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !phone}
                  className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-sm gap-2"
                >
                  {isLoading ? "Sending OTP..." : "Get Login OTP"} <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyLogin} className="space-y-4">
                <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-700 text-xs flex items-center justify-between">
                  <span>OTP sent to +91 {phone}</span>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="font-bold underline"
                  >
                    Change
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                    <Lock className="h-3.5 w-3.5 text-primary" /> 4-Digit OTP Code
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    className="rounded-xl h-11 text-center font-bold tracking-widest text-lg bg-card"
                  />
                  <p className="text-[11px] text-muted-foreground text-center">
                    (Test OTP: <strong>2026</strong> auto-filled)
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !otp}
                  className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-sm gap-2"
                >
                  {isLoading ? "Signing In..." : "Verify OTP & Enter Platform"} <CheckCircle2 className="h-4 w-4" />
                </Button>
              </form>
            )}

            <div className="pt-2 border-t border-border/50 text-center text-xs text-muted-foreground">
              New student or teacher?{" "}
              <Link href="/register" className="text-primary font-bold hover:underline">
                Create Free Account
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Govt NEP 2020 & DIKSHA Compatible</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
