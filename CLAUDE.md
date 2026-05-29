# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Production build to /dist
npm run preview   # Serve the production build locally
```

No test or lint commands are configured.

## Architecture Overview

This is a **React + Vite SPA** for Selected Group, a B2B executive recruitment firm. The app has two distinct parts:

### 1. Public Website
Marketing site with practice area pages (GTM, Engineering, Product, Executive, Professional Services), case studies for 7 named clients (Palantir, Apple, Oracle, Celonis, Behavox, Aviv, OverIT), and a news portal backed by the GNews API (`VITE_GNEWS_API_KEY`).

### 2. CRM Dashboard (Protected)
Internal tool at `/crm` for managing companies, contacts, and email outreach sequences. Requires token-based auth via a Node backend at `http://13.61.16.106:1802/api/v1` (configured in [src/services/api.js](src/services/api.js)).

**Auth flow:** `/crm` is guarded by a `ProtectedRoute` component that checks `localStorage.getItem("crm_token")`. The login page (`/login`) POSTs credentials to the backend, stores the returned token in localStorage, then redirects into the CRM.

## Routing

React Router v7 with client-side routing. All routes are defined in [src/App.jsx](src/App.jsx).

- Homepage (`/`) — single page with anchor sections (`#home`, `#about`, etc.)
- Practice areas: `/gtm`, `/engineering`, `/product-management`, `/professional-services`
- Case studies: `/case-studies` + `/case-studies/[palantir|apple|oracle|...]`
- Use cases: `/use-cases` + `/use-cases/[gtm|engineering|product-management|professional-services]`
- CRM: `/crm`, `/login`, `/sequences`, `/sequences/create`, `/sequences/:id`

## Styling

Tailwind CSS with a custom theme ([tailwind.config.js](tailwind.config.js)):
- **Fonts**: Cormorant Garamond (display/headings) and DM Sans (body) — loaded from Google Fonts in `index.html`
- **Colors**: Custom black/white/grey scale
- **Animations**: `fade-up` and `fade-in` keyframes via Tailwind
- **Custom classes** in [src/styles/index.css](src/styles/index.css): `.btn-primary`, `.btn-secondary`, `.card-glow`, `.noise`, `.dark-input`, `.section-label`, `.section-title`

Framer Motion is used for Hero video carousel, Navbar slide animations, mobile menu, and staggered section fade-ins.

## Key Conventions

- **No centralized state management** — components use local `useState`; CRM token persists via localStorage
- **No data fetching library** — direct `axios` calls inside components; no caching layer
- **Case study metadata** lives in [src/data/caseStudies.js](src/data/caseStudies.js); individual pages are in [src/pages/CaseStudies/](src/pages/CaseStudies/)
- Practice area expertise sections are isolated components under [src/components/OurExpertise/](src/components/OurExpertise/)

## Deployment

GitHub Actions ([.github/workflows/deploy-frontend.yml](.github/workflows/deploy-frontend.yml)) triggers on push to `main`: SSH into EC2 (`13.61.16.106`), build a Docker image (Node 20-Alpine → Nginx Alpine), and serve on port 3000. The Nginx container exposes port 80 internally.
