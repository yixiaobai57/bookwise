# BookWise Implementation Plan

## Project Context

- **Repo**: `D:/AI/vs` — fresh git repo, single commit, no remote, no code
- **Design spec**: `D:/AI/vs/docs/superpowers/specs/2026-06-24-bookwise-design.md`
- **Environment**: Node v24.17.0, npm 11.13.0, Windows 11
- **Stack**: Next.js 14 (App Router) + Tailwind CSS + Framer Motion + Recharts + Compromise (NLP)
- **Deployment**: Vercel Serverless

## Agent Assignment

| Agent | Scope |
|-------|-------|
| **Code Agent** | All file creation, code logic, API routes, data processing scripts |
| **Product Agent** | Requirements clarification, data curation (book list, COCA list), API contract validation, acceptance criteria |
| **UI Agent** | Tailwind config, component styling, Framer Motion animations, open-design.ai visual style, responsive layout |

---

## Phase 1: Project Scaffolding

**Agent**: Code Agent (structure) + UI Agent (Tailwind/theme config)

**Goal**: Boot a working Next.js 14 App Router project with all dependencies installed and the design system tokens configured.

### Steps

1. **Initialize Next.js project** inside `D:/AI/vs/bookwise/`:
   - `npx create-next-app@14 bookwise --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"`

2. **Install dependencies**:
   ```
   npm install framer-motion recharts compromise
   npm install -D @types/node
   ```

3. **Configure `tailwind.config.ts`** with design spec color tokens

4. **Create `app/globals.css`** with Tailwind directives and CSS custom properties

5. **Create `app/layout.tsx`** — root layout with font, metadata, Navbar

### Files

| File | Action | Owner |
|------|--------|-------|
| `bookwise/` (entire dir) | Create via `create-next-app` | Code Agent |
| `bookwise/tailwind.config.ts` | Modify — add custom colors, gradient | UI Agent |
| `bookwise/app/globals.css` | Modify — design tokens, base styles | UI Agent |
| `bookwise/app/layout.tsx` | Modify — font, metadata, root structure | Code Agent |

---

## Phase 2: Data Layer

**Agent**: Product Agent (curate data) + Code Agent (structure/types)

**Goal**: Create the three core data files and their TypeScript interfaces.

### Files

| File | Action | Owner |
|------|--------|-------|
| `bookwise/data/books.json` | Create — curated book data | Product Agent |
| `bookwise/data/coca-frequency.json` | Create — COCA top 20k | Product Agent |
| `bookwise/data/exam-mapping.json` | Create — exam score mapping | Code Agent |
| `bookwise/lib/types.ts` | Create — shared TypeScript interfaces | Code Agent |

---

## Phase 3: Vocabulary Test System

**Agent**: Code Agent (algorithm + API) + UI Agent (test component visuals)

**Goal**: Build the adaptive vocabulary test with 4 input methods.

### Files

| File | Action | Owner |
|------|--------|-------|
| `bookwise/lib/vocabulary.ts` | Create — adaptive test algorithm | Code Agent |
| `bookwise/lib/storage.ts` | Create — localStorage wrapper | Code Agent |
| `bookwise/app/api/test/route.ts` | Create — test API endpoint | Code Agent |
| `bookwise/components/VocabularyTest.tsx` | Create — test UI + animations | UI Agent |
| `bookwise/components/ManualInput.tsx` | Create — direct vocab input | Code Agent |
| `bookwise/components/ExamInput.tsx` | Create — exam score mapper | Code Agent |
| `bookwise/components/WordlistImport.tsx` | Create — word list importer | Code Agent |
| `bookwise/app/test/page.tsx` | Create — test page with tabs | UI Agent |

---

## Phase 4: Coverage Calculation Engine

**Agent**: Code Agent

**Goal**: Build the core engine that calculates vocabulary coverage for a book.

### Files

| File | Action | Owner |
|------|--------|-------|
| `bookwise/lib/coverage.ts` | Create — coverage calculation engine | Code Agent |
| `bookwise/lib/ai-analyze.ts` | Create — AI/heuristic analysis | Code Agent |

---

## Phase 5: Recommendation Engine + API Routes

**Agent**: Code Agent (engine) + Product Agent (validation)

**Goal**: Build the recommendation logic and all API routes.

### Files

| File | Action | Owner |
|------|--------|-------|
| `bookwise/lib/recommend.ts` | Create — recommendation engine | Code Agent |
| `bookwise/lib/gutenberg.ts` | Create — Gutenberg API client | Code Agent |
| `bookwise/app/api/recommend/route.ts` | Create — recommend endpoint | Code Agent |
| `bookwise/app/api/gutenberg/route.ts` | Create — Gutenberg endpoint | Code Agent |
| `bookwise/app/api/analyze/route.ts` | Create — AI analysis endpoint | Code Agent |

---

## Phase 6: UI Pages

**Agent**: UI Agent (primary) + Code Agent (page structure/wiring)

**Goal**: Build all 4 pages with open-design.ai visual style.

### Files

| File | Action | Owner |
|------|--------|-------|
| `bookwise/components/Navbar.tsx` | Create | UI Agent |
| `bookwise/components/BookCard.tsx` | Create | UI Agent |
| `bookwise/components/CoverageCircle.tsx` | Create | UI Agent |
| `bookwise/components/FilterBar.tsx` | Create | UI Agent |
| `bookwise/components/SkeletonCard.tsx` | Create | UI Agent |
| `bookwise/app/page.tsx` | Create — landing page | UI Agent + Code Agent |
| `bookwise/app/recommend/page.tsx` | Create — recommendation list | UI Agent + Code Agent |
| `bookwise/app/book/[id]/page.tsx` | Create — book detail | UI Agent + Code Agent |

---

## Phase 7: Deployment

**Agent**: Code Agent

**Goal**: Push to GitHub, connect to Vercel, verify deployment.

### Files

| File | Action | Owner |
|------|--------|-------|
| `bookwise/.gitignore` | Verify/modify | Code Agent |
| `bookwise/README.md` | Create | Code Agent |

---

## Dependency Graph

```
Phase 1 (Scaffolding)
    │
    ▼
Phase 2 (Data Layer)  ◄── Product Agent curates data in parallel
    │
    ▼
Phase 3 (Vocabulary Test)  +  Phase 4 (Coverage Engine)  ◄── can be parallel
    │                              │
    └──────────────────────────────┘
    │
    ▼
Phase 5 (Recommendation Engine + APIs)
    │
    ▼
Phase 6 (UI Pages)
    │
    ▼
Phase 7 (Deployment)
```
