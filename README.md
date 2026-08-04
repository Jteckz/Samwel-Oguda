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
