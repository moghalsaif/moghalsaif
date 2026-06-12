"use client";

import AgentMarkdownView from "@/components/AgentMarkdownView";
import BooksSection from "@/components/BooksSection";
import BottomDock from "@/components/BottomDock";
import { useViewMode } from "@/lib/view-mode";

export default function BooksPageShell() {
  const { mode } = useViewMode();

  if (mode === "agent") {
    return (
      <>
        <AgentMarkdownView />
        <BottomDock />
      </>
    );
  }

  return <BooksSection />;
}
