import type { Metadata } from "next";
import SectionPageShell from "@/components/SectionPageShell";
import StorySection from "@/components/StorySection";

export const metadata: Metadata = {
  title: "Story · Moghal Saif",
  description: "A short personal note from Moghal Saif.",
};

export default function StoryPage() {
  return (
    <SectionPageShell>
      <StorySection />
    </SectionPageShell>
  );
}
