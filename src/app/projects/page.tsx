import Link from "next/link";
import { projects } from "@/data/frontiers";
import { PageIntro, Disclosure } from "@/components/Shell";
import Visual from "@/components/Visual";
import { pageMeta } from "@/lib/content";
export const metadata = pageMeta(
  "Featured initiatives",
  "Ten concept-stage initiatives connecting scientific disciplines with future engineering possibilities.",
  "/projects",
);
export default function Page() {
  return (
    <div className="page-shell">
      <PageIntro
        label="Concept studies"
        title="Projects."
        description="Ten concepts across energy, computing, biology, and space. Each describes an engineering problem and the questions still open."
      />
      <Disclosure />
      <div className="project-grid portfolio">
        {projects.map((p, i) => (
          <Link
            href={`/projects/${p.slug}`}
            key={p.slug}
            className="project-card"
          >
            <Visual kind={p.visual} />
            <div className="project-copy">
              <span className="status">{p.status}</span>
              <span className="project-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2>
                {p.name}
                <span>↗</span>
              </h2>
              <p>{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
