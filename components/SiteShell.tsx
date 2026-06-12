"use client";

import AgentMarkdownView from "@/components/AgentMarkdownView";
import BottomDock from "@/components/BottomDock";
import HeroSection from "@/components/HeroSection";
import HomeHighlights from "@/components/HomeHighlights";
import SphereNav from "@/components/SphereNav";
import { useViewMode } from "@/lib/view-mode";

export default function SiteShell() {
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
    <main>
      <HeroSection />
      <HomeHighlights />
      <SphereNav />
      <BottomDock />
    </main>
  );
}
