import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import JoinForm from "./JoinForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Join the Next Chapter | India Weight Loss Challenge",
  description: "Register your interest in the next India Weight Loss Challenge.",
};

export default function JoinPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/iwlc#top">
          <ArrowLeft aria-hidden="true" />
          <span>Back to challenge</span>
        </Link>
        <span className={styles.pageLabel}>Participation</span>
      </header>

      <section className={styles.joinLayout}>
        <div className={styles.intro}>
          <span>Take the first step</span>
          <h1>Join the next chapter.</h1>
          <p>
            Tell us where you are starting from. The IWLC team will help you
            understand the challenge and what comes next.
          </p>
        </div>

        <JoinForm />
      </section>

      <footer className={styles.footer}>
        Healthy change starts with one conversation.
      </footer>
    </main>
  );
}
