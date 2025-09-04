# Edwin J. Wood – Resume / Projects Site

A lightweight, modern personal resume + projects site built with React, Vite, and Tailwind CSS, deployed to GitHub Pages (user site). Uses a HashRouter to avoid refresh 404s.

---

## 🔧 Install & First Run

```powershell
git clone https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
cd YOUR_USERNAME.github.io
npm install
git checkout -b dev   # create dev branch if needed
npm run dev
```

Visit the printed local URL (default <http://localhost:5173>).

---

## 🧪 Development Workflow (content-first)

This site separates content (JSON) from presentation (React components). For most edits you should update the JSON files under `src/data/` rather than editing JSX.

1. Stay on the `dev` branch while working on drafts.

2. Edit content in `src/data/`:

    - `src/data/resume.json` — canonical resume content (summary, competencies, experience, education)
    - `src/data/projects.json` — project entries (title, categories, weight, description, tech)
    - `src/data/homecard.json` — home card (title, subtitle, description)

3. Preview changes locally with `npm run dev`.

4. Only edit JSX (`src/components/*.jsx`) for structural or styling changes. Avoid changing copy inside component files.

5. Commit and use `./deploy.ps1` to publish (see Deploy).

Why JSON? It keeps copy as the single source of truth and makes safe edits possible without touching code.

---

## 🚀 Deploy

Production is served from the `main` branch. Run the script from `dev` to build and publish a production snapshot to `main`.

```powershell
./deploy.ps1
```

Options:

```powershell
./deploy.ps1 -SkipPull   # skip pulling remote branches first
./deploy.ps1 -AutoCommit # auto-stage/commit any local changes during deploy
```

---

## 📦 Manual Production Build

```powershell
npm run build
```

Outputs go to `dist/` (ignored by git). The deploy script copies only the built artifacts it needs.

Preview the production build locally:

```powershell
npm run build
npm run preview
```

Open the preview URL and validate pages (for example `#/resume` and `#/projects`).

---

## 🌐 Routing Strategy

The app uses HashRouter so client-side routes live after `#` (helps GitHub Pages). If you migrate to a host that supports SPA rewrites you can switch to BrowserRouter.

---

## 🧩 Content & Customization Guide

Edit content via JSON files (preferred). Only adjust JSX for layout or adding new UI features.

| Area | Canonical file | Notes |
|------|----------------|-------|
| Resume content | `src/data/resume.json` | Edit summary, coreCompetencies, experience, education — JSON is the canonical source |
| Projects list | `src/data/projects.json` | Add/edit projects. Use `weight` and `featured` to control ordering. |
| Home card data | `src/data/homecard.json` | Change title, subtitle, and description (email/link handled automatically) |
| Components / Layout | `src/components/*.jsx` | Only change for structural or styling updates; avoid copy edits here |
| Styles / Theme | `tailwind.config.js`, `src/styles/index.css` | Tailwind + custom CSS |
| SEO Meta | `index.html` | Title, description, Open Graph tags |
| Deployment | `deploy.ps1` | Build/merge/publish workflow (run from `dev`) |

---

## 🔍 Quality & Accessibility

- Single `h1` per view
- Sufficient color contrast
- Keyboard navigation (Tab through links)
- Descriptive link text

Behavior notes:

- Resume is printable and optimized for PDF export.
- Home card is clickable and links to the Resume.

---

## 🔄 Alternative Publication

If you prefer not committing built artifacts to `main`, publish `dist/` to a `gh-pages` branch or use a CI workflow to build & publish automatically.

---

## ✅ Quick Start TL;DR

```powershell
git clone https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
cd YOUR_USERNAME.github.io
npm install
git checkout -b dev
npm run dev
./deploy.ps1
```

Cheers.
