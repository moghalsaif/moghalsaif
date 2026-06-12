import type { Metadata } from "next";
import SectionPageShell from "@/components/SectionPageShell";
import WritingsSection from "@/components/WritingsSection";

export const metadata: Metadata = {
  title: "Writing · Moghal Saif",
  description: "Essays and notes by Moghal Saif.",
};

export default function WritingPage() {
  return (
    <SectionPageShell>
      <WritingsSection />
    </SectionPageShell>
  );
}
