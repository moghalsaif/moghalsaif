"use client";

import { ChevronDown, ExternalLink, PlayCircle } from "lucide-react";
import { useState } from "react";
import { SocialIcon } from "@/components/SocialIcon";
import { SITE_PROJECTS, type SiteProject } from "@/lib/site-config";

function ProjectRow({ project }: { project: SiteProject }) {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <article className="py-8">
      <div className="grid gap-6 sm:grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)] sm:items-start">
        <div className="min-w-0">
          <h3 className="text-3xl font-medium leading-tight text-[var(--site-fg)] sm:text-4xl">
            {project.name}
          </h3>
        </div>

        <div className="min-w-0">
          <p className="max-w-2xl text-base leading-8 text-[var(--site-fg)]/62">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-[var(--site-fg)] px-5 text-sm font-medium text-[var(--site-bg)] transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{ outlineColor: "var(--site-accent)" }}
            >
              <SocialIcon name="github" className="h-4 w-4" />
              GitHub repo
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setDemoOpen((current) => !current)}
              aria-expanded={demoOpen}
              aria-controls={`${project.id}-demo`}
              aria-label={`${demoOpen ? "Hide" : "Show"} ${project.name} video demo`}
              title="Video demo"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--site-border)] text-[var(--site-fg)]/74 transition hover:border-[var(--site-fg)] hover:text-[var(--site-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{ outlineColor: "var(--site-accent)" }}
            >
              <PlayCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {demoOpen && (
        <div
          id={`${project.id}-demo`}
          className="mt-7 overflow-hidden rounded-2xl border border-[var(--site-border)] bg-[var(--site-card)]"
        >
          <div className="flex items-center justify-between gap-4 border-b border-[var(--site-border)] px-5 py-4">
            <p className="text-sm font-medium text-[var(--site-fg)]">{project.name} demo</p>
            <ChevronDown className="h-4 w-4 rotate-180 text-[var(--site-muted)]" />
          </div>
          <div className="p-4 sm:p-5">
            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-black/35">
              {project.demoVideo ? (
                <video
                  src={project.demoVideo}
                  poster={project.demoPoster}
                  controls
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="px-6 text-center">
                  <PlayCircle className="mx-auto h-9 w-9 text-[var(--site-fg)]/50" />
                  <p className="mt-4 text-sm text-[var(--site-muted)]">
                    Demo video slot. Add a video URL in the project config when the product demo is ready.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section
      className="min-h-screen w-full px-6 py-16 pb-28 text-[var(--site-fg)] sm:px-10 md:px-16 lg:px-24"
      style={{ backgroundColor: "var(--site-bg)" }}
    >
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-12 sm:mb-16">
          <h2 className="text-5xl font-medium sm:text-6xl">projects</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--site-muted)]">
            A short list of things I have built or keep returning to. No stack theater, just the work and where to find it.
          </p>
        </header>

        <div className="divide-y divide-[var(--site-border)]">
          {SITE_PROJECTS.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
