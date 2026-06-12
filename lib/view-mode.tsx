"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ViewMode = "human" | "agent";

type ViewModeValue = {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  toggleMode: () => void;
};

const ViewModeCtx = createContext<ViewModeValue>({
  mode: "human",
  setMode: () => {},
  toggleMode: () => {},
});

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ViewMode>("human");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem("ms-view-mode");
        if (saved === "human" || saved === "agent") {
          setModeState(saved);
        }
      } catch {}
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-view-mode", mode);
    try {
      localStorage.setItem("ms-view-mode", mode);
    } catch {}
  }, [mode]);

  const setMode = useCallback((nextMode: ViewMode) => {
    setModeState(nextMode);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((current) => (current === "human" ? "agent" : "human"));
  }, []);

  const value = useMemo(() => ({ mode, setMode, toggleMode }), [mode, setMode, toggleMode]);

  return <ViewModeCtx.Provider value={value}>{children}</ViewModeCtx.Provider>;
}

export const useViewMode = () => useContext(ViewModeCtx);
