import Image from "next/image";
import {
  ArrowUpRight,
  BookOpen,
  Mail,
  MessageCircle,
  Phone,
  Play,
} from "lucide-react";
import { advisors, categories } from "@/components/iwlc/data";
import styles from "./page.module.css";

export const metadata = {
  title: "India's Biggest Weight Loss Challenge",
  description:
    "A science-guided, community-powered weight loss challenge for individuals, families and organisations across India.",
};

const sourceImages = [
  {
    src: "/iwlc/stories/event-community-group.jpeg",
    alt: "IWLC organisers and guests together at the 2026 awards event",
    format: "storyLandscape",
  },
  {
    src: "/iwlc/stories/event-keynote.jpeg",
    alt: "Keynote address at the 2026 IWLC awards and recognition ceremony",
    format: "storyLandscape",
  },
  {
    src: "/iwlc/stories/press-dasha-news.jpeg",
    alt: "Dasha News coverage of the IWLC weight loss challenge",
    format: "storySquare",
  },
  {
    src: "/iwlc/stories/press-feature-pair.jpeg",
    alt: "Press feature with photographs from the IWLC awards ceremony",
    format: "storyWide",
  },
  {
    src: "/iwlc/stories/press-local-interview.jpeg",
    alt: "Local media interview about healthier living and IWLC",
    format: "storyPortrait",
  },
  {
    src: "/iwlc/stories/press-indian-chronicle.jpeg",
    alt: "Indian Chronicle feature on the LivLife weight loss challenge",
    format: "storyLandscape",
  },
  {
    src: "/iwlc/stories/press-wake-up-telangana.jpeg",
    alt: "Wake Up Telangana report on the three-month weight loss challenge",
    format: "storyPortrait",
  },
  {
    src: "/iwlc/stories/press-express-telugu.jpeg",
    alt: "Express Telugu Daily coverage of the IWLC finale",
    format: "storyLandscape",
  },
  {
    src: "/iwlc/stories/press-abn-andhrajyothy.jpeg",
    alt: "ABN Andhra Jyothy coverage of the completed weight loss challenge",
    format: "storyPortrait",
  },
  {
    src: "/iwlc/stories/press-sakshi.jpeg",
    alt: "Sakshi report on healthier living and weight management",
    format: "storySquare",
  },
  {
    src: "/iwlc/stories/press-deccan-news.jpeg",
    alt: "Deccan News Service feature on the LivLife weight loss challenge",
    format: "storyLandscape",
  },
  {
    src: "/iwlc/stories/press-namaste-telangana.jpeg",
    alt: "Namaste Telangana report about the IWLC finale",
    format: "storyPortrait",
  },
  {
    src: "/iwlc/stories/press-suryaa.jpeg",
    alt: "Suryaa newspaper coverage of the IWLC programme",
    format: "storyLandscape",
  },
  {
    src: "/iwlc/stories/press-andhra-prabha.jpeg",
    alt: "Andhra Prabha report about the IWLC programme and awards",
    format: "storyPortrait",
  },
];

const statistics = [
  { value: "70%", label: "Urban Indians overweight or obese" },
  { value: "36%", label: "Women affected in Telangana" },
  { value: "200M", label: "Indians affected nationwide" },
  { value: "5×", label: "Increase since 1990" },
];

const knowledge = [
  {
    count: "14",
    title: "Expert webinars",
    text: "Recorded conversations on diet, exercise, psychology, heart health and sustainable weight loss.",
    href: "/iwlc/webinars",
    icon: Play,
  },
  {
    count: "23",
    title: "Health tips",
    text: "Practical guidance designed to support better everyday decisions throughout the challenge.",
    href: "/iwlc/health-tips",
    icon: ArrowUpRight,
  },
  {
    count: "05",
    title: "Health guides",
    text: "Downloadable reading on diet, exercise, popular diets, obesity and weight management.",
    href: "/iwlc/health-guides",
    icon: BookOpen,
  },
];

export default function IWLCHomepage() {
  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>

      <section className={styles.hero} id="top">
        <div className={styles.heroBackdrop} aria-hidden="true">
          <Image
            className={styles.heroBackgroundDesktop}
            src="/iwlc/hero-community-desktop-v2.webp"
            alt=""
            fill
            priority
            sizes="100vw"
          />
          <Image
            className={styles.heroBackgroundMobile}
            src="/iwlc/hero-community-mobile-v2.webp"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>

        <header className={styles.header}>
          <nav className={styles.nav} aria-label="Primary navigation">
            <a href="#challenge">Challenge</a>
            <a href="#awards">Awards</a>
            <a href="#knowledge">Knowledge</a>
            <a href="#categories">Categories</a>
          </nav>

          <div className={styles.headerEnd}>
            <details className={styles.mobileMenu}>
              <summary>Menu</summary>
              <nav aria-label="Mobile navigation">
                <a href="#challenge">Challenge</a>
                <a href="#awards">Awards</a>
                <a href="#knowledge">Knowledge</a>
                <a href="#categories">Categories</a>
                <a href="#contact">Contact</a>
              </nav>
            </details>
          </div>
        </header>

        <div className={styles.heroGrid} id="main-content">
          <div className={styles.logoStage} aria-label="India Weight Loss Challenge">
            <div className={styles.logoHalo} aria-hidden="true" />
            <div className={styles.heroLogo}>
              <Image
                className={styles.heroShield}
                src="/iwlc/iwlc-shield-transparent-v3.png"
                alt="India's Biggest Weight Loss Challenge shield"
                width={1254}
                height={1254}
                priority
                sizes="(max-width: 700px) 72vw, 470px"
              />
            </div>
            <h1 className={styles.heroTagline}>
              You&apos;re not alone on this journey.
            </h1>
            <div className={styles.heroPartners} aria-label="Active Life and LivLife Hospitals">
              <Image
                src="/iwlc/activelife-on-dark-v1.png"
                alt="Active Life"
                width={272}
                height={71}
              />
              <Image
                src="/iwlc/livlife-on-dark-v1.png"
                alt="LivLife Hospitals"
                width={138}
                height={91}
              />
            </div>
          </div>
        </div>

      </section>

      <section className={styles.stories} id="stories">
        <div className={styles.sectionHeading}>
          <h2>Every journey has a story.</h2>
        </div>

        <div className={styles.storyRail} aria-label="Campaign and advisory team gallery">
          <div className={styles.storyTrack}>
            {[...sourceImages, ...sourceImages].map((item, index) => (
              <figure
                className={`${styles.storyCard} ${styles[item.format]}`}
                key={`${item.src}-${index}`}
                aria-hidden={index >= sourceImages.length}
              >
                <Image
                  src={item.src}
                  alt={index < sourceImages.length ? item.alt : ""}
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 1100px) 48vw, 36vw"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.challenge} id="challenge">
        <div className={styles.challengeHeading}>
          <h2>A national challenge. Personal change.</h2>
          <p>
            Excess weight is not only an Indian concern—it is a growing global
            health challenge that can affect energy, mobility, confidence and
            long-term wellbeing. When one person feels healthier, the benefits
            reach families, workplaces and communities. Personal change,
            multiplied across millions of lives, can help build a healthier and
            stronger nation.
          </p>
        </div>

        <div className={styles.impactLayout}>
          <div className={styles.impactVisual}>
            <figure className={styles.indiaMap}>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/b/b4/India_outline.svg"
                alt="Outline map of India"
                width={667}
                height={777}
                unoptimized
              />
              <figcaption>India</figcaption>
            </figure>

            <figure className={styles.impactPeople}>
              <Image
                src="/iwlc/challenge-men-strain-v1.webp"
                alt="Indian men pausing to recover after physical exertion on outdoor steps"
                fill
                sizes="(max-width: 860px) 100vw, 46vw"
              />
              <figcaption>Everyday movement should feel possible.</figcaption>
            </figure>
          </div>

          <div className={styles.stats} aria-label="Weight and obesity statistics published by IWLC">
            {statistics.map((stat) => (
              <article key={stat.value}>
                <strong>{stat.value}</strong>
                <p>{stat.label}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.impactNote}>
          <p>Science-guided support for safer, sustainable progress.</p>
          <small>
            Figures published by IWLC. Map: <a href="https://commons.wikimedia.org/wiki/File:India_outline.svg" target="_blank" rel="noreferrer">Wikimedia Commons, CC BY-SA 3.0</a>.
          </small>
        </div>
      </section>

      <section className={styles.awards} id="awards">
        <div className={styles.awardVisual}>
          <Image
            className={styles.awardTransformation}
            src="/iwlc/award-woman-transformation-v1.webp"
            alt="The same Indian woman before and after becoming fitter"
            fill
            sizes="(max-width: 860px) 100vw, 58vw"
          />
          <div className={styles.transformationLabels} aria-hidden="true">
            <span>Before</span>
            <span>Now</span>
          </div>
          <small className={styles.transformationNote}>Illustrative transformation</small>
          <span>Total cash prize pool</span>
          <strong>
            <span>₹</span>
            <b>4,00,000</b>
          </strong>
        </div>

        <div className={styles.awardCopy}>
          <h2>You could become fitter like her—and win ₹4 lakh too.</h2>
          <p className={styles.awardPromise}>
            You don&apos;t just win <strong>₹4 lakh</strong>. You win yourself
            back—your confidence, your body and your future.
          </p>
          <p>
            Individual male and female achievers compete for dedicated cash
            awards, with ₹1,00,000 first prizes in each group.
          </p>
          <ul>
            <li>Premium hotel stays and dining experiences for couples and families</li>
            <li>Rolling trophies for schools, hospitals, clinics and corporate teams</li>
            <li>Certificates and recognition for winning participants</li>
          </ul>
        </div>
      </section>

      <section className={styles.knowledge} id="knowledge">
        <div className={styles.knowledgeLead}>
          <h2>Expert knowledge that moves with you.</h2>
          <p>
            Practical learning from doctors, nutritionists and wellness experts.
          </p>
          <a
            href="/iwlc/webinars"
          >
            Explore the webinar archive <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <a
          className={styles.webinarFeature}
          href="https://youtu.be/UuuzdFMP3Mw?si=95GYzl9oBywBtEx9"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="https://www.indiaweightlosschallenge.in/app/banners/1783668126.jpeg"
            alt="Success Stories of Weight Loss webinar"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
          />
          <span className={styles.playButton} aria-hidden="true"><Play /></span>
          <div>
            <small>Featured conversation</small>
            <strong>Success Stories of Weight Loss</strong>
          </div>
        </a>

        <div className={styles.knowledgeList}>
          {knowledge.map((item) => {
            const Icon = item.icon;
            return (
              <a href={item.href} key={item.title}>
                <span>{item.count}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <Icon aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </section>

      <section className={styles.categories} id="categories">
        <div className={styles.categoryLead}>
          <h2>There is a place for everyone.</h2>
          <p>
            Join individually, with family, or through your organisation.
          </p>
        </div>
        <div className={styles.categoryList}>
          {categories.map((category, index) => (
            <a href="#contact" key={category}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{category}</strong>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <section className={styles.advisory} id="advisors">
        <div className={styles.advisoryHeading}>
          <h2>Meet the leaders behind the revolution.</h2>
        </div>
        <div className={styles.advisorGrid}>
          {advisors.map((advisor) => (
            <article key={advisor.name}>
              <div className={styles.advisorImage}>
                <Image
                  src={advisor.image}
                  alt={advisor.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
              </div>
              <h3>{advisor.name}</h3>
              <p>{advisor.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contact} id="contact">
        <div>
          <span>Take the first step</span>
          <h2>Healthy change starts with one conversation.</h2>
        </div>
        <div className={styles.contactLinks}>
          <a
            href="https://wa.me/919398944938"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle aria-hidden="true" />
            <span>
              WhatsApp
              <small>Dr. Nadeem · +91 93989 44938</small>
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a href="tel:+919603555536">
            <Phone aria-hidden="true" />
            <span>
              Call
              <small>Dr. Nanda Kishore · +91 96035 55536</small>
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a href="mailto:support@indiaweightlosschallenge.in">
            <Mail aria-hidden="true" />
            <span>
              Email
              <small>support@indiaweightlosschallenge.in</small>
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <Image
            src="https://www.indiaweightlosschallenge.in/images/inbwlc.png"
            alt=""
            width={74}
            height={84}
          />
          <p>Healthy change starts with one conversation.</p>
        </div>
        <div className={styles.footerPartners}>
          <Image
            src="https://www.indiaweightlosschallenge.in/images/activelifelogo.png"
            alt="Active Life"
            width={143}
            height={56}
          />
          <Image
            src="https://www.indiaweightlosschallenge.in/images/livlifelogo.png"
            alt="LivLife Hospitals"
            width={120}
            height={56}
          />
        </div>
        <div className={styles.footerMeta}>
          <span>Hyderabad · Telangana · India</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
