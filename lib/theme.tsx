"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export type Theme = "default" | "dark" | "blue" | "pink" | "yellow";

interface ThemeValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  isDark: boolean;
}

const ThemeCtx = createContext<ThemeValue>({
  theme: "default",
  setTheme: () => {},
  isDark: false,
});

const THEME_VARS: Record<Theme, Record<string, string>> = {
  default: {
    "--site-bg": "#FAF8F4",
    "--site-fg": "#1A1814",
    "--site-accent": "#1A1814",
    "--site-accent-soft": "rgba(26,24,20,0.12)",
    "--site-muted": "#9C9590",
    "--site-border": "#DDD8CE",
    "--site-card": "#F4F1EB",
    "--site-canvas-bg": "#FAF8F4",
  },
  dark: {
    "--site-bg": "#0c0c0c",
    "--site-fg": "#F0EDE6",
    "--site-accent": "#F0EDE6",
    "--site-accent-soft": "rgba(240,237,230,0.1)",
    "--site-muted": "#666057",
    "--site-border": "#2a2a2a",
    "--site-card": "#161616",
    "--site-canvas-bg": "#0c0c0c",
  },
  blue: {
    "--site-bg": "#FAF8F4",
    "--site-fg": "#1A1814",
    "--site-accent": "#2563EB",
    "--site-accent-soft": "rgba(37,99,235,0.1)",
    "--site-muted": "#9C9590",
    "--site-border": "#DDD8CE",
    "--site-card": "#F4F1EB",
    "--site-canvas-bg": "#FAF8F4",
  },
  pink: {
    "--site-bg": "#FAF8F4",
    "--site-fg": "#1A1814",
    "--site-accent": "#DB2777",
    "--site-accent-soft": "rgba(219,39,119,0.1)",
    "--site-muted": "#9C9590",
    "--site-border": "#DDD8CE",
    "--site-card": "#F4F1EB",
    "--site-canvas-bg": "#FAF8F4",
  },
  yellow: {
    "--site-bg": "#FAF8F4",
    "--site-fg": "#1A1814",
    "--site-accent": "#D97706",
    "--site-accent-soft": "rgba(217,119,6,0.1)",
    "--site-muted": "#9C9590",
    "--site-border": "#DDD8CE",
    "--site-card": "#F4F1EB",
    "--site-canvas-bg": "#FAF8F4",
  },
};

function applyTheme(t: Theme) {
  const vars = THEME_VARS[t];
  const root = document.documentElement;
  for (const [k, v] of Object.entries(vars)) {
    root.style.setProperty(k, v);
  }
  root.setAttribute("data-theme", t);
  // Also update the <body> background immediately
  document.body.style.backgroundColor = vars["--site-bg"];
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "default";
    }

    try {
      const saved = localStorage.getItem("ms-theme") as Theme | null;
      return saved && saved in THEME_VARS ? saved : "default";
    } catch {
      return "default";
    }
  });

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try { localStorage.setItem("ms-theme", t); } catch {}
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
