import Link from "next/link";
import { articles } from "@/data/articles";
import { PageIntro, Disclosure } from "./Shell";
import Visual from "./Visual";
export default function ArticleIndex({
  section,
}: {
  section: "research" | "insights";
}) {
  const list = articles.filter((a) => a.section === section);
  return (
    <div className="page-shell">
      <PageIntro
        label={
          section === "research"
            ? "RESEARCH & DISCOVERY"
            : "PERSPECTIVES / EDITORIAL"
        }
        title={
          section === "research"
            ? "Understand the mechanisms."
            : "Think beyond the immediate."
        }
        description={
          section === "research"
            ? "Explore the science, constraints, and systems behind frontier technologies. Original explainers and clearly labeled concept studies."
            : "Perspectives on scientific discovery, human capability, and the engineering questions that shape our future."
        }
      />
      <div className="editorial-grid article-index">
        {list.map((a) => (
          <Link
            key={a.slug}
            href={`/${section}/${a.slug}`}
            className="editorial-card"
          >
            <Visual kind={a.visual} />
            <p className="eyebrow">{a.category}</p>
            <h2>
              {a.title}
              <span>↗</span>
            </h2>
            <p>{a.summary}</p>
            <span className="text-link">
              Read the {a.category === "Concept study" ? "study" : "article"} ↗
            </span>
          </Link>
        ))}
      </div>
      <Disclosure />
    </div>
  );
}
