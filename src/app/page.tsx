import Link from "next/link";
import Image from "next/image";
import { divisions } from "@/data/frontiers";
import { articles } from "@/data/articles";
import { ArrowLink } from "@/components/Shell";
import { Ecosystem, Journey } from "@/components/Interactions";
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
      <section className="hero">
        <Image
          src="/media/photography/energy.webp"
          alt="PS20 and PS10 solar power plants photographed by kallerna"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <h1>
            Engineering the
            <br />
            next era of civilization.
          </h1>
          <p>Intelligence, energy, matter, life, and space.</p>
          <div className="hero-actions">
            <ArrowLink href="/technologies" primary>
              Explore technologies
            </ArrowLink>
            <ArrowLink href="/about">Our vision</ArrowLink>
          </div>
        </div>
        <div className="hero-foot">
          <span>TERA INDUSTRIES / CONCEPT PROJECT</span>
          <a href="#mission">Scroll to explore ↓</a>
        </div>
      </section>
      <section id="mission" className="statement-section">
        <h2>
          Better ways to compute.
          <br />
          New sources of energy.
          <br />
          <span>A future beyond Earth.</span>
        </h2>
        <div>
          <p>
            We explore the engineering that connects these ambitions, from the
            materials inside a reactor to the systems that keep a spacecraft
            running.
          </p>
          <Link href="/about" className="text-link">
            Meet TERA INDUSTRIES →
          </Link>
        </div>
      </section>
      <section className="photo-scene fusion-scene">
        <Visual kind="fusion" />
        <div className="scene-shade" />
        <div className="scene-copy">
          <p className="eyebrow">Energy</p>
          <h2>
            Start with
            <br />
            the source.
          </h2>
          <p>
            Explore plasma confinement, reactor materials, and the challenge of
            turning fusion into useful power.
          </p>
          <ArrowLink href="/projects/tera-fusion" primary>
            Explore TERA FUSION
          </ArrowLink>
        </div>
      </section>
      <section className="technology-section">
        <div className="section-heading">
          <h2>
            The foundations
            <br />
            of what comes next.
          </h2>
          <Link href="/technologies" className="text-link">
            All technologies →
          </Link>
        </div>
        <div className="technology-pair">
          {[divisions[1], divisions[3]].map((d) => (
            <Link
              key={d.slug}
              href={`/technologies/${d.slug}`}
              className="technology-photo"
            >
              <Visual kind={d.visual} />
              <h3>{d.short}</h3>
              <p>
                {d.slug === "semiconductor-systems"
                  ? "The devices, packaging, and architectures behind modern computing."
                  : "Learning systems for scientific work and industrial decision-making."}
              </p>
              <span className="text-link">Explore →</span>
            </Link>
          ))}
        </div>
        <div className="discipline-links">
          {divisions
            .filter((d) => ![1, 3].includes(divisions.indexOf(d)))
            .map((d) => (
              <Link key={d.slug} href={`/technologies/${d.slug}`}>
                {d.short}
                <span>→</span>
              </Link>
            ))}
        </div>
      </section>
      <section className="photo-scene space-scene">
        <Visual kind="orbital" />
        <div className="scene-shade" />
        <div className="scene-copy">
          <p className="eyebrow">Space infrastructure</p>
          <h2>
            Beyond a mission.
            <br />A lasting presence.
          </h2>
          <p>
            Power, transport, life support, and repair. The systems needed to
            keep working beyond Earth.
          </p>
          <ArrowLink href="/projects/tera-orbital" primary>
            Explore TERA ORBITAL
          </ArrowLink>
        </div>
      </section>
      <section className="human-section">
        <div className="human-copy">
          <p className="eyebrow">Human futures</p>
          <h2>
            More capability.
            <br />
            More control.
          </h2>
          <p>
            Assistive machines and interfaces should serve the people who use
            them. That means access, consent, and the freedom to choose.
          </p>
          <ArrowLink href="/human-futures">Explore human futures</ArrowLink>
        </div>
        <Visual kind="human" />
      </section>
      <section className="civilization-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The long view</p>
            <h2>
              Where could
              <br />
              civilization go?
            </h2>
          </div>
          <p>
            Six stages, from present-day infrastructure to distant speculation.
            Select a stage to explore its requirements.
          </p>
        </div>
        <Visual kind="earth" className="earth-panorama" />
        <Journey />
      </section>
      <section className="connections-section">
        <div className="section-heading">
          <h2>
            One field leads
            <br />
            to another.
          </h2>
          <p>Explore the relationships between the technologies.</p>
        </div>
        <Ecosystem />
      </section>
      <section className="reading-section">
        <div className="section-heading">
          <h2>A closer look.</h2>
          <Link href="/research" className="text-link">
            Research and explainers →
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
              <span className="text-link">Read →</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="closing">
        <h2>Explore the work.</h2>
        <ArrowLink href="/projects" primary>
          All ten initiatives
        </ArrowLink>
      </section>
    </>
  );
}
