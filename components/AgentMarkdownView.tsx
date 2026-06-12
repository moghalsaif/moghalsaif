import { buildAgentMarkdown } from "@/lib/agent-content";

export default function AgentMarkdownView() {
  return (
    <main
      className="min-h-screen w-full px-5 py-8 pb-28 sm:px-8 md:px-14"
      style={{ backgroundColor: "var(--site-bg)", color: "var(--site-fg)" }}
    >
      <pre className="mx-auto w-full max-w-4xl whitespace-pre-wrap break-words font-mono text-[13px] leading-7 text-[var(--site-fg)]/86 sm:text-sm">
        {buildAgentMarkdown({ full: true })}
      </pre>
    </main>
  );
}
