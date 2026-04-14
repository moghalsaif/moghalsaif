"use client";

import { useState } from "react";

/* ── Brand SVG icons ──────────────────────────────────────── */

const ICONS: Record<string, React.ReactNode> = {
  all: (
    <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
      <rect x="1" y="1" width="6" height="6" rx="1.2" />
      <rect x="9" y="1" width="6" height="6" rx="1.2" />
      <rect x="1" y="9" width="6" height="6" rx="1.2" />
      <rect x="9" y="9" width="6" height="6" rx="1.2" />
    </svg>
  ),
  openai: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
      <path d="M22.28 9.82a5.98 5.98 0 00-.52-4.91 6.05 6.05 0 00-6.51-2.9A6.07 6.07 0 004.98 4.18a5.98 5.98 0 00-4 2.9 6.05 6.05 0 00.74 7.1 5.98 5.98 0 00.51 4.91 6.05 6.05 0 006.51 2.9A5.98 5.98 0 0013.26 24a6.05 6.05 0 005.77-4.21 5.99 5.99 0 004-2.9 6.06 6.06 0 00-.75-7.07zM13.26 22.4a4.48 4.48 0 01-2.88-1.04l.14-.08 4.78-2.76a.79.79 0 00.4-.68V11.5l2.02 1.17a.07.07 0 01.04.05v5.58a4.5 4.5 0 01-4.5 4.1zm-9.66-4.12a4.47 4.47 0 01-.53-3.01l.14.08 4.78 2.76a.77.77 0 00.78 0l5.84-3.37v2.33a.08.08 0 01-.03.06l-4.84 2.79a4.5 4.5 0 01-6.14-1.64zM2.34 7.9A4.48 4.48 0 014.7 5.92v5.67a.77.77 0 00.39.68l5.81 3.35-2.02 1.17a.08.08 0 01-.07 0L3.77 14.1A4.5 4.5 0 012.34 7.9zm16.6 3.86l-5.84-3.37 2.02-1.17a.08.08 0 01.07 0l4.83 2.79a4.49 4.49 0 01-.68 8.1v-5.67a.79.79 0 00-.4-.68zm2.01-3.02l-.14-.09-4.77-2.78a.78.78 0 00-.79 0L9.41 9.23V6.9a.07.07 0 01.03-.06l4.83-2.79a4.5 4.5 0 016.68 4.66zM8.31 12.86L6.29 11.7a.08.08 0 01-.04-.06V6.07a4.5 4.5 0 017.38-3.45l-.14.08-4.78 2.76a.79.79 0 00-.4.68zm1.1-2.37l2.6-1.5 2.6 1.5v2.99l-2.6 1.5-2.6-1.5z" />
    </svg>
  ),
  anthropic: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
      <path d="M13.83 2h-3.66L4 22h3.73l1.13-3.27h6.28L16.27 22H20L13.83 2zm-4.2 13.68L12 8.24l2.37 7.44H9.63z" />
    </svg>
  ),
  supabase: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
      <path d="M13.9 1.36c-.01-.98-1.26-1.4-1.87-.63L2.77 12.05c-.43.51-.07 1.28.6 1.28h7.47l-1.84 9.64c.01.98 1.26 1.4 1.87.63l9.26-11.65c.43-.51.07-1.28-.6-1.28h-7.47L13.9 1.36z" />
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
      <path d="M11.57 0C5.18 0 0 5.18 0 11.57c0 5.12 3.33 9.47 7.95 10.99l8.89-18.1A11.52 11.52 0 0011.57 0zM20.8 4.01l-8.87 18.07c.55.08 1.1.12 1.64.12 6.39 0 11.57-5.18 11.57-11.57 0-2.58-.84-4.96-2.34-6.62zM3.75 17.06L9.8 5.46A8.4 8.4 0 003.2 11.57c0 1.99.68 3.82 1.8 5.28l-1.25.21z" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width="13" height="13">
      <ellipse cx="12" cy="12" rx="9.5" ry="3.5" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  langchain: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
      <circle cx="7" cy="9" r="3" /><circle cx="17" cy="15" r="3" />
      <path d="M10 9h4M10 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  pinecone: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
      <path d="M12 2l-1.8 3.5-2.2.8.6 2.2-1.2 1.2.6 2.2L7 13v3h2v3h6v-3h2v-3l-1-1.1.6-2.2-1.2-1.2.6-2.2-2.2-.8L12 2z" />
    </svg>
  ),
  swiftui: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
      <path d="M19.5 4.2C15 1.5 8 3.2 5 7.8 2.5 11.3 3 15.8 6 18.5L7.5 17C5 14.8 4.5 11.3 6.5 9 9.5 5 15.5 4.5 18.5 6.5l1-2.3zM4.5 19.8C9 22.5 16 20.8 19 16.2c2.5-3.5 2-8-.5-11.2l-1.5 1.5c2.5 2.2 3 5.7 1 8-3 4-9 4.5-12 2.5L4.5 19.8z" />
    </svg>
  ),
  d3: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
      <path d="M3 6v12h7c3.9 0 7-2.7 7-6s-3.1-6-7-6H3zm2 2h5c2.8 0 5 1.8 5 4s-2.2 4-5 4H5V8z" />
    </svg>
  ),
  coreml: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="13" height="13">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <circle cx="4.5" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="19.5" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="4.5" cy="16.5" r="1.5" fill="currentColor" />
      <circle cx="19.5" cy="16.5" r="1.5" fill="currentColor" />
      <path d="M6 8.5l4.5 2.5M17.5 8.5l-4.5 2.5M6 15.5l4.5-2.5M17.5 15.5l-4.5-2.5" strokeLinecap="round" />
    </svg>
  ),
  crdt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="13" height="13">
      <path d="M21 12a9 9 0 01-9 9M3 12a9 9 0 019-9" strokeLinecap="round" />
      <path d="M16 12l-4-4-4 4M8 12l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  vercel: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
      <path d="M12 2L2 20h20L12 2z" />
    </svg>
  ),
  hugging: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-2.5 8a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm5 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm-5 5.5c.5 1.5 4.5 1.5 5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  ),
};

const TOOL_COLOR: Record<string, string> = {
  all:       "#6B6560",
  openai:    "#10A37F",
  anthropic: "#D97706",
  supabase:  "#3ECF8E",
  nextjs:    "#374151",
  react:     "#0ea5e9",
  langchain: "#7C3AED",
  pinecone:  "#00B4A2",
  swiftui:   "#F05138",
  d3:        "#F68D2E",
  coreml:    "#007AFF",
  crdt:      "#8B5CF6",
  vercel:    "#374151",
  hugging:   "#D97706",
};

const TOOLS = [
  { id: "all",       label: "All" },
  { id: "openai",    label: "OpenAI" },
  { id: "anthropic", label: "Anthropic" },
  { id: "supabase",  label: "Supabase" },
  { id: "nextjs",    label: "Next.js" },
  { id: "react",     label: "React" },
  { id: "langchain", label: "LangChain" },
  { id: "pinecone",  label: "Pinecone" },
  { id: "swiftui",   label: "SwiftUI" },
  { id: "d3",        label: "D3.js" },
  { id: "coreml",    label: "Core ML" },
  { id: "crdt",      label: "Yjs" },
  { id: "vercel",    label: "Vercel AI" },
  { id: "hugging",   label: "HuggingFace" },
];

const PROJECTS = [
  {
    id: 1,
    name: "Drift",
    year: "2024",
    tools: ["swiftui", "coreml", "openai"],
    color: "#4F46E5",
    tags: ["iOS", "SwiftUI", "AI"],
    description:
      "A calm productivity tool that adapts to your energy levels throughout the day. Uses passive signals — typing rhythm, app switching patterns — to model your energy state.\n\nWhen you're in flow, it fades into the background. When you're lagging, it gently suggests a break. Built with SwiftUI and CoreML. 2,400 MAU.",
    github: "https://github.com/moghalsaif",
    youtubeId: "",
  },
  {
    id: 2,
    name: "Mosaic",
    year: "2024",
    tools: ["pinecone", "nextjs", "openai"],
    color: "#78716C",
    tags: ["Web", "AI", "Vectors"],
    description:
      "Visual bookmarking and knowledge graph for curious minds. Everything you save gets embedded, clustered, and surfaced at the right moment.\n\nBuilt on Pinecone for vector search and Next.js. D3 force-directed graph. Auto-tagging pipeline that categorises saves without manual effort.",
    github: "https://github.com/moghalsaif",
    youtubeId: "",
  },
  {
    id: 3,
    name: "Volta",
    year: "2023",
    tools: ["react", "d3", "supabase"],
    color: "#D97706",
    tags: ["Dashboard", "D3", "React"],
    description:
      "Energy tracking dashboard with ambient data visualisations. Electricity usage rendered as weather — a sunny day means low consumption, a storm means you left the AC running.\n\nReact + D3 + real-time WebSocket feed from smart plugs.",
    github: "https://github.com/moghalsaif",
    youtubeId: "",
  },
  {
    id: 4,
    name: "Reframe",
    year: "2023",
    tools: ["swiftui", "coreml"],
    color: "#374151",
    tags: ["iOS", "Privacy", "AI"],
    description:
      "A journaling app that surfaces entries from exactly one week, one month, and one year ago. Your past self is your best therapist.\n\nAll processing on-device via Core ML. Privacy-first. No server ever sees your writing.",
    github: "https://github.com/moghalsaif",
    youtubeId: "",
  },
  {
    id: 5,
    name: "Canvas",
    year: "2023",
    tools: ["react", "crdt", "supabase"],
    color: "#0D9488",
    tags: ["SaaS", "CRDT", "Design"],
    description:
      "Collaborative whiteboard for distributed design teams. Structured content blocks snap to a grid.\n\nReal-time sync via CRDTs (Yjs). Shipped as SaaS, reached $4k MRR before being acquired.",
    github: "https://github.com/moghalsaif",
    youtubeId: "",
  },
  {
    id: 6,
    name: "Signal",
    year: "2022",
    tools: ["nextjs", "react"],
    color: "#2563EB",
    tags: ["Open Source", "RSS"],
    description:
      "Minimal RSS reader for people who still believe in the open web. Pure RSS, no recommendations, no engagement metrics.\n\nKeyboard-first navigation. Fully open source and self-hostable.",
    github: "https://github.com/moghalsaif",
    youtubeId: "",
  },
];

type Project = (typeof PROJECTS)[0];

/* ── macOS Finder folder icon ─────────────────────────────── */

function MacFolder({ color, pid }: { color: string; pid: number }) {
  const gid = `fg${pid}`;
  return (
    <svg viewBox="0 0 88 76" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="62">
      <defs>
        <linearGradient id={`${gid}s`} x1="44" y1="26" x2="44" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.09" />
        </linearGradient>
        <linearGradient id={`${gid}b`} x1="44" y1="10" x2="44" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color} stopOpacity="0.75" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
        <filter id={`${gid}d`} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor={color} floodOpacity="0.35" />
        </filter>
      </defs>
      <path
        d="M6 22 L6 67 C6 70.9 9.1 74 13 74 L75 74 C78.9 74 82 70.9 82 67 L82 28 C82 24.1 78.9 21 75 21 L42 21 L38 13 C37 10.8 34.8 9 32 9 L13 9 C9.1 9 6 12.1 6 16 Z"
        fill={`url(#${gid}b)`}
        filter={`url(#${gid}d)`}
      />
      <rect x="4" y="25" width="80" height="49" rx="7" fill={color} />
      <rect x="4" y="25" width="80" height="49" rx="7" fill={`url(#${gid}s)`} />
      <rect x="4" y="25" width="80" height="2.5" rx="1" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/* ── Project detail overlay ───────────────────────────────── */

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="absolute inset-0 z-10 grid grid-cols-1 lg:grid-cols-[44%_56%]"
      style={{ backgroundColor: "var(--site-bg)" }}
    >
      {/* Left */}
      <div
        className="flex flex-col py-8 px-6 sm:py-12 sm:px-12 overflow-y-auto"
        style={{ borderRight: "1px solid var(--site-border)" }}
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 mb-10 self-start transition-opacity hover:opacity-50"
          style={{
            color: "var(--site-muted)",
            fontFamily: "var(--font-inter)",
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Projects
        </button>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 self-start mb-10 transition-all"
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            border: "1px solid var(--site-border)",
            color: "var(--site-muted)",
            fontFamily: "var(--font-inter)",
            fontSize: "12px",
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--site-fg)";
            (e.currentTarget as HTMLElement).style.color = "var(--site-fg)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--site-border)";
            (e.currentTarget as HTMLElement).style.color = "var(--site-muted)";
          }}
        >
          <GithubIcon size={14} />
          View on GitHub
        </a>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: "10px",
                padding: "3px 10px",
                borderRadius: "99px",
                border: "1px solid var(--site-border)",
                color: "var(--site-muted)",
                fontFamily: "var(--font-inter)",
                letterSpacing: "0.07em",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <p
          style={{
            fontSize: "10px",
            color: "var(--site-muted)",
            fontFamily: "var(--font-inter)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "10px",
            opacity: 0.6,
          }}
        >
          {project.year}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--site-fg)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.08,
            fontSize: "clamp(2rem, 4vw, 3.6rem)",
            marginBottom: "24px",
          }}
        >
          {project.name}
        </h2>
        <p
          style={{
            fontSize: "14px",
            lineHeight: "1.95",
            color: "var(--site-muted)",
            fontFamily: "var(--font-inter)",
            fontWeight: 300,
            whiteSpace: "pre-line",
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Right — video */}
      <div
        className="flex items-center justify-center p-6 sm:p-10 lg:p-16"
        style={{ backgroundColor: "var(--site-card)" }}
      >
        {project.youtubeId ? (
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "16/9" }}>
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}`}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center gap-4 rounded-2xl w-full"
            style={{
              maxWidth: "560px",
              aspectRatio: "16/9",
              background: "var(--site-bg)",
              border: "1px dashed var(--site-border)",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--site-border)" strokeWidth="1.2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <p
              style={{
                fontSize: "11px",
                color: "var(--site-muted)",
                fontFamily: "var(--font-inter)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: 0.5,
              }}
            >
              Demo coming soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */

export default function ProjectsSection() {
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.tools.includes(active));

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "var(--site-bg)", minHeight: "100vh" }}
    >
      {selected ? (
        <ProjectDetail project={selected} onClose={() => setSelected(null)} />
      ) : (
        <div className="flex flex-col px-5 sm:px-10 py-10 sm:py-14" style={{ minHeight: "100vh" }}>

          {/* Header */}
          <div className="flex items-end justify-between mb-8 sm:mb-10">
            <h2
              className="text-5xl md:text-6xl font-normal italic"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--site-fg)",
                borderBottom: "2px solid var(--site-accent)",
                paddingBottom: "8px",
                display: "inline-block",
              }}
            >
              Projects
            </h2>
            <span style={{ fontSize: "12px", color: "var(--site-muted)", fontFamily: "var(--font-inter)" }}>
              {filtered.length} works
            </span>
          </div>

          {/* ── Filter row: "All" shortcut + scrolling marquee ── */}
          <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-12">

            {/* Persistent "All" chip — only visible when a filter is active */}
            <button
              onClick={() => setActive("all")}
              className="transition-all duration-200 flex items-center gap-1.5 flex-shrink-0"
              style={{
                padding: "5px 13px",
                borderRadius: "99px",
                fontSize: "11.5px",
                fontFamily: "var(--font-inter)",
                fontWeight: active !== "all" ? 600 : 400,
                border: active !== "all" ? "1px solid var(--site-accent)" : "1px solid var(--site-border)",
                background: active !== "all" ? "var(--site-fg)" : "var(--site-card)",
                color: active !== "all" ? "var(--site-bg)" : "var(--site-muted)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                opacity: active !== "all" ? 1 : 0.5,
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>{ICONS.all}</span>
              All
            </button>

            {/* Scrolling tool marquee */}
            <div
              className="relative flex-1"
              style={{
                borderRadius: "99px",
                border: "1px solid var(--site-border)",
                background: "var(--site-card)",
                padding: "4px",
                overflow: "hidden",
              }}
            >
              {/* Fade edges */}
              <div
                className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, var(--site-card), transparent)" }}
              />
              <div
                className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, var(--site-card), transparent)" }}
              />

              <div style={{ overflow: "hidden", width: "100%" }}>
                <div className="marquee-track">
                  {[...TOOLS.filter(t => t.id !== "all"), ...TOOLS.filter(t => t.id !== "all")].map((tool, i) => {
                    const isActive = active === tool.id;
                    const accent = TOOL_COLOR[tool.id] ?? "var(--site-muted)";
                    return (
                      <button
                        key={i}
                        onClick={() => setActive(tool.id)}
                        className="flex items-center gap-1.5 transition-all duration-200"
                        style={{
                          flexShrink: 0,
                          padding: "5px 13px",
                          borderRadius: "99px",
                          fontSize: "11.5px",
                          fontFamily: "var(--font-inter)",
                          letterSpacing: "0.02em",
                          marginRight: "4px",
                          cursor: "pointer",
                          fontWeight: isActive ? 600 : 400,
                          background: isActive ? `${accent}18` : "transparent",
                          color: isActive ? accent : "var(--site-muted)",
                          border: isActive ? `1px solid ${accent}50` : "1px solid transparent",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span style={{ color: isActive ? accent : "var(--site-muted)", display: "flex", alignItems: "center", opacity: isActive ? 1 : 0.6 }}>
                          {ICONS[tool.id]}
                        </span>
                        {tool.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── Folder grid ── */}
          {filtered.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p style={{ color: "var(--site-muted)", fontFamily: "var(--font-inter)", fontSize: "12px", letterSpacing: "0.1em", opacity: 0.5 }}>
                No projects for this tool yet.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer select-none transition-all duration-150 group"
                  style={{ background: "transparent" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--site-accent-soft)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <div className="transition-transform duration-150 group-hover:scale-105 group-hover:-translate-y-0.5">
                    <MacFolder color={p.color} pid={p.id} />
                  </div>
                  <span
                    style={{
                      fontSize: "11.5px",
                      fontFamily: "var(--font-inter)",
                      color: "var(--site-fg)",
                      fontWeight: 500,
                      maxWidth: "80px",
                      textAlign: "center",
                      lineHeight: 1.3,
                      opacity: 0.8,
                    }}
                  >
                    {p.name}
                  </span>
                </button>
              ))}
            </div>
          )}

        </div>
      )}
    </section>
  );
}
