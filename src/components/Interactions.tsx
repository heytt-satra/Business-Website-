"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { divisions, relationships, stages } from "@/data/frontiers";
import Visual from "./Visual";

export function Catalog() {
  const [query, setQuery] = useState(""),
    [field, setField] = useState("All frontiers");
  const filtered = divisions.filter(
    (d) =>
      (field === "All frontiers" || d.field === field) &&
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
            placeholder="Search technologies, fields, ideas…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="filters" aria-label="Filter by frontier">
          {[
            "All frontiers",
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
        <span>EXPLORE THE CONNECTED FRONTIER</span>
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
          <h2>No matching frontiers.</h2>
          <p>Try “quantum”, “materials”, or a broader category.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setField("All frontiers");
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
  const connected = new Set(edges.flatMap((r) => [r.a, r.b]));
  const points = divisions.map((d, i) => ({
    slug: d.slug,
    x: 300 + 220 * Math.cos(-Math.PI / 2 + (i * Math.PI) / 5),
    y: 230 + 180 * Math.sin(-Math.PI / 2 + (i * Math.PI) / 5),
  }));
  return (
    <div className="ecosystem">
      <label className="network-picker">
        Explore a division
        <select value={selected} onChange={(event) => setSelected(event.target.value)}>
          {divisions.map((division) => <option key={division.slug} value={division.slug}>{division.short}</option>)}
        </select>
      </label>
      <div className="network-map">
        <svg viewBox="0 0 600 460" aria-hidden="true">
          <circle
            cx="300"
            cy="230"
            r="175"
            stroke="currentColor"
            strokeDasharray="2 9"
            fill="none"
            opacity=".15"
          />
          {relationships.map((r) => {
            const a = points.find((p) => p.slug === r.a)!,
              b = points.find((p) => p.slug === r.b)!;
            return (
              <line
                key={r.label}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className={
                  r.a === selected || r.b === selected ? "edge active" : "edge"
                }
              />
            );
          })}
          <text
            x="300"
            y="226"
            textAnchor="middle"
            fill="currentColor"
            fontSize="17"
            letterSpacing="5"
          >
            TERA
          </text>
          <text
            x="300"
            y="246"
            textAnchor="middle"
            fill="currentColor"
            fontSize="7"
            letterSpacing="2"
          >
            CONNECTED SYSTEMS
          </text>
        </svg>
        <div className="network-nodes">
          {points.map((p, i) => (
            <button
              key={p.slug}
              style={{ left: `${p.x / 6}%`, top: `${p.y / 4.6}%` }}
              className={`${p.slug === selected ? "selected" : ""} ${connected.has(p.slug) ? "connected" : ""}`}
              aria-pressed={p.slug === selected}
              onClick={() => setSelected(p.slug)}
            >
              <i />
              {divisions[i].short}
            </button>
          ))}
        </div>
      </div>
      <div className="network-detail" aria-live="polite">
        <p className="eyebrow">SELECT A NODE TO EXPLORE</p>
        <h3>{current.short}</h3>
        <p>{current.tagline}</p>
        <Link href={`/technologies/${current.slug}`} className="text-link">
          Explore this division ↗
        </Link>
        <div className="relationship-list">
          {edges.length ? (
            edges.map((r) => (
              <Link
                key={r.label}
                href={`/technologies/${r.a === selected ? r.b : r.a}`}
              >
                <strong>
                  {r.label}
                  <span>↗</span>
                </strong>
                <p>{r.detail}</p>
              </Link>
            ))
          ) : (
            <Link href="/research/designing-for-orbit">
              <strong>Transport connects the system ↗</strong>
              <p>
                Propulsion, materials, energy, and operations shape the
                infrastructure that can reach space.
              </p>
            </Link>
          )}
        </div>
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
