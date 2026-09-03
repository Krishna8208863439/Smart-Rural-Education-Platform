"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BookOpen, 
  Bot, 
  FlaskConical, 
  Compass, 
  School,
  Sparkles,
  PlayCircle
} from "lucide-react";

export function Hero() {
  const { user, isAuthenticated, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="relative min-h-[85vh] overflow-hidden bg-background flex items-center justify-center">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] rounded-full bg-accent/20 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center justify-center text-center max-w-4xl py-12">
        
        {/* Main Content Area */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-xs mb-3 border border-primary/20">
              {isAuthenticated ? `Welcome Back, ${user?.name || "Student"}!` : "Project Viksit Bharat 2026"}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]">
              AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Smart Learning</span> <br/>
              for Every Student
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {isAuthenticated 
              ? "Your learning dashboard is active. Select any feature below to start interactive lessons, AI tutoring, or virtual labs."
              : "Transform rural education through personalized learning, AI tutors, offline classrooms, and multilingual digital content. Bridging the gap for a brighter future."
            }
          </motion.p>

          {/* Conditional Action Area */}
          {!isAuthenticated ? (
            /* Logged Out State: ONLY Login & Register buttons displayed */
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-4 justify-center pt-2"
            >
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-sm md:text-base rounded-full shadow-lg hover:shadow-primary/25 transition-all bg-primary text-primary-foreground font-semibold">
                  Register Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="h-12 px-8 text-sm md:text-base rounded-full glass font-semibold">
                  Sign In (Login)
                </Button>
              </Link>
            </motion.div>
          ) : (
            /* Logged In State: ALL Features displayed */
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-6 space-y-6"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <Link href="/courses">
                  <div className="p-4 rounded-2xl bg-card border border-border/80 hover:border-primary/50 hover:bg-primary/5 transition-all group cursor-pointer shadow-sm">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-sm text-foreground mt-3">Courses</h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">NCERT & State Board</p>
                  </div>
                </Link>

                <Link href="/tutor">
                  <div className="p-4 rounded-2xl bg-card border border-border/80 hover:border-secondary/50 hover:bg-secondary/5 transition-all group cursor-pointer shadow-sm">
                    <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary w-fit group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                      <Bot className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-sm text-foreground mt-3">GuruAI Tutor</h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Voice doubt solver</p>
                  </div>
                </Link>

                <Link href="/labs">
                  <div className="p-4 rounded-2xl bg-card border border-border/80 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group cursor-pointer shadow-sm">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 w-fit group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <FlaskConical className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-sm text-foreground mt-3">Virtual Labs</h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Physics & Chemistry</p>
                  </div>
                </Link>

                <Link href="/careers">
                  <div className="p-4 rounded-2xl bg-card border border-border/80 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group cursor-pointer shadow-sm">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 w-fit group-hover:bg-purple-500 group-hover:text-white transition-colors">
                      <Compass className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-sm text-foreground mt-3">Career Hub</h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">AgTech & Defense</p>
                  </div>
                </Link>
              </div>

              <div className="flex justify-center gap-3">
                <Link href="/courses">
                  <Button className="rounded-full px-6 h-11 bg-primary text-primary-foreground font-semibold text-xs gap-1.5">
                    <PlayCircle className="h-4 w-4" /> Go to All Courses
                  </Button>
                </Link>
                <Link href="/teacher">
                  <Button variant="outline" className="rounded-full px-6 h-11 text-xs font-semibold">
                    Teacher Dashboard
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
