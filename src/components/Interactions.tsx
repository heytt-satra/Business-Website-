"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { divisions, relationships, stages } from "@/data/frontiers";
import Visual from "./Visual";

export function Catalog() {
  const [query, setQuery] = useState(""),
    [field, setField] = useState("All fields");
  const filtered = divisions.filter(
    (d) =>
      (field === "All fields" || d.field === field) &&
      `${d.name} ${d.short} ${d.topics.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <div>
      <div className="catalog-controls">
        <label className="search">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Search technologies</span>
          <input
            type="search"
            placeholder="Search technologies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="filters" aria-label="Filter by frontier">
          {[
            "All fields",
            "Intelligence",
            "Energy",
            "Matter",
            "Life",
            "Space",
          ].map((f) => (
            <button
              key={f}
              aria-pressed={field === f}
              onClick={() => setField(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="results-bar">
        <p role="status">
          {filtered.length} {filtered.length === 1 ? "division" : "divisions"}
          {query ? ` matching “${query}”` : ""}
        </p>
      </div>
      <div className="division-grid">
        {filtered.map((d) => (
          <Link
            className="division-card"
            key={d.slug}
            href={`/technologies/${d.slug}`}
          >
            <Visual kind={d.visual} color={d.color} />
            <div className="card-copy">
              <span className="eyebrow">
                {String(divisions.indexOf(d) + 1).padStart(2, "0")} / {d.field}
              </span>
              <h2>
                {d.short}
                <span>↗</span>
              </h2>
              <p>{d.description}</p>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <h2>No matching technologies.</h2>
          <p>Try “quantum”, “materials”, or a broader category.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setField("All fields");
            }}
          >
            Reset search ↗
          </button>
        </div>
      )}
    </div>
  );
}

export function Ecosystem() {
  const [selected, setSelected] = useState("artificial-intelligence");
  const current = divisions.find((d) => d.slug === selected)!;
  const edges = relationships.filter(
    (r) => r.a === selected || r.b === selected,
  );
  return (
    <div className="ecosystem">
      <div className="network-nodes" aria-label="Choose a technology">
        {divisions.map((d) => (
          <button
            key={d.slug}
            aria-pressed={selected === d.slug}
            onClick={() => setSelected(d.slug)}
          >
            {d.short}
            <span aria-hidden="true">→</span>
          </button>
        ))}
      </div>
      <div className="network-detail" aria-live="polite">
        <p className="eyebrow">Connected to {current.short.toLowerCase()}</p>
        <div className="relationship-list">
          {edges.length ? (
            edges.map((r) => (
              <Link
                key={r.label}
                href={"/technologies/" + (r.a === selected ? r.b : r.a)}
              >
                <strong>
                  {r.label}
                  <span>→</span>
                </strong>
                <p>{r.detail}</p>
              </Link>
            ))
          ) : (
            <Link href="/research/designing-for-orbit">
              <strong>Transport and infrastructure →</strong>
              <p>
                Propulsion, materials, energy, and operations shape what can
                reach space.
              </p>
            </Link>
          )}
        </div>
        <Link href={"/technologies/" + selected} className="text-link">
          Explore {current.short.toLowerCase()} →
        </Link>
      </div>
    </div>
  );
}

export function Journey({ expanded = false }: { expanded?: boolean }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (!expanded) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.stage));
      },
      { rootMargin: "-20% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, [expanded]);
  const s = stages[active];
  return (
    <div className={expanded ? "journey expanded" : "journey"}>
      <div className="journey-tabs" aria-label="Civilization stages">
        {stages.map((s, i) => (
          <button
            key={s.roman}
            aria-pressed={active === i}
            onClick={() => {
              setActive(i);
              if (expanded)
                refs.current[i]?.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                  block: "center",
                });
            }}
          >
            <span>{s.roman}</span>
            <strong>{s.name}</strong>
            <small>{s.status}</small>
          </button>
        ))}
      </div>
      {expanded ? (
        <div className="stage-sequence">
          {stages.map((s, i) => (
            <div
              key={s.roman}
              data-stage={i}
              ref={(r) => {
                refs.current[i] = r;
              }}
              className={`stage-panel ${active === i ? "active" : ""}`}
            >
              <span className="stage-roman">{s.roman}</span>
              <div>
                <p className="eyebrow">{s.status}</p>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
                <p className="stage-needs">{s.needs}</p>
                <Link
                  href={`/technologies/${s.division}`}
                  className="text-link"
                >
                  Explore the foundations ↗
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="stage-panel" aria-live="polite">
          <span className="stage-roman">{s.roman}</span>
          <div>
            <p className="eyebrow">{s.status}</p>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <Link href="/space-civilization" className="text-link">
              Explore the civilization journey ↗
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("reveal-ready");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
