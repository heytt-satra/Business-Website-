# TERA INDUSTRIES

A complete frontier-technology concept website built from the supplied brief. TERA is explicitly fictional and concept-stage. It makes no claims about real facilities, products, clinical benefits, benchmarks, employees, or financing.

## Run locally

Requires Node.js 22+ and npm. Run `npm ci`, then `npm run dev`. Open http://localhost:3000.

For the production export, run `npm run build`, `npm run verify`, then `npm run preview`. The preview serves `out/` on localhost:3000. Stop with Ctrl+C. Set `PORT` to choose another port. Do not use `next start` for this static export.

Copy `.env.example` to `.env.local` before building. Set `NEXT_PUBLIC_SITE_URL` to the deployment origin for canonical URLs and sitemap entries. Update the default metadataBase in `src/app/layout.tsx` if moving domains.

## Site map

36 content pages, plus loading, error, and 404 states:

- Home, Technologies, Projects, Research, Human Futures, Space & Civilization, About, Insights.
- Ten technology detail pages under `/technologies/[slug]`.
- Ten initiative pages under `/projects/[slug]`.
- Five research explainers/studies and three editorial articles.

## Implementation

Next.js App Router, React, TypeScript, and Tailwind CSS. Pages are statically generated. Only navigation, filtering, ecosystem selection, reveals, and the journey require client interaction. No database, contact backend, authentication, or paid service is needed.

- `src/data/frontiers.ts`: typed division, initiative, relationship, and civilization content.
- `src/data/articles.ts`: full research and editorial content.
- `src/components/Interactions.tsx`: search/filter, network controls, click/scroll-driven journey.
- `src/components/Visual.tsx`: original topic-specific technical illustrations.
- `src/app/[section]/[slug]/page.tsx`: content-driven detail templates and metadata.
- `src/app/globals.css`: responsive visual system, focus indicators, reduced-motion behavior.
- `scripts/verify-export.mjs`: all routes, internal links, anchors, assets, headings, metadata, and disclosures.
- `scripts/preview.mjs`: local static server with real 404 responses.

Add typed records to extend the site. Static params and sitemap derive from the data. Update the expected route count in the verification script. A future CMS can replace the data access boundary while preserving record shapes and templates.

## Original repository

Cloned from https://github.com/heytt-satra/Business-Website-.git. The former agency site is preserved in `archive/original-src/` and excluded from compilation. Its admin editor, server actions, contact flow, testimonials, and service pages are inactive. Original assets and history remain available. This replacement keeps unsupported agency/company claims out of the new concept site.

## Assets and credibility

The hero is an original AI-generated orbital visualization, optimized to local WebP and labeled as a concept render. Other visuals are original SVG diagrams, not photos or validated engineering drawings. The emblem is original SVG. Google fonts are fetched at build time by `next/font` and self-hosted in the export. Runtime does not need an external image host.

See `ASSET-NOTES.md` for the generation prompt. Articles distinguish explainers, concept studies, and speculation. The fusion explainer references US Department of Energy background science, not validation of TERA.

## Verification

Run `npm run typecheck`, `npm run lint`, `npm run build`, `npm run verify`, and `npm audit --omit=dev`.

Browser QA should cover desktop/mobile navigation, combined search/category filters, empty results/reset, ecosystem connections, all journey stages, keyboard Escape/focus, reduced motion, and narrow layouts. See the delivered verification report for checks actually run.

## Deployment

Serve `out/` with any static host, preserve nested index.html paths, and use 404.html for unknown routes. `.openai/hosting.json` identifies the private Sites preview. No push to the original GitHub remote or public release is implied.

### Windows static export compatibility

The postbuild script preserves Next.js segment payloads and adds dot-separated filename aliases on Windows. Without these aliases, client navigation prefetches can return 404 even while HTML routes load. The export verification checks payload availability. Keep this step when building on Windows; it is harmless when aliases are already emitted by another platform.

npm start is an alias for the static preview server.

