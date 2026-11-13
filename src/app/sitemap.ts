import type { MetadataRoute } from "next";
import { routes, siteUrl } from "@/lib/content";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return siteUrl
    ? routes.map((path) => ({
        url: `${siteUrl}${path}`,
        changeFrequency: "monthly",
        priority: path === "/" ? 1 : 0.7,
      }))
    : [];
}
