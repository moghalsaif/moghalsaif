"use client";

import { use } from "react";
import Link from "next/link";
import { writings } from "@/components/WritingsSection";

export default function WritingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const writing = writings.find((item) => String(item.id) === id);

  if (!writing) {
    return (
      <main className="min-h-screen px-5 py-10 sm:px-10" style={{ backgroundColor: "var(--site-bg)" }}>
        <div className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
            style={{ color: "var(--site-muted)", fontFamily: "var(--font-inter)" }}
          >
            Back
          </Link>
          <h1
            className="mt-16 text-4xl font-normal italic"
            style={{ color: "var(--site-fg)", fontFamily: "var(--font-playfair)" }}
          >
            Writing not found
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-5 py-10 sm:px-10 md:py-16" style={{ backgroundColor: "var(--site-bg)" }}>
      <article className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-[10px] uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
          style={{ color: "var(--site-muted)", fontFamily: "var(--font-inter)" }}
        >
          Back
        </Link>

        <p
          className="mt-14 text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "var(--site-muted)", fontFamily: "var(--font-inter)" }}
        >
          {writing.date}
        </p>

        <h1
          className="mt-4 text-4xl font-normal italic leading-tight sm:text-5xl"
          style={{ color: "var(--site-fg)", fontFamily: "var(--font-playfair)" }}
        >
          {writing.title}
        </h1>

        <div className="my-10 h-px w-12" style={{ backgroundColor: "var(--site-accent)" }} />

        <div
          className="whitespace-pre-line text-[16px] leading-[2]"
          style={{
            color: "var(--site-fg)",
            fontFamily: "var(--font-inter)",
            fontWeight: 300,
            opacity: 0.9,
          }}
        >
          {writing.body}
        </div>

        <p
          className="mt-14 border-t pt-8 text-[10px] uppercase tracking-[0.22em]"
          style={{ borderColor: "var(--site-border)", color: "var(--site-muted)", fontFamily: "var(--font-inter)" }}
        >
          Moghal Saif
        </p>
      </article>
    </main>
  );
}
