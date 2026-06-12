"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { haptics } from "@/lib/haptics";
import { useTheme } from "@/lib/theme";

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

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastHapticRef = useRef<number>(0);
  const { isDark } = useTheme();

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
      const styles = getComputedStyle(document.documentElement);
      ctx.fillStyle = styles.getPropertyValue("--site-canvas-bg").trim() || "#050505";
      ctx.fillRect(0, 0, cssW, cssH);
      ctx.fillStyle = styles.getPropertyValue("--site-fg").trim() || "#F6F6F1";

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
      style={{ backgroundColor: "var(--site-canvas-bg)" }}
    >
      {/* ── Name block — sits below nav, clearly separated ── */}
      <div
        className="flex-shrink-0 flex flex-col items-center z-10 select-none pointer-events-none"
        style={{ paddingTop: "clamp(3rem, 8vh, 5.5rem)" }}
      >
        <span
          style={{
            fontFamily: "var(--font-bebas), 'Impact', sans-serif",
            fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
            fontWeight: 400,
            lineHeight: 0.88,
            color: "var(--site-fg)",
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
            color: "var(--site-fg)",
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
        <AnimatePresence>
          {isDark && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute right-[7vw] top-[34%] max-w-[15rem] rounded-[1.35rem] rounded-bl-md bg-white px-4 py-3 text-sm leading-6 text-black shadow-2xl shadow-black/35 sm:right-[15vw] sm:top-[30%]"
            >
              I know I look much better in light mode, but anyways it&apos;s okay.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
