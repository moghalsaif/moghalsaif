"use client";

export default function ThemeFooter() {
  return (
    <footer
      className="w-full border-t py-5 px-8"
      style={{
        backgroundColor: "var(--site-bg)",
        borderColor: "var(--site-border)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <span
          className="text-xs tracking-widest uppercase"
          style={{
            color: "var(--site-muted)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Moghal Saif · 2026
        </span>

        <div className="flex items-center gap-5">
          {[
            { label: "X", href: "https://x.com/moghalsaifa" },
            { label: "Instagram", href: "https://instagram.com/moghalsaif" },
            { label: "LinkedIn", href: "https://linkedin.com/in/moghalsaifa" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-wide transition-colors"
              style={{
                color: "var(--site-muted)",
                fontFamily: "var(--font-inter)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--site-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--site-muted)")}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
