"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import BottomDock from "@/components/BottomDock";
import PageChromeControls from "@/components/PageChromeControls";
import { writings } from "@/lib/writings";

export default function WritingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const writing = writings.find((item) => String(item.id) === id);
  const paragraphs = writing?.body.split("\n").filter((paragraph) => paragraph.trim().length > 0) ?? [];

  if (!writing) {
    return (
      <main className="min-h-screen px-5 py-10 pb-28 sm:px-10" style={{ backgroundColor: "var(--site-bg)" }}>
        <PageChromeControls backHref="/writing" closeHref="/" backLabel="Back to writings" />
        <div className="mx-auto max-w-2xl">
          <Link
            href="/writing"
            className="inline-flex min-h-11 items-center gap-2 text-[10px] uppercase tracking-[0.18em] transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ color: "var(--site-muted)", fontFamily: "var(--font-inter)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to writings
          </Link>
          <h1
            className="mt-16 text-4xl font-normal italic"
            style={{ color: "var(--site-fg)", fontFamily: "var(--font-playfair)" }}
          >
            Writing not found
          </h1>
        </div>
        <BottomDock />
      </main>
    );
  }

  return (
    <main className="min-h-screen px-5 py-10 pb-28 sm:px-10 md:py-16" style={{ backgroundColor: "var(--site-bg)" }}>
      <PageChromeControls backHref="/writing" closeHref="/" backLabel="Back to writings" />
      <article className="mx-auto max-w-[760px]">
        <Link
          href="/writing"
          className="inline-flex min-h-11 items-center gap-2 text-[10px] uppercase tracking-[0.18em] transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{ color: "var(--site-muted)", fontFamily: "var(--font-inter)", outlineColor: "var(--site-accent)" }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to writings
        </Link>

        <div className="mt-14 flex flex-wrap items-center gap-2">
          <span
            className="rounded-md border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]"
            style={{ borderColor: "var(--site-border)", color: "var(--site-muted)", fontFamily: "var(--font-inter)" }}
          >
            {writing.platform}
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "var(--site-muted)", fontFamily: "var(--font-inter)" }}
          >
            {writing.date}
          </span>
        </div>

        <h1
          className="mt-5 text-4xl font-medium leading-[1.08] sm:text-5xl"
          style={{ color: "var(--site-fg)", fontFamily: "var(--font-inter)" }}
        >
          {writing.title}
        </h1>

        <div className="my-9 h-px w-12" style={{ backgroundColor: "var(--site-accent)" }} />

        {writing.url && (
          <a
            href={writing.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-9 inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 text-sm transition-colors hover:border-[var(--site-fg)] hover:text-[var(--site-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              borderColor: "var(--site-border)",
              color: "var(--site-muted)",
              fontFamily: "var(--font-inter)",
              outlineColor: "var(--site-accent)",
            }}
          >
            Original essay
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}

        <div
          className="text-[17px] leading-[1.72]"
          style={{
            color: "var(--site-fg)",
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            opacity: 0.9,
          }}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 24)}`} className="mb-7 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        <p
          className="mt-14 border-t pt-8 text-[10px] uppercase tracking-[0.22em]"
          style={{ borderColor: "var(--site-border)", color: "var(--site-muted)", fontFamily: "var(--font-inter)" }}
        >
          Moghal Saif
        </p>
      </article>
      <BottomDock />
    </main>
  );
}
