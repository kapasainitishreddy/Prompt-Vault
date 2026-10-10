## Production browser verification, October 10, 2026 UTC

The October 9 visual overhaul shipped to Cloudflare Pages in main commit `ef07816f4b88d753566758aaa2e32dac824c7ed0`; the ergonomic touch-target follow-up shipped in `2ad1342871cf939a20bb2def5ee651d6389b79dd`. Cloudflare confirmed successful production build and deployment for the latest commit.

The following checks were **actually executed on the deployed Cloudflare Pages origin** in Chromium via Cloudflare Browser Rendering, with script-instrumented DOM and interface interactions:

- Homepage: 6 of 6 curated design links rendered real original artboards and pointed to valid style-selection paths; desktop (1440px) had no horizontal overflow.
- Remix Studio: its page rendered 12 initial cards and all 3 curated hero scenes without loading placeholders.
- Visual-gallery interactions: selected and examined **all 48** styles at 390px mobile and again at 1440px desktop. Each had a nonempty rendered scene and a copied-prompt composer including the exact layout contract; zero errors and no horizontal overflow in those runs.
- Full-size preview: selecting the aviation-inspired mobile style opened and closed the preview dialog, displayed the matching phone artboard and returned to the project brief.
- Existing-project safeguard: a real browser-generated prompt included the literal preservation instruction **KEEP AUTH AND CHECKOUT INTACT** and a style-specific airport-board layout description (5,290 characters in the instrumented test).
- Responsive/touch smoke: no horizontal overflow at 360, 390, 768 or 1440px in the exercised views. At 360px, the 11 relevant visible filter, variant, preview and header controls all met the 44px height threshold. A large mobile preview dialog also opened correctly at 768px.
- The copy callback was exercised using an instrumented browser clipboard object and its payload matched the editable prompt exactly; the Markdown export handler produced a `.md` filename using an instrumented anchor click. The audit-prompt toggle and preservation text also passed. **These handler checks are not a successful clipboard-permission check or a confirmed disk download on a user's physical device.**
- A headless Chromium capture showed the mobile hero and the first gallery row. Preview artwork was inspected, but no screenshot artifact is bundled in this repository.

**Remaining independent release gates:** a full local Playwright smoke-run with persisted screenshots, measured Core Web Vitals, formal accessibility/assistive-technology audit, native TypeScript/Expo builds and physical Android/iOS tests, cross-browser user testing, and applying an exported prompt against a real customer's project. None are represented as passing here. Do not use a marketing claim of “10/10” until independent usability and device evidence exists.

## October 9, 2026: original art-direction quality pass

**Implemented:** 48 original purpose-built browser scene renderers (24 websites/24 mobile), source-linked style rationale, precisely specified design composition in each build prompt, a full-size preview inspector, category-appropriate discovery chips and six highlighted home designs. All existing 200 UX concepts, guided journeys, native-kit source, site sections and build/audit prompt handoffs remain intact.

**Measured at source level in this change:** 288 unique markup outputs parsed (48 × gallery/full × 3 variants); all 48 style-to-scene and style-to-prompt mappings present; 3 homepage hero artboards rendered; 12 initial card results for website and app, and editable prompt output in both modes; modal open/close and selected preview. No missing selected-page IDs found.

**Not measured here:** visual regression screenshots in real Chromium at 360/390/768/1440, voiceover/TalkBack, real Expo compile, user-centered task completion, Chrome performance metrics, Cloudflare browser-rendering screenshot fidelity, and true storefront/mobile release readiness. The repository includes an optional real Playwright QA script, but source inspections alone do not mean that script has executed.

**Release standard:** inspect the actual deployed Remix Studio and homepage, validate all 48 style links and every copy/download action, check visually that each artboard remains distinctive and usable at phone and desktop width, and run a moderated novice-user test of finding a design and successfully applying the prompt to an existing project. File a defect or revert a regression rather than labelling unresolved problems "10/10".

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
| Signature design studio | 16 independent editorial web studies + 16 matching Expo compositions | IDs, journey mappings, and source-copy parity checked | Real web render, physical device polish, feedback from novice and advanced users |
| Copyable native source | Website buttons copy same-origin full TSX source and design tokens | Source mirrors checked in tests | Actual clipboard permission and paste-to-project install test |
| Build-plan composer | Browser-only deterministic template | Reads 20 source-linked journeys | Human review of generated briefs |
| MCP server | 7 read-only catalog tools | APIs match MCP SDK v2 signatures in public docs | npm install, run MCP inspector, invoke tools from a host |
| Existing 32 website section prompts | Preserved and MCP-searchable | Source catalog mapped | Independent website UX and browser QA |
| Landing-page navigation and newcomer path | Linked from multiple pages | Source links present | Verify production deploy resolves all routes |

## Build and smoke test

The website ships as static files under docs/. Serve it with:

    python3 -m http.server 8000

From a browser, open http://localhost:8000/docs/mobile-studio.html. Check: visible fallback before JS, 20 journeys rendered, all 32 flow patterns found, search, step navigation, input interactions, copy prompt, project brief, dark theme, iOS/Android frame, success/error, keyboard navigation and 360/390/768/1440px layouts. Test fresh load and direct links, screen readers and reduced motion.

The additional scripted Chromium smoke suite is `python3 scripts/qa_mobile_studio.py`. This requires `pip install playwright` and `playwright install chromium`; it writes screenshots and a report to `.qa-artifacts/mobile-studio/` and does not use GitHub Actions. **It is not proof of passing until actually run.**

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
