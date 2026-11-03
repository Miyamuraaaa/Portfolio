# Content Audit — Beyond the Pages

Phase 1 only. No source, configuration, academic submission, PDF, image, `info.json`, or portfolio-content file was changed.

## Scope and method

The current rendered home page contains six content sections: Hero, Reading Journey, About the Reader, Favorite Words, the GED0001 Collection, and Featured Work. Shared navbar, preloader/device picker, and footer copy were also audited. The four `/collection/*` chapter pages, the existing `/reading/*` document-reader route, page metadata, `portfolio-content/`, README, and accessible labels were checked. Legacy `About.tsx` and `Contact.tsx` exist but are not imported by the current home page.

Word counts are approximate whitespace-separated counts. Labels, numbers, and repeated brand text are counted when they are part of the visible block. Academic submission text is recorded but not shortened by the target limits.

## Decisions for visible copy

| Section | Source file | Original text | Words | Decision (keep / shorten / relocate / remove) | Reason | Proposed text (if shorten) |
|---|---|---|---:|---|---|---|
| Metadata title | `src/app/layout.tsx:9` | `GED0001 \| DIGITAL READING PORTFOLIO \| By Cliford V. Balce` | 8 | keep | Clear title, course identity, and authorship. | — |
| Metadata description | `src/app/layout.tsx:10-11` | `A visual collection of my reading activities, responses, projects, iCARE activities, and reflections throughout GED0001. By Cliford V. Balce.` | 19 | shorten | Slightly above the 8–16-word homepage-description target and repeats the hero description. | `A visual GED0001 collection of my reading activities, responses, projects, iCARE work, and reflections.` |
| Preloader label/byline | `src/components/layout/Preloader.tsx:49,58` | `GED0001 / DIGITAL READING PORTFOLIO` / `By Cliford V. Balce` | 4 / 4 | keep | Short orientation before loading; consistent identity. | — |
| Device gate heading | `src/components/layout/DeviceGate.tsx:44` | `Welcome to` / `Beyond the Pages.` | 4 | keep | Strong, brief welcome and the core title. | — |
| Device gate copy | `src/components/layout/DeviceGate.tsx:45` | `This is a collection of my reading activities, responses, iCARE activities and reflections for GED0001. To show it the way it was made to be seen, tell me what you are using.` | 29 | shorten | Helpful but longer than needed for a choice screen; repeats the metadata and hero. | `This GED0001 collection holds my reading activities, responses, iCARE work, and reflections. Choose your device view.` |
| Device option copy | `src/components/layout/DeviceGate.tsx:48-56` | `The full cinematic experience with the 3D scene.` / `Made for touch and small screens, lighter and faster.` | 9 / 9 | keep | Practical distinction between choices; no factual issue found. | — |
| Device gate note | `src/components/layout/DeviceGate.tsx:58` | `You can change this any time from the footer.` | 9 | keep | Explains a non-obvious control. | — |
| Seven-link navbar | `src/components/layout/Navbar.tsx:10-16` | `Home` · `Journey` · `About` · `Worksheets` · `Responses` · `iCARE` · `Reflection` | 7 | keep | Required navigation and anchors; do not change. | — |
| Navbar CTA | `src/components/layout/Navbar.tsx:87,139` | `Explore Portfolio` | 2 | keep | Clear action and repeated hero action. | — |
| Hero title/byline | `src/components/sections/Hero.tsx:49-55`; `MobileHero.tsx:61-69` | `DIGITAL READING PORTFOLIO` / `By Cliford V. Balce` | 7 | keep | Primary identity; the title is intentionally visual. | — |
| Hero tagline | `src/components/sections/Hero.tsx:57`; `MobileHero.tsx:74` | `Beyond the Pages` | 3 | keep once, relocate/remove repeats | Brand phrase works in the hero, but it repeats in the device gate, journey paper, footer, and About closing line. Retain the hero occurrence as the primary statement. | — |
| Homepage description | `src/components/sections/Hero.tsx:58` | `A visual collection of my reading activities, responses, projects, iCARE activities, and reflections throughout GED0001.` | 15 | keep | Within the 8–16-word target if the trailing metadata byline is excluded; accurately describes the site. | — |
| Hero actions | `src/components/sections/Hero.tsx:61-62`; `MobileHero.tsx:70` | `Explore Portfolio` · `My Journey` | 4 | keep | Clear primary and secondary actions. | — |
| Hero footer line | `src/components/sections/Hero.tsx:66-68`; `MobileHero.tsx:77-78` | `SCROLL` · `READ. RESPOND. REFLECT.` · `01 — 05` / `Scroll` · `Read. Respond. Reflect.` | 7 / 5 | shorten/relocate | `READ. RESPOND. REFLECT.` repeats the journey closing line and the About theme; `01 — 05` conflicts with four visible chapter cards. Keep the scroll cue, but use one process phrase in one location. | `SCROLL` plus `READ. RESPOND. REFLECT.` once; remove `01 — 05` or change only after owner confirms intended chapter count. |
| Journey heading/intro | `src/components/sections/ReadingJourney.tsx:105-113` | `01 / READING JOURNEY` / `READING JOURNEY` / `From the first page to a new perspective. A space to read, respond, and reflect.` | 3 / 2 / 15 | keep | One-sentence introduction fits the 10–20-word section target and establishes the process. | — |
| Journey continuation | `src/components/sections/ReadingJourney.tsx:106` | `Continue to the collection` | 4 | keep | Useful skip link. | — |
| Journey milestones | `src/components/sections/ReadingJourney.tsx:8-11,120` | `Reading — Notice & understand`; `Response — Connect & question`; `iCARE — Participate & learn`; `Reflection — Look back & grow` | 5 each | keep | All are 15–30-word target concepts when read as labels plus detail? The visible phrases themselves are intentionally compact and parallel. | — |
| Journey closing line | `src/components/sections/ReadingJourney.tsx:126` | `READ. CONNECT. REFLECT. / GED0001` | 5 | shorten/relocate | Repeats `Read. Respond. Reflect.` but changes “Respond” to “Connect”; this is an avoidable messaging split. | `READ. RESPOND. REFLECT. / GED0001` or retain the existing phrase only if the owner intentionally wants “Connect.” |
| About heading/side note | `src/components/sections/AboutMe.tsx:82-85` | `ABOUT THE READER` / `About me.` / `The person behind the pages.` | 4 / 2 / 5 | keep | Warm and concise section orientation. | — |
| About paragraphs 1–5 | `src/data/profile.ts:29-33` | Verbatim text is in the snapshot; combined current copy is approximately 200 words. | ~200 | shorten | The requested target is 80–130 words total. The current copy repeats “learn,” persistence, portfolio/site-building, and journey ideas while still containing the required personal facts. Preserve personality, BSCE, Block TV05, the three words, self-built/trial-and-error fact, and learning journey. | `Hello! I'm Cliford V. Balce, a BSCE student from Block TV05. If I had to describe myself in three words, I'd say persistent, curious, and always willing to learn. I enjoy exploring ideas, figuring out how things work, and finding solutions when challenges come my way. I designed and coded this portfolio myself, and the process took patience, trial and error, and persistence. More than a collection of academic work, it reflects my learning journey and the person I'm continuing to become.` NEEDS OWNER APPROVAL |
| About thank-you line | `src/data/profile.ts:33` | `Thank you for visiting my portfolio! I hope you enjoy exploring my work and following my journey **beyond the pages.**` | 20 | relocate/shorten | The thank-you is friendly, but `beyond the pages` duplicates the brand phrase. It can become a short closing line or move to the footer if desired. | `Thank you for exploring my work.` NEEDS OWNER APPROVAL |
| Portrait/caption/EngineerX | `src/components/sections/AboutMe.tsx:97,111-126` | `PORTRAIT / 01` / `Cliford V. Balce` / `BSCE / BLOCK TV05` / `EngineerX` | 2 / 2 / 2 / 1 | keep | Useful identity and independent-work link; no invented facts. | — |
| Favorite Words heading | `src/components/sections/FavoriteWords.tsx:7-11` | `TEN FAVORITE WORDS` / `Words I keep close.` / `Ten words, and what they mean.` | 6 | keep | Clear section promise and compact introduction. | — |
| Favorite Word explanations | `src/data/favoriteWords.ts:5-14` | All ten word/meaning pairs are reproduced verbatim in the snapshot. | 5–10 each | keep | The brief explanations already meet the one-sentence target. Keep all ten words as required. | — |
| Collection heading | `src/components/sections/AcademicIndex.tsx:36-37` | `THE GED0001 COLLECTION` / `A journey in five chapters.` / `The collection will grow as coursework is added.` | 7 / 6 | shorten/relocate | The chapter count is structurally inaccurate: four cards render. The heading should not claim five until a fifth chapter exists. | `A journey through the collection.` NEEDS OWNER DECISION |
| Academic card descriptions | `src/components/sections/AcademicIndex.tsx:25-28` | `A space for the activities that guide a closer reading.` / `Personal perspectives and connections with the texts.` / `A collection of participation, experiences, and learning.` / `Looking back on the reading experience and what it leaves behind.` | 9 / 8 / 8 / 11 | keep | All meet the 8–15-word card target and distinguish the four chapters. | — |
| Academic counts | `src/data/content.ts:27` and manifest | `To be collected` / `1 work` / current reading-process count `1 work` | 3 / 2 | keep/relocate | Honest empty-state language should remain until the owner supplies coursework. The current reading-process PDF means that chapter is no longer empty. | — |
| Collection closing line | `src/components/sections/AcademicIndex.tsx:59` | `Every page, a new perspective.` | 5 | keep | Short closing statement; not a structural problem. | — |
| Featured heading/description | `src/components/sections/Projects.tsx:39-40` | `INDEPENDENT EXPLORATIONS` / `Featured work.` / `Personal work, beyond the reading collection.` | 4 / 5 | keep | Clear separation between academic collection and independent project. | — |
| Engineering Calculator copy | `portfolio-content/featured-work/engineering-calculator/info.json`; `src/components/sections/Projects.tsx:54-62` | `Engineering Calculator Website` / `Featured Work` / `A calculator website I created for engineering-related calculations and problem solving.` / `Visit Website` | 2 / 2 / 13 / 2 | keep | Accurate current data; description meets the 8–15-word navigation/project target. | — |
| Collection page navigation | `src/app/collection/[slug]/page.tsx:38,47-50` | `Back to portfolio` / `Reading Process Worksheets` / `Reader Responses` / `iCARE Activities` / `Reflection` | 3 / 2–3 each | keep | Necessary route navigation. | — |
| Collection empty state | `src/app/collection/[slug]/page.tsx:61-64` | `TO BE COLLECTED` / `Nothing is shown here until real coursework is added. No placeholder work is invented.` | 2 / 15 | keep | Honest and explicit; do not fabricate coursework. | — |
| Collection work actions | `src/components/ui/WorkFrame.tsx:38-82` | `EXTERNAL WORK` / `Visit Website` / `View Worksheet` / `View Response` / `View Activity` / `View Reflection` / `Download` / `Website` | 15 | keep | Functional labels are clear. | — |
| Collection footer | `src/app/collection/[slug]/page.tsx:70-72` | `GED0001 / DIGITAL READING PORTFOLIO` / `By Cliford V. Balce` / `Back to the full portfolio` | 4 / 4 / 5 | keep | Consistent route identity and return path. | — |
| Document-reader fallback text | `src/app/reading/[category]/[...slug]/page.tsx:63-66`; `src/components/content/DocumentViewer.tsx:26-43` | Snapshot contains the exact fallback, PDF, full-screen, open, and download strings. | varies | keep | These are recovery instructions, not marketing copy; clarity is more important than shortening. | — |

## Structural findings

### 1. Empty chapters and actual portfolio-content inventory

Current content on disk:

| Category | Files/content | Current result |
|---|---|---|
| `featured-work/engineering-calculator/` | `info.json` only, with an external URL | One featured independent work: Engineering Calculator Website |
| `reading-process/` | Root `.gitkeep`; nested `reading-process/png2pdf.pdf` | One generated work titled `Reading Process`; the folder is not empty |
| `reader-responses/reader-responses/` | `.gitkeep` only | Empty; shows `To be collected` |
| `icare/` | `.gitkeep` only | Empty; shows `To be collected` |
| `reflections/` | Root `.gitkeep`; `starting-the-portfolio/info.json` and `starting-the-portfolio.pdf` | One reflection work |

The visible implementation is honest: it does not invent worksheet, response, or iCARE submissions. The owner must supply the actual coursework files and, if desired, `info.json` metadata for those chapters. The owner must decide whether empty chapters should remain visible with the current placeholder, be hidden until populated, or use a shorter honest explanation. No coursework content should be fabricated.

### 2. Chapter numbering mismatch

The collection heading says `A journey in five chapters.` in `src/components/sections/AcademicIndex.tsx:37`, but `sections` contains only four entries (`worksheets`, `responses`, `icare`, `reflection`) at lines 25–28. The card number is generated as `0{index + 2}` at lines 48–49, so the visible numbers are `02`, `03`, `04`, and `05`; the apparent `0202`/`0303` effect is the same number rendered once as the ghost numeral and once in the card header. Collection routes also use `0{index + 2}`. Suggested fix: either change the heading to four chapters or provide and implement a real fifth chapter. OWNER DECISION REQUIRED.

### 3. Missing captions and metadata

| Work | `info.json` | Title | Date | Description | Score | Reflection | Gaps |
|---|---|---:|---:|---:|---:|---:|---|
| Engineering Calculator Website | present | yes | no | yes | no | no | Date, score, and reflection are absent; score/reflection may not apply to independent work. |
| Reading Process (`png2pdf.pdf`) | absent | generated from folder | no | no | no | no | Owner should supply a title and description if the PDF is an actual submission; date/score/reflection are optional and need owner input. |
| Starting the Portfolio | present | yes | yes (`2026-09-10`) | yes | no | no | Score and reflection absent; add only if the owner wants them. |

The owner must confirm whether `png2pdf.pdf` is an academic submission and provide its intended title, description, date, score, and/or reflection. Do not infer these from the filename.

### 4. Contact information

The current visible contact surface is icon-only in `src/components/ui/SocialLinks.tsx`: Instagram `@b_clxf` and the profile email `clifordbalce5@gmail.com` are present in `src/data/profile.ts`, though the email is exposed through an icon/title/accessible label rather than a visible text line. A short contact line could fit beneath the About links or in the footer identity block without changing the design. Suggested content: `NEEDS INPUT FROM OWNER` for any school, preferred email, or additional contact wording. Do not add a school or new address without owner input.

### 5. Credit and authorship

The About copy says: `I designed and coded this website myself...` (`src/data/profile.ts:31`). README says the site is built on the Next.js / React Three Fiber foundation of `KaranChandekar/interactive-3d-portfolio`, and the repository contains project instruction files. These statements can both be true, but the current site has no explicit public credit line for the foundation. Suggested owner-approved wording for the footer/About, without changing it now: `Designed and coded by Cliford V. Balce, built on an open-source portfolio foundation by KaranChandekar.` Final wording and placement: NEEDS INPUT FROM OWNER.

### 6. Repository hygiene

- The repository/GitHub About link reportedly points to `portfolio-basta2.vercel.app`, while the intended site is `clifportfolio.vercel.app`. Verify the canonical deployment URL and update repository metadata in a later phase; no source edit was made.
- README contains developer debugging material under `### Repeated GET /api/wallet 404` and `### THREE.Clock deprecation`. Recommend moving these sections to `DEV_NOTES.md` or another developer-only document while retaining a short validation reference in README.
- README also includes long implementation/validation notes. Consider separating contributor/deployment instructions from historical debugging notes.

### 7. Navigation and readability observations

- The required seven links and anchors are present: Home, Journey, About, Worksheets, Responses, iCARE, Reflection.
- The fixed navbar uses `section[id] { scroll-margin-top: 100px; }` in `src/app/globals.css`, and chapter cards also define `scroll-margin-top: 90px`; this is a reasonable attempt to prevent the fixed navbar from covering targets.
- `Navbar.tsx` computes active state from all matching IDs and sets `aria-current="location"` only on the homepage. On collection/document routes, the navbar links point home but no home section is present in the current document, so active-section highlighting is not meaningful there.
- The hero and journey use large display type, wide max-widths, and animation-driven reveals. On short viewports, the text and pinned/transitioning visual layers should be checked for temporary occlusion; this is an observation, not a confirmed defect.
- The journey links are compact and readable, but `Notice & understand`, `Connect & question`, `Participate & learn`, and `Look back & grow` are small supporting labels. Contrast and tap target behavior should be checked on physical mobile hardware.
- Lenis and GSAP are deliberately layered with native behavior on mobile/device choices. A document viewer has `data-lenis-prevent`, which is appropriate for embedded PDF interaction but should be tested with keyboard and touch scrolling.
- The collection card description is hidden below 520px by CSS, so the card title/status carry the meaning on narrow screens. This preserves space but reduces context.

### 8. Accessibility and sharing basics

- The portrait has descriptive alt text: `Portrait of Cliford V. Balce in a black suit and tie` (`src/data/profile.ts:11`).
- Work images receive generated alt text (`{work.title} preview` or `{work.title} — {file.name}`); the project-detail gallery uses generic `Gallery image {i + 1}` labels and could be more descriptive if the data supports captions.
- Decorative SVGs/canvas scenes are marked `aria-hidden`; links and icon-only social controls have accessible names.
- Heading order on the main page is generally sound: one hero `h1`, section `h2`s, chapter/word/card headings below. Collection pages use an `h1` followed by work `h2`s. The legacy unused `About.tsx`/`Contact.tsx` should not be considered part of the rendered heading tree.
- There is no `openGraph` metadata or OG image in `src/app/layout.tsx`; only title and description are defined. Social shares will lack an explicit project image and custom OG fields. Owner must provide/approve an image and share title/description.
- The metadata description duplicates the homepage description and is longer than the requested 8–16-word homepage target. See the copy table.

### 9. Performance risks

- `src/data/profile.ts` requests the portrait as a 960×960 source, not 3840px in the current file. The `next/image` component supplies responsive `sizes`; no 3840px request was found in the audited code. If a deployment trace reports 3840px, inspect generated image optimization parameters rather than changing the source blindly.
- The desktop hero dynamically loads `TempleNightScene` and the root/page includes GSAP, Lenis, Framer Motion, and scroll-triggered animation. The device gate avoids mounting the desktop scene for mobile, and `MobileHero` uses a small pixel canvas, but real-device testing is still warranted.
- `MobileHero` creates a canvas scene and uses an `IntersectionObserver`; `PdfPreview` lazily activates desktop PDF embedding near the viewport and uses a lighter card on phones.
- The document-reader `<object>` can still be heavy or unreliable on mobile; the fallback/open/download paths are present.
- Numerous scroll triggers and animated paper/sky layers can increase main-thread work on long pages. Reduced-motion branches exist, but profiling on the target phone remains an owner validation task.
- The current generated manifest includes a PDF and external work; no large image coursework was found in `portfolio-content/` during this audit.

## Duplicate and repeated messaging

| Repeated phrase | Locations | Finding |
|---|---|---|
| `Beyond the Pages` | Device gate, desktop/mobile hero, Reading Journey paper, About closing sentence, footer | Core brand phrase is useful once in the hero and once as the site/heading identity, but the current frequency makes it feel repeated. Keep hero/footer or hero/device gate, and shorten the About closing line. |
| `Read. Respond. Reflect.` | Desktop/mobile hero footer | Good process line; keep one canonical occurrence. |
| `READ. CONNECT. REFLECT.` | Journey closing line | Near-duplicate with a changed verb. Choose one phrase and use it consistently. |
| `The collection...` / `reading collection` | Hero description, Academic heading, Featured Work description, collection pages | Mostly functional, but the hero, section note, and Featured Work note can be shorter after About compression. |
| `By Cliford V. Balce` | Metadata, preloader, hero, footer, collection footer | Identity repetition is acceptable in chrome, but it need not appear in every context if vertical space is tight. |

## Phase 2 priorities

### Text-only edits

1. Resolve the “five chapters” versus four rendered cards mismatch.
2. Reduce the About copy to 80–130 words while preserving BSCE, Block TV05, `persistent, curious, and always willing to learn`, self-built/trial-and-error, and learning journey.
3. Remove or shorten the About thank-you line so it does not repeat `Beyond the Pages`.
4. Choose one canonical process phrase: `Read. Respond. Reflect.` or `Read. Connect. Reflect.`.
5. Shorten metadata/device-gate description copy and remove redundant byline wording where appropriate.
6. Confirm the `01 — 05` hero marker or replace it with a count that matches the actual chapter structure.
7. Decide whether the reading-process work title/description should be supplied through `info.json`.
8. Add an approved visible contact line if the owner wants email/school context visible.
9. Add approved authorship/foundation credit wording.
10. Add approved Open Graph title/description/image metadata.

### Owner must provide content

1. Real Reader Responses coursework for `portfolio-content/reader-responses/`.
2. Real iCARE coursework for `portfolio-content/icare/`.
3. Confirmation that `portfolio-content/reading-process/reading-process/png2pdf.pdf` is an actual submission and its intended metadata.
4. Optional score/reflection/date metadata for each work.
5. The intended fifth chapter, if “five chapters” is intentional; otherwise approval to call it four chapters/a collection.
6. Preferred public contact line, school information, and whether the existing email should be visibly printed.
7. Final honest credit wording for the portfolio foundation.
8. Canonical production URL (`clifportfolio.vercel.app` versus `portfolio-basta2.vercel.app`).
9. OG/share image and approved share copy.
10. Approval of any shortened About paragraph and repeated-tagline decisions.

## Questions requiring owner answers before Phase 2

1. Is `png2pdf.pdf` a real Reading Process submission, and what title, description, date, score, and reflection should it have?
2. Should empty Reader Responses and iCARE remain visible with `To be collected`, be hidden, or show another owner-approved placeholder?
3. Is there a real fifth chapter, or should the heading/hero numbering be changed to four?
4. Which canonical phrase should the site use: `Read. Respond. Reflect.` or `Read. Connect. Reflect.`?
5. May the About copy be reduced to the proposed approximately 100-word version?
6. Should the About thank-you remain, be shortened, or move to the footer?
7. Should the existing email be visibly printed, and what school/contact line is approved?
8. What exact authorship/foundation credit should appear publicly?
9. What is the canonical deployment URL?
10. What OG image and share text should be used?
11. Are scores and reflections expected for the existing works, or should those fields remain absent?
12. Should the reading-process PDF’s generated title be replaced through `info.json`?

## Informational word-count estimate

| Copy area | Current estimate | Phase 2 target estimate | Note |
|---|---:|---:|---|
| Homepage hero description | 15 words (19 with byline in metadata) | 8–16 words | Already within target in the hero; metadata can be tightened. |
| About introduction | approximately 200 words | 80–130 words | Preserve meaning and owner facts; final wording requires approval. |
| Journey introduction | 15 words | 10–20 words | Already within target. |
| Academic card descriptions | 8–11 words each | 8–15 words each | Already within target. |
| Reflection preview/work description | current reflection description is approximately 45 words | 20–40 words | Shorten only if this is intended as a preview; do not alter the academic submission itself. |
| Navigation labels | 7 primary labels plus CTAs | unchanged | Required seven anchors must be preserved. |

## Audit status

Phase 1 is complete. No Phase 2 code or content edits were made. Approval and owner answers are required before implementation.
