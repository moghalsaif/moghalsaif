"use client";

import { useEffect, useRef } from "react";
import { haptics } from "@/lib/haptics";

const SPRING          = 0.07;
const DAMPING         = 0.80;
const RIPPLE_RADIUS   = 90;
const RIPPLE_STRENGTH = 28;
const SAMPLE_STEP     = 3;
const BRIGHT_CUTOFF   = 0.68;

type Dot = {
  homeX: number; homeY: number;
  x: number;     y: number;
  vx: number;    vy: number;
  r: number;     alpha: number;
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastHapticRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let disposed = false;
    let dots: Dot[] = [];
    let mouse = { x: -9999, y: -9999 };

    const setup = async () => {
      const dpr  = window.devicePixelRatio || 1;
      const cssW = canvas.offsetWidth;
      const cssH = canvas.offsetHeight;
      if (!cssW || !cssH) return;

      canvas.width  = cssW * dpr;
      canvas.height = cssH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const img = new Image();
      img.src = "/me-sketch.png";
      await new Promise<void>((res) => {
        img.onload  = () => res();
        img.onerror = () => res();
      });
      if (disposed) return;

      /* Fit image — constrain by height so portrait image doesn't overflow */
      const aspect = img.naturalWidth / img.naturalHeight;
      let drawH = cssH * 0.96;
      let drawW = drawH * aspect;
      if (drawW > cssW * 0.88) { drawW = cssW * 0.88; drawH = drawW / aspect; }
      const drawX = (cssW - drawW) / 2;
      const drawY = (cssH - drawH) / 2;

      const sampW = Math.ceil(drawW / SAMPLE_STEP);
      const sampH = Math.ceil(drawH / SAMPLE_STEP);
      const off    = document.createElement("canvas");
      off.width    = sampW;
      off.height   = sampH;
      const offCtx = off.getContext("2d")!;
      offCtx.drawImage(img, 0, 0, sampW, sampH);
      const raw = offCtx.getImageData(0, 0, sampW, sampH).data;

      const next: Dot[] = [];
      for (let row = 0; row < sampH; row++) {
        for (let col = 0; col < sampW; col++) {
          const i  = (row * sampW + col) * 4;
          const a  = raw[i + 3] / 255;
          if (a < 0.12) continue;
          const r = raw[i] / 255;
          const g = raw[i + 1] / 255;
          const b = raw[i + 2] / 255;
          const lum = r * 0.299 + g * 0.587 + b * 0.114;
          const eff = lum * a + (1 - a);
          if (eff > BRIGHT_CUTOFF) continue;
          const darkness = 1 - eff;
          const hx = drawX + col * SAMPLE_STEP + SAMPLE_STEP / 2;
          const hy = drawY + row * SAMPLE_STEP + SAMPLE_STEP / 2;
          next.push({
            homeX: hx, homeY: hy,
            x: hx, y: hy,
            vx: 0, vy: 0,
            r:     0.7 + darkness * 1.6,
            alpha: 0.45 + darkness * 0.55,
          });
        }
      }
      if (!disposed) dots = next;
    };

    const draw = () => {
      const cssW = canvas.offsetWidth;
      const cssH = canvas.offsetHeight;
      if (!cssW || !cssH) { rafId = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = "#FAF8F4";
      ctx.fillRect(0, 0, cssW, cssH);
      ctx.fillStyle = "#1A1814";

      for (const d of dots) {
        let nvx = (d.vx + (d.homeX - d.x) * SPRING) * DAMPING;
        let nvy = (d.vy + (d.homeY - d.y) * SPRING) * DAMPING;
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < RIPPLE_RADIUS * RIPPLE_RADIUS && d2 > 0) {
          const dist  = Math.sqrt(d2);
          const force = ((RIPPLE_RADIUS - dist) / RIPPLE_RADIUS) * RIPPLE_STRENGTH;
          nvx += (dx / dist) * force;
          nvy += (dy / dist) * force;
        }
        d.vx = nvx; d.x += nvx;
        d.vy = nvy; d.y += nvy;
        ctx.globalAlpha = d.alpha;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };

    setup().then(() => {
      if (!disposed) { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(draw); }
    });

    const onMove   = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave  = () => { mouse = { x: -9999, y: -9999 }; };
    const onTouchMove = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouse = { x: t.clientX - r.left, y: t.clientY - r.top };
      // Throttle haptic to once every 250 ms so it doesn't spam
      const now = Date.now();
      if (now - lastHapticRef.current > 250) {
        lastHapticRef.current = now;
        haptics.light();
      }
    };
    const onTouchEnd = () => { mouse = { x: -9999, y: -9999 }; };
    const onResize = () => {
      setup().then(() => {
        if (!disposed) { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(draw); }
      });
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      className="relative h-screen w-full overflow-hidden flex flex-col"
      style={{ backgroundColor: "#FAF8F4" }}
    >
      {/* Nav pill — floats above everything */}
      <nav
        className="absolute top-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-px rounded-full border px-1 py-1 shadow-sm backdrop-blur-sm"
        style={{ background: "#FAF8F4", borderColor: "#DDD8CE" }}
      >
        {["Project", "Story", "Writings"].map((label) => (
          <button
            key={label}
            onClick={(e) => { haptics.medium(e.currentTarget); scrollTo("sphere-nav"); }}
            className="rounded-full px-3 sm:px-5 py-1.5 text-xs font-medium tracking-wide transition-all duration-200"
            style={{ color: "#9C9590", fontFamily: "var(--font-inter)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1A1814";
              e.currentTarget.style.color      = "#FAF8F4";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color      = "#9C9590";
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* ── Name block — sits below nav, clearly separated ── */}
      <div
        className="flex-shrink-0 flex flex-col items-center z-10 select-none pointer-events-none"
        style={{ paddingTop: "calc(24px + 36px + 28px)" /* nav top + nav height + gap */ }}
      >
        <span
          style={{
            fontFamily: "var(--font-bebas), 'Impact', sans-serif",
            fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
            fontWeight: 400,
            lineHeight: 0.88,
            color: "#1A1814",
            letterSpacing: "0.02em",
          }}
        >
          Moghal
        </span>
        <span
          style={{
            fontFamily: "var(--font-bebas), 'Impact', sans-serif",
            fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
            fontWeight: 400,
            lineHeight: 0.88,
            color: "#1A1814",
            letterSpacing: "0.02em",
          }}
        >
          Saif
        </span>
      </div>

      {/* ── Canvas — fills remaining space below the name ── */}
      <div className="flex-1 min-h-0 w-full relative">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair"
        />
      </div>
    </section>
  );
}
