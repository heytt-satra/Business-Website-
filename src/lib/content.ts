import type { Metadata } from "next";
import { divisions, projects } from "@/data/frontiers";
import { articles } from "@/data/articles";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
export function pageMeta(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    ...(siteUrl ? { alternates: { canonical: `${siteUrl}${path}` } } : {}),
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: "/media/social.jpg",
          width: 1200,
          height: 630,
          alt: "TERA INDUSTRIES orbital infrastructure concept",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/media/social.jpg"],
    },
  };
}
export const routes = [
  "/",
  "/technologies",
  "/projects",
  "/research",
  "/human-futures",
  "/space-civilization",
  "/about",
  "/insights",
  ...divisions.map((d) => `/technologies/${d.slug}`),
  ...projects.map((p) => `/projects/${p.slug}`),
  ...articles.map((a) => `/${a.section}/${a.slug}`),
];
