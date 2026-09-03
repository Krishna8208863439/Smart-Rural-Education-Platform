"use client";

import { create } from "zustand";

export interface User {
  name: string;
  phone: string;
  role: "student" | "teacher" | "admin";
  grade?: string;
  language?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: (user: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("shiksha_user", JSON.stringify(user));
    }
    set({ user, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("shiksha_user");
    }
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  initialize: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("shiksha_user");
      if (stored) {
        try {
          const user = JSON.parse(stored);
          set({ user, isAuthenticated: true, isLoading: false });
          return;
        } catch (e) {
          console.error("Failed to parse stored auth user", e);
        }
      }
    }
    set({ user: null, isAuthenticated: false, isLoading: false });
  }
}));
