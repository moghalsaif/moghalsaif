import { books } from "@/lib/books";
import {
  CURRENT_PROJECT,
  SITE_PROFILE,
  SITE_PROJECTS,
  SOCIAL_LINKS,
} from "@/lib/site-config";
import { writings } from "@/lib/writings";

function list(items: readonly string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function normalizeBody(body: string) {
  return body
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

export function buildAgentMarkdown({ full = true }: { full?: boolean } = {}) {
  const writingEntries = writings
    .map((writing) => {
      const lines = [
        `### ${writing.title}`,
        `- id: ${writing.id}`,
        `- date: ${writing.date}`,
        `- platform: ${writing.platform}`,
        writing.url ? `- url: ${writing.url}` : "- url: local",
        `- preview: ${writing.preview}`,
      ];

      if (full) {
        lines.push("", normalizeBody(writing.body));
      }

      return lines.join("\n");
    })
    .join("\n\n");

  const bookEntries = books
    .map((book) => `- ${book.title}${book.cover ? ` (${book.cover})` : ""}`)
    .join("\n");

  return `# ${SITE_PROFILE.name}

## Bio
${SITE_PROFILE.bio}

## Current
- been here since: ${SITE_PROFILE.birthDateISO}
- current location: ${SITE_PROFILE.currentLocation}
- current project: ${CURRENT_PROJECT.name}
- current project description: ${CURRENT_PROJECT.description}

## Contact
- email: ${SITE_PROFILE.email}
${SOCIAL_LINKS.map((social) => `- ${social.label}: ${social.href}`).join("\n")}

## Services
${list(SITE_PROFILE.services)}

## Interests
${list(SITE_PROFILE.interests)}

## Projects
${SITE_PROJECTS.map(
  (project) => `### ${project.name}
- id: ${project.id}
- year: ${project.year}
- description: ${project.description}
- github: ${project.github}`
).join("\n\n")}

## Writing
${writingEntries}

## Books
${bookEntries}
`;
}

export function buildLlmsSummary() {
  return `# ${SITE_PROFILE.name}

Personal website for ${SITE_PROFILE.name}.

## Useful Paths
- Human website: /
- Agent markdown view: /agent
- Full machine-readable content: /llms-full.txt

## Current
- Location: ${SITE_PROFILE.currentLocation}
- Email: ${SITE_PROFILE.email}
- Current project: ${CURRENT_PROJECT.name}

## Social Links
${SOCIAL_LINKS.map((social) => `- ${social.label}: ${social.href}`).join("\n")}
`;
}
