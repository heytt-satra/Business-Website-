import { PageIntro, ArrowLink, Disclosure } from "@/components/Shell";
import Visual from "@/components/Visual";
import { pageMeta } from "@/lib/content";
export const metadata = pageMeta(
  "Human futures",
  "Exploring assistive technology, neural interfaces, human-machine collaboration, and human agency.",
  "/human-futures",
);
const themes = [
  [
    "01",
    "Interfaces that listen",
    "Brain-computer interfaces, neural engineering, and sensory augmentation raise possibilities for assistive control. Reliability, privacy, consent, and long-term safety remain essential.",
  ],
  [
    "02",
    "Tools that extend agency",
    "Advanced prosthetics, assistive robotics, and human-machine collaboration should support the goals of their users. Accessibility, repairability, and meaningful control are design requirements.",
  ],
  [
    "03",
    "Understanding living systems",
    "Regenerative biotechnology and precision medicine are research domains with distinct biological and clinical uncertainties. A computational prediction is not evidence of a medical benefit.",
  ],
  [
    "04",
    "Capability in extreme environments",
    "Long-duration space habitation and other demanding environments connect human factors, life support, radiation protection, and reliable tools. Designing for survival must also account for well-being.",
  ],
];
export default function Page() {
  return (
    <div className="page-shell">
      <PageIntro
        label="HUMAN FUTURES"
        title="Technology that extends human capability."
        description="The measure of progress is not how far we can push a machine. It is how well technology supports human well-being, accessibility, and agency."
      />
      <div className="vision-banner">
        <Visual kind="human" color="#d5dce3" />
        <div>
          <p className="eyebrow">HUMAN FIRST. ALWAYS.</p>
          <h2>
            Greater possibility.
            <br />
            Meaningful control.
          </h2>
          <p>
            A future worth engineering is one people can shape for themselves.
          </p>
        </div>
      </div>
      <div className="theme-grid">
        {themes.map(([n, t, b]) => (
          <section key={n}>
            <p className="eyebrow">{n} / RESEARCH HORIZON</p>
            <h2>{t}</h2>
            <p>{b}</p>
          </section>
        ))}
      </div>
      <div className="principles">
        <h2>Our design commitments</h2>
        <p>
          Well-being before performance. Accessibility before exclusivity.
          Consent before data collection. Independent evidence before claims of
          benefit.
        </p>
        <ArrowLink href="/projects/tera-human">EXPLORE TERA HUMAN</ArrowLink>
      </div>
      <Disclosure />
    </div>
  );
}
