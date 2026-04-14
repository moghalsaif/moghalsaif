"use client";

import { useTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="absolute top-6 right-6 z-20">
      <button
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle dark mode"
        onClick={() => setTheme(isDark ? "default" : "dark")}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {/* Housing plate */}
        <div
          style={{
            width: 30,
            height: 54,
            borderRadius: 7,
            background: isDark
              ? "linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 100%)"
              : "linear-gradient(160deg, #e8e4dc 0%, #d0ccc4 100%)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.14)",
            boxShadow: isDark
              ? "0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)"
              : "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "7px 0",
            transition: "background 0.35s ease, border 0.35s ease, box-shadow 0.35s ease",
          }}
        >
          {/* Top pip */}
          <div
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.2)",
              transition: "background 0.3s",
            }}
          />

          {/* Channel groove */}
          <div
            style={{
              width: 12,
              height: 28,
              borderRadius: 6,
              background: isDark ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.1)",
              boxShadow: "inset 0 2px 5px rgba(0,0,0,0.4)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              transition: "background 0.35s ease",
            }}
          >
            {/* Bat */}
            <div
              style={{
                width: 8,
                height: 13,
                borderRadius: 3,
                background: isDark
                  ? "linear-gradient(160deg, #ffffff 0%, #cccccc 100%)"
                  : "linear-gradient(160deg, #333333 0%, #111111 100%)",
                boxShadow: isDark
                  ? "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.9)"
                  : "0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                transform: isDark ? "translateY(-6px)" : "translateY(6px)",
                transition: "transform 0.38s cubic-bezier(0.34, 1.52, 0.64, 1), background 0.35s ease, box-shadow 0.35s ease",
                flexShrink: 0,
              }}
            />
          </div>

          {/* Bottom pip */}
          <div
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.5)",
              transition: "background 0.3s",
            }}
          />
        </div>
      </button>
    </div>
  );
}
