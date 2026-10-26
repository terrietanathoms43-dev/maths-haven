# Maths Haven — AI/human builder handoff

A Caribbean-focused game to practise fractions and school maths from Grades 7–13. **Start with `docs/BRIEF.md`, then follow locked `docs/PLAN.md`.** This app is in **standalone prototype** form, not production Apex architecture.

## Current layout
- `index.html`: fully self-contained browser prototype; game data, UI and CSS inline.
- `tests/math.test.cjs`: Node regression checks for the current maths generator and parser.
- `docs/BRIEF.md`: intent, primary journeys and excluded scope.
- `docs/PLAN.md`: targeted Next.js architecture, routes, data roles, schema and phase proofs.
- `docs/APEX-ACCEPTANCE.md`: gates; do not turn incomplete items into 'pass'.
- `docs/UX-GUIDELINES.md`: interim controls because Apex-UX skill is not presently in upstream repository.

## Start / verify
```sh
python -m http.server 8000
# open http://localhost:8000
npm run test:unit
```
Node >=20 required for test harness. No `node_modules` or database required for current prototype.

**Maths correctness:** Accept equivalent rational answers, decimals, negative/mixed numbers, reject zero denominators, test reproducible seeded sets, and cover each grade. Never replace working maths logic without running tests.

**Future production work:** Follow [Apex Team Skills](https://github.com/terrietanathoms43-dev/Apex-Team-Skills), in the sequence Planning → Architecture → UX (once available) → UI → Recursive Walkthrough. Build pure `lib/maths` functions and full browser walkthroughs. Stack and roles must agree with `docs/PLAN.md`. Authenticated DAL queries are viewer-scoped; server actions parse through Zod, require permissions, commit state and history atomically. Do not trust browser-submitted scores for live matches.

**Definition of Done:** `npm run typecheck`, `npm run lint`, `npm run build`, `npm run test:unit`, relevant `npm run test:walk`, and reviewed 390×844 / 1280×900 screenshots in light and dark. These commands and tests will become available during Phase A; **they have not all passed now.**

**Safety/privacy:** No student-facing public chat; no unbounded nickname discovery. Use generic development-only test personas, not real learners. Never inspect or commit `.env` files, API keys or production account credentials.

**Current known limitations:** index is monolithic; local XP stays on the current device; friend codes synchronise questions, not gameplay/score; syllabus topic mapping needs a review; no authenticated roles, database, performance testing, screenshot audit or online multiplayer yet.
