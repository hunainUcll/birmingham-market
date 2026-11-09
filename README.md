# Birmingham Market

A local, static editorial website for Omar Ameen's Brussels corner shop. Built with Next.js App Router, TypeScript and Tailwind CSS. No backend, database, analytics, external fonts, or ecommerce. GitHub Pages deployment is configured through `.github/workflows/pages.yml`. Only the static `out/` artifact is published.

## Run

Use Node.js 22.9+ (tested with Node 26.13) and npm. In this folder:

```powershell
npm ci
npm run dev
```

Open http://127.0.0.1:3010. Stop with Ctrl+C.

## Build and preview

```powershell
npm run build
npm run typecheck
npm run preview
```

The complete static site is in `out/`. Preview serves that export at http://127.0.0.1:3010. Do not use `next start` for the static export.

For production, upload only the contents of `out/` to a static host when publication is authorized. No hosting account or runtime Node service is required. Never upload the whole project folder: original photographs, source, and QA artifacts are development materials.

## Edit the shop information

`src/content/business.ts` is the central configuration:

- `name`, `owner`, `phone`, `telephone`, `city`, `country`.
- Set `streetAddress` and optionally `postalCode` after confirmation. This displays the address and enables a Google Maps directions link. Until then, the page displays Brussels, Belgium and a working call link.
- Set `openingHours` to confirmed entries such as `{ days: 'Confirmed day range', hours: 'Confirmed time range' }`. Empty hours are hidden. These are display labels, not machine-readable schema hours.
- Set `showOwnerStory: false` to remove Omar's entire story and its navigation link pending his approval. `showOwnerPortrait: false` hides only the photograph.
- For an approved launch, set `NEXT_PUBLIC_SITE_URL` to the real HTTPS URL, then rebuild. This enables indexing, a canonical URL, absolute social image URLs, and sitemap entries. Draft builds are noindex and disallow crawling; this is an indexing preference, not access control. Keep drafts local or behind the host's private access controls.

English copy and product categories live in `src/content/en.ts`. No direct quotations, invented reviews, hours, map pin, prices, or inventory claims are used. Ownership around 2025 is explicitly approximate. Biography is based on the owner's notes supplied by the user and still needs Omar's editorial approval.

## Photographs

All 25 originals were inspected; five were chosen. The full selection rationale and source filenames are in `photo-selection.json`. The user confirmed the portrait is Omar and permitted its use. Original photographs in `Pictures/` are preserved untouched.

`scripts/prepare-images.mjs` rotates according to EXIF, creates four responsive WebP sizes per selected photo, strips metadata by default, and makes a 1200 x 630 social image. Update its selection list to change photos; retain the output names or update section references in `src/components/sections.tsx`.

```powershell
npm run photos
```

The build also runs this step. If the untracked original `Pictures/` folder is absent on another machine, the build reuses the committed, optimized `public/images/` files and verifies they exist. Next Image uses a custom local loader to select these files, so no image server or third-party service is needed.

## Design and structure

Warm paper, charcoal, and the sign's yellow; oversized Archivo headlines paired with Instrument Serif editorial accents. Both are open-source, self-hosted fonts installed through Fontsource; their licenses remain in their packages. The layouts use an editorial grid, deliberate image crops, numbered captions, a restrained timeline, and an oversized yellow closing spread. The original signage and photograph colours are unchanged.

- `src/components/sections.tsx`: page sections.
- `src/components/ui.tsx`: wordmark, arrows, and reusable photograph component.
- `src/components/reveal.tsx`: one small IntersectionObserver enhancement. Content works without JavaScript; reduced-motion preferences disable transitions and reveal motion. No animation framework was needed.
- `src/app/globals.css`: design tokens and responsive composition.
- `src/app/layout.tsx`, `robots.ts`, `sitemap.ts`: metadata and indexing controls.

English is the only displayed language. The centralized English dictionary separates editorial copy from layout. Add complete, reviewed `fr.ts` and `nl.ts` dictionaries with the same shape, then connect locale-specific static routes and translated metadata before adding a real language switcher. Component accessibility text and photograph descriptions also need translation. There is no nonfunctional selector.

## Quality checks

```powershell
npm run build
npm run typecheck
node scripts/qa.mjs
```

Run the preview server in another terminal before browser QA. The QA script uses locally installed Chrome headlessly through Playwright. It checks seven widths (320, 375, 390, 768, 1024, 1440, 1920), image loading, horizontal overflow, anchor targets, phone link values, JavaScript errors, single H1, skip navigation, visit navigation, and axe WCAG A/AA rules. It also checks content visibility with JavaScript disabled and takes reduced-motion screenshots. Reports and screenshots are in `qa/`. Automated accessibility checks supplement visual and keyboard inspection; they do not establish complete WCAG conformance.

## Still to confirm

Exact street address and opening hours; Omar's approval of the biography, photo selection, and final site; any future custom domain. Publication on GitHub Pages was requested by the project owner. Individual recharge products and gift cards are intentionally not promised. French and Dutch translations are not yet provided.

## GitHub Pages and repository hygiene

Repository: https://github.com/hunainUcll/birmingham-market
Site: https://hunainucll.github.io/birmingham-market/

Pushes to `main` build and publish through GitHub Actions. The workflow derives the site URL and base path from Pages, installs locked dependencies, and uploads only `out/`. Original `Pictures/`, photo contact sheets, selection inventories, `qa/`, dependencies, caches, environment files, and build output are ignored. Optimized web photographs in `public/images/` are intentionally included; they are the website's public assets, stripped of EXIF metadata.

Actions are pinned to commit hashes. The build job has read-only repository access; only the deployment job gets Pages and OIDC permissions. No personal access token is stored in this repository or workflow. `scripts/secure-export.mjs` adds a Content Security Policy with hashes for Next.js inline scripts, blocks plugins and form submission, and sets a referrer policy. Inline styles remain allowed for framework image styles. GitHub Pages controls HTTP response headers; the HTML policy does not provide frame-ancestor protection or server-side authentication. All website content is public.

To reproduce the Pages build locally in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/birmingham-market'
$env:NEXT_PUBLIC_SITE_URL='https://hunainucll.github.io/birmingham-market'
npm run build
$env:PREVIEW_BASE_PATH='/birmingham-market'
npm run preview
```

Then open http://127.0.0.1:3010/birmingham-market/. A normal local root build uses neither `NEXT_PUBLIC_*` variable. Original photographs are not needed on GitHub: the image preparation script uses the checked-in optimized assets when `Pictures/` is absent.
