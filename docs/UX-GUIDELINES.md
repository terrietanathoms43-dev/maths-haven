# Maths Haven — Interim UX Guidelines

> The upstream Apex README references `Apex-UX`, but that folder was absent from main on 2026-10-26. These are app-specific interim constraints, not a substitute pretending to be the upstream skill.

- Each screen has one obvious primary action and a clear back or exit route.
- Student journey: **grade → mode → skill/operation → play → worked result → retry**.
- Default to solo practice without account; maintain a route to revisit grade and operation choices.
- Accept keyboard entry and fractions of the forms `3/4`, `1 1/2`, `0.75`; show helpful validation when unsupported.
- Never show correct answer to player 2 before they have submitted in a local duel.
- Distinguish challenge-code replay from *true live multiplayer* in every piece of UI copy.
- Friendly, specific feedback after wrong answers. Do not shame students or imply that XP measures ability.
- Phone interaction: 44px tap targets, no clipped fraction notation, buttons reachable without horizontal scrolling.
- High contrast light and dark states, visible focus ring, labelled forms, accessible score announcements.
- Preserve simple offline-friendly prototype usability while migrating architecture; avoid forcing students through multiple sign-up screens.
