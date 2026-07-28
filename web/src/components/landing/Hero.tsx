"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  BookOpen, 
  BrainCircuit, 
  School,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const floatingCards = [
  { icon: GraduationCap, label: "Students Online", value: "24.5k+", color: "text-green-500", bg: "bg-green-500/10", delay: 0 },
  { icon: BookOpen, label: "Courses Available", value: "1,200+", color: "text-blue-500", bg: "bg-blue-500/10", delay: 0.2 },
  { icon: BrainCircuit, label: "AI Tutors Active", value: "5,000+", color: "text-purple-500", bg: "bg-purple-500/10", delay: 0.4 },
  { icon: School, label: "Schools Connected", value: "350+", color: "text-orange-500", bg: "bg-orange-500/10", delay: 0.6 },
];

export function Hero() {
  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-background flex items-center justify-center">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] rounded-full bg-accent/20 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content Area */}
        <div className="space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4 border border-primary/20">
              Project Viksit Bharat 2026
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Smart Learning</span> <br/>
              for Every Student
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
          >
            Transform rural education through personalized learning, AI tutors, offline classrooms, and multilingual digital content. Bridging the gap for a brighter future.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-lg hover:shadow-primary/25 transition-all">
              Start Learning <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full glass">
              Explore Courses
            </Button>
            <Button size="lg" variant="ghost" className="h-12 px-8 text-base rounded-full">
              Teacher Portal
            </Button>
          </motion.div>
        </div>

        {/* Right Animated Area */}
        <div className="relative h-[500px] w-full hidden md:block">
          {/* Main Abstract Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
             <div className="relative w-72 h-72 rounded-full border border-border/50 border-dashed animate-[spin_20s_linear_infinite] flex items-center justify-center">
                <div className="w-56 h-56 rounded-full border border-primary/20 border-dashed animate-[spin_15s_linear_infinite_reverse] flex items-center justify-center">
                   <div className="w-40 h-40 bg-gradient-to-tr from-primary to-secondary rounded-full blur-2xl opacity-40 animate-pulse"></div>
                </div>
             </div>
          </motion.div>

          {/* Floating Cards */}
          {floatingCards.map((card, index) => {
            const positions = [
              { top: "10%", left: "10%" },
              { top: "15%", right: "5%" },
              { bottom: "15%", left: "5%" },
              { bottom: "10%", right: "15%" },
            ];

            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + card.delay }}
                className="absolute z-20"
                style={positions[index]}
              >
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }}
                  className="glass-card p-4 rounded-2xl flex items-center gap-4 w-48"
                >
                  <div className={`p-3 rounded-xl ${card.bg}`}>
                    <card.icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{card.value}</p>
                    <p className="text-xs text-muted-foreground font-medium">{card.label}</p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
