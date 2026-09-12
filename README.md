# GED0001 — DIGITAL READING PORTFOLIO
By Cliford V. Balce

An editorial academic portfolio with a procedural pen, paper, and board scene, GSAP scroll-progressive reveals, Lenis scrolling, and a magnetic cursor. Built on the Next.js / React Three Fiber foundation of [KaranChandekar/interactive-3d-portfolio](https://github.com/KaranChandekar/interactive-3d-portfolio).

## HOW TO ADD NEW SCHOOLWORK

**No React edits, imports, routes, or manual work arrays are needed.**

### Step 1: Choose the correct category

| Folder inside `portfolio-content/` | Website section |
| --- | --- |
| `reading-process/` | Reading Process Worksheets |
| `reader-responses/` | Reader Responses |
| `icare/` | iCARE Activities |
| `reflections/` | Reflection |
| `featured-work/` | Independent featured work |

Reading Journey is a visual introduction with neutral process labels. Academic work counts are still calculated from the manifest in their own sections; the calculator remains a separate personal showcase.

### Step 2: Create a folder

Use one folder per activity, for example `portfolio-content/reader-responses/response-01/`.

### Step 3: Drop in PDF/image files

Supported extensions (case-insensitive): `.pdf`, `.png`, `.jpg`, `.jpeg`, and `.webp`.

```text
portfolio-content/
├── featured-work/
│   └── engineering-calculator/
│       └── info.json
├── reading-process/
│   └── worksheet-01/
│       ├── worksheet.pdf
│       ├── preview.jpg
│       └── info.json
├── reader-responses/
│   └── response-01/
│       ├── response.pdf
│       └── info.json
├── icare/
│   └── activity-01/
│       ├── score.png
│       └── info.json
└── reflections/
    └── final-reflection/
        └── reflection.pdf
```

The initial academic folders contain only `.gitkeep` and display **To be collected**. The activities above illustrate files you can add; they are not included sample assignments.

Files directly inside an activity folder form one work. The scanner also visits nested folders; each folder with its own supported files or external URL becomes a separate work. Loose files directly inside a category become individual works named after the file. Keep a PDF and its preview together in the same activity folder.

### Step 4: Optionally create info.json

All fields are optional. Use valid JSON (double quotes, no trailing commas).

```json
{
  "title": "Reader Response 1",
  "subtitle": "Understanding the Text",
  "date": "September 2026",
  "description": "My response to the assigned reading.",
  "order": 1,
  "score": "18/20",
  "reflection": "My own reflection on this activity.",
  "featured": false
}
```

Without metadata, `worksheet-03/worksheet.pdf` is titled **Worksheet 03**. No description is invented. Works sort by numeric `order` (lowest first), then title with natural number sorting. Works without an order follow ordered works. `score` accepts text or a number; `date` is display text.

The optional `featured` boolean is preserved in the manifest; **the category folder determines placement**, so marking coursework featured does not move it out of its academic section.

For an external website, only `info.json` is needed:

```json
{
  "title": "Engineering Calculator Website",
  "subtitle": "Featured Work",
  "description": "A calculator website I created for engineering-related calculations and problem solving.",
  "url": "https://engineerx.clif0.workers.dev/",
  "order": 1,
  "featured": true
}
```

The calculator's live data is in `portfolio-content/featured-work/engineering-calculator/info.json`.

### Step 5: Restart npm run dev

Stop the current server with **Ctrl+C**, then run:

```bash
npm run dev
```

The `predev` hook scans your files automatically. A production build also regenerates everything:

```bash
npm run build
```

After deleting or renaming an activity, restart or rebuild again. Removed files disappear from the manifest and generated assets. The development server does not watch the source content folder; restarting is the supported workflow.

## How work opens

- Image thumbnails use lazy-loaded Next.js image optimization. A file named `preview.*`, `cover.*`, or `thumbnail.*` is preferred.
- PDF-only work uses an editorial typographic placeholder; PDF bytes are not loaded with the homepage.
- **View Work** opens the first PDF, or the first image if there is no PDF, in a new tab.
- **Visit Website** opens the supplied HTTP(S) URL in a new tab.
- Additional files are available under **All files**. Every file remains accessible.
- Links support keyboard focus and safe new-tab attributes. Reduced motion displays the full content without scroll reveals.

## Development and validation

Use Node.js 20.9+ and npm. Install with `npm install`, then `npm run dev`. The framework is Next.js 16.2.1 with React 19; dependency versions are retained.

```bash
npm run content:generate
node --test scripts/generate-content-manifest.test.mjs
npm run build
npm run lint
git diff --check
```

On Windows PowerShell, `npm.cmd` can be used in place of `npm` if the shell blocks the PowerShell npm shim.

With the development server running, an optional end-to-end check is available:

```bash
node scripts/verify-content-workflow.mjs http://127.0.0.1:3000
```

It adds a uniquely named temporary reader response, verifies the rendered work/count and generated URLs, and removes its fixture in a `finally` cleanup before checking that the original collection is restored. The scanner unit test uses an isolated temporary directory.

## Generated content and deployment

`scripts/generate-content-manifest.mjs` uses only Node.js built-ins. It recursively scans the five known categories, validates optional metadata, creates stable path-based IDs, sorts work, and writes:

```text
public/generated-content/              # Copied PDF/image assets
src/generated/content-manifest.json    # Lightweight card metadata and web URLs
```

Both outputs are gitignored. **Commit the original files in `portfolio-content/`**, along with the source code and scripts. A fresh Vercel deployment must use **`npm run build`** as its build command so the `prebuild` hook generates the manifest and public assets before Next.js compiles. Running `next build` directly bypasses this hook.

Only `public/generated-content/` is cleared by generation; unrelated public assets are preserved. Output paths are checked before cleanup, and symbolic links/junctions are rejected for generated destinations. Source symlinks, hidden files, system files, and unsupported file types are skipped. Web URLs use forward slashes and encode spaces and special characters on Windows and Linux.

Malformed `info.json` produces a warning and falls back to folder/file information. Invalid external URLs are ignored; a work with neither supported files nor a valid URL is omitted. An empty folder is not counted as a work.

## Design implementation

- `src/components/ui/ScrollReveals.tsx`: individually scrubbed GSAP timelines for headings, labels, descriptions, lines, rows, and cards. Timelines reverse with scrolling and are cleaned up on unmount or reduced-motion changes.
- `src/components/sections/AcademicIndex.tsx`: manifest-aware categories and dynamic work counts.
- `src/components/ui/WorkCard.tsx`: shared PDF/image/link cards with optional metadata and attachments.
- `src/components/sections/Projects.tsx`: calculator showcase driven by the same manifest.
- `src/data/content.ts`: typed manifest access.
- `src/app/globals.css`: editorial palette, padded rows, and responsive card layouts.

The Phase 1 hero, navbar, procedural 3D composition, typography, cursor, and smooth-scrolling foundation remain in place. Embedded document viewers and a coursework-based reading timeline can be added later.

## Reflection journal entries

Reflections use compact journal cards instead of document preview cards: approximately 320–380px wide on desktop and about 280–310px tall for a typical title and four-line excerpt. They wrap to two or three columns as space permits, two columns on tablet, and one on mobile. Heights remain content-driven so longer titles and expanded attachments are accessible.

Create an activity folder such as:

```text
portfolio-content/reflections/starting-the-portfolio/
├── starting-the-portfolio.pdf
└── info.json
```

The metadata title is authoritative. Without metadata, activity titles come from the folder name; loose category files use the filename. The original entry displayed **Start** because its folder was named `start` and had no metadata—not because the PDF filename was truncated. It now has its own `info.json` with the full title and date.

Fallback titles remove supported file extensions, replace dashes/underscores, preserve every word, and use title case with small connecting words kept lowercase (for example, **Starting the Portfolio**). Dates in `YYYY-MM-DD` format are displayed as a readable date using UTC, preventing a timezone shift.

The card excerpt uses `description`, falling back to `reflection`, and is clamped to four lines. **View Reflection** opens the PDF (or another available file/link) safely in a new tab. Full PDF contents are never loaded into the homepage. Each card retains an independent scrubbed reveal with a small scroll offset between neighboring entries.

## Development terminal diagnostics

### Repeated GET /api/wallet 404

The investigation found no wallet references or wallet-request construction in application components, layout, routes, public assets, configuration, or scripts. No middleware or service worker is registered by this app. The source network calls found are in the optional content verification script, which requests the homepage, generated files, and image optimization endpoint. A search of installed dependencies and built static files also found no `api/wallet` reference.

There is no evidence that the portfolio generates these requests. Browser extensions, injected scripts, another tab, or external browser tooling are plausible sources; identifying the specific sender requires browser evidence. No placeholder API route was added.

To trace it in Chrome:

1. Open DevTools → **Network**, then filter **wallet**.
2. Click the `/api/wallet` request and inspect its **Initiator** tab/stack.
3. Look for a script URL, originating tab, or a `chrome-extension://<id>/...` URL. Match an extension ID under `chrome://extensions` with Developer mode enabled.
4. Test in Incognito with extensions disabled (extensions explicitly allowed in Incognito can still run). Alternatively disable extensions, reload, and re-enable them individually.
5. If requests continue without extensions, close other localhost tabs and inspect external browser/dev tooling. A 404 alone identifies the missing destination, not the caller.

### THREE.Clock deprecation

Our scene reads the clock supplied by React Three Fiber; it does not instantiate `THREE.Clock`. In the installed React Three Fiber build, `node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js` initializes the store with `clock: new THREE.Clock()` (with equivalent calls in its CommonJS builds). Three.js r183 marks that class deprecated in `node_modules/three/src/core/Clock.js`.

This warning originates in the dependency's clock initialization. Dependencies and the working 3D scene were left unchanged; no warning suppression or risky upgrade was introduced.

## Anchor landing and paper details

The persistent section tint came from `.academic-chapter:target .chapter-row`; the old parent `:focus-within` rule could also keep the whole row tinted while a work link was focused. Both persistent rules have been removed. Links keep their individual focus rings.

Same-page anchors are handled by the existing Lenis wrapper. Normal clicks preserve the URL hash through browser history, scroll to the destination, and apply a restrained **800ms** landing tint after arrival. Back/forward hash navigation also works. Reduced motion switches to immediate scrolling and skips the tint. Navbar active text/underline follows scroll position rather than keeping a page section highlighted.

All academic card grids share `--chapter-content-gap`: **36px desktop**, **28px tablet**, and **22px mobile**. Desktop/tablet cards align with the heading's text column (after the 48px number column and 24px grid gap). Mobile aligns cards with the stacked heading text and uses the shared comfortable side padding. Reflection remains a compact four-line journal card with a quiet spine accent and action divider.

`PaperInk.tsx` draws a small 256×384 transparent canvas texture on each existing curved paper mesh. Short uneven strokes appear progressively with hero scrolling, with slightly different starts across sheets, and reverse when scrolling upward. Underlines, margin checks, a small circled letter, and a signature-like mark add reading-note character; annotation emphasis responds to scroll. Textures update only when a discrete reveal step changes, not continuously once writing is complete. Each texture is disposed on unmount. The board now has faint frame and grid lines; there are no new models, font downloads, or shadows. Mobile/reduced-motion fallback behavior remains in the hero.


## Cinematic Reading Journey

The page now flows from Hero → Reading Journey → the existing academic collection → the separate calculator showcase. No worksheet, response, iCARE, or reflection card layout was redesigned in this pass, and no fake schoolwork was added.

Reading Journey is the only pinned section. Above 1024px wide and at least 620 CSS pixels high, with motion enabled, it pins below the navbar for 1.4 frame heights of scrolling (capped at 1200px). A single reversible scrubbed timeline stages: 0% quiet composition; 20% first paper; 35% heading; 50% timeline rule; 65% second paper/annotations; 80% Reading, Response, iCARE, Reflection labels; 100% settling and release. These describe a process, not completed milestones. The always-visible continuation link skips directly to Worksheets.

Tablet, mobile, short desktop windows, and reduced-motion users get the complete composition in normal document flow with no pin spacer or hidden stages. Milestone links have visible keyboard focus and remain accessible during the desktop reveal.

Hero object separation, pen rotation, canvas fade, and ink drawing use a shared scrubbed progress ref. The departing ivory paper's angle and markings are echoed by the Journey's first SVG paper. This is a visual handoff, not a WebGL object transferred between canvases. The existing single Canvas, capped DPR, offscreen pause, and mobile fallback remain. Ink uses small procedural canvas textures with quantized redraw steps; its check and bracket draw progressively without text geometry.

Reference patterns, consulted files, and licenses are recorded in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Reference repositories were only read. Optional manifest-driven worksheet collage behavior remains deferred until a later pass.

### Viewport sizing and quiet cosmic atmosphere

### Mobile motion and living sky

The same Space Grotesk and JetBrains Mono variable fonts now use `next/font/local`, with original license notices under `public/fonts/`. This removes the build-time Google Fonts network dependency while retaining the font families and CSS variables.

Phones/tablets (up to 1024px) now use unpinned, one-time Journey entrances. The label, first paper, title, intro and second paper enter in sequence; a separate lower trigger draws the timeline, reveals the four stages, then the closing label. Desktop's original pin query, scrub and timeline remain unchanged. Hero keeps SplitText and adds sequenced byline/tagline/description/actions/scroll-cue reveals; its DOM paper study drifts while visible. Phones still do not mount WebGL. Academic/featured cards and footer use short one-time entrances on smaller viewports, with desktop scrub retained.

The single root-mounted sky now contains **120 desktop stars (70/35/15)**, **67 tablet stars (38/20/9)** and **44 phone stars (26/12/6)**. A seeded distribution is identical during SSR and hydration, weighted toward the edges with a few faint center points. CSS drift differs by depth (100/65/42 seconds); selected stars twinkle with individual durations/delays. A separate lightweight gradient layer drifts over 95 seconds. Meteors randomize angle, distance, trail length, brightness and duration: 6–14 seconds apart on cinematic desktop sections, 12–25 seconds around desktop coursework, and 10–18 seconds on phones/tablets. One meteor is active at a time. No new Canvas, assets or dependencies were added.

Small coarse-pointer devices use native momentum scrolling and native smooth anchor navigation. Desktop retains Lenis. Magnetic effects require a fine pointer/hover; the custom cursor's listeners are removed when its media query stops matching. Mobile menu controls and key links have 44px minimum tap heights. Mobile sky intensity sampling is throttled to 180ms, with no mobile scroll parallax; CSS supplies its continuous motion. Hidden tabs pause the sky and Hero drift/Canvas. All animation timers, listeners, GSAP contexts and triggers have cleanup. Reduced motion disables the sky movement/meteors, pinning and entrance hiding; static copy, stars and haze remain visible.

Validation targets: phones 360×800, 390×844, 393×852, 430×932; tablets 768×1024, 820×1180, 1024×768; desktops 1366×768, 1440×900, 1920×1080. Browser tooling was unavailable for this pass. Real-device checks remain: portrait/landscape transitions, native touch momentum, anchor landing, meteor visibility, overflow, and console hydration/ScrollTrigger warnings. The production push allows these checks on the physical phone after Vercel deploys.

Academic categories now share `CompactAcademicCard`: Worksheets, Responses, iCARE, and Reflection use the same compact journal shell, category labels/actions, clamped excerpt, date and optional score. Image coursework supports a lazy 72×64px thumbnail; PDF entries use a small document icon. The shared grid uses 280px minimum tracks, caps individual cards at 420px, and becomes one column on mobile. Existing heading-to-card spacing and text-column alignment remain. Featured Work retains its large showcase. `ReflectionCard` is a compatibility re-export of the shared component.

The sky now mounts once in the root layout, as a direct body sibling of the foreground wrapper. Its fixed inset-zero layer reaches every viewport edge and remains through the footer. There are 120 total desktop stars (70 distant, 35 medium, 15 near), 67 on tablets and 44 on phones, with reduced motion providing the static fallback. One global meteor runs at most at a time: 6–14-second intervals in Hero/Journey and 12–25 seconds elsewhere, with 0.7–1.5-second flights. Three radial gradients drift together very slowly to provide restrained violet, navy and champagne haze.

The old section-bound cosmic instances and edge mask were removed. Journey now has a transparent frame; the academic, featured-section and footer wrappers were already transparent. Cards retain opaque dark reading surfaces, and the navbar retains its translucent glass backdrop. The global sky sits at z-index 0, the foreground wrapper at 1; the reparented Journey frame also uses 1 to stay above the sky. Existing internal Canvas/content ordering and high navbar/cursor layers remain. Scroll events are coalesced into one animation-frame sample, changing only refs/CSS properties: depth layers travel just 3/10/20px over the entire document. Intensity blends over 1.8 seconds from full Hero/Journey strength to 60–80% around coursework and 90% at the footer. Hidden tabs cancel meteors and pause sky motion. Reduced motion keeps static stars/haze and disables meteors, twinkling, drift, parallax and intensity transitions.

The former 700px height cutoff could switch between normal flow and pinning when browser zoom changed. Its 580px frame minimum, 320px stage minimum, width-only title sizing, and fixed paper travel also left little flexibility in shorter windows. The frame now reserves 100px for navigation and distributes its remaining height without those competing minimums. The title uses both `vw` and `svh`; paper widths use both units: left `clamp(140px, min(15vw, 26svh), 250px)`, right `clamp(135px, min(14vw, 25svh), 235px)` in cinematic mode. Both sit 6% inward, with the left sheet 16% from the stage top and the right 16% from the bottom. A faint offset silhouette adds depth behind the left paper. At CSS viewports 1366×768, 1440×900, and 1920×1080, calculated left/right widths are approximately 200/191px, 216/202px, and 250/235px respectively. Paper travel and scroll distance are measured from the frame. ScrollTrigger invalidates measurements on refresh, responds to resize/zoom media changes, and refreshes after fonts load. Below the cinematic thresholds all content remains in normal flow.


Visual acceptance should be checked at 90%, 100%, 110%, and 125% browser zoom across 1280×720, 1366×768, 1440×900, 1536×864, and 1920×1080 displays. Browser chrome reduces the CSS viewport height; the media query intentionally uses the available viewport rather than physical display resolution. Check all four stages, pin release, navbar clearance, and horizontal overflow. Browser automation was unavailable during this change, so these visual checks remain unverified.
