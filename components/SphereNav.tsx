"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { haptics } from "@/lib/haptics";

const SECTIONS = [
  {
    id: "projects",
    label: "Projects",
    description: "Selected work and build notes.",
    href: "/projects",
  },
  {
    id: "story",
    label: "Story",
    description: "A short letter about the person behind the work.",
    href: "/story",
  },
  {
    id: "writing",
    label: "Writings",
    description: "Essays, notes, and thinking in public.",
    href: "/writing",
  },
  {
    id: "books",
    label: "Books",
    description: "A running shelf of what I am reading.",
    href: "/books",
  },
] as const;

export default function SphereNav() {
  const router = useRouter();

  const handleOpen = (href: string, button: HTMLButtonElement) => {
    haptics.medium(button);
    router.push(href);
  };

  return (
    <section
      id="sphere-nav"
      className="w-full px-6 py-24 sm:px-10 lg:px-16"
      style={{ backgroundColor: "var(--site-bg)", color: "var(--site-fg)" }}
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="text-4xl font-medium sm:text-5xl">sections</h2>
        </motion.div>

        <div className="divide-y divide-[var(--site-border)]">
          {SECTIONS.map((section, index) => (
            <motion.button
              key={section.id}
              type="button"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.38, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => handleOpen(section.href, event.currentTarget)}
              className="group grid w-full gap-4 py-7 text-left sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_auto] sm:items-center"
            >
              <span className="text-3xl font-medium text-[var(--site-fg)] transition group-hover:text-[var(--site-fg)]/70 sm:text-4xl">
                {section.label}
              </span>
              <span className="text-base leading-7 text-[var(--site-muted)]">{section.description}</span>
              <span className="text-sm text-[var(--site-muted)] transition group-hover:text-[var(--site-fg)]">
                Open
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
