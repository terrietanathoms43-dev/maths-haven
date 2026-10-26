# Maths Haven — Build Plan (decisions are locked)

> **Status 2026-10-26:** A dependency-free single-file gameplay prototype exists in `index.html`. Planning handoff and a maths regression suite exist. **Apex Phase A Foundation is not complete.** No production database/auth/live rooms are implemented.

Decision log:
- 2026-10-26: Reuse the working standalone IslandMath Arena prototype as Maths Haven's **temporary vertical slice**, rather than claiming an untested rewrite is complete. The production application will migrate to the Apex Next.js architecture.
- 2026-10-26: Initial friend code is a deterministic **asynchronous challenge**, not a synced multiplayer room. Cross-device realtime play requires server state and verification.
- 2026-10-26: Design is Caribbean-first with blue primary and gold highlight. English text uses "maths".
- 2026-10-26: `Apex-UX/SKILL.md` is missing in the current Apex repository; interim UX requirements in `docs/UX-GUIDELINES.md` must be reviewed once Apex-UX becomes available.

## 0. Ground rules
The four available Apex skills are source of truth: Planning → Architecture → UI → Recursive Walkthrough. Do not silently bypass an Apex gate. New features begin with a user journey and a scoped plan; maintain this decision log. Keep maths calculations pure and tested.

Proof before declaring a phase complete: `npm run typecheck`, `npm run lint`, `npm run build`, `npm run test:unit`, relevant real-browser walkthroughs, and screenshot review at **390×844 and 1280×900**, in **light and dark** themes. **Only `npm run test:unit` is currently provided for the prototype.** Do not substitute it for the other gates.

## 1. Target production stack (after migration)
- Framework: Next.js **16.x** App Router + React **19**, strict TypeScript, React Server Components for data pages and client components for interactive rounds. Pin patch versions when scaffolding and commit lockfile; read installed Next docs before APIs.
- Data: PostgreSQL 16, Drizzle ORM 0.45, drizzle-kit 0.31, `pg` pool; additive schema changes after first real data. Server-side DAL guards every query.
- Authentication: Better Auth or Auth.js database sessions, with Google/email sign-in when accounts launch. **Decision pending provider choice; never fabricate working auth.** Guests can play Phase 1 without account.
- Validation: Zod 4 on every authenticated/server mutation.
- UI: Tailwind 4, shadcn/ui on Radix, lucide-react icons, Geist Sans/Mono, next-themes, sonner. Default brand: royal blue approximately `oklch(0.43 0.14 262)`; gold `oklch(0.84 0.11 82)`. No brand colours hardcoded in components.
- Scripts at production: `dev`, `build`, `start`, `lint`, `typecheck`, `db:push`, `test:unit`, `test:walk`, `test:shot`, seed/status/tidy/clean.
- Deployment target: Vercel; database provider selection and environment configuration are deliberately deferred until foundation work, not guessed from another user's project.

## 2. Planned routes
```
/                    public landing + grade selector
/play                guest/registered challenge setup
/play/round          client interaction; seed and session state
/challenge/[code]    validated, shareable asynchronous round
/results             local round results and explanations
/login               Phase 2 optional login
/progress            Phase 2 signed-in history and topic mastery
/rooms/[code]        Phase 2 private live match with verified server results
/settings            Phase 2 learner privacy/preferences
/api/auth/*          Phase 2 session endpoints
```
At mobile width expose no more than four navigation destinations. A student should not have to sign in to use /play.

## 3. Roles, tenancy and permissions
Initial guest use is local only. Registered progress belongs to its user; educators, if added, access only explicitly enrolled classes. No user may query another user's attempts by guessing IDs. Live rooms: server verifies secret invite token, member participation, current round state, submissions, and scoring; clients never provide the 'correct' answer or final score. Use pure predicates and DAL filters with an authenticated viewer or verified guest room participant.

## 4. Planned schema (Phase 2, not created)
```
users              id, email_verified, display_name, created_at
sessions           id, user_id, token_hash, expires_at
profiles           user_id, grade_default, locale, created_at
question_sets      id, grade, topic, kind, generator_version, seed, created_at
rounds             id, owner_id nullable, question_set_id, mode, status, started_at, completed_at
attempts           id, round_id, player_id, question_index, answer_text, is_correct, answered_at (append-only)
room_invites       id, room_id, token_hash, expires_at, revoked_at
rooms              id, host_user_id, question_set_id, status, created_at, ended_at
room_members       room_id, user_id, seat, joined_at
room_events        id, room_id, event_kind, actor_id, created_at (append-only)
progress           user_id, grade, topic, played, correct, updated_at
```
Indexes on ownership, room membership, round attempts and progress; unique constraints on one submission per player per question. Guest token strategy must be security-reviewed before implementing rooms. Database sessions, not browser-trusted user IDs.

## 5. Gameplay rules
1. User selects grade 7–13, solo/local duel/friend mode, maths type, count and operations.
2. Fraction operations use exact rational arithmetic; denominator may never be zero; simplify for presentation. Numerical equivalents are graded correctly.
3. Grade-appropriate puzzles use original authored templates and a tagged topic, answer, hint and explanation.
4. Seeded friend challenges always generate the same ordered question set for the same versioned generator. Do not alter published generator behaviour without versioning code.
5. Local duel alternates a private answer turn for each person before revealing the correct answer; score +100 per correct response.
6. Show clear results after a completed round; save local results only for the prototype. XP is motivational, not a prediction of exam grades.
7. Live multiplayer (future) verifies answers, points, time limits and room events **on the server**.
8. No free-form player chat or public display of learner emails/full names.

## 6. Code layout target
```
app/                         Next.js routes, layouts, loading and API
components/game/             question, answer, explanation, scoreboard
components/ui/               generated UI primitives
lib/maths/                   rational arithmetic, generators, seeded RNG, topic metadata, tests
lib/dal/                     viewer-scoped data access
lib/permissions.ts           pure access predicates
actions/                     validated server actions (Phase 2)
db/schema.ts                 Drizzle schema (Phase 2)
scripts/test-walkthrough/    real-persona flows
docs/                        brief, plan, UX, acceptance and test notes
AGENTS.md                    builder instructions
```
Do not mix learner session state with the maths generator. Existing single-file prototype is a migration source, not the target architecture.

## 7. Phased acceptance
- **Prototype (present):** open /index.html and play; maths engine deterministic and correct on normal and edge inputs. **Proof:** `npm run test:unit` plus manual prototype review.
- **A — Foundation (next):** scaffold exact Next.js stack; migrate page shell, grade selection, token-based UI, guest game state, pure TypeScript maths engine; add light/dark themes, lint/typecheck/build/unit/screenshot scripts. **Proof:** `01-guest-start` walkthrough at both viewports/themes.
- **B — Core:** fraction modes, puzzle topic maps, solo results, keyboard/mobile input, local same-device duel, reusable explanations, versioned code challenges. **Proof:** `03-full-round` plus equivalence/seed math unit tests and four reviewed screenshots.
- **C — Online multiplayer:** database-backed accounts/guest room tokens, private rooms, realtime sync, server-authoritative scoring, disconnect/reconnect, rate-limits. **Proof:** `04-two-device-match`, permissions tests, second-user isolation, interrupted-room recovery; all CI gates green.
- **Phase 2 — Progress & value:** linked cross-device progress, mastery per topic, privacy settings, opt-in educator view. **Proof:** progress walkthrough and user-isolation tests.
- **Phase 3 — Polish:** localisation, accessibility refinements, performance budget, monitored deployments, review of CXC updates. **Proof:** full regression, Lighthouse/a11y, incident checklist and release notes.

## Risks and mitigations
- Grade vs CXC/CAPE mismapping → topic tags, syllabus version and manual educator review.
- User answer tampering in online mode → server-authoritative scoring, private room codes, never expose upcoming answer keys.
- Rational number overflow → keep numbers bounded now; consider bigint fraction engine for advanced generation.
- Browser storage loss → explain local-only progress; verified cross-device persistence only after auth rollout.
- UX standard missing from Apex → interim documented principles, revisit as soon as Apex-UX skill is committed.
