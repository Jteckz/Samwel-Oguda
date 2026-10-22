# Samwel Edmund Oguda — Portfolio

Personal portfolio of **Samwel Edmund Oguda** — Software Engineer, Backend Developer & Machine Learning Practitioner. Built with React, TypeScript, Vite and Tailwind CSS. Deployed on Vercel.

**Production URL:** https://samwel-oguda.vercel.app/

---

## SEO Setup (what's implemented)

| Item | Location |
| --- | --- |
| Per-page titles, meta description, canonical, Open Graph & Twitter cards | `src/components/SEO.tsx` + each page in `src/pages/` |
| Default metadata + Open Graph + Twitter + Person JSON-LD | `index.html` |
| Site-wide constants (URL, social links, author) | `src/config.ts` |
| `sitemap.xml` | `public/sitemap.xml` |
| `robots.txt` | `public/robots.txt` |
| SPA rewrite (so deep links like `/about` don't 404) | `vercel.json` |
| Social/OG share image (1200×630) | `public/images/og-image.jpg` |
| Optimized avatar (WebP, 256×256) | `src/assets/images/me.webp` |

> **Important:** if you change the production domain, update `src/config.ts`, `index.html`, `public/sitemap.xml` and `public/robots.txt` to the new URL.

---

## 3D book page-turn transition

Every route is treated as a page of a book. Switching sections plays a physical
page turn: the outgoing page is hinged on the spine, lifts, sweeps away in 3D
and reveals the incoming page underneath it.

| Item | Location |
| --- | --- |
| Transition engine (navigation, snapshot, scroll lock, reduced motion) | `src/components/BookFlipProvider.tsx` |
| Animated leaf + shadow + lighting overlays | `src/components/BookFlipLayer.tsx` |
| Context + `useBookFlip()` hook | `src/components/BookFlipContext.ts` |
| Timing, easing, keyframes, reading order | `src/lib/flip.ts` |
| 3D / paper CSS (perspective, gradients, fold line) | `src/index.css` → `@layer components` |
| Route table shared by the router and the flip layer | `src/routes.tsx` |

**How it works**

1. `flipTo(path)` clones the current `<main>` into a static DOM snapshot
   (`cloneNode`) *before* the router swaps the content — the leaf therefore
   shows exactly what the visitor was looking at, including scroll position
   and in-flight form state.
2. The router navigates immediately, so the URL and the incoming page are
   correct right away; the snapshot is displayed as the turning leaf.
3. Framer Motion animates `rotateY` about the spine (`transform-origin:
   left center` forward, `right center` backward) with a lift/sway/scale
   envelope, a cast shadow whose width is `cos(angle)`, paper shading, a
   travelling specular sheen and a bright fold line.

**Using it from your own components**

```tsx
import { useBookFlip } from './components/BookFlipContext';

const { flipTo, isFlipping } = useBookFlip();
<button onClick={() => flipTo('/projects')}>Projects</button>
```

**Tuning**

Everything is in `src/lib/flip.ts`: `FLIP_DURATION`, `FLIP_TIMES`,
`FLIP_EASES`, `FLIP_ROTATE_FORWARD/BACKWARD`, `FLIP_SHADOW_SCALE`,
`FLIP_SHADE_OPACITY`, and `SECTION_ORDER` (which also decides the turn
direction — re-order it to match the order of the pages in your book).

**Optional: turn pages by scrolling**

The site is route based, so scrolling never changes the section. To flip to
the next page when the visitor reaches the bottom of a page, add this to the
page component:

```tsx
useEffect(() => {
  const onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 120) {
      flipTo('/about');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, [flipTo]);
```

---

## Interactive character

A small stick figure stands on the top edge of every section. It walks
sideways towards the cursor, turns around when it changes direction, and
sits down while you scroll down (standing back up when you scroll up).

| Item | Location |
| --- | --- |
| The figure, its rig and the animation loop | `src/components/Character.tsx` |
| Colours, glow and the responsive size | `src/index.css` → `.character-svg` |
| Placement in each page | `src/pages/*.tsx`, `src/components/Hero.tsx` |

**Why plain SVG + `requestAnimationFrame`**

The figure is a skeleton of nested `<g>` elements (pelvis → torso → head /
arms, pelvis → thigh → knee → foot). Every joint is a `transform="rotate(...)"`
that is rewritten each frame, so the whole animation runs outside of React
and never triggers a re-render. A Lottie file would work too, but it cannot
react to the cursor, and Framer Motion is not a good fit for a continuous
cycle that is driven by distance travelled.

**The three behaviours**

1. **Walking** – `pointermove` on `window` stores the cursor X. Each frame the
   character eases towards it (with a speed cap so it *chases* the cursor
   instead of teleporting) and the walk cycle advances by
   `distance / stride`, so the feet plant instead of sliding. The stride
   length is `height * 0.85`, and the figure mirrors itself (`scaleX(-1)`)
   when it changes direction.
2. **Posture** – `wheel` and `scroll` listeners set a `sit` target
   (`deltaY > 0` → sit, `deltaY < 0` → stand). The value is eased and then
   blended into every joint angle, so the character smoothly sits down and
   stands up. While seated it stops walking and turns its head towards the
   cursor.
3. **Placement** – the component renders into a zero-height absolutely
   positioned box, so the figure's feet land exactly on the top edge of the
   content it belongs to instead of floating above it. It lives inside
   `<main>`, which means it is also captured by the page-turn snapshot and
   turns with the page.

**Tuning** – the constants at the top of `src/components/Character.tsx`:
`CHARACTER_HEIGHT` (rendered size), `MAX_SPEED` (walking speed),
`TURN_SPEED` (how fast it turns around), `STRIDE_FACTOR` (step length) and
the `STAND_NEAR` / `STAND_FAR` / `SIT` pose objects.

> Visitors who enable "reduce motion" in their OS get a static figure that
> does not walk or sit.

---

## 1. Connecting Google Search Console

1. Go to https://search.google.com/search-console and sign in with your Google account.
2. Click **Add property** → choose **Domain** or **URL prefix**:
   - **URL prefix** (simplest): enter `https://samwel-oguda.vercel.app/` and click Continue.
3. Choose a verification method:
   - **HTML tag**: copy the `<meta name="google-site-verification" content="...">` tag and paste it inside the `<head>` of `index.html`, then deploy. Remove it after verification.
   - **DNS (TXT record)**: only available with the *Domain* property type; requires adding a TXT record in your domain's DNS.
   - **HTML file upload**: download `googleXXXX.html`, drop it in `public/`, deploy, then visit `https://samwel-oguda.vercel.app/googleXXXX.html`.
4. Click **Verify** — ownership will be confirmed once the change is live on Vercel.

## 2. Submitting the sitemap

1. In Search Console, select your property → **Sitemaps** (left menu).
2. In the "Add a new sitemap" field enter: `sitemap.xml`
3. Click **Submit**. It should show "Success". Google will start crawling the 6 pages listed in the sitemap.

## 3. Requesting indexing

1. In Search Console, use **URL Inspection** (top search bar).
2. Paste a page URL, e.g. `https://samwel-oguda.vercel.app/`, and press Enter.
3. Click **Request indexing**. Do this for each page you want indexed fast (home, about, skills, projects, experience, contact).
4. Google usually re-crawls within a few days.

## 4. Verify sitemap / robots are served after deploy

After a Vercel deployment, confirm these URLs return 200 (not the SPA fallback):

```
https://samwel-oguda.vercel.app/robots.txt
https://samwel-oguda.vercel.app/sitemap.xml
https://samwel-oguda.vercel.app/images/og-image.jpg
```

You can test with `curl -I` or by opening them in a browser.

## 5. Development

```bash
npm install
npm run dev        # local dev server
npm run typecheck  # TypeScript check
npm run lint       # ESLint
npm run build      # production build -> dist/
npm run preview    # preview production build locally
```

## 6. Deployment (Vercel)

1. Push this repo to GitHub.
2. In Vercel: **Add New Project** → import the repo → framework preset **Vite** → deploy.
3. Vercel automatically serves `dist/`, including `robots.txt`, `sitemap.xml` and `public/images/`. The `vercel.json` rewrite sends unknown routes to `index.html` so all SPA routes work.
