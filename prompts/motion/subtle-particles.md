# MOTION RECIPE PROMPT · Atmospheric particle field

> One original motion specification, not a copied vendor animation. ID: `subtle-particles`. Applicable to website/app only when appropriate to the platform.

## Fill context
PRODUCT BRIEF: {{PROJECT_BRIEF}}
COMPONENT / ROUTE: {{COMPONENT}}
IMPLEMENTATION STACK: {{STACK}}
ANIMATION INTENSITY: {{INTENSITY}}
PAST REVIEW / ISSUE: {{ITERATION_CONTEXT}}

## Prompt for the implementing agent

Act as a motion designer, accessibility engineer, frontend/native UI engineer and skeptical reviewer. Inspect the current component and real interaction states before modifying code. Preserve semantics, data, focus, layouts and event behavior.

**Purpose:** Express genuine scientific/artistic material only where it supports identity.

**Trigger / state ownership:** Optional hero engagement or scroll chapter.

**Recommended art direction:** One canvas contained to decorative region, opacity low, finite duration; pause offscreen; cap DPR and particle count.

**Static and reduced-motion equivalent:** Flat authored SVG/static texture or no decoration. Use the platform's reduced-motion capability and preserve a clear, accessible end state. The interaction itself must work with JS animation disabled, GPU unavailable and keyboard/touch inputs.

**Reject these motion anti-patterns:** Sparkles over every section; particles blocking readability. The animation needs a named semantic job, not a popularity score.

**External reference:** Canvas UI; study the concept only. Before installing or copying external source, inspect the **exact artifact license** in [supplied resources](../../research/supplied-resources.md). A project's homepage calling itself "open source" is not a blanket redistribution license. If license unsuitable, implement your own original motion or use the static fallback. Never bundle vendor code or media into Prompt-Vault.

### Motion contract (fill for the final implementation)
1. Trigger: a real user action or real content/state update.
2. State before → state after: exact semantic change and accessible announcement.
3. Animating: transform/opacity preferred; canvas only if justified and supports fallback.
4. Duration: quiet / expressive / cinematic as allowed; provide measured ms and easing. Not all components need movement.
5. Cancellation: repeated clicks, rapid tab switching, unmount, Escape, touch release, route change and reduced motion toggled mid-flight.
6. Input: pointer and keyboard parity, screen reader semantics, focus stable and targets stationary during interaction.
7. Performance: no long main-thread work or layout thrash; test slow device, large content and mobile.
8. Boundaries: where it must not animate (checkout confirmation, critical copy, motion-sensitive context).
9. License and bundle size: dependencies documented; no premium features presumed.
10. Fallback: exact visual if motion disabled, no animation support or renderer failure.

### Build → inspect → critique → repair (max four rounds)
- Implement only this behavior, using native CSS/Web Animations API/available platform primitives before adding large dependencies.
- Render and interact on real supported target(s) and compare an animation-enabled and reduced-motion capture. Label missing device/browser evidence.
- Ask independent visual and task critics whether the motion clarifies, distracts, blocks comprehension or changes layout/focus incorrectly.
- Repair the 1–3 highest-impact faults. Stop on passing functional and accessibility gates or after four rounds with a clear unresolved-issues report. No endless self-loop.

### Output
Actual files changed; timing/easing and trigger; exact fallback implementation; observed tests and screenshots; performance/compatibility and rights caveats; iterations and stop reason.
