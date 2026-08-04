import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { healthTipIds } from "@/components/iwlc/knowledge-data";
import styles from "../resource-page.module.css";

export const metadata: Metadata = {
  title: "Health Tips | India Weight Loss Challenge",
  description: "Simple, practical health tips for building more sustainable everyday habits.",
};

export default function HealthTipsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Health tips</span>
          <h1>Small guidance. Daily change.</h1>
        </div>
        <div className={styles.heroAside}>
          <p>
            Saveable visual reminders designed to make healthier choices feel
            practical, clear and easier to repeat.
          </p>
          <div className={styles.heroMetric}>
            <strong>{healthTipIds.length}</strong>
            <span>practical visual tips</span>
          </div>
        </div>
      </section>

      <section className={styles.tipsCollection}>
        <div className={styles.collectionHeader}>
          <h2>Browse every tip</h2>
          <p>Open any card to see and save the full-resolution version.</p>
        </div>
        <div className={styles.tipGrid}>
          {healthTipIds.map((id) => {
            const image = `https://www.indiaweightlosschallenge.in/app/tips/${id}.png`;
            return (
              <a
                className={styles.tipCard}
                href={image}
                target="_blank"
                rel="noreferrer"
                key={id}
              >
                <div className={styles.tipImage}>
                  <Image
                    src={image}
                    alt={`IWLC health tip ${id}`}
                    fill
                    sizes="(max-width: 580px) 100vw, (max-width: 800px) 50vw, 24vw"
                  />
                </div>
                <span>
                  Health tip {id}
                  <ArrowUpRight aria-hidden="true" size={14} />
                </span>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
