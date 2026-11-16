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

Next.js App Router, React, TypeScript, Tailwind CSS, and Three.js. Pages are statically generated. Interactive sections include navigation, filtering, ecosystem selection, the scroll-driven civilization journey, and 3D technology previews. No database, contact backend, authentication, or paid service is needed.

- `src/data/frontiers.ts`: typed division, initiative, relationship, and civilization content.
- `src/data/articles.ts`: full research and editorial content.
- `src/components/Interactions.tsx`: search/filter, network controls, click/scroll-driven journey.
- `src/components/Visual.tsx`: credited responsive cosmic observations.
- `src/components/ScrollExperience.tsx`: video hero, technology selector, pinned civilization sequence, and native-scroll parallax.
- `src/components/ModelCanvas.tsx`: lazy WebGL rendering, visibility control, two-axis drag rotation, zoom/reset controls, resource cleanup, and cosmic fallback.
- `src/lib/models.ts` and `src/lib/universe.ts`: ten procedural engineering models and the Earth-to-galaxy scene.
- `src/components/Motion.tsx`: global pause control and reduced-motion preference.
- `src/app/[section]/[slug]/page.tsx`: content-driven detail templates and metadata.
- `src/app/globals.css`: responsive visual system, focus indicators, reduced-motion behavior.
- `scripts/verify-export.mjs`: all routes, internal links, anchors, assets, headings, metadata, and disclosures.
- `scripts/preview.mjs`: local static server with real 404 responses.

Add typed records to extend the site. Static params and sitemap derive from the data. Update the expected route count in the verification script. A future CMS can replace the data access boundary while preserving record shapes and templates.

## Original repository

Cloned from https://github.com/heytt-satra/Business-Website-.git. The former agency site is preserved in `archive/original-src/` and excluded from compilation. Its admin editor, server actions, contact flow, testimonials, and service pages are inactive. Original assets and history remain available. This replacement keeps unsupported agency/company claims out of the new concept site.

## Assets and credibility

The editorial images show a clean future Earth, a Mars settlement, and a human interstellar voyage. These original AI-generated concepts connect robotics, energy, habitats, life support and propulsion. Responsive assets and complete generation prompts are in public/media/futures; provenance also appears on the About page.

The motion revision adds a locally hosted 4 MB NASA Earth video, CC BY 4.0 Solar System Scope planetary textures, original solid 3D engineering concepts, and an original vector TERA identity. Attribution is in `public/media/motion/CREDITS.md` and the About page. The three-dimensional objects are illustrative concepts, not TERA product specifications. Canvas rendering starts near the viewport and pauses offscreen or in a background tab. The global control pauses idle animation and video; scroll navigation remains usable. Reduced-motion users receive direct stage selection without the long scroll sequence. WebGL failures show a text status only. No fallback images are rendered in model views.

## Verification

Run `npm run typecheck`, `npm run lint`, `npm run build`, `npm run verify`, and `npm audit --omit=dev`.

Browser QA should cover desktop/mobile navigation, combined search/category filters, empty results/reset, ecosystem connections, all journey stages, keyboard Escape/focus, reduced motion, and narrow layouts. See the delivered verification report for checks actually run.

## Deployment

Serve `out/` with any static host, preserve nested index.html paths, and use 404.html for unknown routes. `.openai/hosting.json` identifies the private Sites publication. GitHub source pushes and Sites deployments are separate operations. The original repository remains the `origin` remote.

### Windows static export compatibility

The postbuild script preserves Next.js segment payloads and adds dot-separated filename aliases on Windows. Without these aliases, client navigation prefetches can return 404 even while HTML routes load. The export verification checks payload availability. Keep this step when building on Windows; it is harmless when aliases are already emitted by another platform.

npm start is an alias for the static preview server.

The latest models use an amber holographic neural network for Super intelligence, a cutaway Dyson sphere for energy, and a rebuilt humanoid with continuous sculpted armor, a smoked faceplate and enclosed limbs. The original Earth hero is retained. The scroll journey uses detailed satellites, eight correctly ordered textured planets, and procedural colored galaxies with layered dust. Scroll movement is damped and stage navigation uses smooth native scrolling. Late texture arrivals trigger a new frame while motion is paused.

Run node --experimental-strip-types scripts/check-scenes.mjs to verify orbit order, transition continuity and model geometry.
