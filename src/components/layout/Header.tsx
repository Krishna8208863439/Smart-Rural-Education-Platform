"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Menu, 
  X, 
  LogOut, 
  User as UserIcon, 
  Sparkles,
  GraduationCap
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, initialize } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "AI Tutor", href: "/tutor" },
    { name: "Virtual Labs", href: "/labs" },
    { name: "Career Hub", href: "/careers" },
    { name: "Teacher Portal", href: "/teacher" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 mr-4">
          <div className="bg-primary p-1.5 rounded-lg text-primary-foreground shadow-sm">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg md:text-xl tracking-tight leading-none">ShikshaSetu AI</span>
            <span className="text-[10px] text-muted-foreground font-medium hidden sm:inline-block">Smart Rural Education</span>
          </div>
        </Link>

        {/* Desktop Nav - ONLY DISPLAYED IF AUTHENTICATED */}
        {isAuthenticated ? (
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full transition-all text-xs font-semibold ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/75 hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        ) : null}

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                <UserIcon className="h-3.5 w-3.5" />
                <span>{user?.name || "Student"}</span>
                {user?.grade && (
                  <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.2 rounded-full font-bold">
                    {user.grade}
                  </span>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="rounded-full text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5 h-9 px-3"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="rounded-full px-4 text-xs font-semibold text-foreground/80 hover:text-primary">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="rounded-full px-5 shadow-sm text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Trigger (Only if authenticated) */}
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden ml-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Drawer (Only if authenticated) */}
      {isAuthenticated && mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-background px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="pb-2 mb-2 border-b border-border/50 flex items-center justify-between text-xs">
            <span className="font-semibold text-foreground">Logged in as: {user?.name || "Student"}</span>
            <span className="text-primary font-bold">{user?.role?.toUpperCase()}</span>
          </div>

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-primary/10 text-primary font-bold" : "text-foreground/80 hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-border/50">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
