# Original Content Snapshot

Phase 1 audit snapshot for **Beyond the Pages — GED0001 Digital Reading Portfolio**.

This is a verbatim snapshot of user-facing copy found in the rendered home page, shared chrome, collection pages, document-reader routes, metadata, and manifest-backed content. JSX line breaks are represented as `<br />` where the source uses them. Dynamic values are shown exactly as source expressions plus the current manifest values where useful.

## Metadata and shared chrome

| Section | Source | Exact text | Words |
|---|---|---|---:|
| Page metadata title | `src/app/layout.tsx:9` | `GED0001 \| DIGITAL READING PORTFOLIO \| By Cliford V. Balce` | 8 |
| Page metadata description | `src/app/layout.tsx:10-11` | `A visual collection of my reading activities, responses, projects, iCARE activities, and reflections throughout GED0001. By Cliford V. Balce.` | 19 |
| Preloader label | `src/components/layout/Preloader.tsx:49` | `GED0001 / DIGITAL READING PORTFOLIO` | 4 |
| Preloader author line | `src/components/layout/Preloader.tsx:58` | `By Cliford V. Balce` | 4 |
| Device gate label | `src/components/layout/DeviceGate.tsx:43` | `GED0001 / DIGITAL READING PORTFOLIO` | 4 |
| Device gate heading | `src/components/layout/DeviceGate.tsx:44` | `Welcome to`<br />`Beyond the Pages.` | 4 |
| Device gate copy | `src/components/layout/DeviceGate.tsx:45` | `This is a collection of my reading activities, responses, iCARE activities and reflections for GED0001. To show it the way it was made to be seen, tell me what you are using.` | 29 |
| Device option | `src/components/layout/DeviceGate.tsx:48-51` | `PC / Laptop`<br />`The full cinematic experience with the 3D scene.`<br />`Suggested for your screen` (conditional) | 14 |
| Device option | `src/components/layout/DeviceGate.tsx:53-56` | `Mobile`<br />`Made for touch and small screens, lighter and faster.`<br />`Suggested for your screen` (conditional) | 13 |
| Device gate note | `src/components/layout/DeviceGate.tsx:58` | `You can change this any time from the footer.` | 9 |
| Navbar brand | `src/components/layout/Navbar.tsx:68-69` | `B.`<br />`GED0001`<br />`READING PORTFOLIO` | 4 |
| Navbar links | `src/components/layout/Navbar.tsx:10-16` | `Home` · `Journey` · `About` · `Worksheets` · `Responses` · `iCARE` · `Reflection` | 7 |
| Navbar CTA | `src/components/layout/Navbar.tsx:87,139` | `Explore Portfolio` | 2 |
| Footer identity | `src/components/layout/Footer.tsx:27-28` | `GED0001 / DIGITAL READING PORTFOLIO`<br />`By Cliford V. Balce` | 8 |
| Footer note | `src/components/layout/Footer.tsx:30` | `Beyond the Pages` | 3 |
| Footer links | `src/components/layout/Footer.tsx:32-33` | `Back to top`<br />`Change device view` | 5 |
| Social accessible labels | `src/components/ui/SocialLinks.tsx:12-29` | `Contact links`<br />`Instagram @b_clxf (opens in a new tab)`<br />`Email clifordbalce5@gmail.com` | 11 |

## Home — Hero

| Section | Source | Exact text | Words |
|---|---|---|---:|
| Desktop hero marker | `src/components/sections/Hero.tsx:47` | `GED0001` | 1 |
| Desktop hero edition | `src/components/sections/Hero.tsx:47` | `A READING COLLECTION / 2026` | 5 |
| Desktop hero title | `src/components/sections/Hero.tsx:49-53` | `DIGITAL`<br />`READING`<br />`PORTFOLIO` | 3 |
| Desktop byline | `src/components/sections/Hero.tsx:55` | `By Cliford V. Balce` | 4 |
| Desktop tagline | `src/components/sections/Hero.tsx:57` | `Beyond the Pages` | 3 |
| Homepage description | `src/components/sections/Hero.tsx:58`; also `src/app/layout.tsx:10-11` without the final byline | `A visual collection of my reading activities, responses, projects, iCARE activities, and reflections throughout GED0001.` | 15 |
| Desktop actions | `src/components/sections/Hero.tsx:61-62` | `Explore Portfolio` · `My Journey` | 4 |
| Desktop footer line | `src/components/sections/Hero.tsx:66-68` | `SCROLL` · `READ. RESPOND. REFLECT.` · `01 — 05` | 7 |
| Mobile marker and edition | `src/components/sections/MobileHero.tsx:58` | `GED0001` · `A Reading Collection / 2026` | 6 |
| Mobile title | `src/components/sections/MobileHero.tsx:61-67` | `DIGITAL`<br />`READING`<br />`PORTFOLIO` | 3 |
| Mobile byline | `src/components/sections/MobileHero.tsx:69` | `By Cliford V. Balce` | 4 |
| Mobile tagline | `src/components/sections/MobileHero.tsx:74` | `Beyond the Pages` | 3 |
| Mobile actions | `src/components/sections/MobileHero.tsx:70` | `Explore Portfolio` · `My Journey` | 4 |
| Mobile footer line | `src/components/sections/MobileHero.tsx:77-78` | `Scroll` · `Read. Respond. Reflect.` | 5 |

## Home — Reading Journey

| Section | Source | Exact text | Words |
|---|---|---|---:|
| Journey label | `src/components/sections/ReadingJourney.tsx:105` | `01 / READING JOURNEY` | 3 |
| Journey continuation | `src/components/sections/ReadingJourney.tsx:106` | `Continue to the collection` | 4 |
| Journey heading | `src/components/sections/ReadingJourney.tsx:112` | `READING`<br />`JOURNEY` | 2 |
| Journey introduction | `src/components/sections/ReadingJourney.tsx:113` | `From the first page to a new perspective.`<br />`A space to read, respond, and reflect.` | 15 |
| Milestone 1 | `src/components/sections/ReadingJourney.tsx:8,120` | `01` · `Reading` · `Notice & understand` | 5 |
| Milestone 2 | `src/components/sections/ReadingJourney.tsx:9,120` | `02` · `Response` · `Connect & question` | 5 |
| Milestone 3 | `src/components/sections/ReadingJourney.tsx:10,120` | `03` · `iCARE` · `Participate & learn` | 5 |
| Milestone 4 | `src/components/sections/ReadingJourney.tsx:11,120` | `04` · `Reflection` · `Look back & grow` | 5 |
| Journey paper text | `src/components/sections/ReadingJourney.tsx:25,27` | `NOTES / 02` · `GED0001 / 01` · `A moment to reflect.` · `Beyond the Pages` | 10 |
| Journey closing line | `src/components/sections/ReadingJourney.tsx:126` | `READ. CONNECT. REFLECT. / GED0001` | 5 |

## Home — About the reader

| Section | Source | Exact text | Words |
|---|---|---|---:|
| About label and heading | `src/components/sections/AboutMe.tsx:82-84` | `ABOUT THE READER`<br />`About me.` | 4 |
| About side note | `src/components/sections/AboutMe.tsx:85` | `The person behind`<br />`the pages.` | 5 |
| Portrait code | `src/components/sections/AboutMe.tsx:97` | `PORTRAIT / 01` | 2 |
| Portrait caption | `src/components/sections/AboutMe.tsx:111-112` | `Cliford V. Balce`<br />`BSCE / BLOCK TV05` | 4 |
| About paragraph 1 | `src/data/profile.ts:29` | `Hello! I'm Cliford V. Balce, a Bachelor of Science in Civil Engineering (BSCE) student.` | 14 |
| About paragraph 2 | `src/data/profile.ts:30` | `If I had to describe myself in three words, I'd say **persistent, curious, and always willing to learn.** I enjoy exploring new ideas, figuring out how things work, and finding solutions when challenges come my way. I might learn something quickly but forget it just as fast sometimes (my memory has its own plans, TT ). Still, I believe that there's always something new to learn, and I try my best to keep improving.` | 67 |
| About paragraph 3 | `src/data/profile.ts:31` | `This portfolio is one example of that mindset. I designed and coded this website myself, and honestly, it was quite a challenge! It took a lot of time, patience, and trial and error to bring my ideas to life. But through the process, I learned more than just how to build a website—I also learned the value of persistence and figuring things out along the way.` | 68 |
| About paragraph 4 | `src/data/profile.ts:32` | `For me, this portfolio is more than a collection of academic work. It's a reflection of my learning journey, the effort I've put into my work, and the person I'm continuing to become.` | 31 |
| About paragraph 5 | `src/data/profile.ts:33` | `Thank you for visiting my portfolio! I hope you enjoy exploring my work and following my journey **beyond the pages.**` | 20 |
| Independent-work link | `src/components/sections/AboutMe.tsx:124-126`; `src/data/profile.ts:20-23` | `EngineerX` | 1 |

## Home — Favorite words

| Section | Source | Exact text | Words |
|---|---|---|---:|
| Words label and heading | `src/components/sections/FavoriteWords.tsx:7-10` | `TEN FAVORITE WORDS`<br />`Words I keep close.` | 6 |
| Words side note | `src/components/sections/FavoriteWords.tsx:11` | `Ten words,`<br />`and what they mean.` | 5 |
| Word 1 | `src/data/favoriteWords.ts:5` | `Stelliferous` — `Full of stars; star-bearing.` | 5 |
| Word 2 | `src/data/favoriteWords.ts:6` | `Perseverance` — `Continuing to work toward a goal even when things get hard.` | 10 |
| Word 3 | `src/data/favoriteWords.ts:7` | `Serendipity` — `Finding something wonderful when you weren't looking for it.` | 8 |
| Word 4 | `src/data/favoriteWords.ts:8` | `Eloquent` — `Expressing ideas clearly, beautifully, and persuasively.` | 7 |
| Word 5 | `src/data/favoriteWords.ts:9` | `Ephemeral` — `Lasting for only a short time.` | 7 |
| Word 6 | `src/data/favoriteWords.ts:10` | `Solace` — `Comfort or peace during a difficult moment.` | 7 |
| Word 7 | `src/data/favoriteWords.ts:11` | `Tenacity` — `The determination to never give up easily.` | 8 |
| Word 8 | `src/data/favoriteWords.ts:12` | `Petrichor` — `The pleasant smell of the earth after rain.` | 8 |
| Word 9 | `src/data/favoriteWords.ts:13` | `Wanderlust` — `A strong desire to travel and explore the world.` | 10 |
| Word 10 | `src/data/favoriteWords.ts:14` | `Ineffable` — `Too extraordinary or powerful to be expressed in words.` | 9 |

## Home — GED0001 collection

| Section | Source | Exact text | Words |
|---|---|---|---:|
| Collection label and heading | `src/components/sections/AcademicIndex.tsx:36-37` | `THE GED0001 COLLECTION`<br />`A journey in five chapters.` | 7 |
| Collection side note | `src/components/sections/AcademicIndex.tsx:37` | `The collection will grow`<br />`as coursework is added.` | 6 |
| Worksheets card | `src/components/sections/AcademicIndex.tsx:25,48-55` | `Reading Process Worksheets`<br />`A space for the activities that guide a closer reading.`<br />`To be collected` or current count | 17+ |
| Responses card | `src/components/sections/AcademicIndex.tsx:26,48-55` | `Reader Responses`<br />`Personal perspectives and connections with the texts.`<br />`To be collected` | 11 |
| iCARE card | `src/components/sections/AcademicIndex.tsx:27,48-55` | `iCARE Activities`<br />`A collection of participation, experiences, and learning.`<br />`To be collected` | 10 |
| Reflection card | `src/components/sections/AcademicIndex.tsx:28,48-55` | `Reflection`<br />`Looking back on the reading experience and what it leaves behind.`<br />`1 work` | 12 |
| Collection closing line | `src/components/sections/AcademicIndex.tsx:59` | `Every page, a new perspective.` | 5 |
| Current reading-process work card | `src/generated/content-manifest.json`; `src/components/ui/CompactAcademicCard.tsx` | `Reading Process` · `PDF` · `View Worksheet` | 5 |
| Current reflection work card | `src/generated/content-manifest.json`; `src/components/ui/CompactAcademicCard.tsx` | `Starting the Portfolio` · `2026-09-10` · `PDF` · `View Reflection` | 7 |

## Home — Featured work

| Section | Source | Exact text | Words |
|---|---|---|---:|
| Featured label and heading | `src/components/sections/Projects.tsx:39-40` | `INDEPENDENT EXPLORATIONS`<br />`Featured work.` | 4 |
| Featured side note | `src/components/sections/Projects.tsx:40` | `Personal work,`<br />`beyond the reading collection.` | 5 |
| Calculator art labels | `src/components/sections/Projects.tsx:46-50` | `ENGINEERING / PROBLEM SOLVING`<br />`ENGINEERX`<br />`A PERSONAL WEB PROJECT` | 7 |
| Calculator card | `src/components/sections/Projects.tsx:54-62`; `portfolio-content/featured-work/engineering-calculator/info.json` | `01 / Featured Work`<br />`Engineering Calculator Website`<br />`A calculator website I created for engineering-related calculations and problem solving.`<br />`Visit Website`<br />`engineerx.clif0.workers.dev` | 24 |

## Collection chapter pages — `/collection/*`

| Section | Source | Exact text | Words |
|---|---|---|---:|
| Collection brand | `src/app/collection/[slug]/page.tsx:35-37` | `B.`<br />`GED0001`<br />`READING PORTFOLIO` | 4 |
| Back link | `src/app/collection/[slug]/page.tsx:38` | `Back to portfolio` | 3 |
| Chapter eyebrow | `src/app/collection/[slug]/page.tsx:43` | `0{index + 2} / THE GED0001 COLLECTION` | 4 |
| Chapter title/description/count | `src/data/collections.ts:10-13`; `src/app/collection/[slug]/page.tsx:44-46` | `Reading Process Worksheets` / `A space for the activities that guide a closer reading.` / `To be collected` or count<br />`Reader Responses` / `Personal perspectives and connections with the texts.` / `To be collected`<br />`iCARE Activities` / `A collection of participation, experiences, and learning.` / `To be collected`<br />`Reflection` / `Looking back on the reading experience and what it leaves behind.` / `1 work` | Varies |
| Chapter switch navigation | `src/app/collection/[slug]/page.tsx:47-50` | `Reading Process Worksheets` · `Reader Responses` · `iCARE Activities` · `Reflection` | 8 |
| Empty chapter label/copy | `src/app/collection/[slug]/page.tsx:61-64` | `TO BE COLLECTED`<br />`Nothing is shown here until real coursework is added. No placeholder work is invented.` | 15 |
| Work frame labels | `src/components/ui/WorkFrame.tsx:38-56` | `EXTERNAL WORK` · `Visit Website` · `PDF document` · `Open the PDF` | 8 |
| Work actions | `src/components/ui/WorkFrame.tsx:63-82` | `View Worksheet` · `View Response` · `View Activity` · `View Reflection` · `Visit Website` · `Download` · `Website` | 12 |
| Collection footer | `src/app/collection/[slug]/page.tsx:70-72` | `GED0001 / DIGITAL READING PORTFOLIO`<br />`By Cliford V. Balce`<br />`Back to the full portfolio` | 11 |

## Other existing document-reader route UI

These are not the `/collection/*` pages requested above, but they are visible routes in the repository and are included for completeness.

| Section | Source | Exact text | Words |
|---|---|---|---:|
| Missing document page | `src/app/reading/[category]/[...slug]/not-found.tsx:5-8` | `GED0001 / READING COLLECTION`<br />`Document not found.`<br />`This item may have moved or is no longer in the collection.`<br />`Reading Journey`<br />`Browse the collection` | 19 |
| Reader breadcrumbs | `src/app/reading/[category]/[...slug]/page.tsx:47-48` | `← {collection.title}`<br />`Reading Journey` | 3+ |
| Reader metadata | `src/app/reading/[category]/[...slug]/page.tsx:51-59` | `GED0001 / {collection.title}`<br />`{work.title}`<br />`{work.subtitle}`<br />`{work.date}`<br />`Score: {work.score}`<br />`{work.files.length} attachment(s)`<br />`{work.description}` | Dynamic |
| Reader attachments/hint | `src/app/reading/[category]/[...slug]/page.tsx:61-62` | `{file.name}`<br />`That attachment was not found. Showing the first available document.` | Dynamic |
| Reader fallback | `src/app/reading/[category]/[...slug]/page.tsx:63-66` | `Explore the original work` / `No document is attached yet.`<br />`This item is a website rather than an attached document. Visit the original using the link below.` / `Return to the collection to explore other available work.`<br />`Visit original website ↗`<br />`Reflection`<br />`← Back to {collection.title}`<br />`Return to Reading Journey →` | Dynamic |
| Document viewer controls | `src/components/content/DocumentViewer.tsx:26-43` | `Full screen` · `Open original` · `Download`<br />`This document could not be displayed.`<br />`Preview is unavailable for this file type.`<br />`Use Open original or Download above to access the source file. You can also choose another attachment or return to the collection.`<br />`Your browser cannot preview this PDF.`<br />`Open the original PDF (new tab)`<br />`Use the PDF viewer’s page and zoom controls where available. If the document is blank or your mobile browser cannot embed PDFs, choose Open original or Download.` | 59 |

## Source/content inventory notes

- The current homepage renders `Hero` or `MobileHero`, `ReadingJourney`, `AboutMe`, `FavoriteWords`, `AcademicIndex`, and `Projects`, plus shared `Navbar`, overlays, and `Footer`.
- `src/components/sections/About.tsx` and `src/components/sections/Contact.tsx` are legacy components not imported by the current `src/app/page.tsx`; their large software-career/contact copy is not visible on the current homepage.
- `src/app/layout.tsx` has title and description metadata only. There are no `openGraph` title, description, or image fields.
