"use client";

import { useEffect, useRef } from "react";

const NUM_POINTS = 16;

function blobPath(
  cx: number,
  cy: number,
  baseRadius: number,
  t: number,
  // Mouse position relative to THIS sphere's center (CSS px)
  mouseDx: number,
  mouseDy: number
): string {
  const cursorDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
  const influence = Math.max(0, 1 - cursorDist / (baseRadius * 4));

  const pts: [number, number][] = [];

  for (let i = 0; i < NUM_POINTS; i++) {
    const angle = (i / NUM_POINTS) * Math.PI * 2;

    // Organic idle morphing — three layered sine waves
    const idle =
      Math.sin(t * 0.9 + i * 0.75) * 0.13 +
      Math.cos(t * 1.6 + i * 1.35) * 0.08 +
      Math.sin(t * 2.8 + i * 2.2) * 0.04;

    // Cursor attraction — points facing the cursor extend toward it
    let cursorPull = 0;
    if (influence > 0 && cursorDist > 0) {
      const dotProduct =
        (Math.cos(angle) * mouseDx + Math.sin(angle) * mouseDy) / cursorDist;
      cursorPull = Math.max(0, dotProduct) * influence * 0.55;
    }

    const r = baseRadius * (1 + idle + cursorPull);
    pts.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
  }

  // Catmull-Rom → cubic bezier for smooth closed blob
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`;

  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];

    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
  }

  return d + " Z";
}

interface Props {
  label: string;
  onClick: () => void;
  active: boolean;
  timeOffset?: number;
  size?: number;
  // Mouse position in the nav section's coordinate space
  sectionMouseX: number;
  sectionMouseY: number;
  // This sphere's offset within the section (so we can compute relative mouse pos)
  sphereRef: React.RefObject<HTMLButtonElement | null>;
}

export default function AmoebaSphere({
  label,
  onClick,
  active,
  timeOffset = 0,
  size = 168,
  sectionMouseX,
  sectionMouseY,
  sphereRef,
}: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.36;

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const t = (ts - startRef.current) / 1000 + timeOffset;

      // Compute mouse position relative to this sphere's center
      let mouseDx = 0;
      let mouseDy = 0;
      if (sphereRef.current && sectionMouseX > -999) {
        const rect = sphereRef.current.getBoundingClientRect();
        const sphereCenterX = rect.left + rect.width / 2;
        const sphereCenterY = rect.top + rect.height / 2;
        mouseDx = sectionMouseX - sphereCenterX;
        mouseDy = sectionMouseY - sphereCenterY;
      }

      if (pathRef.current) {
        pathRef.current.setAttribute(
          "d",
          blobPath(cx, cy, radius, t, mouseDx, mouseDy)
        );
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cx, cy, radius, timeOffset, sectionMouseX, sectionMouseY, sphereRef]);

  return (
    <button
      ref={sphereRef}
      onClick={onClick}
      className="group focus:outline-none"
      aria-label={`Open ${label}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <path
          ref={pathRef}
          fill={active ? "var(--site-accent, #1A1814)" : "transparent"}
          stroke="var(--site-accent, #1A1814)"
          strokeWidth="1.2"
          style={{ transition: "fill 0.35s ease" }}
        />
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={active ? "var(--site-bg, #FAF8F4)" : "var(--site-fg, #1A1814)"}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            transition: "fill 0.35s ease",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {label}
        </text>
      </svg>
    </button>
  );
}
