import { buildAgentMarkdown } from "@/lib/agent-content";

export function GET() {
  return new Response(buildAgentMarkdown({ full: true }), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
