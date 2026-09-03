import Link from "next/link";
import { BookOpen, WifiOff, Globe, Sparkles, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/40 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-xl text-primary-foreground">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">ShikshaSetu AI</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Empowering rural students across India with AI-powered, multilingual, offline-first digital classrooms and interactive STEM virtual labs.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full w-fit border border-primary/20">
              <WifiOff className="h-3.5 w-3.5" />
              <span>100% Offline Mesh & Low-Bandwidth Optimized</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Learning Portals</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  Class 6-12 Courses
                </Link>
              </li>
              <li>
                <Link href="/tutor" className="hover:text-primary transition-colors">
                  GuruAI Multilingual Tutor
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-primary transition-colors">
                  PrayogShala Virtual Labs
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition-colors">
                  Rural Career Hub
                </Link>
              </li>
              <li>
                <Link href="/teacher" className="hover:text-primary transition-colors">
                  Teacher & School Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Languages & Access */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Languages Supported</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-primary" /> हिन्दी (Hindi)</li>
              <li className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-primary" /> मराठी (Marathi)</li>
              <li className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-primary" /> தமிழ் (Tamil)</li>
              <li className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-primary" /> తెలుగు (Telugu)</li>
              <li className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-primary" /> English (Regional)</li>
            </ul>
          </div>

          {/* Initiatives */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Government & Trust</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-secondary" /> NEP 2020 Aligned
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-secondary" /> DIKSHA & PM eVidya
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-secondary" /> Viksit Bharat 2047
              </li>
              <li>
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Sign In to Dashboard →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© 2026 ShikshaSetu AI Platform. Bridging the Rural Digital Divide.</p>
          <div className="flex items-center gap-6">
            <span>Server: Local Turbopack</span>
            <span>Latency: 2ms (Offline Cached)</span>
            <span className="text-green-600 font-medium flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-ping inline-block"></span> System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
