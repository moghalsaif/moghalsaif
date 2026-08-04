import type { Metadata } from "next";
import Image from "next/image";
import { Play } from "lucide-react";
import { webinarArchive } from "@/components/iwlc/knowledge-data";
import styles from "../resource-page.module.css";

export const metadata: Metadata = {
  title: "Expert Webinars | India Weight Loss Challenge",
  description: "Watch expert conversations about obesity, nutrition, exercise, psychology and sustainable weight loss.",
};

export default function WebinarsPage() {
  const [featured, ...archive] = webinarArchive;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Expert webinars</span>
          <h1>Knowledge you can return to.</h1>
        </div>
        <div className={styles.heroAside}>
          <p>
            Clear conversations with clinicians, nutritionists and wellness
            specialists—available whenever you need perspective.
          </p>
          <div className={styles.heroMetric}>
            <strong>{webinarArchive.length}</strong>
            <span>recorded expert sessions</span>
          </div>
        </div>
      </section>

      <a className={styles.featured} href={featured.watch} target="_blank" rel="noreferrer">
        <div className={styles.featuredMedia}>
          <Image
            src={featured.banner}
            alt={featured.title}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 62vw"
          />
          <span className={styles.play} aria-hidden="true"><Play /></span>
        </div>
        <div className={styles.featuredCopy}>
          <div>
            <small>Featured session</small>
            <h2>{featured.title}</h2>
            <p>
              A focused expert discussion about when surgery is considered,
              how care is evaluated and what sustainable support looks like.
            </p>
          </div>
          <div className={styles.featuredMeta}>
            <span>{featured.date}</span>
            <span>{featured.time}</span>
          </div>
        </div>
      </a>

      <section className={styles.collection}>
        <div className={styles.collectionHeader}>
          <h2>Watch the archive</h2>
          <p>
            Explore medical, nutritional, psychological and movement-based
            perspectives on healthier weight management.
          </p>
        </div>
        <div className={styles.webinarGrid}>
          {archive.map((webinar) => (
            <a
              className={styles.webinarCard}
              href={webinar.watch}
              target="_blank"
              rel="noreferrer"
              key={`${webinar.title}-${webinar.date}`}
            >
              <div className={styles.webinarImage}>
                <Image
                  src={webinar.banner}
                  alt={webinar.title}
                  fill
                  sizes="(max-width: 580px) 100vw, (max-width: 1024px) 50vw, 32vw"
                />
              </div>
              <h3>{webinar.title}</h3>
              <p>{webinar.date} · {webinar.time}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
