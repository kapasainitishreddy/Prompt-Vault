# Atlas guided tours + FAQs: source, privacy, QA

Date: October 9, 2026

## Dependency and attribution

- Open-source library: [Driver.js](https://github.com/nilbuild/driver.js).
- Package/API documentation: https://driverjs.com/docs/basic-usage and https://driverjs.com/docs/configuration.
- Version pinned: `1.9.0`, distributed from `https://cdn.jsdelivr.net/npm/driver.js@1.9.0/dist/`.
- License: MIT, Copyright © Kamran Ahmed. Library source remains upstream and is dynamically loaded after a user explicitly clicks `Show me around`. Atlas's own tour steps and CSS are original and do not redistribute upstream source code.
- These tours add no Atlas paid account, AI model call, tracking event, permanent flag or external API key.

## Purpose and scope

Tours highlight existing interface features on the current page, with plain-language steps.
Page-specific scripts cover:
- Homepage: what Atlas is, visible preview teasers, beginner path, the two primary design collections, motion-film gallery, practice studio, and FAQ.
- Start Here: select a project, inspect a sample, write a one-sentence brief, copy a prompt, and continue.
- Website Atlas / App Atlas: search, open visual examples, inspect prompts, understand limitations.
- Motion Lab / Motion Library: distinguish 23 animation recipes, 5 animated tool references, a real opt-in Lenis demo, and 15 externally hosted motion films.
- Film Styles: filter, watch source-hosted clips, inspect creator/source links, learn attribution.
- Style Lab: choose web/app visual directions, study original compositions.
- FAQ: navigate categories and search answers.

Other pages use a simple general two-point explanation and expose static Beginner + FAQ links in a small, dismissible native `<details>` Help menu.

## User control and fallbacks

- Tours **never** start automatically, including on first visit, reload or navigation.
- An ordinary `<details>` panel offers Show me around, Beginner guide and FAQ.
- The upstream JS and CSS are not downloaded until the user opts in to a tour. Both must load successfully before Driver.js starts.
- If either upstream resource fails, the existing pages still work and Help shows a fallback message with links to the static guides. There is no forced navigation.
- Tour progression is page-local (not a persistent cross-page wizard), and can be replayed.
- Reduced motion disables tour animation; Escape, keyboard controls and close/back/next remain available. No tour analytics or session state are stored.
- Hidden or missing targets are skipped. The tour deliberately does not open galleries, submit forms, start media or copy prompts on the visitor's behalf.

## FAQ behavior

- `docs/faq.html` has 23 native HTML `<details>` answers in four groups: getting started, previews/building, motion, trust/privacy.
- FAQ and homepage summaries render with **no JavaScript**.
- `docs/faq.js` adds a small optional in-browser search, preserving native expand/collapse controls. Search doesn't transmit visitor text off-device.
- Answers distinguish original visual specimens from finished apps and credited, externally hosted film videos. No guarantee of performance, production readiness, accessibility certification or app-store approval is asserted.

## Manual QA to perform before citing release as fully verified

1. Open production site and click Show me around, first with normal settings and then with OS reduced motion enabled.
2. On desktop and Android/iOS, confirm buttons and spotlight popovers are within viewport, keyboard Tab/Escape navigation works, and focus returns to launch button.
3. Test tour failure with CDN unavailable or offline; fallback must not prevent native navigation.
4. On FAQ, test each category and keyword search, clear action, multiple expanded answers, and no-JavaScript.
5. Confirm all existing preview dialogs, back links, copied prompts, checkout-explanation text, motion film player and navbar work unchanged.
6. Verify pinned CDN JS/CSS response versions, browser console errors, and no mixed-content/CSP errors.

Tool-limited code inspections and simulated DOM tests are useful but not a substitute for complete browser/device testing.
