"use client";

import {
  Check,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  Home,
  Moon,
  Sun,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { SocialIcon } from "@/components/SocialIcon";
import { haptics } from "@/lib/haptics";
import {
  getGmailComposeUrl,
  getOutlookComposeUrl,
  SITE_PROFILE,
  SOCIAL_LINKS,
  type SocialIconName,
  type SocialLink,
} from "@/lib/site-config";
import { useTheme } from "@/lib/theme";
import { useViewMode } from "@/lib/view-mode";

type PopoverAction = {
  label: string;
  icon: SocialIconName | "copy" | "external";
  run: () => void;
};

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

function closeSectionOverlays() {
  window.dispatchEvent(new Event("ms-close-overlays"));
}

function ActionIcon({ icon }: { icon: PopoverAction["icon"] }) {
  if (icon === "copy") return <Copy className="h-4 w-4" />;
  if (icon === "external") return <ExternalLink className="h-4 w-4" />;
  return <SocialIcon name={icon} className="h-4 w-4" />;
}

function DockButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: (button: HTMLButtonElement) => void;
}) {
  return (
    <button
      type="button"
      onClick={(event) => onClick(event.currentTarget)}
      aria-label={label}
      title={label}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--site-fg)]/75 transition duration-200 hover:bg-white/[0.12] hover:text-[var(--site-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 sm:h-11 sm:w-11"
    >
      {children}
    </button>
  );
}

function SocialPopoverButton({
  item,
  onCopied,
  open,
  onToggle,
  onClose,
}: {
  item: SocialLink;
  onCopied: (label: string) => void;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  const actions: PopoverAction[] =
    item.kind === "email"
      ? [
          {
            label: "Copy Email Address",
            icon: "copy",
            run: async () => {
              await copyText(SITE_PROFILE.email);
              onCopied("Copied!");
            },
          },
          {
            label: "Open Gmail",
            icon: "gmail",
            run: () => {
              window.open(getGmailComposeUrl(), "_blank", "noopener,noreferrer");
            },
          },
          {
            label: "Open Outlook",
            icon: "outlook",
            run: () => {
              window.open(getOutlookComposeUrl(), "_blank", "noopener,noreferrer");
            },
          },
        ]
      : [
          {
            label: item.id === "linkedin" ? "Copy LinkedIn profile URL" : `Copy ${item.label} URL`,
            icon: "copy",
            run: async () => {
              await copyText(item.href);
              onCopied("Copied!");
            },
          },
          {
            label: `Open ${item.label}`,
            icon: "external",
            run: () => {
              window.open(item.href, "_blank", "noopener,noreferrer");
            },
          },
        ];

  return (
    <div ref={ref} className="relative shrink-0">
      <DockButton
        label={item.label}
        onClick={(button) => {
          haptics.medium(button);
          onToggle();
        }}
      >
        <SocialIcon name={item.icon} />
      </DockButton>

      {open && (
        <div
          role="menu"
          aria-label={`${item.label} actions`}
          className="absolute bottom-[calc(100%+0.7rem)] left-1/2 w-52 -translate-x-1/2 rounded-2xl p-2 text-[var(--site-fg)]"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--site-card) 88%, transparent), color-mix(in srgb, var(--site-bg) 76%, transparent))",
            boxShadow:
              "0 18px 60px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.13), inset 0 0 0 1px rgba(255,255,255,0.1)",
          }}
        >
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              role="menuitem"
              className="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm text-[var(--site-fg)]/80 transition hover:bg-white/[0.1] hover:text-[var(--site-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
              onClick={async () => {
                await action.run();
                onClose();
              }}
            >
              <span className="flex h-5 w-5 items-center justify-center text-[var(--site-fg)]/70">
                <ActionIcon icon={action.icon} />
              </span>
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BottomDock() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { mode, toggleMode } = useViewMode();
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const isDark = theme === "dark";
  const isAgent = mode === "agent";

  const showCopied = (label: string) => {
    setCopiedLabel(label);
    window.setTimeout(() => setCopiedLabel(null), 4000);
  };

  const goHome = (button: HTMLButtonElement) => {
    haptics.medium(button);
    setActivePopover(null);
    closeSectionOverlays();

    if (pathname === "/") {
      window.history.replaceState(null, "", "/");
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      return;
    }

    router.push("/");
  };

  return (
    <>
      {copiedLabel && (
        <div
          className="fixed bottom-20 left-1/2 z-[520] flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-sm text-[var(--site-fg)] sm:bottom-24"
          style={{
            background: "color-mix(in srgb, var(--site-card) 88%, transparent)",
            boxShadow: "0 14px 50px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.1)",
          }}
          aria-live="polite"
        >
          <Check className="h-4 w-4" />
          {copiedLabel}
        </div>
      )}

      <nav
        className="fixed bottom-3 left-1/2 z-[500] flex max-w-[calc(100vw-0.75rem)] -translate-x-1/2 items-center gap-0.5 rounded-full px-1.5 py-1.5 sm:bottom-6 sm:gap-1 sm:px-2 sm:py-2"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--site-card) 72%, transparent), color-mix(in srgb, var(--site-bg) 48%, transparent))",
          boxShadow:
            "0 24px 80px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.16), inset 0 0 0 1px rgba(255,255,255,0.1)",
        }}
        aria-label="Site navigation"
      >
        <DockButton label="Home" onClick={goHome}>
          <Home className="h-[1.15rem] w-[1.15rem]" />
        </DockButton>

        {SOCIAL_LINKS.map((item) => (
          <SocialPopoverButton
            key={item.id}
            item={item}
            onCopied={showCopied}
            open={activePopover === item.id}
            onToggle={() => setActivePopover((current) => (current === item.id ? null : item.id))}
            onClose={() => setActivePopover(null)}
          />
        ))}

        <span className="mx-1 hidden h-8 w-px shrink-0 bg-white/10 sm:block" aria-hidden="true" />

        <DockButton
          label={isAgent ? "Switch to Human View" : "Switch to Agent View"}
          onClick={(button) => {
            haptics.medium(button);
            setActivePopover(null);
            closeSectionOverlays();
            toggleMode();
          }}
        >
          {isAgent ? <FileText className="h-[1.15rem] w-[1.15rem]" /> : <Code2 className="h-[1.15rem] w-[1.15rem]" />}
        </DockButton>

        <DockButton
          label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={(button) => {
            haptics.medium(button);
            setActivePopover(null);
            setTheme(isDark ? "default" : "dark");
          }}
        >
          {isDark ? <Sun className="h-[1.15rem] w-[1.15rem]" /> : <Moon className="h-[1.15rem] w-[1.15rem]" />}
        </DockButton>
      </nav>
    </>
  );
}
