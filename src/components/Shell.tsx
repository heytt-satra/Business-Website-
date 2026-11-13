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
      <span aria-hidden="true">›</span>
    </Link>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link href="/" className="brand">
          <Mark />
        </Link>
        <div className="footer-nav">
          <Link href="/technologies">Technologies</Link>
          {navLinks.map(([name, href]) => (
            <Link key={href} href={href}>
              {name}
            </Link>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} TERA INDUSTRIES</span>
        <p>
          A fictional research concept. Photographs show existing science and
          engineering, not TERA facilities or products.
        </p>
        <Link href="/about#image-credits">Photography credits</Link>
        <Link href="/about#editorial-standard">About this project</Link>
      </div>
    </footer>
  );
}
export function SectionTitle({
  label,
  title,
  href,
  link = "Explore all",
}: {
  number?: string;
  label: string;
  title: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {link} <span>→</span>
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
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="intro-description">{description}</p>
    </div>
  );
}
export function Disclosure() {
  return (
    <aside className="disclosure">
      <p>
        TERA INDUSTRIES is a fictional, concept-stage project. These studies
        describe proposed directions, not tested products or operating
        capabilities.
      </p>
    </aside>
  );
}
