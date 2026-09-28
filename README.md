# Chandra Sekhar Reddy — Portfolio

A complete, single-page student developer portfolio built with **pure HTML5, CSS3 and vanilla JavaScript ES6+**. No frameworks, no libraries, no build tools — open `index.html` in a browser and it works.

## Technology

- HTML5 (semantic, accessible)
- Modern CSS3 (custom properties, grid, flexbox, `clamp()`, `svh`)
- Vanilla JavaScript ES6+ (IntersectionObserver, `requestAnimationFrame`, localStorage)
- Inline SVG (icons, images, favicon)
- Google Fonts: Syne + Manrope + JetBrains Mono (with system-font fallbacks)

## Folder structure

```text
portfolio/
├── index.html          Page structure & SEO metadata
├── css/
│   ├── style.css       Design tokens, themes, all component styles
│   ├── responsive.css  Tablet / laptop / desktop breakpoints
│   └── animations.css  Reveal classes, hero sequence, reduced-motion
├── js/
│   ├── main.js         Startup + portfolioConfig (personal info)
│   ├── navigation.js   Sticky header, hamburger, active section
│   ├── theme.js        Dark/light toggle + localStorage
│   ├── projects.js     Project data array + card rendering
│   ├── filters.js      Category filtering + empty state
│   ├── contact.js      Validation + mailto submission
│   └── animations.js   Reveals, count-up, parallax, cursor
├── assets/
│   ├── images/         profile + project covers (SVG placeholders)
│   ├── icons/          favicon.svg
│   └── resume.pdf      Placeholder — replace with your real resume
└── README.md
```

## Run locally

Just open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari). Double-clicking the file is enough — no server or build step required.

## Customization guide

### Personal information

Edit `portfolioConfig` at the top of **js/main.js**:

```js
const portfolioConfig = {
    name: "Chandra Sekhar Reddy",
    role: "Computer Science Student & Creator",
    university: "Sai University",
    email: "srinivasabasireddy06@gmail.com",
    github: "https://github.com/chandrasekharreddy-basireddy",
    linkedin: "https://www.linkedin.com/in/chandra-sekhar-reddy-basireddy-5733a2385",
    resumePath: "assets/resume.pdf"
};
```

Headline, About copy, timeline entries and highlights live directly in **index.html** — search for the text and edit it there. The contact destination email is set in **js/contact.js** (`CONTACT_EMAIL`).

### Replace the profile image

Drop your photo at `assets/images/profile.jpg` (or `.png`), then update the `src` of the `<img id="hero-profile">` in `index.html`. The current `profile.svg` is an intentional monogram placeholder, not a fake face. Keep something in place — the hero layout depends on it.

### Add or edit projects

All projects live in the `projects` array at the top of **js/projects.js**:

```js
{
    id: 6,
    title: "My New Project",
    category: "Development",        // Development | Design | Research
    description: "Two lines about what it does and what you learned.",
    image: "assets/images/project-6.svg",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/you/repo",  // null hides the button
    demo: null,                              // null hides the button
    featured: false                 // true = full-width featured card
}
```

Set `github` or `demo` to `null` when the link doesn't exist — the button is hidden automatically. The filter tabs (All / Development / Design / Research) work automatically with whatever categories your projects use; a category with no projects shows the designed empty state.

### Change colors

All colors are design tokens in **css/style.css**. The dark theme is in `:root, [data-theme="dark"]`, the light theme in `[data-theme="light"]`. Change `--accent-primary` / `--accent-secondary` once and the whole site follows.

### Add your resume

Replace `assets/resume.pdf` with your real resume file (keep the name `resume.pdf`, or update `resumePath` in `js/main.js`).

### Configure GitHub / LinkedIn / Email

- **GitHub** — `portfolioConfig.github` in `js/main.js` (also used by the social icons).
- **LinkedIn** — `portfolioConfig.linkedin` in `js/main.js` (currently set; update it there if your handle changes).
- **Email** — `portfolioConfig.email` and `CONTACT_EMAIL` in `js/contact.js`.

### Add achievements / timeline entries

The highlights and timeline are plain HTML sections in `index.html` (search for `id="highlights"` and `id="experience"`). Copy an existing `<article class="highlight">` or `<li class="timeline__item">` block and edit it. Only ever add real information.

## Deploy

### GitHub Pages

1. Create a repository (e.g. `portfolio`) and push this folder's contents to it.
2. Repo **Settings → Pages → Source: deploy from a branch**, pick `main` / root (or `/docs`).
3. Your site goes live at `https://<username>.github.io/portfolio/`.

### Any static host (Vercel, Netlify, Cloudflare Pages)

- **Vercel**: `vercel` in this folder (or import the repo — no build command, output directory `.`).
- **Netlify**: drag-and-drop the folder onto app.netlify.com.
- **Cloudflare Pages**: connect the repo, framework preset "None".

No build command and no output directory configuration are needed anywhere — this is a static, dependency-free site.

## Features

- Dark/light theme with localStorage persistence and `prefers-color-scheme` default
- Sticky glassmorphic header with scroll state and active-section tracking
- Accessible hamburger menu (Escape to close, focus management, `aria-expanded`)
- Projects rendered from a data array with category filters and an empty state
- Scroll-reveal animations via IntersectionObserver, staggered where it helps
- Contact form with floating labels, accessible validation, mailto submission (no backend, no fake success)
- `prefers-reduced-motion` support throughout; fully keyboard navigable
- SEO + Open Graph + Twitter metadata, SVG favicon
- Back-to-top button, dynamic footer year, custom scrollbar & selection styles

## Credits

Built for Chandra Sekhar Reddy. Project descriptions reflect the real repositories at [github.com/chandrasekharreddy-basireddy](https://github.com/chandrasekharreddy-basireddy).
