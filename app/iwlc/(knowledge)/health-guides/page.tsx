import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, Download } from "lucide-react";
import { healthGuides } from "@/components/iwlc/knowledge-data";
import styles from "../resource-page.module.css";

export const metadata: Metadata = {
  title: "Health Guides | India Weight Loss Challenge",
  description: "Read and download IWLC guides about diet, exercise, obesity and sustainable weight management.",
};

export default function HealthGuidesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Health guides</span>
          <h1>Read deeper. Choose clearly.</h1>
        </div>
        <div className={styles.heroAside}>
          <p>
            A focused library for understanding weight management before making
            decisions about food, activity or treatment.
          </p>
          <div className={styles.heroMetric}>
            <strong>{healthGuides.length}</strong>
            <span>downloadable health guides</span>
          </div>
        </div>
      </section>

      <section className={styles.guidesCollection}>
        <div className={styles.collectionHeader}>
          <h2>The reading room</h2>
          <p>Read online for a quick review or download a copy to keep.</p>
        </div>
        <div className={styles.guideList}>
          {healthGuides.map((guide) => (
            <article className={styles.guideCard} key={guide.title}>
              <span className={styles.guideIcon} aria-hidden="true"><BookOpen /></span>
              <div>
                <h2>{guide.title}</h2>
                <p>{guide.summary}</p>
              </div>
              <div className={styles.guideActions}>
                <a href={guide.viewer} target="_blank" rel="noreferrer">
                  Read <ArrowUpRight aria-hidden="true" />
                </a>
                <a href={guide.download} target="_blank" rel="noreferrer">
                  Download <Download aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
