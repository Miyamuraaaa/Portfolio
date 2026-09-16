# Third-party notices

## Locally hosted portfolio fonts

The existing Space Grotesk and JetBrains Mono families are now served with `next/font/local` so builds do not require Google Fonts access. Unmodified variable font files were obtained from the Google Fonts repository:
- Space Grotesk: https://github.com/google/fonts/tree/main/ofl/spacegrotesk — SIL Open Font License 1.1; full notice in `public/fonts/SpaceGrotesk-OFL.txt`.
- JetBrains Mono: https://github.com/google/fonts/tree/main/ofl/jetbrainsmono — SIL Open Font License 1.1; full notice in `public/fonts/JetBrainsMono-OFL.txt`.

## ThreeUI Community — TempleNightScene

- Package: `@designcodeio/threeui`, version 1.2.0.
- License: MIT, Copyright (c) 2026 Meng To.
- Full license: [threeui-MIT.txt](licenses/design-references/threeui-MIT.txt).
- The Hero imports the installed `TempleNightScene` component directly; shared package styles are imported once. No renderer source or runtime assets are copied into this repository. The scene creates its environment procedurally.
- A scoped build loader translates legacy color-space, mapped UV, and shadow APIs for Three.js r183 and reduces film grain behind portfolio text. The installed package files remain unchanged.
- The same loader connects a portfolio scroll-progress value to a small, reversible camera offset in the existing renderer for cover-to-page depth; no additional renderer or copied scene is used.
- Embedded fonts supplied by the shared package stylesheet retain their upstream font licenses: [threeui-FONT-LICENSES.md](licenses/design-references/threeui-FONT-LICENSES.md). The portfolio continues to use its existing locally hosted fonts.

## MacBook Showcase Landing Page
- Original author: Arnob Mahmud
- Repository: https://github.com/arnobt78/MacBook-Showcase-Landing-Page--React-Frontend
- License: MIT
- Copyright (c) 2026 Arnob Mahmud
- License text: [macbook-MIT.txt](licenses/design-references/macbook-MIT.txt)

Read-only implementation references consulted:
- `src/components/Showcase.tsx`: desktop-only pinning, scrubbed progress, trigger/start/end boundaries.
- `src/components/Performance.tsx`: differently positioned elements coordinated on one responsive scroll timeline.
- `LICENSE`.

## Fizzi 3D Website
- Repository: https://github.com/codedalex/Fizzi-3D-Website
- License: Apache License 2.0
- License text: [fizzi-Apache-2.0.txt](licenses/design-references/fizzi-Apache-2.0.txt)

Read-only implementation references consulted:
- `src/slices/Hero/index.tsx`: oversized DOM headings coordinated with the centerpiece's scroll range.
- `src/slices/Hero/Scene.tsx`: object positions/rotations coordinated by a scroll timeline.
- `src/components/ViewCanvas.tsx`: shared rendering architecture and restrained DPR.
- `LICENSE`. No separate NOTICE file was found in this reference checkout.

## Scope of inspiration
GED0001's Reading Journey, SVG paper artwork, timelines, hero-motion context, and writing effects are original implementations for this portfolio. The references informed general GSAP pin/scrub choreography, responsive disabling, collage movement, and 3D/DOM coordination. No substantial source block was copied or translated directly. The upstream license texts are retained here for attribution.

No Apple or Fizzi branding, marketing copy, images, video, product models, CMS, framework configuration, or package manifest is incorporated. Both reference directories remain read-only. Our existing Next.js 16 / React 19 / R3F 9 / GSAP / Lenis and portfolio-content architecture is retained.
