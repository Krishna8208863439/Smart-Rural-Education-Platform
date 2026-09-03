"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="text-xs text-muted-foreground font-medium">Checking authentication status...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-4">
        <div className="glass-card max-w-md w-full p-8 rounded-3xl border border-border text-center space-y-5 shadow-xl bg-card">
          <div className="h-14 w-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto border border-amber-500/20">
            <Lock className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Sign In Required</h2>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              This learning feature is protected. Please sign in or create a free account with your mobile number to continue.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 pt-2">
            <Link href="/login">
              <Button className="w-full rounded-xl bg-primary text-primary-foreground font-semibold h-11 gap-2 shadow-sm">
                Sign In to Unlock <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="w-full rounded-xl font-medium h-11">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
