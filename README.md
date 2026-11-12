# POSHANA — Nutrition & Wellness Clinic Website (Phase 1)

A premium, responsive static website for POSHANA, built with HTML5, CSS3, Bootstrap 5.3, Bootstrap Icons, Google Fonts and plain JavaScript. No frameworks, no build step.

## Pages

| File            | Contents |
|-----------------|----------|
| `index.html`    | Homepage — navigation, hero, about, services, why choose us, dietitian profile, how it works, testimonial carousel, blog, CTA, footer |
| `about.html`    | Clinic story, mission / vision / values, approach |
| `services.html` | Detailed service sections (anchored), packages, process |
| `contact.html`  | Contact details, appointment form with validation, map placeholder, FAQ |

## Project structure

```
poshana/
├── index.html
├── about.html
├── services.html
├── contact.html
├── assets/
│   ├── css/style.css     # all custom styles (design tokens at the top)
│   ├── js/script.js      # sticky header, smooth scroll, active nav, reveal animations, form validation
│   └── images/           # put your own photos here
└── README.md
```

## Running it

Open `index.html` in any modern browser. An internet connection is needed for the Bootstrap, Bootstrap Icons and Google Fonts CDNs and for the sample photos.

For local development with live reload you can use any static server, for example:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Design system

Colours are defined as CSS variables at the top of `assets/css/style.css`:

| Token        | Value     | Use |
|--------------|-----------|-----|
| `--forest`   | `#234B3A` | Primary brand, buttons, headings |
| `--sage`     | `#A8B89A` | Accents, icons, dividers |
| `--cream`    | `#F8F6EF` | Page background |
| `--white`    | `#FFFFFF` | Cards, alternating sections |
| `--text`     | `#26352C` | Body text |

Typography: **Fraunces** (display serif for headings) and **DM Sans** (body).

Reusable components: `.btn-forest`, `.btn-outline-forest`, `.btn-cream`, `.eyebrow`, `.section-heading`, `.service-card`, `.why-item`, `.step`, `.blog-card`, `.package-card`, `.cta-band`, `.check-list`, `.placeholder-tag`.

Add the class `reveal` (optionally with `data-delay="1"`–`"5"`) to any element to give it a fade-up animation on scroll. Content stays visible if JavaScript is disabled, and animations are switched off for visitors who prefer reduced motion.

## Before going live — content to replace

Everything below is deliberately marked as a placeholder:

- **Dietitian** (`index.html#dietitian`): name, qualifications and photo. No qualifications or certifications have been invented.
- **Testimonials**: three clearly labelled *sample* testimonials. Replace with genuine patient reviews (with consent) and remove the "Sample testimonial" tags and note.
- **Contact details**: address, phone, email and working hours in the footer of every page and on `contact.html`.
- **Packages** (`services.html#packages`): package names, inclusions and pricing.
- **Social links**: all `href="#"` in the footer and contact card.
- **Map**: replace `.map-placeholder` on `contact.html` with a Google Maps embed.
- **Blog links**: the three article cards link to `#blog` until article pages exist.
- **Privacy Policy / Terms** links in the footer.

### Photos

Images currently load from Unsplash for preview purposes. Before launch, download licensed images (or use the clinic's own photography), save them in `assets/images/`, and update each `src`, for example:

```html
<img src="assets/images/hero.jpg" alt="...">
```

If any image fails to load, `script.js` replaces it with a soft sage tile so the layout never shows a broken-image icon.

### Appointment form

The form on `contact.html` validates in the browser and shows a confirmation message, but it is **not connected to a backend yet**. To receive submissions, point the form at a service such as Formspree, Netlify Forms, or your own endpoint, and remove `e.preventDefault()` handling for the success case in `initForms()` in `script.js` (or submit via `fetch`).

## Browser support

Latest Chrome, Edge, Firefox and Safari, plus iOS Safari and Chrome for Android. Layouts tested at mobile (≈375px), tablet (≈768px) and desktop (≥1280px) widths.

## Note on shared header/footer

The header and footer are repeated in each HTML file so the site works by simply opening the files — no server or build step needed. If you later move to a templating setup (e.g. PHP includes or a static site generator), these are the first blocks to extract into partials.
