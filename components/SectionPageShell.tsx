"use client";

import type { ReactNode } from "react";
import AgentMarkdownView from "@/components/AgentMarkdownView";
import BottomDock from "@/components/BottomDock";
import PageChromeControls from "@/components/PageChromeControls";
import { useViewMode } from "@/lib/view-mode";

export default function SectionPageShell({ children }: { children: ReactNode }) {
  const { mode } = useViewMode();

  if (mode === "agent") {
    return (
      <>
        <AgentMarkdownView />
        <BottomDock />
      </>
    );
  }

  return (
    <>
      <PageChromeControls backHref="/" closeHref="/" backLabel="Back home" />
      {children}
      <BottomDock />
    </>
  );
}
