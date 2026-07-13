export type SocialIconName =
  | "github"
  | "linkedin"
  | "x"
  | "instagram"
  | "mail"
  | "gmail"
  | "outlook";

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: SocialIconName;
  kind: "profile" | "email";
};

export type SiteProject = {
  id: string;
  name: string;
  year: string;
  description: string;
  github: string;
  language?: string | null;
  demoVideo?: string;
  demoPoster?: string;
};

export const SITE_PROFILE = {
  name: "Moghal Saif",
  birthDateISO: "2005-02-09T00:00:00+05:30",
  currentLocation: "Hyderabad",
  email: "moghalsaif21@gmail.com",
  bio:
    "Moghal Saif is a builder, writer, and systems thinker exploring AI, products, strategy, and the inner life behind ambitious work.",
  interests: [
    "AI product systems",
    "operator-led businesses",
    "writing about ambition and survival",
    "reading systems, strategy, and consciousness books",
  ],
  services: [
    "AI implementation",
    "product strategy",
    "technical prototyping",
    "writing and research",
  ],
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/moghalsaif",
    icon: "github",
    kind: "profile",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/moghalsaifa",
    icon: "linkedin",
    kind: "profile",
  },
  {
    id: "x",
    label: "Twitter",
    href: "https://x.com/moghalsaifa",
    icon: "x",
    kind: "profile",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/moghalsaif",
    icon: "instagram",
    kind: "profile",
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${SITE_PROFILE.email}`,
    icon: "mail",
    kind: "email",
  },
];

export const CURRENT_PROJECT: SiteProject = {
  id: "dispatch-agent",
  name: "Dispatch Agent",
  year: "2026",
  description:
    "An AI-powered procurement assistant that calls vendors, collects pricing, reports lead times, and sends live updates.",
  github: "https://github.com/moghalsaif/dispatch_agent",
  language: "Python",
};

export const SITE_PROJECTS: SiteProject[] = [
  {
    id: "moghalsaif",
    name: "Personal Website",
    year: "2026",
    description:
      "The personal website and portfolio you are looking at now, built as a dark, seamless home for work, writing, books, and contact.",
    github: "https://github.com/moghalsaif/moghalsaif",
    language: "TypeScript",
  },
  {
    id: "ai-reliability-app",
    name: "AI Reliability App",
    year: "2026",
    description:
      "A Python project for testing and improving reliability around AI outputs and workflows.",
    github: "https://github.com/moghalsaif/AI-reliability-app",
    language: "Python",
  },
  {
    id: "llm-guardrail-detector-using-ml-intern",
    name: "LLM Guardrail Detector",
    year: "2026",
    description:
      "A local-first LLM output guardrail classifier built with Hugging Face ML Intern, Ollama, and response-side safety data.",
    github: "https://github.com/moghalsaif/llm-guardrail-detector-using-ml-intern",
    language: "Python",
  },
  {
    id: "anything-to-markdown",
    name: "Anything to Markdown",
    year: "2026",
    description:
      "A TypeScript tool where you paste a URL or drop a file and get clean Markdown back.",
    github: "https://github.com/moghalsaif/anything-to-markdown",
    language: "TypeScript",
  },
  {
    id: "tribe-v2-test",
    name: "Tribe V2 Test",
    year: "2026",
    description:
      "A public test repository for Tribe V2 experiments.",
    github: "https://github.com/moghalsaif/tribe_v2_test",
    language: null,
  },
  {
    id: "lingua-voice",
    name: "Lingua Voice",
    year: "2026",
    description:
      "A voice-based language learning PWA where you clone your own voice and practice speaking with an AI tutor.",
    github: "https://github.com/moghalsaif/Lingua_Voice",
    language: "TypeScript",
  },
  {
    id: "standup-line",
    name: "StandupLine",
    year: "2026",
    description:
      "A voice-first async standup system for teams using ElevenLabs, Cloudflare Workers, Durable Objects, R2, and Telegram.",
    github: "https://github.com/moghalsaif/standup_line",
    language: "TypeScript",
  },
  CURRENT_PROJECT,
  {
    id: "mtc",
    name: "MTC",
    year: "2026",
    description:
      "A professional equipment tracking dashboard for virtual production studios managing gear movement and inventory control.",
    github: "https://github.com/moghalsaif/MTC",
    language: "JavaScript",
  },
  {
    id: "linkedin-psy-writer-skill",
    name: "LinkedIn Psychology Writer Skill",
    year: "2026",
    description:
      "A Claude skill for writing LinkedIn posts that trigger emotional responses instead of only delivering information.",
    github: "https://github.com/moghalsaif/linkedin-psy-writer-skill",
    language: null,
  },
  {
    id: "ai-powered-recruitment-pipeline",
    name: "AI Powered Recruitment Pipeline",
    year: "2026",
    description:
      "A recruitment automation pipeline that turns messy resume PDFs into a clean PowerPoint deck through Telegram.",
    github: "https://github.com/moghalsaif/AI-Powered-Recruitment-Pipeline-",
    language: "Python",
  },
  {
    id: "instagram-reel-transcriber",
    name: "Instagram Reel Transcriber",
    year: "2026",
    description:
      "A local web app that downloads Instagram Reels and transcribes them with OpenAI Whisper without paid APIs.",
    github: "https://github.com/moghalsaif/Instagram-Reel-Transcriber",
    language: "HTML",
  },
  {
    id: "ai-paper-reader-skill",
    name: "AI Paper Reader Skill",
    year: "2026",
    description:
      "A Claude skill for reading and understanding AI research papers deeply instead of only summarizing them.",
    github: "https://github.com/moghalsaif/ai-paper-reader-skill",
    language: null,
  },
  {
    id: "intelligent-agent-system",
    name: "Intelligent Agent System",
    year: "2025",
    description:
      "A multi-agent AI system where specialized agents collaborate through hierarchical orchestration to solve complex tasks.",
    github: "https://github.com/moghalsaif/intelligent-agent-system",
    language: "Python",
  },
  {
    id: "youshould-take-action",
    name: "You Should Take Action",
    year: "2024",
    description:
      "A public HTML project around the idea of pushing people toward action.",
    github: "https://github.com/moghalsaif/youshould-take-action",
    language: "HTML",
  },
];

export function getGmailComposeUrl(email = SITE_PROFILE.email) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}

export function getOutlookComposeUrl(email = SITE_PROFILE.email) {
  return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(email)}`;
}
