import Link from "next/link";
import { notFound } from "next/navigation";
import { divisions, projects } from "@/data/frontiers";
import { articles } from "@/data/articles";
import { pageMeta } from "@/lib/content";
import { ArrowLink, Disclosure } from "@/components/Shell";
import Visual from "@/components/Visual";
import { TechnologyModel } from "@/components/ScrollExperience";
type Params = { section: string; slug: string };
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    ...divisions.map((d) => ({ section: "technologies", slug: d.slug })),
    ...projects.map((p) => ({ section: "projects", slug: p.slug })),
    ...articles.map((a) => ({ section: a.section, slug: a.slug })),
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { section, slug } = await params;
  const d =
      section === "technologies"
        ? divisions.find((d) => d.slug === slug)
        : undefined,
    p =
      section === "projects"
        ? projects.find((p) => p.slug === slug)
        : undefined,
    a = articles.find((a) => a.section === section && a.slug === slug);
  return pageMeta(
    d?.name || p?.name || a?.title || "Not found",
    d?.description || p?.description || a?.summary || "Explore TERA INDUSTRIES",
    `/${section}/${slug}`,
  );
}
export default async function Page({ params }: { params: Promise<Params> }) {
  const { section, slug } = await params;
  if (section === "technologies") {
    const d = divisions.find((d) => d.slug === slug);
    if (!d) notFound();
    const related = projects.filter((p) => p.divisions.includes(slug));
    const reading = articles.filter((a) => a.divisions.includes(slug));
    return (
      <div className="page-shell detail">
        <Link href="/technologies" className="back-link">
          ← ALL TECHNOLOGIES
        </Link>
        <div className="detail-hero">
          <div>
            <p className="eyebrow">
              DIVISION {String(divisions.indexOf(d) + 1).padStart(2, "0")} /{" "}
              {d.field}
            </p>
            <h1>{d.short}</h1>
            <p className="detail-tagline">{d.tagline}</p>
            <span className="status">Research Direction</span>
          </div>
          <TechnologyModel kind={d.visual} />
        </div>
        <div className="detail-body">
          <aside>
            <p className="eyebrow">FIELD NOTES</p>
            <h2>{d.name}</h2>
            <div className="topic-list">
              {d.topics.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </aside>
          <div className="prose">
            <p className="lead">{d.description}</p>
            <h2>The scientific mechanism</h2>
            <p>{d.mechanism}</p>
            <h2>The engineering challenge</h2>
            <p>{d.challenge}</p>
            <h2>Where it could lead</h2>
            <p>{d.application}</p>
            <h2>What would count as progress?</h2>
            <p>
              A credible next step defines a narrow question, documents
              assumptions, and produces a reproducible comparison. Independent
              validation, safety review, and evidence from realistic operating
              conditions would be needed before moving beyond a concept.
            </p>
          </div>
        </div>
        <section className="related">
          <p className="eyebrow">CONNECTED INITIATIVES</p>
          <div className="related-links">
            {related.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`}>
                <span>{p.status}</span>
                <h3>{p.name} ↗</h3>
                <p>{p.description}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className="related">
          <p className="eyebrow">FURTHER EXPLORATION</p>
          <div className="related-links">
            {(reading.length ? reading : articles.slice(5, 6))
              .slice(0, 3)
              .map((a) => (
                <Link key={a.slug} href={`/${a.section}/${a.slug}`}>
                  <span>{a.category}</span>
                  <h3>{a.title} ↗</h3>
                </Link>
              ))}
          </div>
        </section>
        <Disclosure />
      </div>
    );
  }
  if (section === "projects") {
    const p = projects.find((p) => p.slug === slug);
    if (!p) notFound();
    return (
      <div className="page-shell detail">
        <Link href="/projects" className="back-link">
          ← ALL INITIATIVES
        </Link>
        <div className="detail-hero">
          <div>
            <p className="eyebrow">FEATURED INITIATIVE</p>
            <h1>{p.name}</h1>
            <p className="detail-tagline">{p.title}</p>
            <span className="status">{p.status}</span>
          </div>
          <Visual kind={p.visual} />
        </div>
        <div className="detail-body">
          <aside>
            <p className="eyebrow">CROSS-DISCIPLINARY BY DESIGN</p>
            <h2>Connected foundations</h2>
            <div className="topic-list">
              {p.divisions.map((s) => (
                <Link href={`/technologies/${s}`} key={s}>
                  {divisions.find((d) => d.slug === s)?.short} ↗
                </Link>
              ))}
            </div>
          </aside>
          <div className="prose">
            <p className="lead">{p.description}</p>
            {[
              { title: "The problem", body: p.problem },
              { title: "The concept", body: p.approach },
              { title: "The major unknowns", body: p.unknown },
              { title: "Possible applications", body: p.applications },
            ].map((s) => (
              <section key={s.title}>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </section>
            ))}
            <h2>A path to evidence</h2>
            <ol>
              <li>Define requirements, assumptions, and safety boundaries.</li>
              <li>Model a bounded subsystem and publish its limitations.</li>
              <li>Design independent tests before expanding the claim.</li>
            </ol>
            <p>
              This sequence is a proposed study method. It does not describe
              completed TERA work, committed funding, or a delivery schedule.
            </p>
          </div>
        </div>
        <div className="related">
          <p className="eyebrow">RESEARCH CONNECTIONS</p>
          <div className="related-links">
            {articles
              .filter((a) => a.divisions.some((d) => p.divisions.includes(d)))
              .slice(0, 3)
              .map((a) => (
                <Link key={a.slug} href={`/${a.section}/${a.slug}`}>
                  <span>{a.category}</span>
                  <h3>{a.title} ↗</h3>
                </Link>
              ))}
          </div>
        </div>
        <Disclosure />
      </div>
    );
  }
  const a = articles.find((a) => a.section === section && a.slug === slug);
  if (!a) notFound();
  return (
    <article className="page-shell article">
      <Link className="back-link" href={`/${section}`}>
        ← {section.toUpperCase()}
      </Link>
      <header className="article-header">
        <p className="eyebrow">{a.category} / ORIGINAL TERA EDITORIAL</p>
        <h1>{a.title}</h1>
        <p>{a.summary}</p>
        <span className="article-label">
          Educational content · No TERA experimental results claimed
        </span>
      </header>
      <Visual kind={a.visual} className="article-visual" />
      <div className="article-columns">
        <aside>
          <p className="eyebrow">IN THIS ARTICLE</p>
          {a.sections.map((s, i) => (
            <a key={s.title} href={`#section-${i}`}>
              {String(i + 1).padStart(2, "0")} / {s.title}
            </a>
          ))}
        </aside>
        <div className="prose">
          {a.sections.map((s, i) => (
            <section key={s.title} id={`section-${i}`}>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          {a.source && (
            <div className="source-note">
              <h2>Science reference</h2>
              <p>
                This external source provides background on the underlying
                science; it does not validate the fictional TERA concept.
              </p>
              <a href={a.source.url} target="_blank" rel="noreferrer">
                {a.source.name} ↗
              </a>
            </div>
          )}
          <div className="source-note">
            <h2>About this article</h2>
            <p>
              An original educational explanation or perspective created for
              this fictional concept site. It is not a peer-reviewed
              publication, corporate research result, or medical recommendation.
            </p>
          </div>
        </div>
      </div>
      <section className="related">
        <p className="eyebrow">EXPLORE THE FOUNDATIONS</p>
        <div className="related-links">
          {a.divisions.map((s) => (
            <Link key={s} href={`/technologies/${s}`}>
              <h3>{divisions.find((d) => d.slug === s)?.short} ↗</h3>
            </Link>
          ))}
        </div>
      </section>
      <ArrowLink href={`/${section}`}>Continue exploring</ArrowLink>
    </article>
  );
}
