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
        label="INITIATIVES / CONCEPT PORTFOLIO"
        title="The future, under exploration."
        description="Ten connected initiatives. Each starts with a meaningful question, makes its dependencies visible, and names what remains unknown."
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
