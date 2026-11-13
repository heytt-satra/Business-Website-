import Link from "next/link";
import { Mark } from "./Navigation";
import { navLinks } from "@/data/navigation";
export function ArrowLink({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link className={`button ${primary ? "primary" : ""}`} href={href}>
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link className="brand" href="/">
          <Mark />
          <span>
            TERA<span className="brand-sub">INDUSTRIES</span>
          </span>
        </Link>
        <p>
          Engineering the next era
          <br />
          of civilization.
        </p>
        <div className="footer-nav">
          <Link href="/technologies">Technologies</Link>
          {navLinks.map(([n, h]) => (
            <Link href={h} key={h}>
              {n}
            </Link>
          ))}
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">
        TERA INDUSTRIES
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} TERA INDUSTRIES · A FICTIONAL CONCEPT
        </span>
        <p>
          Concept studies, not company achievements. No operating facilities,
          deployed technologies, or medical benefits are claimed. Imagery
          includes synthetic concept renders and original diagrams.
        </p>
        <Link href="/about#editorial-standard">Our editorial standard ↗</Link>
      </div>
    </footer>
  );
}
export function SectionTitle({
  number,
  label,
  title,
  href,
  link = "Explore all",
}: {
  number: string;
  label: string;
  title: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number}</span> {label}
        </p>
        <h2>{title}</h2>
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {link} <span>↗</span>
        </Link>
      )}
    </div>
  );
}
export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">
        <span className="blue-dot" />
        {label}
      </p>
      <h1>{title}</h1>
      <p className="intro-description">{description}</p>
    </div>
  );
}
export function Disclosure() {
  return (
    <aside className="disclosure">
      <span className="blue-dot" />
      <p>
        <strong>A concept, clearly stated.</strong> TERA INDUSTRIES is a
        fictional, concept-stage organization. These are research directions and
        design studies, not validated products or operational capabilities.
      </p>
    </aside>
  );
}
