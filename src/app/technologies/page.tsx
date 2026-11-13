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
        label="Fields of research"
        title="Technologies."
        description="Ten areas of science and engineering. Explore how they work, where they connect, and the problems still to be solved."
      />
      <Catalog />
      <section className="section inset">
        <h2 className="large-heading">How the fields connect.</h2>
        <Ecosystem />
      </section>
      <Disclosure />
    </div>
  );
}
