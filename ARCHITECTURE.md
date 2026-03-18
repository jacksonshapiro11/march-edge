# Architecture — March Edge

## System Diagram

```
┌─────────────────────────────────────────────────────┐
│                    VERCEL CDN                        │
│              madness.cosmictrex.com                  │
│                                                     │
│  Static HTML/JS/CSS (Next.js export → /out)         │
└────────────────────┬────────────────────────────────┘
                     │ git push main
┌────────────────────┴────────────────────────────────┐
│               GITHUB REPO                            │
│         jacksonshapiro11/march-edge                   │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────┐
│               SOURCE CODE                            │
│                                                     │
│  src/app/                                           │
│  ├── page.tsx ──────────── THE BRACKET              │
│  ├── edges/page.tsx ────── EDGE BOARD               │
│  ├── brief/page.tsx ────── THE BRIEF                │
│  ├── analysis/page.tsx ─── DEEP ANALYSIS            │
│  ├── survivor/page.tsx ─── SURVIVOR STRATEGY        │
│  ├── layout.tsx ────────── Root (Header+Nav+Footer) │
│  └── globals.css ───────── Base styles              │
│                                                     │
│  src/components/                                    │
│  ├── Header.tsx                                     │
│  ├── Nav.tsx                                        │
│  └── Footer.tsx                                     │
└────────────────────┬────────────────────────────────┘
                     │ imports
┌────────────────────┴────────────────────────────────┐
│               DATA LAYER (static JSON)               │
│                                                     │
│  data/                                              │
│  ├── bracket.json ──────── 67 games, all rounds     │
│  ├── survivor.json ─────── Round-by-round strategy  │
│  ├── edges.json ────────── Betting edges            │
│  ├── briefs.json ───────── Intelligence feed        │
│  └── analysis/                                      │
│      ├── teams.json ────── 65 team profiles         │
│      ├── over-under.json   O/U projections          │
│      ├── players.json ──── Player matchups          │
│      ├── rest-travel.json  Fatigue data             │
│      └── style-evolution   Style trajectories       │
└─────────────────────────────────────────────────────┘
```

## Data Flow

There is no runtime data flow. Everything is static:

1. Content authors edit JSON files in `data/`
2. `npm run build` generates static HTML/JS/CSS in `out/`
3. `git push main` triggers Vercel deploy
4. Vercel serves static files from CDN edge nodes

No API calls. No database. No auth. No server functions.

## Component Architecture

Each page is self-contained with its own components:

```
Layout (layout.tsx)
├── Header (sticky, z-50)
├── Nav (tab bar, 5 items)
├── <Page> (max-w-[900px] centered)
│   ├── Page header (title + badge + description)
│   ├── Page-specific sections
│   │   ├── Expandable sections (useState toggle)
│   │   ├── Data cards (map over JSON arrays)
│   │   └── Badge/pill components (confidence, type, etc.)
│   └── Methodology/philosophy footer
└── Footer (attribution + cosmictrex link)
```

**Pattern:** Every interactive section uses the same expand/collapse pattern — `useState(false)` → button with ▸/▾ → conditional render.

## Styling Architecture

Tailwind with custom tokens in `tailwind.config.ts`:

- **Color system:** 7 text levels (primary → faint), card bg with hover, gold accent
- **Confidence colors:** emerald (high/safe), amber (medium), red (low/danger), blue (information)
- **Font stack:** Playfair Display for editorial feel, DM Sans for readability, JetBrains Mono for data
- **Spacing:** Compact cards (p-3 to p-5), tight gaps (gap-2 to gap-3), small text (text-xs to text-sm)
- **Dark theme:** #0a0f1a base, rgba white overlays for depth

## Key Design Patterns

1. **JSON as CMS** — All content editing happens in `data/*.json`. No admin panel needed.
2. **Client components only** — Every page is `"use client"` for expand/collapse interactivity. Static export means no SSR anyway.
3. **Mobile-first** — Grid cols collapse (sm:grid-cols-4 → grid-cols-2), padding scales (sm:px-6 → px-4), horizontal scroll for nav.
4. **Progressive disclosure** — Nothing overwhelms. Headlines visible, detail one tap away.
5. **Color-coded semantics** — Green = safe/good, amber = caution, red = danger/avoid, gold = our pick, blue = info.

## File Size Reference

| File | Entries | Description |
|------|---------|-------------|
| bracket.json | 67 games | Full tournament bracket with analysis |
| teams.json | 65 teams | All tournament teams with profiles |
| survivor.json | 8 rounds | ~50 candidates total with scores |
| edges.json | ~15 edges | Ranked betting edges |
| briefs.json | ~10 briefs | Intelligence feed entries |
| over-under.json | ~10 games | S16+ O/U projections |
| players.json | ~10 players | Key player profiles |
| rest-travel.json | ~15 teams | Fatigue analysis |
| style-evolution.json | ~8 teams | Style advantage tracking |
