import Link from "next/link";
import { articles } from "@/data/articles";
import { ArrowLink } from "@/components/Shell";
import {
  CivilizationScroll,
  TechnologyExplorer,
  HeroFilm,
  ScrollEffects,
} from "@/components/ScrollExperience";
import Visual from "@/components/Visual";
import { pageMeta } from "@/lib/content";
export const metadata = pageMeta(
  "Engineering the next era of civilization",
  "A concept-stage exploration of intelligence, energy, matter, life, and space.",
  "/",
);

export default function Home() {
  return (
    <>
      <ScrollEffects />
      <section className="hero film-hero scroll-scene">
        <HeroFilm />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="hero-eyebrow">TERA INDUSTRIES</p>
          <h1>
            Built for Earth.
            <br />
            Bound for more.
          </h1>
          <p>Intelligence. Energy. Life. Space.</p>
          <div className="hero-actions">
            <ArrowLink href="#technologies" primary>
              Explore TERA
            </ArrowLink>
            <ArrowLink href="#civilization">The long view</ArrowLink>
          </div>
        </div>
        <div className="hero-foot">
          <span>A CONCEPT-STAGE RESEARCH VISION</span>
          <a href="#mission">
            Scroll to explore <span className="scroll-arrow">↓</span>
          </a>
        </div>
        <span className="film-credit">
          Earth visualization: NASA / Scientific Visualization Studio
        </span>
      </section>
      <section
        id="mission"
        className="statement-section scroll-statement scroll-scene"
      >
        <p className="eyebrow">One connected ambition</p>
        <h2>
          The next chapter of civilization
          <br />
          starts with what we can build.
          <br />
          <span>And how far we dare to look.</span>
        </h2>
        <div>
          <p>
            Compute needs energy. Energy needs materials. Life beyond Earth
            needs all of them. TERA brings these questions into one research
            vision.
          </p>
          <Link href="/about" className="text-link">
            Meet TERA INDUSTRIES ↗
          </Link>
        </div>
      </section>
      <CivilizationScroll />
      <TechnologyExplorer />
      <section id="energy" className="photo-scene fusion-scene scroll-scene">
        <Visual kind="fusion" />
        <div className="scene-shade" />
        <div className="scene-copy">
          <p className="eyebrow">TERA FUSION / Nuclear systems</p>
          <h2>
            It starts
            <br />
            with energy.
          </h2>
          <p>
            Plasma, magnetic fields, and the materials that must withstand them.
            Explore what it takes to turn fusion into useful power.
          </p>
          <ArrowLink href="/projects/tera-fusion" primary>
            Explore TERA FUSION
          </ArrowLink>
        </div>
      </section>
      <section className="photo-scene space-scene scroll-scene">
        <Visual kind="orbital" />
        <div className="scene-shade" />
        <div className="scene-copy">
          <p className="eyebrow">TERA ORBITAL / Space systems</p>
          <h2>
            Beyond arrival.
            <br />A lasting presence.
          </h2>
          <p>
            Power, transport, life support, and repair. The infrastructure
            needed to keep working beyond Earth.
          </p>
          <ArrowLink href="/projects/tera-orbital" primary>
            Explore TERA ORBITAL
          </ArrowLink>
        </div>
      </section>
      <section className="human-section scroll-scene">
        <div className="human-copy">
          <p className="eyebrow">TERA HUMAN / Human futures</p>
          <h2>
            More capability.
            <br />
            More control.
          </h2>
          <p>
            Assistive machines and interfaces should serve the people who use
            them. Access, consent, and the freedom to choose come first.
          </p>
          <ArrowLink href="/human-futures">Explore human futures</ArrowLink>
        </div>
        <Visual kind="human" />
      </section>
      <section className="reading-section">
        <div className="section-heading">
          <h2>A closer look.</h2>
          <Link href="/research" className="text-link">
            Research and explainers ↗
          </Link>
        </div>
        <div className="editorial-grid">
          {[articles[0], articles[1], articles[3]].map((a) => (
            <Link
              key={a.slug}
              className="editorial-card"
              href={`/${a.section}/${a.slug}`}
            >
              <Visual kind={a.visual} />
              <p className="eyebrow">{a.category}</p>
              <h3>{a.title}</h3>
              <span className="text-link">Read ↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="closing">
        <p className="eyebrow">Keep looking forward</p>
        <h2>Explore what comes next.</h2>
        <ArrowLink href="/projects" primary>
          All ten initiatives
        </ArrowLink>
      </section>
    </>
  );
}
