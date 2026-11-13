"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="page-shell empty-state">
      <p className="eyebrow">SYSTEM INTERRUPTION</p>
      <h1>Let’s re-establish the connection.</h1>
      <p>This view could not load. Try again or return to the homepage.</p>
      <button className="button" onClick={reset}>
        Try again ↻
      </button>
      <Link className="button" href="/">
        Return home ↗
      </Link>
    </div>
  );
}
