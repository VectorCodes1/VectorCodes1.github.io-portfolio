# Matias Guillen — Portfolio Design System

## Overview

Personal portfolio website for **Matias Guillen**, an Electrical Engineering undergraduate at the University of Central Florida (UCF), graduating May 2027. He specializes in **RF & Electronics Systems** and **Power Electronics**, with hands-on experience in test engineering at Lockheed Martin and deep involvement in IEEE UCF as President.

**Contact:** mattg.guillen@gmail.com  
**LinkedIn:** linkedin.com/in/matias-guillen  
**Location:** Greater Orlando, FL

### Source Materials
- `Portfolio/` — Local folder (mounted via File System Access API). Contains 17 photos, 3 organization logos, 1 profile photo, and a LinkedIn PDF resume (`Profile (2).pdf`).
- No Figma files or external design systems were provided.
- No existing codebase — this is a greenfield build per the brief.

---

## Product

One product: a **personal portfolio website**, desktop + mobile. Pages:
- **Home** — name, title, bio, navigation
- **Experience** — Lockheed Martin + UCF timeline
- **Projects index** — list of projects with dates/descriptions
- **Project detail** — spec block + photo gallery
- **Leadership index** — list of leadership roles
- **Leadership detail** — spec block + photo gallery
- **About** — extended bio
- **Contact** — email + links

---

## Content Fundamentals

### Tone & Voice
- **First-person, reflective, earnest.** Matias writes like someone who genuinely loves what he does — not a polished PR voice, but thoughtful and self-aware.
- **Narrative-forward.** His bio opens with an Iron Man origin story. Content should feel personal, not corporate.
- **Precise when technical.** Specs are given in datasheet format (frequency, power, topology). No hedging on technical details.
- **Active verbs.** "Designed and fabricated," "coordinated across," "managed calibration schedules." Strong, clear.

### Casing
- Section headings: **sentence case** (not Title Case or ALL CAPS)
- Navigation labels: **lowercase monospace** (`§01 projects`, `§02 leadership`)
- Names, organizations: standard proper-noun capitalization (IEEE UCF, Lockheed Martin)

### Emoji & Special Characters
- **No emoji.** Zero. The aesthetic is technical and editorial.
- **Section markers:** `§` (section sign) used as prefix before section numbers
- **Figure captions:** `Fig. N —` format, italic serif

### Copy Examples (from resume)
- "I may have outgrown the cardboard suit, but I have never outgrown my drive to build, break, and improve."
- "RF signal integrity," "component-level failure analysis," "Bill of Materials (BOM) proposals"
- Dates in monospace: `Apr 2024 – Apr 2026`

---

## Visual Foundations

### Color System
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#FAFAF7` | Page background (warm off-white) |
| `--ink` | `#111111` | All body text, headings |
| `--ink-muted` | `#555555` | Captions, metadata, secondary text |
| `--accent` | `#1B3A5C` | Links, hover states, section number indicators ONLY |
| `--divider` | `rgba(17,17,17,0.12)` | Hairline rules between rows |
| `--grid-dot` | `rgba(17,17,17,0.04)` | Background engineering grid dots |

**No other colors.** No grays as backgrounds, no colored cards, no gradients.

### Typography

**Display / Headings:** EB Garamond (serif) — Used for name, page titles, project titles, bio text. Warm, humanist, academic.  
**Body:** EB Garamond — 17–18px on mobile, line-height 1.65. Same face as headings; size is the differentiator.  
**Technical / Mono:** JetBrains Mono — All metadata, dates, spec keys, nav labels, section numbers. Communicates precision.

**Scale:**
- `--type-name`: 2.8rem / 1.1 lh — Home name
- `--type-h1`: 2rem / 1.15 lh — Page titles
- `--type-h2`: 1.35rem / 1.3 lh — Section headings
- `--type-body`: 1.0625rem (17px) / 1.65 lh — Body
- `--type-mono-sm`: 0.75rem / 1.5 lh — Metadata, labels, nav
- `--type-mono-md`: 0.875rem / 1.5 lh — Spec blocks, dates

### Backgrounds & Texture
- **Base:** `#FAFAF7` — warm off-white, like aged technical paper
- **Grid overlay:** SVG dot pattern, 20px grid, 1px dots, opacity 0.04. Applied via `background-image` on `<body>`. Must never interfere with text.
- **No photography as background.** Photos are always content, never decoration.
- **No gradients, no shadows, no blur effects.**

### Layout Rules
- **Mobile-first, single column.** Max content width: 680px, centered with `padding: 0 1.25rem`.
- **Thin horizontal dividers:** 1px `--divider` color. Each has a `◉` (filled circle, 5px) at the left end, colored `--accent`.
- **Section numbers:** `§01`, `§02` etc. in monospace `--accent`, displayed before section headings.
- **Sticky nav:** Back link + page title in monospace, border-bottom 1px divider, `background: #FAFAF7`.
- **Spec blocks:** Two-column `<dl>` grid in monospace. Keys left-aligned, values right-aligned (or stacked on mobile).

### Animation
- **One animation only:** A small inline SVG sine wave near the name on the home page, animating left-to-right on a CSS loop. Subtle — opacity ~0.4, stroke thin.
- **No other motion anywhere.** No page transitions, no hover animations, no loading spinners.

### Hover / Interaction States
- **Links:** `color: --accent` on hover. No underline by default; underline appears on hover.
- **Row taps (index pages):** Background shifts to `rgba(27,58,92,0.04)` on hover. No scale, no shadow.
- **No press shrink.** No transform on click.

### Borders & Dividers
- All borders: `1px solid rgba(17,17,17,0.12)`
- No box shadows anywhere.
- No border-radius (or 0px). Everything is rectangular.
- Divider nodes: `5px × 5px` filled square or circle in `--accent` at left end of each `<hr>`.

### Cards
- **No cards.** The design system explicitly avoids boxes, cards, and containers.
- Information lives in rows, columns, and typographic hierarchy only.

### Imagery
- Photos are real, personal — engineering competitions, IEEE events, Lockheed badge shots.
- Color vibe: warm, indoor fluorescent + outdoor daylight. No color grading applied.
- Display: full-width, object-fit: cover, no border-radius, no shadow.
- Captions: `Fig. N — description` in italic EB Garamond, `--ink-muted`, 0.875rem.

### Corner Radii
- **Zero.** No border-radius anywhere in the system.

### Iconography
- **No icon library used.** The design system uses typographic symbols only:
  - `§` — section prefix
  - `←` — back navigation
  - `◉` — divider node
  - No SVG icons, no icon fonts, no emoji
- Logos: IEEE UCF, Lockheed Martin, UCF — used in experience/leadership sections as small inline images.

---

## File Index

```
README.md                    ← this file
SKILL.md                     ← skill definition for Claude Code
colors_and_type.css          ← all CSS variables + base styles
assets/
  Profile.pdf                ← LinkedIn resume
  profileimage1.png          ← profile photo
  ieee_ucf_logo.jpg          ← IEEE UCF organization logo
  lockheed_martin_logo.jpg   ← Lockheed Martin logo
  university_of_central_florida_logo.jpg ← UCF logo
  photos/                    ← all portfolio photography (17 images)
    circuit-design-competition-*.jpg
    president-*.jpg
    project-chair-*.jpg
    service-committee-*.jpg
    hkn-*.jpg
    exemplary-student-branch.jpg
    solidworks-cert.jpg
preview/                     ← design system card previews
ui_kits/
  portfolio/
    index.html               ← full interactive portfolio prototype
    Home.jsx
    ProjectsIndex.jsx
    LeadershipIndex.jsx
    DetailPage.jsx
    AboutContact.jsx
```

---

## Font Note
**EB Garamond** and **JetBrains Mono** are loaded from Google Fonts (CDN). If offline use is needed, download and place `.woff2` files in `fonts/` and update `colors_and_type.css` accordingly.
