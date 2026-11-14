import Link from "next/link";
import { PageIntro, ArrowLink, Disclosure } from "@/components/Shell";
import { pageMeta } from "@/lib/content";
import cosmic from "@/data/cosmic-media.json";
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
          combines astronomical observations and scientific visualizations with
          original concept models.
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
      <section id="image-credits" className="photo-credits">
        <h2>Photography and motion credits</h2>
        <p>
          Astronomical observations give the site its otherworldly setting.
          Images have been resized, compressed, and cropped for the layout.
          Attribution does not imply endorsement or a relationship with TERA.
          Each image retains the license listed below.
        </p>
        <div className="credit-list">
          <div>
            <h3>Earth film and opening poster</h3>
            <p>
              NASA Scientific Visualization Studio. Visualization by Kel Elkins;
              Blue Marble data courtesy of Reto Stockli, NASA/GSFC. Compressed
              to 1280 × 720, without audio.
            </p>
            <a
              href="https://svs.gsfc.nasa.gov/5570/"
              target="_blank"
              rel="noreferrer"
            >
              NASA source and credits
            </a>
            <a
              href="https://www.nasa.gov/nasa-brand-center/images-and-media/"
              target="_blank"
              rel="noreferrer"
            >
              NASA media guidelines
            </a>
          </div>
          <div>
            <h3>Earth, Mars, and Sun textures</h3>
            <p>
              Solar System Scope / INOVE, based on NASA imagery. CC BY 4.0.
              Mapped onto animated three-dimensional spheres.
            </p>
            <a
              href="https://www.solarsystemscope.com/textures/"
              target="_blank"
              rel="noreferrer"
            >
              Texture collection
            </a>
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noreferrer"
            >
              License terms
            </a>
          </div>
          <div>
            <h3>TERA concept models and identity</h3>
            <p>
              Original procedural 3D models and vector identity created for this
              project. The models illustrate recognizable engineering systems;
              they are not manufactured TERA products or technical simulations.
            </p>
            <a href="/tera-symbol.svg" download>
              Download the TERA symbol
            </a>
            <a href="/tera-industries-logo.svg" download>
              Download the full logo
            </a>
          </div>
          <div>
            <h3>Binary black-hole film</h3>
            <p>
              NASA’s Goddard Space Flight Center/Jeremy Schnittman and Brian P.
              Powell. Scientific visualization, compressed and shown without
              audio.
            </p>
            <a
              href="https://svs.gsfc.nasa.gov/13831/"
              target="_blank"
              rel="noreferrer"
            >
              NASA source and credits
            </a>
            <a
              href="https://www.nasa.gov/nasa-brand-center/images-and-media/"
              target="_blank"
              rel="noreferrer"
            >
              NASA media guidelines
            </a>
          </div>
          {cosmic.map((photo) => (
            <div key={photo.id}>
              <h3>{photo.title}</h3>
              <p>
                {photo.author} · {photo.license}
              </p>
              <a href={photo.source} target="_blank" rel="noreferrer">
                Original observation
              </a>
              {photo.licenseUrl && (
                <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
                  License terms
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
      <Disclosure />
    </div>
  );
}
