"use client";

import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { haptics } from "@/lib/haptics";

type PageChromeControlsProps = {
  backHref?: string;
  closeHref?: string;
  backLabel?: string;
  closeLabel?: string;
};

function ChromeButton({
  label,
  side,
  onClick,
  children,
}: {
  label: string;
  side: "left" | "right";
  onClick: (button: HTMLButtonElement) => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(event) => onClick(event.currentTarget)}
      className={`fixed top-5 z-[510] flex h-11 w-11 items-center justify-center rounded-full text-[var(--site-fg)] transition hover:bg-white/[0.1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
        side === "left" ? "left-5" : "right-5"
      }`}
      style={{
        background: "color-mix(in srgb, var(--site-card) 74%, transparent)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 14px 50px rgba(0,0,0,0.24)",
        outlineColor: "var(--site-accent)",
      }}
    >
      {children}
    </button>
  );
}

export default function PageChromeControls({
  backHref = "/",
  closeHref = "/",
  backLabel = "Back",
  closeLabel = "Close page",
}: PageChromeControlsProps) {
  const router = useRouter();

  return (
    <>
      <ChromeButton
        label={backLabel}
        side="left"
        onClick={(button) => {
          haptics.medium(button);
          router.push(backHref);
        }}
      >
        <ArrowLeft className="h-4 w-4" />
      </ChromeButton>

      <ChromeButton
        label={closeLabel}
        side="right"
        onClick={(button) => {
          haptics.medium(button);
          router.push(closeHref);
        }}
      >
        <X className="h-4 w-4" />
      </ChromeButton>
    </>
  );
}
