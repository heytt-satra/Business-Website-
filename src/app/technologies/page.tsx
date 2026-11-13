import { PageIntro, Disclosure } from "@/components/Shell";
import { Catalog, Ecosystem } from "@/components/Interactions";
import { pageMeta } from "@/lib/content";
export const metadata = pageMeta(
  "Technology divisions",
  "Explore ten connected technology divisions across intelligence, energy, matter, life, and space.",
  "/technologies",
);
export default function Page() {
  return (
    <div className="page-shell">
      <PageIntro
        label="THE TECHNOLOGY ATLAS"
        title="Explore the frontiers."
        description="Ten disciplines. Countless connections. Discover the scientific foundations and engineering questions behind our concept-stage vision."
      />
      <Catalog />
      <section className="section inset">
        <h2 className="large-heading">The power of connection.</h2>
        <Ecosystem />
      </section>
      <Disclosure />
    </div>
  );
}
