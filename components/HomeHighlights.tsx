"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { SocialIcon } from "@/components/SocialIcon";
import { books } from "@/lib/books";
import { CURRENT_PROJECT, SITE_PROFILE } from "@/lib/site-config";

const YEAR_MS = 365.2425 * 24 * 60 * 60 * 1000;

const currentBook = books.find((book) => book.title.includes("The Goal")) ?? books[0];

function LiveAge() {
  const ageRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const birth = new Date(SITE_PROFILE.birthDateISO).getTime();

    const update = () => {
      const years = (Date.now() - birth) / YEAR_MS;
      if (ageRef.current) {
        ageRef.current.textContent = years.toFixed(9);
      }
    };

    update();
    const timer = window.setInterval(update, 250);
    return () => window.clearInterval(timer);
  }, []);

  return <span ref={ageRef}>21.338187960</span>;
}

export default function HomeHighlights() {
  return (
    <section
      className="relative flex min-h-screen w-full items-center px-5 py-20 sm:px-8 lg:px-12"
      style={{ backgroundColor: "var(--site-bg)", color: "var(--site-fg)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="flex flex-col items-center justify-center gap-3 text-center text-xl text-[var(--site-fg)]/82 sm:flex-row sm:text-2xl">
          <p>been here for <LiveAge /> years</p>
          <span className="hidden h-4 w-px bg-[var(--site-border)] sm:block" aria-hidden="true" />
          <p className="inline-flex items-center gap-2 text-base text-[var(--site-fg)]/66 sm:text-lg">
            <MapPin className="h-4 w-4" />
            {SITE_PROFILE.currentLocation}
          </p>
        </div>

        <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.92fr)]">
          <article className="flex min-h-[420px] flex-col justify-between rounded-[1.75rem] bg-[var(--site-card)]/80 p-7 shadow-2xl shadow-black/25 sm:p-9">
            <div>
              <p className="text-sm font-medium text-[var(--site-fg)]/78">{"what's something interesting i'm working on"}</p>
              <h2 className="mt-10 text-4xl font-medium leading-[1.04] text-[var(--site-fg)] sm:text-5xl">
                {CURRENT_PROJECT.name}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--site-fg)]/58 sm:text-lg">
                {CURRENT_PROJECT.description}
              </p>
            </div>

            <a
              href={CURRENT_PROJECT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-[var(--site-fg)] px-5 text-sm font-medium text-[var(--site-bg)] transition hover:opacity-86"
            >
              <SocialIcon name="github" className="h-4 w-4" />
              GitHub repo
            </a>
          </article>

          <article className="flex min-h-[420px] flex-col rounded-[1.75rem] bg-[var(--site-card)]/64 p-7 shadow-2xl shadow-black/20 sm:p-9">
            <p className="text-sm font-medium text-[var(--site-fg)]/78">{"what's something interesting i'm reading"}</p>

            <div className="mt-10 grid flex-1 gap-8 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-start lg:grid-cols-1">
              <div className="relative mx-auto w-[150px] overflow-hidden rounded-xl bg-white/10 shadow-2xl shadow-black/40 sm:mx-0 lg:mx-auto lg:w-[178px]" style={{ aspectRatio: "2 / 3" }}>
                {currentBook.cover ? (
                  <Image
                    src={currentBook.cover}
                    alt={`${currentBook.title} cover`}
                    fill
                    priority
                    className="object-cover"
                    sizes="180px"
                  />
                ) : (
                  <div className="flex h-full items-end p-5 text-lg font-medium text-black" style={{ backgroundColor: currentBook.tint }}>
                    {currentBook.title}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h2 className="text-3xl font-medium leading-[1.08] text-[var(--site-fg)] sm:text-4xl">
                  {currentBook.title}
                </h2>
                <p className="mt-6 text-base leading-8 text-[var(--site-fg)]/58">
                  I keep coming back to systems books because they turn messy ambition into constraints, feedback loops, and better decisions.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
