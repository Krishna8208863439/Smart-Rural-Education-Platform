import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/landing/Hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <Header />
      <main className="flex-grow">
        <Hero />
      </main>
    </div>
  );
}
