"use client";

import Image from "next/image";
import { useState } from "react";

const STORY = `Dear reader,

I've always been someone who builds things. Not because I had a plan, but because I couldn't help it. From modding games as a teenager to shipping apps at 3am — the urge to make something out of nothing has been the one constant in my life.

I grew up in a household where ambition was quiet. My parents worked hard, said little, and let their actions speak. I think I inherited that. I don't talk much about what I'm building until it's ready. And even then, I'm already thinking about what's next.

Design came to me by accident. I was trying to make something look better, and I couldn't stop. I realized that the way something feels to a person — the friction, the flow, the moment it just clicks — that's the most interesting design problem there is.

I've worked on things that shipped to millions and things that only five people ever used. Both mattered. Both taught me something I couldn't have learned any other way.

Right now, I'm interested in the intersection of how we think and how we build. The tools we use shape the thoughts we can have. I want to build tools that expand what's possible — for myself and for anyone who picks them up.

If any of this sounds like you, I'd love to talk.

— Saif`;

const clusterImages = [
  { rotate: "-10deg", translateX: "-60px", translateY: "15px",  scale: 0.85, z: 0 },
  { rotate: "6deg",   translateX: "50px",  translateY: "-20px", scale: 0.92, z: 2 },
  { rotate: "-3deg",  translateX: "0px",   translateY: "0px",   scale: 1,    z: 4 },
  { rotate: "14deg",  translateX: "70px",  translateY: "30px",  scale: 0.88, z: 1 },
  { rotate: "-18deg", translateX: "-80px", translateY: "40px",  scale: 0.80, z: 3 },
];

const photoCards = [
  {
    src: "/me.png",
    caption: "The quiet before shipping — where most ideas actually form.",
  },
  {
    src: "/me.png",
    caption: "Building at 3am. The city asleep, the cursor blinking.",
  },
  {
    src: "/me.png",
    caption: "Every product starts here — a blank page and too much coffee.",
  },
  {
    src: "/me.png",
    caption: "Between versions. Between ideas. Somewhere worth staying.",
  },
  {
    src: "/me.png",
    caption: "The desk where things become real.",
  },
];

export default function StorySection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="min-h-screen w-full bg-[#FAF8F4] flex items-start">
      <div
        className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2"
        style={{ backgroundColor: "var(--site-bg)" }}
      >
        {/* ── Left panel ── */}
        <div
          className="relative flex flex-col py-10 px-6 sm:py-16 sm:px-12 min-h-[50vh] lg:min-h-screen overflow-hidden"
          style={{ backgroundColor: "var(--site-card)" }}
        >
          {/* Section label — always visible */}
          <div className="mb-10 flex-shrink-0">
            <h2
              className="text-4xl md:text-5xl font-normal italic"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--site-fg)",
                borderBottom: "2px solid var(--site-accent)",
                paddingBottom: "6px",
                display: "inline-block",
              }}
            >
              Story
            </h2>
            <p
              className="text-xs tracking-widest text-[#9C9590] uppercase mt-1"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              a letter
            </p>
          </div>

          {/* ── Cluster view ── */}
          <div
            className="flex-1 flex flex-col items-center justify-center"
            style={{
              opacity: expanded ? 0 : 1,
              transform: expanded ? "scale(0.94)" : "scale(1)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              pointerEvents: expanded ? "none" : "auto",
              position: expanded ? "absolute" : "relative",
              inset: expanded ? "0" : "auto",
            }}
          >
            {/* Click hint */}
            {!expanded && (
              <p
                className="text-[10px] tracking-[0.2em] uppercase mb-6"
                style={{ color: "var(--site-muted)", fontFamily: "var(--font-inter)" }}
              >
                Click to explore
              </p>
            )}

            <div
              className="relative w-72 h-80 cursor-pointer"
              onClick={() => setExpanded(true)}
            >
              {clusterImages.map((style, i) => (
                <div
                  key={i}
                  className="absolute w-52 h-64 rounded-2xl overflow-hidden border-2 border-white shadow-lg transition-transform duration-300 hover:scale-105"
                  style={{
                    transform: `rotate(${style.rotate}) translate(${style.translateX}, ${style.translateY}) scale(${style.scale})`,
                    zIndex: style.z,
                    left: "50%",
                    top: "50%",
                    marginLeft: "-104px",
                    marginTop: "-128px",
                  }}
                >
                  <Image
                    src="/me.png"
                    alt="Moghal Saif"
                    fill
                    className="object-cover grayscale"
                    sizes="208px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Gallery card view ── */}
          <div
            className="flex-1 flex flex-col overflow-hidden"
            style={{
              opacity: expanded ? 1 : 0,
              transform: expanded ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s",
              pointerEvents: expanded ? "auto" : "none",
              position: expanded ? "relative" : "absolute",
              inset: expanded ? "auto" : "0",
            }}
          >
            {/* Back button */}
            <button
              onClick={() => setExpanded(false)}
              className="flex items-center gap-2 mb-6 self-start text-[11px] tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
              style={{ color: "var(--site-muted)", fontFamily: "var(--font-inter)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>

            {/* Scrollable card grid */}
            <div className="overflow-y-auto flex-1 pr-1" style={{ scrollbarWidth: "none" }}>
              <div className="grid grid-cols-2 gap-4">
                {photoCards.map((card, i) => (
                  <div
                    key={i}
                    className="flex flex-col rounded-xl overflow-hidden"
                    style={{ border: "1px solid var(--site-border)" }}
                  >
                    {/* Image */}
                    <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                      <Image
                        src={card.src}
                        alt={card.caption}
                        fill
                        className="object-cover grayscale"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    {/* Caption */}
                    <div
                      className="px-3 py-3"
                      style={{ backgroundColor: "var(--site-bg)" }}
                    >
                      <p
                        className="text-[11px] leading-relaxed"
                        style={{
                          color: "var(--site-muted)",
                          fontFamily: "var(--font-inter)",
                          fontWeight: 300,
                        }}
                      >
                        {card.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right panel — letter ── */}
        <div className="flex flex-col justify-center py-10 px-6 sm:py-16 sm:px-10 md:px-16 lg:px-20 overflow-y-auto">
          <div className="max-w-xl">
            <div
              className="text-[#3A3530] text-sm md:text-base leading-9 whitespace-pre-line"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              {STORY}
            </div>

            <div className="mt-12 pt-8 border-t border-[#E0DBD0] flex items-center gap-6">
              {[
                { label: "X",         href: "https://x.com/moghalsaifa" },
                { label: "Instagram", href: "https://instagram.com/moghalsaif" },
                { label: "LinkedIn",  href: "https://linkedin.com/in/moghalsaifa" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#9C9590] hover:text-[#1A1814] transition-colors tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
