"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { divisions } from "@/data/frontiers";
import { navLinks } from "@/data/navigation";
export function Mark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="mark">
      <path
        fill="currentColor"
        d="M4 7h32l-5 8H9zM16 18h8v15h-8zM2 18h10v7H6zM28 18h10l-4 7h-6z"
      />
    </svg>
  );
}
export default function Navigation() {
  const [menu, setMenu] = useState(false),
    [mobile, setMobile] = useState(false);
  const path = usePathname();
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const techToggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) {
        setMenu(false);
        setMobile(false);
      }
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  function dismiss() {
    setMenu(false);
    setMobile(false);
  }
  return (
    <header
      ref={root}
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          dismiss();
          (mobile ? toggle : techToggle).current?.focus();
        }
      }}
    >
      <Link
        href="/"
        className="brand"
        aria-label="TERA INDUSTRIES home"
        onClick={dismiss}
      >
        <Mark />
        <span>
          TERA<span className="brand-sub">INDUSTRIES</span>
        </span>
      </Link>
      <button
        ref={toggle}
        className="mobile-toggle"
        aria-expanded={mobile}
        aria-controls="primary-navigation"
        onClick={() => {
          setMobile(!mobile);
          setMenu(false);
        }}
      >
        {mobile ? "Close −" : "Menu +"}
      </button>
      <nav
        id="primary-navigation"
        aria-label="Primary navigation"
        className={mobile ? "navigation open" : "navigation"}
      >
        <div className="tech-nav">
          <button
            ref={techToggle}
            className={path.startsWith("/technologies") ? "nav-active" : ""}
            aria-expanded={menu}
            aria-controls="technology-menu"
            onClick={() => setMenu(!menu)}
          >
            Technologies <span aria-hidden="true">{menu ? "−" : "+"}</span>
          </button>
        </div>
        {navLinks.map(([name, href]) => (
          <Link
            key={href}
            href={href}
            onClick={dismiss}
            aria-current={path.startsWith(href) ? "page" : undefined}
          >
            {name}
          </Link>
        ))}
        <span className="nav-signal" aria-hidden="true">
          <i /> EXPLORING WHAT’S NEXT
        </span>
      </nav>
      {menu && (
        <div id="technology-menu" className="mega-menu">
          <div>
            <span className="eyebrow">
              TEN DIVISIONS. ONE CONNECTED VISION.
            </span>
            <Link href="/technologies" className="mega-title" onClick={dismiss}>
              Explore the
              <br />
              frontiers. <span>↗</span>
            </Link>
            <p>Intelligence. Energy. Matter. Life. Space.</p>
          </div>
          <div className="mega-links">
            {divisions.map((d, i) => (
              <Link
                onClick={dismiss}
                href={`/technologies/${d.slug}`}
                key={d.slug}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {d.short}
                <span>↗</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
