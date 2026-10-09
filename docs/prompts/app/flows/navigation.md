# APP UI/UX FLOW PROMPT · App navigation

> App-only track; ID: `navigation`. Copy the entire prompt into a coding assistant. Consult `research/supplied-resources.md` before borrowing any external asset.

## Project context
- **Product, actual user and goal:** {{PROJECT_BRIEF}}
- **Platform(s):** {{PLATFORMS}}
- **Current files/navigation/data:** {{PROJECT_CONSTRAINTS}}
- **Real states/integrations, complete vs incomplete:** {{IMPLEMENTATION_STATUS}}
- **Brand preferences, reference links, no-go visuals:** {{STYLE_NOTES}}
- **Past iteration observations:** {{ITERATION_CONTEXT}}

## Agent instruction

Act as a senior product designer, software engineer and accessibility reviewer. Unlike a marketing page, an app is a network of **tasks and state transitions**. Inspect existing routes, database models, auth, sync, entitlements, components and tests before changing anything. Preserve working functionality, data, migrations and platform conventions.
Do not create fake API endpoints, fabricated paid entitlements, pretend device tests, synthetic user interviews or misleading analytics. No paid extras.
**The single real job:** Make moving between important jobs reliable and platform-consistent.

### Discover the product truth
Define entry point → meaningful task → success → exit or undo. Map actual UI to underlying state and any async APIs. Identify data ownership, privacy, confirmation, focused control, feedback and screen-reader announcement. Record what works now; do not discard it.

### Three competing app UI directions
Explore three distinct models (not just light/dark reskins):
1. Native tab hierarchy.
2. adaptive side rail on large screens.
3. search-first command shell.

Each concept shows **realistic example data**, a text wireframe for compact and wide form factors, task time/step estimate (stated as estimate), navigation and keyboard/gesture design, information density, and one product-specific visual signature. Select by task completion, technical fit and low cognitive overhead, not "Dribbble prettiness." If platform differs, explicitly split iOS, Android, desktop and web behaviors rather than assuming one universal UI.

### Exact interaction to build
Preserve stack/back history; visible current destination and labeled icons. Define actual state transitions, disabled rules, save/restore and behavior on Back, Escape, submit, retry and interruption. Do not claim an integration works based on a pretty button.

### State and inclusion matrix
Implement/test: **deep link; keyboard; back; many tabs; landscape**. Where relevant also add loading, success, error, empty, offline, unauthorized, background/resume, large text, RTL, TalkBack/VoiceOver, one-handed use and keyboard coverage. If omitted, justify scope.

### Motion strategy (not a spinning dashboard)
Purposeful candidate: **Selection indicator transition of 120–220ms**. Propose **quiet (90–220ms)** and **expressive (220–450ms)** behaviors only if a real state change benefits. On iOS/Android honor OS reduced motion and system navigation behavior; on web use `prefers-reduced-motion`. Give specific **trigger, animated property, duration/easing, cancellation/interruption, focus behavior, semantic feedback, static fallback**, with no animation dependency for task success. Never delay form validation or use surprise haptics.

### Anti-slop and source originality
Reject **Mystery-only icon navigation; hover-only menus; unnecessary page 3D spins**. Draw the design's identity from actual product nouns, content and behavior. Demonstrate three unique details and why each helps completion. Kombai may supply interaction *ideas* if its actual source rights are verified. Do not paste external components into a permissive-OSS kit without permission.

### Four-round bounded product loop
1. Implement and preserve existing behavior. Create a real screen/state matrix and tests for transitions. Avoid "looks done" without the functional path.
2. Inspect on target runtime when available. Cover 360px/small phone, large text, orientation/foldable/tablet if supported, dark/light only if in scope, keyboard and platform Back behavior.
3. Critical acceptance: **Back and focus restore correct on iOS/Android/web targets**. Execute real task at least once, an error/retry path and interruption or undo. Screenreader checks if tools available. Record evidence and mark unavailable platforms as unverified.
4. Independent art-direction and task-reliability critics score task success, hierarchy, state coverage, platform conventions, visual identity, accessibility and reliability. Fix P0/P1 and missing evidence first; goal total ≥85/100 (local heuristic) with task success and state coverage each ≥8/10.
5. Repair highest-impact three faults, retest regressions. End on evidenced pass or after four rounds with explicit remaining risks. No infinite prompting.

## Finish by reporting
Files/screens changed; preserved features; actual state transitions; visual identity with three product-specific details; motion trigger and reduced-motion behavior; observed tests and screenshot references; missing real-device/backend checks; iteration count/stop cause.
