import { PageIntro, Disclosure } from "@/components/Shell";
import { Journey } from "@/components/Interactions";
import Visual from "@/components/Visual";
import { pageMeta } from "@/lib/content";
export const metadata = pageMeta(
  "Space & civilization",
  "A six-stage journey from planetary engineering to explicitly speculative intergalactic horizons.",
  "/space-civilization",
);
export default function Page() {
  return (
    <div className="page-shell space-page">
      <PageIntro
        label="SPACE & CIVILIZATION"
        title="CIVILIZATION BEYOND EARTH."
        description="Expansion requires energy, intelligence, propulsion, autonomy, materials, and sustainable infrastructure. Explore six horizons, with their possibilities and limits clearly stated."
      />
      <Visual kind="orbital" className="space-panorama" />
      <p className="image-caption">
        AI-generated orbital concept visualization. No operating TERA
        infrastructure is depicted.
      </p>
      <Journey expanded />
      <Disclosure />
    </div>
  );
}
