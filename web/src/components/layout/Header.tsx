import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export function Header() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "AI Tutor", href: "/tutor" },
    { name: "Virtual Labs", href: "/labs" },
    { name: "Career Hub", href: "/careers" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <div className="bg-primary p-1.5 rounded-lg">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden md:block">ShikshaSetu AI</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium ml-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="transition-colors hover:text-primary text-foreground/80 hidden lg:block"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
            Login
          </Link>
          <Button size="sm" className="rounded-full px-6 shadow-sm">
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}
