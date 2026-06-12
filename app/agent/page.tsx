import type { Metadata } from "next";
import AgentMarkdownView from "@/components/AgentMarkdownView";

export const metadata: Metadata = {
  title: "Agent View · Moghal Saif",
  description: "Markdown-only representation of Moghal Saif's website.",
};

export default function AgentPage() {
  return <AgentMarkdownView />;
}
