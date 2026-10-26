# Maths Haven

**Caribbean-first maths practice for Grades 7–13.** This repository follows the standards in [Apex Team Skills](https://github.com/terrietanathoms43-dev/Apex-Team-Skills).

## Current status — 26 October 2026

A **playable, standalone prototype** is committed in [index.html](index.html). It is intentionally not represented as an Apex-complete full-stack app. The future production stack and criteria are specified in [docs/PLAN.md](docs/PLAN.md).

### Features you can play now
- Grades 7–13 with increasing difficulty (lower-secondary, CSEC-inspired, CAPE-inspired).
- Fraction Lab: addition, subtraction, multiplication, division and combinations.
- Maths Puzzle Quest and mixed rounds with hints, worked explanations and equivalent-fraction grading.
- Solo practice, two-player **same-device** duels, and deterministic shareable friend challenge codes.
- XP and result history stored **only in the browser**.

**Not built yet:** live cross-device multiplayer, live leaderboards, accounts, database persistence, anti-cheating/server scoring, or Apex-complete Next.js UI.

### Run
Open `index.html` in a browser, or serve the folder using `python -m http.server 8000` and visit http://localhost:8000. No installation required for prototype gameplay.

Run the pure game-logic regression suite: `npm run test:unit` (Node 20+). It tests the *current prototype*, not browser rendering or deployed multiplayer.

### Apex workflow
Read these files in order:
1. `docs/BRIEF.md` — user goal, journeys, scope and exclusions.
2. `docs/PLAN.md` — locked production architecture, phase sequence and proofs.
3. `AGENTS.md` — builder instructions and verification rules.
4. `docs/APEX-ACCEPTANCE.md` — compliance and proof checklist.

We use the Planning, Architecture, UI and Recursive-Walkthrough skill files from the Apex repository. Its README mentions `Apex-UX/`, but that folder was absent from `main` on 2026-10-26; `docs/UX-GUIDELINES.md` records interim application-specific requirements.

### Curriculum and attribution
Original practice problems inspired by Caribbean school curricula. Grade bands are teaching approximations and are **not** a guaranteed grade-by-grade mapping for every territory.
- [CXC CSEC Mathematics](https://www.cxc.org/wp-content/uploads/2018/11/CSEC-Mathematics-Syllabus_EffectiveforExamsfrom2027.pdf)
- [CXC CAPE Pure Mathematics](https://www.cxc.org/subject/pure-mathematics-cape/)
- [CXC CAPE Applied Mathematics](https://www.cxc.org/subject/applied-mathematics-cape/)

Not endorsed by, or affiliated with, CXC. No official past paper text is included.
