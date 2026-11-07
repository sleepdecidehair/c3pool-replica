import { create } from "zustand";

export type ThemeMode = "light" | "dark";

function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("c3.theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

interface UiState {
  theme: ThemeMode;
  address: string;
  language: string;
  currency: string;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setAddress: (address: string) => void;
  setLanguage: (language: string) => void;
  setCurrency: (currency: string) => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  theme: readStoredTheme(),
  address: "",
  language: "English",
  currency: "USDT",
  setTheme: (theme) => {
    window.localStorage.setItem("c3.theme", theme);
    set({ theme });
  },
  toggleTheme: () => {
    const next: ThemeMode = get().theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("c3.theme", next);
    set({ theme: next });
  },
  setAddress: (address) => set({ address }),
  setLanguage: (language) => set({ language }),
  setCurrency: (currency) => set({ currency }),
}));
