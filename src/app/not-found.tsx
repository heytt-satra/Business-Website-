import { ArrowLink } from "@/components/Shell";
export default function NotFound() {
  return (
    <div className="page-shell empty-state">
      <p className="eyebrow">404 / OUTSIDE THE MAP</p>
      <h1>An unexplored coordinate.</h1>
      <p>
        This page does not exist. Return to the technology atlas to find a known
        frontier.
      </p>
      <ArrowLink href="/technologies" primary>
        EXPLORE THE ATLAS
      </ArrowLink>
    </div>
  );
}
