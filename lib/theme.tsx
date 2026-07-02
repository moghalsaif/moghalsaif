"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export type Theme = "default" | "blue" | "pink" | "yellow";

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
    "--site-bg": "#F4F2EC",
    "--site-fg": "#10100F",
    "--site-accent": "#10100F",
    "--site-accent-soft": "rgba(16,16,15,0.1)",
    "--site-muted": "#77736B",
    "--site-border": "#DED9CF",
    "--site-card": "#EDEAE2",
    "--site-canvas-bg": "#F4F2EC",
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
  const [theme, setThemeState] = useState<Theme>("default");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem("ms-theme") as Theme | null;
        if (saved && saved in THEME_VARS) {
          setThemeState(saved);
        }
      } catch {}
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try { localStorage.setItem("ms-theme", t); } catch {}
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, isDark: false }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
