# Maths Haven — Product Brief

> Owner intent captured 2026-10-26. Use `docs/PLAN.md` for implementation decisions.

## 1. Mission
Help Caribbean secondary and sixth-form students enjoy consistent mathematics practice, from Grade 7 to Grade 13, through fraction challenges, curriculum-inspired puzzles, and friendly competition.

**One useful maths challenge at a time, with a clear explanation after every answer.**

## 2. Audience and levels
- Grades 7–9: numeracy, fractions, consumer arithmetic, introductory algebra, measurement, ratios and data.
- Grades 10–11: original CSEC-style algebra, geometry, trigonometry, statistics, probability and applications.
- Grades 12–13: original CAPE-style Pure/Applied Mathematics extensions; label specific units/topics explicitly.
- Schools and teachers may use the product for demonstrations, but the first journey is independent student practice.

The Caribbean focus is primary: Jamaican dollars, school clubs, cricket, shops and Caribbean language/spelling. Supplement with international maths concepts without displacing local curriculum relevance. CXC topics may be renamed or reorganised over time; obtain and version official curricular sources before asserting strict syllabus alignment.

## 3. Signature feature
**A flexible, grade-aware challenge round:** grade → fractions/puzzles/mixed → operation → solo or duel/friend challenge → answer → worked feedback → results.

## 4. Required experiences
- Correctly accept equivalent fractions, mixed numbers, integers and finite decimals; reject undefined and invalid input.
- Addition, subtraction, multiplication, division, and mixed order-of-operations fractions.
- Gradual difficulty with topic labels and worked explanations, not just right/wrong.
- Puzzles span Grades 7–13, with distinct CSEC and CAPE pathways.
- Single-player self-practice; two-player play on one device; online multiplayer as a later phase.
- Keyboard-accessible, phone-first design; clear errors, no forced account to practise.
- English Caribbean context, honest labelling that content is independent practice, not official exam questions.

## 5. Roles
- Guest learner: start rounds without an account; progress stays local.
- Registered learner (Phase 2): keep progress across devices, optionally manage a public-facing nickname.
- Friend player (Phase 2): join a private game code, see common questions and validated scoring.
- Educator (later): assign topic sets and view aggregated classroom progress; no access to unrelated learners.

## 6. Journeys
A. Guest learner opens app → selects Grade 7–13 → chooses operations → answers ten questions → learns from worked steps → sees accuracy in under five minutes.
B. Two learners select a local duel → answer identical questions in private turns → see results only once both answered.
C. Friend creates a code → shares it → another person independently solves the exact same seeded questions → compares results. Live real-time syncing is **not** implied by this prototype.
D. Future: signed-in learner resumes progress on a new device without losing earned results.
E. Future: friend joins a private live room → plays a server-verified timed or untimed round → results sync fairly.

## 7. Design direction
Apex UI style: calm, legible, restrained; royal blue as the single primary accent and gold as an occasional highlight. Accessible light and dark themes, no flashy gradients or overdecorated cards. On phones, a single obvious action per screen and 44px touch targets.

## 8. Security and privacy
The prototype requires no personal information. In later phases, collect only needed account details, keep private room codes unpredictable, validate answers on the server, rate-limit join attempts, protect minors' privacy, avoid open messaging between strangers, and store minimum retention-compatible performance records.

## 9. Deliberately NOT in Phase 1
Live remote game rooms, global leaderboards, open chat, AI-generated exam papers, payments, teacher administration, complex achievement economies, user profiles, and copying official exam questions.

## 10. Success
A learner can complete a full round without help, understands why answers are right or wrong, and can repeat practice at a suitable level. The Apex proof is automated maths checks, browser walkthroughs and visual inspection at both target viewports/themes.
