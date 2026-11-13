# Redesign verification: 13 November 2026

## Changes

Rebuilt the homepage, navigation, typography, spacing, section layouts, technology catalog, project pages, article layouts, and footer. Replaced every technology illustration and the generated orbital scene with real reference photographs. Twelve photographs have source, author, and license records, plus local desktop and mobile WebP versions. Credits are visible on the About page. The site remains a fictional concept and does not claim that the photographs depict TERA facilities.

The new design uses full-width imagery, regular-weight typography, fewer labels, shorter copy, and unboxed layouts. All em dashes were removed from active site content. The ecosystem remains interactive through readable technology selectors and related-field links.

## Verification

- Production build and TypeScript completed successfully.
- Export verification covers all 36 content pages, 959 internal link references, 391 asset references, anchors, titles, descriptions, canonicals, disclosures, navigation payloads, photo attribution records, and mobile photo files.
- Export verification also rejects em dashes and references to the retired generated orbital image.
- Nine representative page types were checked in Chromium at 375, 768, and 1440 pixels. No horizontal overflow, broken loaded images, missing H1, duplicate H1, or em dashes were found.
- Search and category combination returned the expected quantum division. Empty results and reset to ten divisions worked.
- Technology selection updated its related links and destination.
- Mobile navigation and technology submenu worked. Escape closed the menu and returned focus to the menu button.
- All six homepage journey stages and the expanded journey's sixth stage worked.
- Browser console showed no errors during the final interaction checks.

## Limits

No Lighthouse score or formal accessibility certification is claimed. Reduced-motion branches are implemented; this pass did not emulate that preference. Other browser engines and physical devices were not tested. Dependencies were unchanged during this redesign; the previous production audit was clean, with eight moderate findings in development-only lint tooling.

The original GitHub repository has not been pushed. The existing private Sites publication is updated separately.

Final ESLint check passed with no errors or warnings. The final production rebuild and export verification passed after the caption fix.

