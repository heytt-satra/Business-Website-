import Link from "next/link";
import { PageIntro, ArrowLink, Disclosure } from "@/components/Shell";
import { pageMeta } from "@/lib/content";
export const metadata = pageMeta(
  "Our vision",
  "The vision and editorial standards of TERA INDUSTRIES, a fictional concept-stage frontier technology organization.",
  "/about",
);
export default function Page() {
  return (
    <div className="page-shell about-page">
      <PageIntro
        label="OUR VISION"
        title="The future is engineered."
        description="TERA INDUSTRIES is a fictional, concept-stage vision for a frontier technology organization. We use it to explore how scientific disciplines could connect to shape a more capable, resilient civilization."
      />
      <section className="about-statement">
        <p className="eyebrow">A CONNECTED VIEW OF PROGRESS</p>
        <h2>
          Intelligence.
          <br />
          Energy. Matter.
          <br />
          <span>Life. Space.</span>
        </h2>
        <div>
          <p>
            From atomic frontiers to interstellar questions, the ambition is
            broad. The standard for making a claim should remain precise.
          </p>
          <p>
            This website brings together educational explanations, engineering
            concept studies, and speculative scenarios. It does not represent an
            operating industrial company or a portfolio of validated
            technologies.
          </p>
          <ArrowLink href="/technologies">EXPLORE OUR TECHNOLOGIES</ArrowLink>
        </div>
      </section>
      <section className="theme-grid">
        <div>
          <p className="eyebrow">01 / THINK IN SYSTEMS</p>
          <h2>Connect the disciplines.</h2>
          <p>
            Energy needs materials. Intelligence needs compute. Space needs all
            of them. We organize our vision around these dependencies.
          </p>
        </div>
        <div>
          <p className="eyebrow">02 / RESPECT THE EVIDENCE</p>
          <h2>Name the unknowns.</h2>
          <p>
            A credible concept includes the constraints that might prevent it
            from working. Uncertainty is part of the story.
          </p>
        </div>
        <div>
          <p className="eyebrow">03 / BUILD FOR PEOPLE</p>
          <h2>Keep human agency central.</h2>
          <p>
            Well-being, accessibility, safety, and responsible stewardship guide
            how we discuss future capability.
          </p>
        </div>
        <div>
          <p className="eyebrow">04 / KEEP THE HORIZON OPEN</p>
          <h2>Let questions lead.</h2>
          <p>
            A future vision can be ambitious without claiming inevitability or
            attaching unsupported delivery dates.
          </p>
        </div>
      </section>
      <section id="editorial-standard" className="prose standards">
        <p className="eyebrow">OUR EDITORIAL STANDARD</p>
        <h2>Clarity about what is real.</h2>
        <p>
          <strong>Established science:</strong> educational accounts of
          mechanisms, written without claiming TERA discovered or demonstrated
          them.
        </p>
        <p>
          <strong>Research direction:</strong> a domain of inquiry with open
          questions, not a funded program or validated result.
        </p>
        <p>
          <strong>Concept exploration:</strong> a fictional engineering study
          that exposes dependencies and unknowns.
        </p>
        <p>
          <strong>Future vision:</strong> a scenario, with theoretical and
          speculative horizons explicitly identified.
        </p>
        <p>
          No factories, employees, investors, partners, clinical outcomes,
          publications, patents, benchmarks, or revenue are claimed. The imagery
          consists of original diagrams and a labeled AI-generated orbital
          rendering.
        </p>
        <h2>Continue the conversation through the ideas.</h2>
        <p>
          No contact service or staffed inbox is available for this fictional
          organization. Explore the{" "}
          <Link href="/research">research library</Link> and{" "}
          <Link href="/insights">editorial perspectives</Link> to understand the
          vision.
        </p>
      </section>
      <Disclosure />
    </div>
  );
}
