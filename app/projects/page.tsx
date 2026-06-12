import type { Metadata } from "next";
import ProjectsSection from "@/components/ProjectsSection";
import SectionPageShell from "@/components/SectionPageShell";

export const metadata: Metadata = {
  title: "Projects · Moghal Saif",
  description: "Selected projects by Moghal Saif.",
};

export default function ProjectsPage() {
  return (
    <SectionPageShell>
      <ProjectsSection />
    </SectionPageShell>
  );
}
