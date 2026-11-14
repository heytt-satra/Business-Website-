"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { divisions, stages } from "@/data/frontiers";
import ModelCanvas from "./ModelCanvas";
import { useMotion } from "./Motion";

const names: Record<string, string> = {
  fusion: "TERA FUSION",
  silicon: "TERA SILICON",
  bio: "TERA BIO",
  intelligence: "TERA INTELLIGENCE",
  quantum: "TERA QUANTUM",
  orbital: "TERA ORBITAL",
  propulsion: "TERA PROPULSION",
  materials: "TERA MATERIALS",
  energy: "TERA ENERGY",
  robotics: "TERA ROBOTICS",
};
const objects: Record<string, string> = {
  fusion: "Magnetic confinement reactor",
  silicon: "Advanced semiconductor package",
  bio: "Molecular double helix",
  intelligence: "Photonic intelligence core",
  quantum: "Dilution refrigerator",
  orbital: "Solar-powered orbital platform",
  propulsion: "Liquid rocket engine",
  materials: "Engineered crystal lattice",
  energy: "Stellar power core",
  robotics: "Humanoid robotics platform",
};

export function TechnologyModel({ kind }: { kind: string }) {
  const { paused } = useMotion();
  return (
    <div className="detail-model">
      <ModelCanvas
        kind={kind}
        paused={paused}
        label={`Interactive 3D model: ${objects[kind]}`}
      />
      <div className="detail-model-label">
        <span>{names[kind]}</span>
        <span>Drag to rotate · Concept model</span>
      </div>
    </div>
  );
}

export function TechnologyExplorer() {
  const [active, setActive] = useState(0);
  const d = divisions[active];
  const { paused } = useMotion();
  return (
    <section id="technologies" className="technology-explorer">
      <div className="explorer-heading">
        <p className="eyebrow">The TERA programs</p>
        <h2>Engineering, across scales.</h2>
        <p>From the structure of matter to the systems that take us further.</p>
      </div>
      <p className="technology-control-hint">
        Swipe to choose a technology <span aria-hidden="true">↔</span>
      </p>
      <div className="explorer-layout">
        <div
          className="technology-selectors"
          aria-label="Choose a technology to view in 3D"
        >
          {divisions.map((item, i) => (
            <button
              key={item.slug}
              aria-pressed={i === active}
              onPointerEnter={(e) => {
                if (e.pointerType !== "touch") setActive(i);
              }}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-controls="technology-display"
            >
              <span className="tech-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <strong>{item.short}</strong>
                <small>{names[item.visual]}</small>
              </span>
              <span className="tech-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>
        <div id="technology-display" className="technology-display">
          <div className="model-stage">
            <ModelCanvas
              kind={d.visual}
              paused={paused}
              label={`Interactive 3D model: ${objects[d.visual]}`}
            />
            <span className="model-instruction">Drag to rotate</span>
            <span className="model-index">
              {String(active + 1).padStart(2, "0")} / 10
            </span>
          </div>
          <div className="technology-description" aria-live="polite">
            <div key={d.slug} className="technology-description-inner">
              <p className="eyebrow">{d.short}</p>
              <h3>{names[d.visual]}</h3>
              <p>
                {objects[d.visual]}. {d.tagline}
              </p>
              <Link className="text-link" href={`/technologies/${d.slug}`}>
                Explore {names[d.visual]} <span>↗</span>
              </Link>
            </div>
            <span className="concept-note">Interactive concept model</span>
          </div>
        </div>
      </div>
      <div className="explorer-footer">
        <p>Select a field to preview its engineering.</p>
        <Link className="text-link" href="/technologies">
          All technologies ↗
        </Link>
      </div>
    </section>
  );
}

export function CivilizationScroll() {
  const section = useRef<HTMLElement>(null),
    progress = useRef(0),
    [active, setActive] = useState(0);
  const { paused, reduced } = useMotion();
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = section.current!.getBoundingClientRect();
      const p = Math.max(
        0,
        Math.min(1, -r.top / (r.height - window.innerHeight)),
      );
      progress.current = p;
      setActive(Math.min(5, Math.floor(p * 5 + 0.25)));
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    update();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [reduced]);
  function select(i: number) {
    if (reduced) {
      progress.current = i / 5;
      setActive(i);
      return;
    }
    const el = section.current!;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + ((el.offsetHeight - window.innerHeight) * i) / 5 + 1,
      behavior: "instant",
    });
  }
  const stage = stages[active];
  return (
    <section
      ref={section}
      id="civilization"
      className={`civilization-scroll ${reduced ? "reduced" : ""}`}
      aria-label="Civilization journey"
    >
      <div className="civilization-sticky">
        <div className="universe-scene">
          <ModelCanvas
            kind="universe"
            progress={progress}
            paused={paused}
            label={`Three-dimensional view of ${stage.name.toLowerCase()}`}
          />
        </div>
        <div className="civilization-shade" />
        <div className="civilization-top">
          <p className="eyebrow">The long view</p>
          <span>Scroll to change perspective ↓</span>
        </div>
        <div className="civilization-copy" key={stage.roman}>
          <p className="stage-kicker">
            {String(active + 1).padStart(2, "0")} / {stage.status}
          </p>
          <h2>
            {stage.name.replace(" civilization", "").replace(" horizons", "")}
            <br />
            {active === 5 ? "horizons." : "civilization."}
          </h2>
          <p>{stage.title}</p>
          <Link className="text-link" href={`/technologies/${stage.division}`}>
            Explore the foundations ↗
          </Link>
        </div>
        <div
          className="civilization-navigation"
          aria-label="Civilization stages"
        >
          {stages.map((s, i) => (
            <button
              key={s.roman}
              aria-pressed={i === active}
              onClick={() => select(i)}
            >
              <span>{s.roman}</span>
              <strong>
                {s.name.replace(" civilization", "").replace(" horizons", "")}
              </strong>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
        <p className="scale-note">
          A conceptual journey. Distances and objects are not to scale.
        </p>
      </div>
    </section>
  );
}

export function HeroFilm({
  film = "earth",
  className = "hero-film",
}: {
  film?: "earth" | "binary";
  className?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const { paused, reduced } = useMotion();
  useEffect(() => {
    const el = video.current!;
    let visible = false;
    const sync = () => {
      if (visible && !paused && !document.hidden) el.play().catch(() => {});
      else el.pause();
    };
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      sync();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      el.pause();
    };
  }, [paused]);
  return (
    <video
      ref={video}
      className={className}
      muted
      loop
      playsInline
      preload={reduced ? "none" : "metadata"}
      poster={
        film === "earth"
          ? "/media/motion/earth-poster.jpg"
          : `/media/cosmos/${film}-poster.jpg`
      }
      aria-hidden="true"
    >
      <source
        src={
          film === "earth"
            ? "/media/motion/earth-orbit.mp4"
            : `/media/cosmos/${film}.mp4`
        }
        type="video/mp4"
      />
    </video>
  );
}

export function ScrollEffects() {
  const { reduced } = useMotion();
  useEffect(() => {
    if (reduced) return;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".scroll-scene"),
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      sections.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const p = Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight - r.top) / (window.innerHeight + r.height),
          ),
        );
        el.style.setProperty("--scene-progress", String(p));
      });
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [reduced]);
  return null;
}
