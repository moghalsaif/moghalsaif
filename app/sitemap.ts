import type { MetadataRoute } from "next";
import { writings } from "@/lib/writings";

const SITE_URL = "https://www.moghalsaif.com";
const LAST_MODIFIED = new Date("2026-06-13");

const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/projects", priority: 0.82 },
  { path: "/writing", priority: 0.86 },
  { path: "/books", priority: 0.74 },
  { path: "/story", priority: 0.68 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  const writingPages = writings.map((writing) => ({
    url: `${SITE_URL}/writing/${writing.id}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  return [...pages, ...writingPages];
}
