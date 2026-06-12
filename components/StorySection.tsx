"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

const STORY = `Dear reader,

I've always been someone who builds things. Not because I had a perfect plan, but because making things has always been the clearest way for me to understand the world.

I grew up around quiet ambition. People worked hard, said little, and let the proof live in what they carried forward. I think I inherited that. I am drawn to systems, products, writing, and the strange inner machinery behind people who keep going.

Design came to me through usefulness. I wanted things to feel cleaner, faster, less noisy. Over time I realized that the way something feels is not decoration. It is strategy. It decides whether a person keeps moving or drops the thread.

Right now I am interested in the intersection of how we think and how we build. The tools we use shape the thoughts we can have. I want to build tools that make people sharper, calmer, and more capable.

If any of this sounds familiar, I would love to talk.

Saif`;

const collageFrames = [
  { rotate: "-8deg", x: "-32%", y: "6%", scale: 0.84, z: 1 },
  { rotate: "5deg", x: "4%", y: "-2%", scale: 0.9, z: 3 },
  { rotate: "-2deg", x: "-14%", y: "20%", scale: 0.96, z: 5 },
  { rotate: "10deg", x: "8%", y: "42%", scale: 0.78, z: 2 },
  { rotate: "-14deg", x: "-38%", y: "48%", scale: 0.74, z: 4 },
];

export default function StorySection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      className="min-h-screen w-full overflow-hidden px-6 py-16 pb-28 text-[var(--site-fg)] sm:px-10 md:px-16 lg:px-24"
      style={{ backgroundColor: "var(--site-bg)" }}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[0.8fr_1fr] lg:gap-28">
        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-16 lg:h-fit"
        >
          <h2 className="text-5xl font-medium sm:text-6xl">story</h2>
          <p className="mt-5 max-w-md text-base leading-8 text-[var(--site-muted)]">
            A short note about the person behind the work.
          </p>

          <div className="mt-12 w-full max-w-[470px]">
            <AnimatePresence mode="wait">
              {!expanded ? (
                <motion.button
                  key="collage"
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setExpanded(true)}
                  className="relative block min-h-[390px] w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:min-h-[520px]"
                  style={{ outlineColor: "var(--site-accent)" }}
                  aria-label="Expand story photo collage"
                  aria-expanded={expanded}
                >
                  {collageFrames.map((frame, index) => (
                    <div
                      key={`${frame.rotate}-${index}`}
                      className="absolute left-[44%] top-0 w-[50%] overflow-hidden rounded-2xl bg-white/10 shadow-2xl shadow-black/35 transition duration-300 hover:shadow-black/55"
                      style={{
                        aspectRatio: "3 / 4",
                        zIndex: frame.z,
                        transform: `translate(${frame.x}, ${frame.y}) scale(${frame.scale}) rotate(${frame.rotate})`,
                      }}
                    >
                      <Image
                        src="/me.png"
                        alt={`Moghal Saif story collage image ${index + 1}`}
                        fill
                        className="object-cover grayscale"
                        sizes="(max-width: 1024px) 54vw, 250px"
                        priority={index === 2}
                      />
                    </div>
                  ))}
                </motion.button>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-[var(--site-muted)]">photos</p>
                    <button
                      type="button"
                      onClick={() => setExpanded(false)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--site-border)] text-[var(--site-fg)]/72 transition hover:border-[var(--site-fg)] hover:text-[var(--site-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                      style={{ outlineColor: "var(--site-accent)" }}
                      aria-label="Collapse story photo grid"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {collageFrames.map((_, index) => (
                      <div
                        key={`expanded-${index}`}
                        className={index === 0 ? "relative col-span-2 overflow-hidden rounded-2xl bg-white/10" : "relative overflow-hidden rounded-2xl bg-white/10"}
                        style={{ aspectRatio: index === 0 ? "16 / 10" : "3 / 4" }}
                      >
                        <Image
                          src="/me.png"
                          alt={`Expanded story image ${index + 1}`}
                          fill
                          className="object-cover grayscale"
                          sizes="(max-width: 1024px) 50vw, 260px"
                          priority={index === 0}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.aside>

        <motion.article
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="whitespace-pre-line text-[1.05rem] leading-9 text-[var(--site-fg)]/78 sm:text-lg sm:leading-10">
            {STORY}
          </div>
        </motion.article>
      </div>
    </section>
  );
}
