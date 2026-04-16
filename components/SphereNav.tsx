"use client";

import { createRef, useMemo, useState, useCallback, useEffect } from "react";
import { haptics } from "@/lib/haptics";
import AmoebaSphere from "./AmoebaSphere";
import ProjectsSection from "./ProjectsSection";
import StorySection from "./StorySection";
import WritingsSection from "./WritingsSection";

const SECTIONS = [
  { id: "projects", label: "Projects", timeOffset: 0 },
  { id: "story", label: "Story", timeOffset: 2.8 },
  { id: "writings", label: "Writings", timeOffset: 5.5 },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

const BG: Record<SectionId, string> = {
  projects: "#FAF8F4",
  story: "#FAF8F4",
  writings: "#FAF8F4",
};

export default function SphereNav() {
  const [open, setOpen] = useState<SectionId | null>(null);
  const [sphereSize, setSphereSize] = useState(168);
  // Global mouse position in viewport coords (for cursor attraction)
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const update = () => setSphereSize(window.innerWidth < 640 ? 108 : 168);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // One ref per sphere button so we can compute relative positions
  const sphereRefs = useMemo(
    () => SECTIONS.map(() => createRef<HTMLButtonElement>()),
    []
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY });
  }, []);
  const handleMouseLeave = useCallback(() => {
    setMouse({ x: -9999, y: -9999 });
  }, []);

  const handleOpen = (id: SectionId) => setOpen(id);
  const handleClose = () => setOpen(null);

  return (
    <>
      {/* Sphere navigation */}
      <section
        id="sphere-nav"
        className="w-full py-16 sm:py-24 px-6 flex flex-col items-center gap-6"
        style={{ backgroundColor: "var(--site-bg)" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <p
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-inter)", color: "var(--site-muted)" }}
        >
          Tap a section to explore
        </p>

        <div className="flex items-center justify-center gap-4 sm:gap-12 md:gap-20">
          {SECTIONS.map(({ id, label, timeOffset }, i) => (
            <AmoebaSphere
              key={id}
              label={label}
              onClick={() => handleOpen(id)}
              active={open === id}
              timeOffset={timeOffset}
              size={sphereSize}
              sectionMouseX={mouse.x}
              sectionMouseY={mouse.y}
              sphereRef={sphereRefs[i]}
            />
          ))}
        </div>
      </section>

      {/* Full-screen overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[200] overflow-y-auto animate-in fade-in duration-300"
          style={{ backgroundColor: BG[open] }}
        >
          {/* Close button */}
          <button
            onClick={(e) => { haptics.medium(e.currentTarget); handleClose(); }}
            className="fixed top-6 right-6 z-[201] w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200"
            style={{
              borderColor: "var(--site-accent)",
              color: "var(--site-accent)",
              background: "transparent",
            }}
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {open === "projects" && <ProjectsSection />}
          {open === "story" && <StorySection />}
          {open === "writings" && <WritingsSection />}
        </div>
      )}
    </>
  );
}
