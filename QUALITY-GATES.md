# Prompt-Vault release and quality gates

This file is an honest status ledger, not a claim that every UI pattern is production-ready or that a subjective "10/10" has already been reached.

## Implementation matrix (2026-10-09)

| Layer | Added | Verified in repository source | Still required before a public quality claim |
|---|---|---|---|
| Existing 100 app + 100 website concept library | Preserved | Existing catalogs remain | Visually compare all illustrative categories in browser; check their usefulness |
| 32 app workflow previews | Browser interactive cases | 32 expected case IDs match catalog IDs | Browser regression with real interactions, responsive screenshots |
| 20 connected app journeys | Browser and native navigation | All journey step IDs resolve | Usability testing on intended audiences |
| Visual design, themes, states | Mobile Studio page | Dark/light, iOS/Android-inspired and normal/success/error controls exist | Device/OS visual parity, contrast, screen reader, reduced motion checks |
| 32 native pattern demos | Expo React Native TSX | One native case per original app-flow ID | npm install, TypeScript check, Android and iOS build/device QA |
| Native reusable components | Basic buttons/chips/cards/toggles/fields/progress/notice/type | Original source included | Publishable API, documentation and wider component coverage |
| Build-plan composer | Browser-only deterministic template | Reads 20 source-linked journeys | Human review of generated briefs |
| MCP server | 7 read-only catalog tools | APIs match MCP SDK v2 signatures in public docs | npm install, run MCP inspector, invoke tools from a host |
| Existing 32 website section prompts | Preserved and MCP-searchable | Source catalog mapped | Independent website UX and browser QA |
| Landing-page navigation and newcomer path | Linked from multiple pages | Source links present | Verify production deploy resolves all routes |

## Build and smoke test

The website ships as static files under docs/. Serve it with:

    python3 -m http.server 8000

From a browser, open http://localhost:8000/docs/mobile-studio.html. Check: visible fallback before JS, 20 journeys rendered, all 32 flow patterns found, search, step navigation, input interactions, copy prompt, project brief, dark theme, iOS/Android frame, success/error, keyboard navigation and 360/390/768/1440px layouts. Test fresh load and direct links, screen readers and reduced motion.

The mobile starter is under native-kit/:

    cd native-kit
    npm install
    npx expo install --fix
    npx tsc --noEmit
    npx expo-doctor
    npx expo start

Confirm accessible Expo Go or development build compatibility. Verify each flow on real Android and iOS, test focus/touch/type scale, background/foreground, locale/RTL, notches and orientation. **Native preview fixtures are in-memory only and reset on restart**. Actual server features are not supplied.

Read-only agent tools are under mcp/:

    cd mcp
    npm install
    npm run check
    npm start

Inspect the 7 tools using an MCP client or the Inspector. Do not assume a stdio MCP server is accessible over public HTTP.

Repository tests (source wiring, not certification):

    python3 -m unittest discover -s tests -v

The test suite contains static unit/source tests; passing does not prove an Android build, iOS build, deployed site, real payment or login.

## Product quality acceptance criteria

1. Discovery: a first-time visitor can identify "Website" or "App" without knowing design terminology, find a relevant example and reach a working preview in no more than three interactions.
2. Preview truthfulness: every card's label matches a recognizable rendered structure, not just different background colors. Indicate browser sample versus native component versus complete commercial template distinctly.
3. Implementability: copy the exact native component code with dependencies and framework constraints; compile on a supported SDK; show an accurate installation path, copy/attribution requirements and source version.
4. Connected flows: users can complete 5 representative full journeys (e.g., tasks, reader, learning, commerce, wellness) without dead ends, destructive misfires or unexplained state changes.
5. Accessibility: screen readers, touch targets, keyboard focus, color contrast, large text, reduced motion and locale/RTL tested against a documented checklist. Avoid claims of WCAG certification without professional audit.
6. Performance: run Lighthouse on the hosted website and benchmark first useful render on multiple devices. Publish measured values instead of generic claims of speed.
7. Safety and rights: no unverified social proof, AI claims, paper outcomes, asset rights or connected-service claims. No billing, OAuth, push or user deletion pretended to be working.
8. Reliability: all links, prompts and assets resolve; usable static first paint, meaningful failure path when optional scripts/CDNs fail; no uncaught console errors in supported browsers.
9. DevX and MCP: install docs tested from a clean checkout; MCP inspector calls all seven catalog tools; no unrelated writes or paid dependencies.
10. Feedback: obtain first-session task-success and design quality feedback from multiple novice and experienced users; make measured fixes and record before/after evidence.

## What remains beyond this release

A "10/10" market-level product would still need individually designed (not merely shared-renderer) screen previews for all 100 mobile concept entries; a larger accessible native component library; CLI distribution and versioned examples; hosted live previews that load on real browsers; creator/community publishing if desired; production integrations where explicitly required; and measured independent usability and accessibility evidence.

The current work establishes the **first complete native starter and connected workflow layer**. It does not silently convert 100 concept spec entries into 100 released React Native apps.
