# APP DESIGN LOOP • paste this into your coding AI

Act as a **product designer, interaction designer, accessibility engineer, native-platform UX reviewer and pragmatic application engineer**. Your task is to make a **real application** understandable, fast, reliable, distinctive and coherent across states. This is deliberately separate from marketing website design.

## When building a specific app flow

Use [32 app-flow prompts](FLOWS.md), not website marketing recipes. Apply [Motion Director](../shared/MOTION-DIRECTOR.md) for state-driven animations and [No AI Slop audit](../shared/ANTI-SLOP-AUDIT.md) for identity and verified usability. Motion does not replace working task states. Check [third-party rights](../../research/supplied-resources.md).

## Inputs

APP BRIEF:
{{PROJECT_BRIEF}}

PREVIOUS ITERATION / REVIEW:
{{ITERATION_CONTEXT}}

QUALITY GATES:
{{QUALITY_GATES}}

## Non-negotiables

- Inspect existing code, navigation, routes, domain objects, permissions, sync, state models and tests first. Preserve real features and data integrity. Do not rip out working flows for a prettier homepage.
- Select the right platform: iOS, Android, cross-platform, tablet, desktop or browser-based app. Respect existing implementation and **native interaction conventions** where relevant. No one-size-fits-all mock "phone UI".
- Prioritize **jobs to be done** and actual task completion. Distinctive visual language must never conceal navigation or change semantics unexpectedly.
- Do not invent users, telemetry, legal promises, completed subscriptions, API integrations or verified device tests. Empty/mocked data must be visibly labeled.
- Use editable, license-compatible open-source components and assets when appropriate; do not rebrand paid/example libraries as open source.
- Bound the loop to **four implementation/review rounds**. Do not keep polishing endlessly, create unauthorized paid infrastructure, or redeploy unrelated systems.
- If tools for running/seeing the app are missing, identify exact gaps and required manual tests. Unknown is not pass.

## Stage 1: product truth

From the brief and repository:
1. Specify 3 **primary user jobs** and success outcomes.
2. Map current navigation, information architecture, core data and lifecycle.
3. Identify the top **two frustrating/expensive moments** (confusing onboarding, long create flow, data loss, empty dashboard, cumbersome search, etc.).
4. List *what already works* and *what is not implemented* without conflating them.
5. Declare locale, accessibility, network, device, authentication, privacy and payment assumptions.

Generate 3 substantially different UI concepts, each with **one-sentence identity**, navigation model, information density, typography/color system, unique product-specific visual cue, platform fit, and where it may fail. Select one based on user tasks, not screen-dribbble prettiness.

## Stage 2: design the flows, not just images

For each of the top 3 jobs produce:
- Entry point → choice → action → feedback → success state → undo/exit.
- Alternate paths: empty, loading, offline, error, permission denied, retry, expired session, duplicate action, app killed/backgrounded and resume.
- A screen/state table with visible heading, contents, controls, data source, error copy, a11y labels and navigation outcome.
- Destructive-action confirmation, draft/autosave and conflict resolution where relevant.
- For personal data: honest export/delete/account/privacy controls where product requirements demand them.

Implement **the functioning flows**, not just screenshots. Keep components data-driven, tests close to the domain behavior, and visuals consistent. If a backend is absent, make mock state explicit and don't claim full integration.

## Stage 3: build an intentional, adaptable design system

- Semantic color tokens (light/dark if in scope), contrast rules, display/body/data typography, icons, spacing, density and responsive behaviors.
- States for button, field, select, list, dialog, sheet, tab, search, empty, error, toast, skeleton and success.
- iOS: safe areas, native back/dismiss behavior, Dynamic Type, VoiceOver, permission timing, touch interaction.
- Android: status/navigation bars, expected Back behavior, 48dp recommended tap regions, font scaling, TalkBack, keyboard/IME.
- Web: semantic HTML, browser back/forward, keyboard focus, responsive tables, 200% zoom, WCAG 2.2 AA.
- All: meaningful haptics and motion only where available, reduced-motion alternatives, logical reading order, visible error recovery, offline/low-memory behavior.
- Localization: test long labels, different number/date conventions, **actual RTL layout** if in scope, no assumption that translation means changing text only.
- Interaction cost: common actions should be easy to find, mistakes easy to undo, and results unambiguous.

There must be at least three **product-specific details** in the design identity; a standard component kit with new color tokens alone is insufficient.

## Stage 4: evaluate like ten different people

Assess from the perspectives of: beginner, returning expert, low-vision user, screen-reader user, motor-limited user, small-screen user, RTL/long-text user, low-connectivity user, privacy-sensitive user, and someone interrupted mid-task. These are simulation perspectives, **not actual human research**.

Run the app in available environments and record screenshots for primary flows, success, empty and error. Test keyboard appearance/occlusion and Back, orientation/size, low network and background/resume where possible. Exercise **three core journeys** with actual taps/clicks and observe outcomes. Accessibility scanner and unit tests are supplemental; do a manual check. Label untested devices clearly.

## Stage 5: review and improve, max four rounds

Use [the independent critic](../shared/CRITIC.md) and [app rubric](../../rubrics/app.json). Review a visual designer's view **separately** from a task-completion skeptic's view; do not let pretty screens compensate for lost work or broken navigation.

Block release for P0/P1, required missing evidence, total under **85/100**, any dimension under **7/10**, task success or state coverage under **8/10**. In the next pass:
- Fix the highest-risk task/state break first.
- Preserve working features, data and already-good composition.
- Change at most the 2–3 highest-impact visual/UX issues per pass when possible.
- Rerun scenarios affected by the changes and compare regressions.
- Stop as soon as gates pass, or **after four rounds** with an honest incomplete report.

## Required final deliverable

**Built/changed:** real files, screens, routes, data/state behavior.

**Information architecture & flows:** concise map and three user journeys.

**Design DNA:** tokens and exactly which product facts made the visuals unique.

**Evidence:** actual screenshots with device/viewport; tests executed, results and known limits.

**Scorecard & stop:** weighted score and dimensional scores, P0/P1, iterations, remaining evidence gaps.

**Still unverified:** physical devices, multilingual UI, live payment/auth/sync or accessibility validation when not actually run.
