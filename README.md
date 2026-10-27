# Mustafa Jawad — Portfolio

A cinematic, bilingual (English / Arabic) personal portfolio for **Mustafa Jawad**,
programmer at [Cloud Group](https://cdiraq.com). Dark‑luxury art direction, an
interactive Three.js hero centerpiece, full RTL support, and an accessible,
responsive, reduced‑motion‑aware build.

## Tech
- Static site — no build step (plain HTML, CSS, vanilla JS)
- [Three.js](https://threejs.org/) (CDN, lazy‑loaded) for the hero 3D scene
- Google Fonts: Inter + IBM Plex Sans Arabic

## Run locally
```bash
node server.js
```
Then open http://localhost:4321

> `server.js` is a tiny zero‑dependency static server for local preview only.
> It is not needed in production.

## Deploy
The site is fully static. Upload `index.html` and the `assets/` folder to any
static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## Edit the content
Everything editable lives in **`assets/js/content.js`** — the single content model:

- **`LINKS`** — add real `email`, `github`, `linkedin` (empty by default; the UI
  activates them once filled).
- **`PROJECTS`** — add verified projects, contribution details, and repo URLs.
- **`EXPERTISE`** — adjust the technologies and group labels.
- **`I18N`** — all UI strings in English and Arabic.

## Structure
```
index.html              # markup, SEO/OG meta, favicon
assets/css/styles.css   # design system (tokens, RTL, responsive, motion)
assets/js/content.js    # centralized content model (copy, links, i18n)
assets/js/app.js        # i18n, navigation, reveals, contact form
assets/js/scene.js      # Three.js hero centerpiece
server.js               # local preview server
```
