import ArticleIndex from "@/components/ArticleIndex";
import { pageMeta } from "@/lib/content";
export const metadata = pageMeta(
  "Insights & perspectives",
  "Editorial perspectives on connected engineering, human agency, and distant civilization horizons.",
  "/insights",
);
export default function Page() {
  return <ArticleIndex section="insights" />;
}
