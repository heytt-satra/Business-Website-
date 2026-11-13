import Link from "next/link";
import Image from "next/image";
import { divisions, projects } from "@/data/frontiers";
import { articles } from "@/data/articles";
import { ArrowLink, SectionTitle } from "@/components/Shell";
import { Ecosystem, Journey, Reveal } from "@/components/Interactions";
import Visual from "@/components/Visual";
import { pageMeta } from "@/lib/content";
export const metadata = pageMeta(
  "Engineering the Next Era of Civilization",
  "Explore the connected frontiers of intelligence, energy, matter, life, and space. A fictional, concept-stage industrial research vision.",
  "/",
);
export default function Home() {
  return (
    <>
      <Reveal />
      <section className="hero">
        <Image
          src="/media/orbital-hero.webp"
          alt="Synthetic concept render of a modular orbital station above Earth's horizon"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">
            <span className="blue-dot" /> INTELLIGENCE. ENERGY. MATTER. LIFE.
            SPACE.
          </p>
          <h1>
            ENGINEERING
            <br />
            THE NEXT ERA
            <br />
            OF <span>CIVILIZATION.</span>
          </h1>
          <p className="hero-description">
            TERA INDUSTRIES explores the frontiers of intelligence, energy,
            matter, life, and space — developing the scientific foundations and
            technological concepts that could shape humanity’s future.
          </p>
          <div className="hero-actions">
            <ArrowLink href="/technologies" primary>
              EXPLORE OUR TECHNOLOGIES
            </ArrowLink>
            <ArrowLink href="/about">DISCOVER OUR VISION</ArrowLink>
          </div>
        </div>
        <div className="hero-foot">
          <span>
            <i className="blue-dot" /> A CONCEPT-STAGE FRONTIER TECHNOLOGY
            VISION
          </span>
          <span>ORBITAL INFRASTRUCTURE / CONCEPT RENDER</span>
          <a href="#mission" aria-label="Scroll to our mission">
            SCROLL TO EXPLORE ↓
          </a>
        </div>
      </section>
      <div className="frontier-strip">
        {["INTELLIGENCE", "ENERGY", "MATTER", "LIFE", "SPACE"].map((x, i) => (
          <span key={x}>
            <small>0{i + 1}</small>
            {x}
            <i>+</i>
          </span>
        ))}
      </div>
      <section id="mission" className="section mission reveal">
        <p className="eyebrow">01 / OUR REASON TO EXIST</p>
        <div>
          <h2>
            Humanity’s future will not be defined by the limits we inherit,{" "}
            <span>but by the frontiers we choose to engineer.</span>
          </h2>
          <div className="mission-bottom">
            <p>
              Progress happens where disciplines meet. We explore the
              connections between fundamental science and the systems a more
              capable civilization could need.
            </p>
            <Link href="/about" className="text-link">
              Discover our vision ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="section divisions-section reveal">
        <SectionTitle
          number="02 /"
          label="TECHNOLOGY DIVISIONS"
          title="Ten frontiers. One connected vision."
          href="/technologies"
          link="Explore all divisions"
        />
        <div className="division-showcase">
          <Link
            href="/technologies/nuclear-systems"
            className="division-feature"
          >
            <Visual kind="fusion" />
            <div>
              <span className="eyebrow">01 / ENERGY</span>
              <h3>
                Nuclear systems <span>↗</span>
              </h3>
              <p>Power, at the heart of matter.</p>
            </div>
          </Link>
          <div className="division-list">
            {divisions.slice(1).map((d, i) => (
              <Link key={d.slug} href={`/technologies/${d.slug}`}>
                <span className="list-number">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <h3>{d.short}</h3>
                <span className="list-field">{d.field}</span>
                <span>↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section initiatives reveal">
        <SectionTitle
          number="03 /"
          label="FEATURED INITIATIVES"
          title="Ideas at the edge of possibility."
          href="/projects"
          link="View all initiatives"
        />
        <div className="project-grid">
          {[projects[5], projects[0], projects[1]].map((p) => (
            <Link
              href={`/projects/${p.slug}`}
              key={p.slug}
              className="project-card"
            >
              <Visual kind={p.visual} />
              <div className="project-copy">
                <span className="status">{p.status}</span>
                <h3>
                  {p.name}
                  <span>↗</span>
                </h3>
                <p>{p.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="human-feature">
        <div className="human-art">
          <Visual kind="human" color="#d9dfe6" />
        </div>
        <div className="human-copy">
          <p className="eyebrow">04 / HUMAN FUTURES</p>
          <h2>
            More capable.
            <br />
            More human.
          </h2>
          <p>
            The next evolution of human capability begins with well-being,
            accessibility, and agency. Explore technology designed around the
            people it serves.
          </p>
          <ArrowLink href="/human-futures">EXPLORE HUMAN FUTURES</ArrowLink>
        </div>
        <span className="technical-caption">
          HUMAN–MACHINE INTERFACE / CONCEPT DIAGRAM
        </span>
      </section>
      <section className="section reveal">
        <SectionTitle
          number="05 /"
          label="THE CIVILIZATION JOURNEY"
          title="From our home. To the unknown."
        />
        <p className="section-intro">
          Six horizons of possibility, from today’s engineering foundations to
          explicitly speculative futures. A map of questions, not a schedule.
        </p>
        <Journey />
      </section>
      <section className="section network-section reveal">
        <SectionTitle
          number="06 /"
          label="THE TECHNOLOGY ECOSYSTEM"
          title="No frontier exists in isolation."
        />
        <p className="section-intro">
          Follow the relationships that turn individual fields into connected
          systems.
        </p>
        <Ecosystem />
      </section>
      <section className="section reveal">
        <SectionTitle
          number="07 /"
          label="RESEARCH & PERSPECTIVES"
          title="Understand what comes next."
          href="/research"
          link="Enter the research hub"
        />
        <div className="editorial-grid">
          {[articles[0], articles[1], articles[7]].map((a) => (
            <Link
              href={`/${a.section}/${a.slug}`}
              key={a.slug}
              className="editorial-card"
            >
              <Visual kind={a.visual} />
              <p className="eyebrow">{a.category}</p>
              <h3>
                {a.title} <span>↗</span>
              </h3>
              <p>{a.summary}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="closing">
        <p className="eyebrow">THE FUTURE IS ENGINEERED</p>
        <h2>
          Beyond the limits
          <br />
          of what is possible.
        </h2>
        <ArrowLink href="/technologies" primary>
          EXPLORE THE FRONTIERS
        </ArrowLink>
        <p className="closing-note">
          A fictional vision. Real engineering questions.
        </p>
      </section>
    </>
  );
}
