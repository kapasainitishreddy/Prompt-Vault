# Atelier Ledger · Website style direction

> Original MIT Prompt-Vault design prompt. A **visual language**, not a ready-made imitation of any third-party site. Track: **website**. IDs in this catalog are original and not imported from the reference projects.

## Project inputs

- Product, domain and real audience: {{PROJECT_BRIEF}}
- Current routes/data/components and features to preserve: {{CURRENT_CODE}}
- Visual reference links (principles only, no clone): {{REFERENCES}}
- Real content and proof available: {{REAL_CONTENT}}
- Target devices/languages and accessibility: {{ACCESSIBILITY_LOCALES}}
- Previous issues/evidence: {{ITERATION_CONTEXT}}

## Agent role and original visual thesis

Act as an art director, UX strategist, visual-system designer, frontend/native engineer, accessibility reviewer and adversarial critic. Build a **Atelier Ledger** direction for **Luxury craft studio with documented provenance**. The main user outcome is **visitor comprehension, honest product proof, working CTA, mobile reflow**. Inspect the current repository before any edits; preserve real flows, data and existing functionality.

**Visual DNA:** Use a luxury treatment and a poster-based layout grammar, with **display serif / uncluttered sans**, **airy** information density, and a purposeful rhythm rather than generic component tiles. Suggested starting tokens: paper `#F0EBE1`, ink `#27261F`, accent `#7F6C4B`, auxiliary `#C8BBA7`. These colors are *candidates*, not a fixed palette: test contrast and replace any inaccessible pair. Fonts must support the product's scripts and have independently verified licenses.

### Explore three materially different directions

1. **A · poster original composition centered on the actual user job and strong typographic hierarchy**. Include wireframe, real example content, selected typography and image logic, responsive layout and risks.
2. **B · demonstrate the product with real sample data, honest states, deliberate pacing and a different focal structure**. Include wireframe, real example content, selected typography and image logic, responsive layout and risks.
3. **C · information-led index or process narrative with more compact controls and accessible navigation**. Include wireframe, real example content, selected typography and image logic, responsive layout and risks.

Do not merely recolor the same grid. Compare layouts, density, hierarchy, navigation, imagery and motion. Select the direction that communicates this exact product's difference **and** respects conventional controls. Explain three decisions that would not make sense for an unrelated brand.

### Interaction and motion contract

**Candidate purposeful motion:** Slow nonessential image crossfade after selection. Implement only if it genuinely supports state, comprehension or orientation. Specify trigger, before/after state, transform/opacity/easing/duration, interruption, focus and keyboard/touch equivalent, reduced-motion alternative and static fallback. Never autoplay long decorative motion, delay the primary action, or animate critical text for amusement. For mobile apps, honor the OS reduced-motion setting and platform gesture expectations.

### Anti-slop rejection

**Reject specifically:** Gold gradients; fake client pedigree; mystery interactions. Also remove irrelevant glass cards, identical SaaS feature rows, made-up logos/reviews/metrics, fabricated progress/AI states, and UI components whose purpose is unknown. No borrowed competitor trade dress or copyrighted studio artwork. Source materials must retain their own licenses and notices.

### Build and verify in bounded rounds

1. Audit existing code and name three strengths worth keeping; implement the selected original design system on the actual website, not a separate screenshot-only shell.
2. Cover all relevant primary interactions including loading, empty, success, invalid input, retry and interrupted path. Do not claim backend or device validation without executing it.
3. Render with available tools at 1440/768/390/360 CSS px for web, or target emulator/real devices for apps. Inspect actual screenshots, zoom, long localized strings, keyboard/focus/screen reader and reduced-motion behavior. Label unverified conditions.
4. Grade task effectiveness, visual identity, typography, originality, responsiveness, accessibility, interaction and performance with evidence. Reject P0/P1 blockers, missing proof, poor contrast or generic logo-swap design.
5. Repair at most three high-impact issues per round. Stop on evidenced quality gates or after **four rounds** with an accurate unresolved-issues report. Never loop endlessly or invent results.

## Deliverable

Changed routes/components, visual tokens, product-specific choices, A/B/C rationale, actual screenshots/test commands and their results, observed failure/recovery states, precise motion contract with reduced-motion equivalent, source/asset licenses, remaining issues and stop reason.
