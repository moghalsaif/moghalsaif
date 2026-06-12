import { buildLlmsSummary } from "@/lib/agent-content";

export function GET() {
  return new Response(buildLlmsSummary(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
