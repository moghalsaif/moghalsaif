"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { writings } from "@/lib/writings";

type WritingType = (typeof writings)[0];

function WritingRow({ writing }: { writing: WritingType }) {
  return (
    <div>
      <Link
        href={`/writing/${writing.id}`}
        className="group block rounded-lg px-0 py-5 outline-none transition sm:py-6"
        style={{ color: "var(--site-fg)" }}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h3 className="text-2xl font-normal leading-tight text-[var(--site-fg)] transition group-hover:text-[var(--site-fg)]/72 sm:text-3xl">
              {writing.title}
            </h3>
            <p className="mt-2 text-lg text-[var(--site-muted)] sm:text-xl">{writing.date}</p>
          </div>
          <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-[var(--site-muted)]/70 transition group-hover:translate-x-1 group-hover:text-[var(--site-fg)]/72" />
        </div>
      </Link>
    </div>
  );
}

export default function WritingsSection() {
  return (
    <section
      className="min-h-screen w-full px-6 py-16 pb-28 text-[var(--site-fg)] sm:px-10 md:px-16 lg:px-24"
      style={{ backgroundColor: "var(--site-bg)" }}
    >
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="text-5xl font-medium text-[var(--site-fg)] sm:text-6xl">
          writings
        </h2>

        <div className="mt-14 divide-y divide-[var(--site-border)] sm:mt-18">
          {writings.slice().sort((a, b) => b.id - a.id).map((writing) => (
            <WritingRow key={writing.id} writing={writing} />
          ))}
        </div>

        <a
          href="https://ratios.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-16 block overflow-hidden rounded-3xl px-7 py-8 text-white shadow-2xl shadow-red-950/20 transition hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:px-10 sm:py-10"
          style={{
            background:
              "linear-gradient(135deg, #3b0508 0%, #8f111b 44%, #ef3b2d 100%)",
            outlineColor: "var(--site-accent)",
          }}
        >
          <p className="text-sm uppercase tracking-[0.18em] text-white/64">Substack</p>
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="max-w-xl text-3xl font-medium leading-tight sm:text-5xl">
              Make Better Decisions, Sign up to my newsletter.
            </h3>
            <span className="inline-flex min-h-11 w-fit items-center rounded-full bg-white px-5 text-sm font-medium text-red-950">
              Open Substack
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
