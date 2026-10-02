# Wire design system

The source of truth for the wire.network redesign. The tokens live in `src/styles/global.css` (`@theme`). The live reference page is `/system` (noindex).

## Design read

The site is a B2B infrastructure landing page for developers, partners and investors. Its language is institutional and dark-tech: serious financial infrastructure, not a crypto startup.

| Dial | Value | Why |
|---|---|---|
| Variance | 7 | Offset grids, pinned and panned sections, asymmetric bento |
| Motion | 7 | Scrubbed storytelling and live state; motion still never decorates |
| Density | 5 | Tighter rhythm; every section carries real content plus one interaction |

## Color

The palette evolves the live wire.network tokens (obsidian, platinum, cobalt). The site is dark only, with one theme throughout and no section inversions.

| Token | Hex | Use | Contrast on ink-950 |
|---|---|---|---|
| `ink-950` | `#05070A` | Page background | n/a |
| `ink-900` | `#0B1016` | Panels, raised bands | n/a |
| `ink-800` | `#141B24` | Hover, code blocks | n/a |
| `ink-700` | `#1D2631` | Pressed, dividers on panels | n/a |
| `line` / `line-strong` | platinum at 8% / 16% | Hairlines, panel borders | n/a |
| `fg-1` | `#E8EDF4` | Headings, primary text | 17.1:1 |
| `fg-2` | `#A9B3C0` | Body copy | 9.5:1 |
| `fg-3` | `#6E7885` | Meta, labels, captions | 4.5:1 |
| `accent` | `#2F6BFF` | The one accent: lines, focus rings, signal | 4.5:1 (large/UI only) |
| `accent-soft` | `#7EA5FF` | Links and accent text | 8.4:1 |
| `state-settled` | `#44E2A1` | Lifecycle SETTLED only | 12.1:1 |
| `state-recovering` | `#E68E35` | Lifecycle RECOVERING only | 8.0:1 |
| `text-metal` | brushed gradient | One use per page: the wordmark | n/a |

**Rules**
- Cobalt is the only accent. It is **never a button fill**. The primary button is platinum on ink.
- State colors appear only inside lifecycle components, where they carry meaning.
- No glows, no gradient text on headlines, no pure black or pure white.
- Depth comes from a 1px hairline plus an inner top highlight (`panel-edge`). Nothing uses drop shadows.

## Typography

| Role | Face | Notes |
|---|---|---|
| Display, UI, body | **Switzer** 400/500/600 (Fontshare, self-hosted in `public/fonts`) | A Swiss grotesk: precise and institutional |
| Machine voice | **IBM Plex Mono** 400/500 (`@fontsource`) | States, receipts, metrics, tooling; kept from the current site |

| Token | Size | Line height | Tracking |
|---|---|---|---|
| `text-display` | clamp 44-72px | 1.02 | -0.035em |
| `text-h2` | clamp 32-48px | 1.08 | -0.03em |
| `text-h3` | 24px | 1.25 | -0.015em |
| `text-body-l` | 19px | 1.6 | 0 |
| `text-body` | 16px | 1.6 | 0 |
| `text-mono-s` | 13px | 1.4 | 0 |
| `text-mono-xs` | 11px | 1.3 | +0.14em, caps (eyebrows) |

**Rules**
- Headings use weight 500. Emphasis comes from weight or color within the same family, never from a serif swap.
- Body text is capped at 62ch.
- No em-dashes or en-dashes anywhere in visible copy. Use periods, commas, colons or hyphens.

## Space, grid, shape

- **Container:** 1320px max, with 24px gutters on desktop and 16px on mobile. Layouts use a 12-column grid.
- **Section rhythm:** `py-20` on mobile, `py-24` on desktop. Separate sections with a `border-t border-line` or a tone shift to `ink-900`, never a theme flip.
- **Radius:** controls (buttons, chips, inputs) are 6px (`rounded-control`). Panels and media are 14px (`rounded-panel`). Nothing is a pill.
- **Z-index scale:** nav is 50, mobile sheet 55, grain 60.

## Components (`src/components`)

| Component | Notes |
|---|---|
| `ui/Button` | `primary`, `secondary` and `ghost`; `md` or `sm`; `external` adds an arrow-out icon and opens a new tab |
| `ui/TextLink` | Accent-soft text; the underline draws in on hover |
| `ui/Heading` | `display`, `h2` or `h3`; `split` turns on the line-mask reveal |
| `ui/Eyebrow` | Rationed to 3 on the home page (1 per 3 sections) |
| `ui/Panel` | Surface `plain`, `tint` or `grid`. Bento grids must mix at least 2 surfaces |
| `ui/Metric` | `xl` for the hero number, `md` for spec tiles |
| `ui/LifecycleChip` | `pending`, `routing`, `executing`, `settled`, `recovering`. In-flight states tick |
| `site/Nav`, `site/Footer` | IA: About (`/#about`), Developers (`/developers`), Whitepaper (external PDF) |
| `site/WireMark` | Official mark, vectorized from the Wire-Network avatar. Swap in the master SVG when available |
| `hero/Convergence` | WebGL field, ported from Originkit "Stream Convergence" |
| `hero/Hero` | Asymmetric split, no eyebrow. Mechanism headline, 20-word subtext, live receipt |

**CTA intents (one label each):**
- **Get Early Access:** signup
- **Build on Wire:** developers
- **Explore the Network:** scroll to About

## Motion

- **Easing:** `expo.out` / `cubic-bezier(.16,1,.3,1)`.
- **Durations:** 200ms for UI feedback, 600ms for reveals, 900ms for the hero entrance.
- **Stack:** Lenis for smooth scroll, driven by `gsap.ticker` and synced to ScrollTrigger. GSAP SplitText handles line reveals. It all lives in `src/lib/motion.ts`.
- **Attributes:**
  - `data-reveal` fades an element up on enter; `data-reveal-delay` staggers it.
  - `data-split` gives a heading the line-mask reveal.
- **Allowed motion:**
  - the hero field (storytelling)
  - the UTL diagram scrub (storytelling)
  - lifecycle transitions (state)
  - heading reveals (hierarchy)
  - button and link feedback
- **Banned:**
  - scroll listeners (use ScrollTrigger or IntersectionObserver)
  - cursor effects
  - decorative infinite loops
  - more than one marquee per page
- **Reduced motion:** nothing animates, Lenis stays off, the hero renders a still frame, and content is visible without JavaScript.

## Libraries

| Package | Role |
|---|---|
| `tailwindcss` v4 + `@tailwindcss/vite` | Utilities over the `@theme` tokens |
| `gsap` (ScrollTrigger, SplitText) | Scroll choreography |
| `lenis` | Smooth scroll |
| `@astrojs/react`, `react` | Only for the Convergence WebGL island |
| `astro-icon` + `@iconify-json/ph` | Phosphor icons, rendered at build time |
| `simple-icons` | Real chain logos for the network strip |
| `@fontsource/ibm-plex-mono` | Mono face |

## Pre-ship checks

- **Banned characters and listeners:** `grep -rn "—\|–" src/` returns nothing, and so does `grep -rn "addEventListener('scroll'" src/`.
- **Eyebrows:** the count on `/` is ≤ 3.
- **Hero:** the headline is ≤ 3 lines at 1440px, the CTAs are visible without scrolling, and the subtext is ≤ 20 words.
- **Reduced motion:** the page is static and all content is visible.
- **Lighthouse (mobile):** LCP < 2.5s and CLS < 0.1.
