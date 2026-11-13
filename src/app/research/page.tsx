import ArticleIndex from "@/components/ArticleIndex";
import { pageMeta } from "@/lib/content";
export const metadata = pageMeta(
  "Research & discovery",
  "Original explainers and concept studies exploring the mechanisms and constraints of frontier technologies.",
  "/research",
);
export default function Page() {
  return <ArticleIndex section="research" />;
}
