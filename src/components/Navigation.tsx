"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { divisions } from "@/data/frontiers";
import { navLinks } from "@/data/navigation";
export function Mark() {
  return <span className="wordmark">TERA INDUSTRIES</span>;
}
export default function Navigation() {
  const [open, setOpen] = useState(false),
    [tech, setTech] = useState(false);
  const path = usePathname();
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) {
        setOpen(false);
        setTech(false);
      }
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  const close = () => {
    setOpen(false);
    setTech(false);
  };
  return (
    <header
      ref={root}
      className={`site-header ${path === "/" ? "over-hero" : ""} ${open ? "menu-open" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          close();
          toggle.current?.focus();
        }
      }}
    >
      <Link
        href="/"
        aria-label="TERA INDUSTRIES home"
        className="brand"
        onClick={close}
      >
        <Mark />
      </Link>
      <div className="header-right">
        <div className="quick-nav">
          <Link href="/technologies">Technologies</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/about">Our vision</Link>
        </div>
        <button
          ref={toggle}
          className="mobile-toggle"
          onClick={() => {
            setOpen(!open);
            setTech(false);
          }}
          aria-expanded={open}
          aria-controls="primary-navigation"
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
      </div>
      {open && (
        <nav
          id="primary-navigation"
          className={`navigation open ${tech ? "technology-open" : ""}`}
          aria-label="Primary navigation"
        >
          <div className="nav-main">
            <Link href="/" onClick={close}>
              Home
            </Link>
            <div className="tech-nav">
              <button
                onClick={() => setTech(!tech)}
                aria-expanded={tech}
                aria-controls="technology-menu"
              >
                Technologies <span>{tech ? "−" : "+"}</span>
              </button>
            </div>
            {navLinks.map(([name, href]) => (
              <Link
                href={href}
                onClick={close}
                key={href}
                aria-current={path.startsWith(href) ? "page" : undefined}
              >
                {name}
              </Link>
            ))}
          </div>
          <div className="nav-secondary">
            {tech ? (
              <div id="technology-menu" className="mega-links">
                <Link href="/technologies" onClick={close}>
                  All technologies →
                </Link>
                {divisions.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/technologies/${d.slug}`}
                    onClick={close}
                  >
                    {d.short}
                  </Link>
                ))}
              </div>
            ) : (
              <>
                <p>
                  Intelligence. Energy.
                  <br />
                  Matter. Life. Space.
                </p>
                <span>A concept-stage research vision.</span>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
