# alpcihan.me

Personal portfolio of Alp Cihan Öztürk. Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Deployment

Static export (`output: "export"`) to GitHub Pages via `.github/workflows/deploy.yml`.
Every push to `main` lints, builds `./out` and deploys it. `public/CNAME` keeps the custom domain `alpcihan.me`.
The social card is the static `public/og.png`.

## Editing content

Every word on the site lives in `src/content/site.ts`.
Unconfirmed fields are `null`. In development they render as orange **TODO** markers; in production they are hidden, so nothing unverified ships.

## Structure

- `src/app/globals.css`: design tokens (colour, type, motion), utilities, and the hero lens / scanner CSS
- `src/components/Hero.tsx`: the name with the region-of-interest lens
- `src/components/Work.tsx`, `visuals/*`: project showcase and custom illustrations

## Design system

- **Colour**: ink `#0b0b0a`, paper `#ece8e0`, a single signal accent `#ff5a1f`.
- **Type**: Bricolage Grotesque (display, opsz/wdth axes), IBM Plex Sans (text), IBM Plex Mono (labels).
- **Motion**: one easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`). Section reveals use CSS scroll-driven animations, so they need no JS. Motion handles only the nav indicator and the mobile menu. All motion respects `prefers-reduced-motion`.
