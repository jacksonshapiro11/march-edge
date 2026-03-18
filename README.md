# March Edge — NCAA Tournament Analytics Microsite

**Live at:** [madness.cosmictrex.com](https://madness.cosmictrex.com)
**By:** [Cosmic Trex](https://cosmictrex.com)

March Edge is a static analytics microsite for the 2026 NCAA Tournament. Every game picked, 9 upset calls, betting edges ranked by confidence, full survivor pool strategy, and deep analytical profiles for all 65 tournament teams.

---

## Architecture

### Stack

- **Framework:** Next.js 14 (App Router) with `output: "export"` — fully static, no server
- **Styling:** Tailwind CSS with custom dark editorial theme
- **Fonts:** Playfair Display (headings), DM Sans (body), JetBrains Mono (data)
- **Data:** Static JSON files (no database, no API calls)
- **Hosting:** Vercel (auto-deploys from `main` branch)
- **Repo:** `jacksonshapiro11/march-edge` on GitHub

### Design System

| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `#0a0f1a` | Page background |
| `bg-card` | `rgba(255,255,255,0.03)` | Card surfaces |
| `gold` | `#fbbf24` | Primary accent, picks, highlights |
| `breaking` | `#ef4444` | Breaking news, danger zones |
| `purple` | `#7c3aed` | Cosmic Trex branding |
| `text-primary` | `#f8fafc` | Headlines |
| `text-muted` | `#94a3b8` | Body text |
| `text-dim` | `#64748b` | Labels, metadata |

---

## Project Structure

```
march-edge/
├── data/                          # All content lives here as static JSON
│   ├── bracket.json               # 67 games: R64 through Championship
│   ├── survivor.json              # Round-by-round survivor strategy
│   ├── edges.json                 # Betting edges ranked by confidence
│   ├── briefs.json                # Intelligence feed entries
│   ├── analysis/
│   │   ├── teams.json             # 65 team profiles (all tournament teams)
│   │   ├── over-under.json        # O/U projections for later rounds
│   │   ├── players.json           # Key player matchup analysis
│   │   ├── rest-travel.json       # Rest/travel fatigue data
│   │   └── style-evolution.json   # Style advantage trajectories
│   └── meta.json                  # Site metadata
├── src/
│   ├── app/
│   │   ├── page.tsx               # THE BRACKET — main bracket page
│   │   ├── edges/page.tsx         # EDGE BOARD — betting edges
│   │   ├── brief/page.tsx         # THE BRIEF — intelligence feed
│   │   ├── analysis/page.tsx      # DEEP ANALYSIS — team profiles + analytics
│   │   ├── survivor/page.tsx      # SURVIVOR STRATEGY — pool guide
│   │   ├── layout.tsx             # Root layout (Header + Nav + Footer)
│   │   └── globals.css            # Base styles + custom scrollbar
│   └── components/
│       ├── Header.tsx             # Sticky header with logo + cosmictrex link
│       ├── Nav.tsx                # Tab navigation (5 sections)
│       └── Footer.tsx             # Footer with attribution
├── tailwind.config.ts             # Custom color tokens + font families
├── next.config.js                 # Static export config
├── package.json
└── tsconfig.json
```

---

## Pages

### 1. THE BRACKET (`/`)
The main event. Every game from First Four through Championship, organized by region with a Final Four banner at top. Each game card shows matchup, spread, O/U, our pick, and confidence level. Tap to expand for full matchup-by-matchup analysis.

- **Data:** `bracket.json` (67 games)
- **Key components:** `GameCard`, `ConfidenceBadge`
- **Features:** Region tab selector, upset badges, expandable reasoning

### 2. EDGE BOARD (`/edges`)
Highest-conviction betting edges ranked by confidence (5-star system). Each edge has play, reasoning, type badge (BET/FADE), and star rating.

- **Data:** `edges.json`
- **Key components:** `StarRating`, `TypeBadge`
- **Features:** NEW/breaking edge highlighting

### 3. THE BRIEF (`/brief`)
Real-time tournament intelligence feed. Injuries, arrests, line movements, sharp money signals. Each entry has tag (BREAKING/INJURY/SHARP MONEY), timestamp, summary, bracket impact, and betting edge.

- **Data:** `briefs.json`
- **Features:** Color-coded tags, bracket impact + betting edge split view

### 4. DEEP ANALYSIS (`/analysis`)
Five expandable sections:

1. **Team Profiles** — All 65 teams with key players, strengths (green +), weaknesses (red −), narrative, and our pick badge
2. **Style Evolution** — Which teams' advantages grow vs shrink by round
3. **Rest & Travel** — Fatigue levels, conference tournament workloads, travel distances
4. **Over/Under** — Sweet 16 through Championship total projections
5. **Key Player Matchups** — Star-vs-star analysis
6. **Historical Upset Indicators** — 6 statistical factors that predict upsets

- **Data:** `analysis/teams.json`, `analysis/over-under.json`, `analysis/players.json`, `analysis/rest-travel.json`, `analysis/style-evolution.json`

### 5. SURVIVOR STRATEGY (`/survivor`)
Complete survivor pool guide with round-by-round candidate rankings.

- **Burn Score formula:** `Safety × (10 − Future Value) / 10`
- **Untouchables:** Teams to never burn early (projected deep runs)
- **8 Round sections:** R64 Thu, R64 Fri, R32 Sat, R32 Sun, S16, E8, F4, Championship — each with ranked candidates showing Safety/FV/Burn scores
- **Primary Path + 3 Alternate Paths** with cumulative survival probabilities
- **Danger Zones** — games to avoid
- **Format Guides** — strategy adjustments for different pool formats

- **Data:** `survivor.json`
- **Key components:** `BurnBar`, `CandidateRow`, `RoundSection`, `PathStep`

---

## Data Schema Reference

### bracket.json
```json
{
  "matchup": "(1) Duke vs (16) NDSU",
  "region": "East",
  "round": "R64",
  "seed_matchup": "1v16",
  "pick": "Duke",
  "spread": "-24.5",
  "ouTotal": "142.5",
  "ouLean": "UNDER 142.5",
  "confidence": "High",
  "upset": false,
  "reasoning": "Full matchup-specific analysis..."
}
```

### analysis/teams.json
```json
{
  "team": "Michigan",
  "seed": "1",
  "region": "Midwest",
  "record": "30-3",
  "kenpom": "#3",
  "coach": "Dusty May",
  "keyPlayers": [{ "name": "...", "position": "...", "stats": "...", "note": "..." }],
  "strengths": ["array", "of", "strengths"],
  "weaknesses": ["array", "of", "weaknesses"],
  "narrative": "Scouting report summary...",
  "ourPick": "CHAMPION"
}
```

### survivor.json
```json
{
  "untouchables": [...],
  "rounds": [
    {
      "id": "r64_thu",
      "name": "Round of 64 — Thursday",
      "date": "Mar 20",
      "verdict": "...",
      "candidates": [
        {
          "rank": 1,
          "team": "Duke",
          "seed": "(1)",
          "opponent": "NDSU",
          "line": "-24.5",
          "safety": 9.5,
          "fv": 2,
          "burn": 7.6,
          "analysis": "..."
        }
      ]
    }
  ],
  "primaryPath": [...],
  "alternatePaths": [...],
  "dangerZones": [...],
  "formatGuides": [...]
}
```

---

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build static export
npm run build

# Preview build locally
npx serve out
```

### Deployment
Push to `main` on GitHub → Vercel auto-deploys to madness.cosmictrex.com.

### Adding/Updating Content
All content is in `data/`. Edit the JSON files directly — no CMS, no database. The site rebuilds on push.

---

## Key Decisions

1. **Static export** — No server needed. Everything is JSON + React. Fast, cheap, CDN-friendly.
2. **No database** — Tournament data is fixed once brackets are set. JSON files are the single source of truth.
3. **Dark editorial theme** — Designed for readability of dense analytical content. Gold accent for emphasis.
4. **Expand/collapse everything** — Dense content without overwhelming. Each game, each round, each section expands on tap.
5. **Thursday/Friday game split** — Based on actual NCAA schedule (venue-based, NOT region-based). All 4 regions have games on both days.
6. **Burn Score system** — Original formula for survivor pool optimization. Balances current-round safety against future-round value.

---

## 2026 Tournament Schedule Note

The R64 Thursday/Friday split follows the actual NCAA schedule by venue:

**Thursday (Mar 20):** Duke, Ohio State/TCU, Louisville/USF, Michigan State/NDSU, Wisconsin/High Point, Arkansas/Hawaii, BYU, Gonzaga/Kansas State, Nebraska/Troy, Vanderbilt/McNeese, UNC/VCU, St. Mary's/Texas A&M, Illinois/Penn, Michigan/UMBC, Georgia/Saint Louis, Houston/Idaho

**Friday (Mar 21):** Arizona/LIU, Villanova/Utah State, Miami/Missouri, Purdue/Queens, St. John's/Northern Iowa, Kansas/Cal Baptist, UCLA/UCF, UConn/Furman, Texas Tech/Akron, Alabama/Hofstra, Tennessee/SMU, Virginia/Wright State, Kentucky/Santa Clara, Iowa State/Tennessee State, Florida/Lehigh, Clemson/Iowa

R32 follows: Thursday winners → Saturday, Friday winners → Sunday.
