import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./resource-shell.module.css";

export default function KnowledgeLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/iwlc#knowledge">
          <svg aria-hidden="true" viewBox="0 0 20 20">
            <path d="M11.75 4.75 6.5 10l5.25 5.25M7 10h7" />
          </svg>
          <span>Back to challenge</span>
        </Link>
      </header>

      {children}

      <footer className={styles.footer}>
        <p>Healthy change starts with one conversation.</p>
        <div>
          <Link href="/iwlc">The challenge</Link>
          <Link href="/iwlc#contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
