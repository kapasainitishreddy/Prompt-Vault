## New visitor experience (October 9, 2026)

**Start Here:** [docs/start-here.html](docs/start-here.html) shows first-time users what websites, app screens, and build prompts mean, with visible real HTML/CSS previews and a local prompt builder. There are no account or model API requirements.

**Motion Library:** [docs/motion-library.html](docs/motion-library.html) adds original interactive concept previews for Motion, GSAP, Locomotive Scroll v5, React Bits and Three.js, with upstream source links and license-aware prompts. This is a source-linked educational guide, **not** a redistribution of third-party components. The separate [Lenis lesson](docs/lenis-scroll.html) provides an opt-in live Lenis comparison.

**Website previews:** [docs/websites.html](docs/websites.html) offers 32 original section studies. [docs/concepts.html#previews](docs/concepts.html#previews) has a searchable 100-website/100-app illustrative preview gallery. Miniatures are not whole commercial websites. The homepage now embeds a few visible CSS previews that do not depend on gallery JavaScript.

# Prompt-Vault

## Visual previews are now directly browsable (October 9, 2026)

**[Open the visual gallery](docs/concepts.html#previews)**, not just the text-only index.

- 200 concept-specific **illustrative thumbnails**, 100 Website + 100 App, covering 35 supported preview categories with shared original HTML/CSS renderers. Each entry shows a miniature layout in a searchable, paginated gallery, with art direction informed by its task and concept ID.
- Click a thumbnail to open its **larger interactive specimen**, where you can switch desktop/tablet/phone viewport, Focused/Editorial/Dense composition, and Normal/Success/Error states.
- Each concept retains when to use it, when to avoid it, original research/source limitations, required skills, and complete Design/Implement/Audit prompts.
- This is an honest visual reference library, not 200 production applications, 200 captured real-world websites, actual AI integrations, or App Store simulator screenshots. Preview scenes are independent authored HTML/CSS and do not copy third-party catalog assets.
- No paid dependencies, remote model calls or GitHub Actions added. The existing 32+32 pattern atlas, 40 guided blueprints, and site styles are preserved.


## New: 100 worked design lessons and optional support

**[Practice Studio](docs/studio.html)** · **[Sponsor/support](docs/support.html)** · **[Learning/QA notes](docs/LEARNING-STUDIO.md)**

An additional **100 original plain-English lessons**, with **60 app-first** (iOS/Android) and **40 website** lessons across 20 topics. Each explains the right placement, a real-world scenario, what to avoid, test questions, skills and source limitations. A working original demonstration accompanies each lesson, using 15 interaction-model families, and produces copyable Build/Design/Audit prompts and Markdown export. These are generated study prompts, **not 100 new native apps or 100 full site templates**.

The support page reserves a verified Buy Me a Coffee slot and user-consent-triggered sponsorship video with transcript. Default configuration has **no payment link, no named sponsor, no external video or autoplay** until actually provided/approved; reading stays free.

Local tests: 4 Python checks and 3 Node sponsorship guards passed. Chromium 144 DOM QA with inlined local assets exercised 100 lesson views, 16 interaction scenarios, 20 topic families across four viewport sizes (1440/768/390/360), navigation, prompt export and disabled sponsors with **zero page errors**. This is *not* a successful hosted-origin, native device, WCAG or app-store certification.


## New: 40 complete guided website and app design blueprints

**[Guided Design Atlas with interactive previews](docs/guided.html)** · [20 website architectures](guides/website/README.md) · [20 iOS/Android app journeys](guides/app/README.md) · [37 annotated research sources and 28 open-source ingredients](research/EVIDENCE-ATLAS.md).

This brings the catalog to **199 standalone Markdown prompts** and **183 original illustrative studies** (excluding 200 extra focused concept specifications). It adds **40 full Markdown design/build prompts**, complete ordered screen/section plans, source-linked justification, skills, three art directions, honest AI/3D choices and bounded implementation/testing instructions. They are original interactive HTML/CSS **illustrations**, not 40 deployed websites or native binaries.

- **Websites**: portfolio, corporate, SaaS, ecommerce, docs, publishing, education, agency, nonprofit, event, travel, subdomains and more. [AI integration](guides/website/AI-INTEGRATION.md), [3D/motion](guides/website/3D-AND-MOTION.md), [domain/subdomain architecture](guides/website/DOMAIN-ARCHITECTURE.md).
- **Apps**: 20 category journeys, with separate Apple App Store and Google Play logic, state/recovery, privacy and accessibility. [Native AI](guides/app/AI-INTEGRATION.md), [native motion/3D](guides/app/MOTION-AND-3D.md), [store release](guides/app/STORE-RELEASE.md), [retention and revenue research](guides/app/REVENUE-AND-RETENTION.md), [UX flow/state model](guides/app/UX-PATTERNS.md).
- **AI is not mandatory**. Puter.js is **cloud user-pays** while WebLLM / Transformers.js can run eligible models locally in browser subject to hardware and model licensing. No paid infrastructure added.
- **3D is opt-in** and must have static poster/accessible equivalent, reduced-motion and measurable performance.
- RevenueCat/Sensor Tower figures are observational industry context, never a recipe for guaranteed app revenue. No external vendor component assets copied into this MIT repository.


## NEW: Deep Research Concept Field Guide (October 2026)

**[Explore all 200 new concepts and previews](docs/concepts.html)** · [Website + App concept index](catalog/CONCEPT-INDEX.md) · [Research and decision handbook](research/concept-field-guide.md)

The current Atlas now has two layers: the **30 complete Website/App archetype blueprints** from the original Academy, and **200 additional detailed design concepts** (100 website and 100 app, organized into 20 families). These are complements, not 230 separate complete app builds. The two primary tracks remain Website Design and App Design.

- Every concept explains its user job, when it is appropriate, when **not** to use it, suggested skills, an evaluation question, accessibility/recovery concerns, and specific linked research.
- **50 additional annotated research records**, including **12 peer-reviewed HCI papers**, plus normative W3C, Apple, Android, GOV.UK, USWDS, Google PAIR and OWASP material. Source limitations are explicit; these are not guaranteed conversion tactics.
- **62 additional public source-code references**, giving **123 unique upstream URLs** when combined with the 63 Academy references. UI, agentic AI, rich text, diagrams, native mobile, data grids, motion and QA. Some are proprietary/restricted source-available tools. React Bits and tldraw are specifically flagged for non-permissive uses. **No upstream components were vendored into MIT code.**
- An original [interactive design field guide](docs/concepts.html): search/sort by concept family and task terms, bookmark, deep-link; inspect design reasoning; copy tailored **Design**, **Implement** and **Audit** prompts; view illustrative HTML/CSS previews at desktop/tablet/phone sizes, three compositions, and normal/success/error states.
- The previews share original renderer families for related concepts. They are **not 200 separately functioning production templates or App Store/Play Store apps**. Live service calls, billing, AI inference and accessibility certification are not simulated as completed.
- Static assets only; no required npm install, database, model provider, paid deployment or GitHub Actions. The existing Atlas and Academy remain fully accessible.

**Local:** `python3 -m http.server 8000` then open `http://localhost:8000/docs/concepts.html`.

**Test:** `python3 -m unittest discover -s tests -v`. The new stdlib suite is `tests/test_concept_field_guide.py`; real browser/assistive tech and native-device QA must be conducted separately. Do not mistake tests authored or source checks for proof of production behavior.

## New: research-backed Website + App Design Academy (October 2026)

**[Open the guided Design Academy](docs/academy.html)** | **[Read the evidence handbook](research/design-academy-2026.md)**

The product now has **two main design tracks**: **Website Design** and **App Design (iOS/App Store + Android/Google Play)**. Motion, 3D, AI integrations, skills and open-source resources are optional supporting toolkits, not additional primary product tracks.

- **16 website archetypes**, including portfolio, company, SaaS, ecommerce, product detail, publishing, docs, services, B2B pricing, and app-specific subdomain sites. Each has a thoughtful order of sections.
- **14 app journeys**, including productivity, knowledge, wellbeing, learning, shopping, finance, social, AI, media, travel, reading, business and entertainment. Separate native platform guidance.
- **220 granular placement decisions and copy-ready section/screen prompts** across the 30 archetypes. Every archetype also composes complete **Design**, **Build**, and **Audit** prompts.
- **30 scoped research sources**, including Apple and Android guidelines, W3C, NN/g, Baymard, scientific UX papers, Google web.dev, Sensor Tower, and RevenueCat State of Subscription Apps 2026.
- **63 upstream reference repositories** across UI, mobile, motion, 3D, AI and testing. Filter by category; verify licenses before reuse.
- **Eight RevenueCat/Sensor Tower market signals**, with limitations and three top 2025 worldwide non-game IAP app examples (TikTok, Google One, ChatGPT). Rankings and observational benchmarks are *not* evidence that a UI design caused revenue.
- **Original interactive HTML/CSS previews** for every archetype's ordered steps. Switch desktop/tablet/mobile; advance the stage; compare iOS/Android concepts. These are illustrations, not production applications or certified tests.
- No required paid API or Actions runner. Original code and content remain MIT; external sources do not inherit that license.

**Use locally:** `python3 -m http.server 8000` from repository root, then open `http://localhost:8000/docs/academy.html`.

**Validation boundary:** static catalog, markup, JS syntax and source consistency checks are in `tests/test_academy.py`. Live browser, native device, accessibility and paid integration verification require independent execution; the academy must not claim these were tested without evidence.


## Interactive Atlas website

## Eight open-source references with original interactive previews

Explore the [Open-source Library](docs/resources.html) for **eight independent interactive HTML/CSS studies**, source links, precise license caveats and a full prompt for each: [UI Promptly](https://github.com/dotHP-harshu/ui-promptly), [Superdesign Prompts](https://github.com/superdesigndev/superdesign-prompts), [Motion Primitives](https://github.com/ibelick/motion-primitives), [Uiverse Galaxy](https://github.com/uiverse-io/galaxy), [Magic UI](https://github.com/magicuidesign/magicui), [Origin UI](https://github.com/shadcn/originui), [React Native Reusables](https://github.com/founded-labs/react-native-reusables), [gluestack-ui](https://github.com/gluestack/gluestack-ui).

The expanded Atlas now has **159 original prompts** and **143 illustrative visual studies**, including the eight new reference experiments. These are not 159 completed production sites or copied upstream demos. [Full license/research notes](research/open-source-preview-resources.md). UI Promptly has no visible root license; gluestack README claims MIT but the linked root LICENSE was not present in the inspected listing. Original examples and prompts are MIT; external sources retain their separate rights.


**New:** browse every pattern through an original [eight-page interactive design atlas](docs/index.html). It includes [32 website section previews](docs/websites.html), [32 separate app UI/UX flow previews](docs/apps.html), [23 motion experiments](docs/motion.html), plus [principles/research](docs/principles.html). Each specimen opens a detailed preview with **three design directions**, explanatory interaction notes and its complete copyable Markdown prompt from the repo. Search, category filters, saved ideas, keyboard-friendly dialog and motion-reduction support are built in.

**Run it:** `python3 -m http.server 8000` from the repository root, then visit `http://localhost:8000/docs/index.html`. To host on GitHub Pages, choose branch `main` and folder `/docs` in Settings → Pages (no Actions workflow or paid extras required). [Deployment notes](docs/README.md).

The demo previews are illustrative originals, **not 87 production-ready templates or finished apps**. External copyrighted/restricted component assets are not included.

**Design Loops: research-backed, reusable prompts for websites and apps that do not look or behave like generic AI output.**

Open-source, model-agnostic, no paid API, no subscription, no required GitHub Actions. The prompts work with a human in ChatGPT, Claude, Gemini, Cursor, Codex, or a local model; a tiny standard-library Python runner can maintain a **bounded** review loop.

> **Two separate tracks:** websites/landing pages/hero sections and products/mobile/desktop application UI/UX. A marketing hero and a task-oriented app are **not** the same design problem.

## New: animation-rich prompts for every section

**32 website sections, 32 app UI/UX flows, and 23 dedicated motion recipes.** Every one is a separate, self-contained prompt: three different compositions, real states, meaningful animation options, reduced-motion fallback, anti-slop rejection tests, implementation, screenshots when available, and a four-round review limit.

| Pick your scope | Open these prompts |
| --- | --- |
| Website heroes, navbar, feature narrative, pricing, footer, blogs, shops, forms, checkout... | [Website section index](prompts/website/SECTIONS.md) |
| App onboarding, home, navigation, search, task management, offline sync, payments, accessibility, RTL... | [App flow index](prompts/app/FLOWS.md) |
| ASCII sweep, frosted glass, dissolve, task feedback, scroll storytelling, reordering, pixel cat... | [23 motion recipes](prompts/motion/README.md) |
| Motion art-direction rules and four intensity levels | [Motion Director](prompts/shared/MOTION-DIRECTOR.md) |
| Stronger no-template QA and originality auditing | [Anti-slop reviewer](prompts/shared/ANTI-SLOP-AUDIT.md) |
| How to borrow *ideas* while honoring licenses | [Reference protocol](prompts/shared/REFERENCE-PROTOCOL.md) |
| Supplied animation libraries and license restrictions | [Research and source table](research/supplied-resources.md) |
| Auto-plan a whole website or app without using every section | [Design Autopilot](prompts/shared/DESIGN-AUTOPILOT.md) |

### Generate one ready-to-paste section prompt

```bash
python3 scripts/section_prompt.py --list
python3 scripts/section_prompt.py --track website --section hero \
  --brief examples/website-brief-filled.md --intensity expressive --recipe editorial-entrance \
  --output .design-runs/website-hero.md
python3 scripts/section_prompt.py --track app --section task-management \
  --brief examples/app-brief-filled.md --intensity quiet --recipe todo-completion \
  --output .design-runs/app-tasks.md
```

### Run the evidence-based section loop

```bash
python3 scripts/design_loop.py init --track website --section hero --motion-level expressive \
  --brief examples/website-brief-filled.md --workspace .design-runs/hero-review
# Give the generated round-01/prompt.md to your coding assistant.
# Fill observed scores AND evidence_notes in round-01/scorecard.json.
python3 scripts/design_loop.py advance --workspace .design-runs/hero-review
```

Try the [original, dependency-free motion lab](examples/animated-section-lab.html) to inspect editorial transitions, real task completion, undo and a motion-off control. It contains **no** vendored visual library code.

The optional loop manager **does not call any model, take screenshots, certify accessibility, or pay for APIs**. A human/agent with real browser or device access must supply truthfully observed results.

> **Rights matter:** Canvas UI is MIT + Commons Clause; Originkit’s component catalog restricts redistribution even though its plugin repository has MIT code. Bencho blocks are MIT but site media/branding are not. Kombai designs and Oneko Studio skins need item-level asset verification. These are **references**, not contents of this MIT repository.

## Start in 60 seconds

**For a website:** copy [templates/website-brief.md](templates/website-brief.md), fill in what you know, then give it and [prompts/website/LOOP.md](prompts/website/LOOP.md) to an AI that can inspect/edit your project. For a hero only, use [prompts/website/HERO-LAB.md](prompts/website/HERO-LAB.md).

**For an app:** use [templates/app-brief.md](templates/app-brief.md) with [prompts/app/LOOP.md](prompts/app/LOOP.md), or [prompts/app/FLOW-LAB.md](prompts/app/FLOW-LAB.md) for a single complex flow.

Ask the agent to **build, render, inspect, test, critique, revise**. Do not accept "done" because the agent says so. Demand screenshots and observed task results. The default loop stops after four rounds and does not silently rewrite unrelated features.

### Optional local loop manager

Requires only Python 3.9+; no pip install:

~~~bash
python3 scripts/design_loop.py init --track website --brief templates/website-brief.md --workspace .design-runs/my-site
# Give .design-runs/my-site/round-01/prompt.md to your coding agent.
# Test what it built. Enter scores and evidence in round-01/scorecard.json.
python3 scripts/design_loop.py advance --workspace .design-runs/my-site
# Repeat using the next prompt, or read the stop reason.
python3 -m unittest discover -s tests -v
~~~

Switch `--track app` and the brief path for an application. The runner records evidence declarations, creates the next corrective prompt, stops on passed gates, and halts after the iteration budget. **It does not run a model, inspect screenshots, or pretend tests passed.** Use an agent with actual browser/device access for those steps.

## What's included

| Area | Practical output |
| --- | --- |
| [Website design loop](prompts/website/LOOP.md) | Discovery, art direction, responsive implementation, functional verification, and focused revisions |
| [Hero lab](prompts/website/HERO-LAB.md) | Three intentionally different hero concepts, story/CTA proof, and responsive tests |
| [App design loop](prompts/app/LOOP.md) | Jobs, flows, state machines, native-platform conventions, offline/keyboard and accessibility checks |
| [App flow lab](prompts/app/FLOW-LAB.md) | Deep design for one key journey, including failure, recovery, and localization |
| [Independent design critic](prompts/shared/CRITIC.md) | Evidence-first aesthetic, UX, accessibility, and originality critique |
| [Hero pattern atlas](patterns/hero-patterns.md) | Twelve compositional approaches, with suitability and failure cases |
| [App pattern atlas](patterns/app-patterns.md) | Ten functional UX patterns and their failure states |
| [Evidence & papers](research/evidence.md) | Papers, standards, what they support, and what they do **not** prove |
| [Open-source resource atlas](research/open-source-stack.md) | Verified repositories, licenses and important restrictions |
| [Scorecards](rubrics) | Weighted 0–10 dimensions, mandatory evidence, hard-stop gates |
| [Demo hero](examples/editorial-hero.html) | Standalone responsive editorial hero with working website/app preview switcher |
| [Demo app](examples/app-tally.html) | Standalone offline-first task UI specimen with filtering, validation and undo |

## The creative rule

**Be distinctive in expression; familiar in operation.** Build an identifiable visual language from the actual product, audience and content. Keep recognizable buttons, navigation, status and recovery patterns. Originality is not maximal animation, and polish is not a purple-gradient page with a dozen floating cards.

An agent must not invent client logos, quotes, performance figures, reviews, legal claims, real users, subscriptions, or working integrations. Mark mock data. Do not copy competitor trade dress or paste source code whose license has not been checked.

## Release gates

- **Website:** product clarity, typographic craft, originality, interaction quality, responsiveness, accessibility and performance.
- **App:** task completion, information flow, state coverage, platform fit, accessibility, visual craft and reliability.
- Both: score **at least 85/100**, no blocking P0/P1 issues, required evidence provided, and track-specific floors. Scores are a structured **heuristic**, **not** scientific measurements or accessibility certification.
- Max **4 iterations by default**. At budget exhaustion, return findings and remaining issues instead of looping forever.

## License and attribution

Original Prompt-Vault source, examples, and prompt text are [MIT licensed](LICENSE). Research papers, screenshots, referenced repos, fonts, and external assets retain **their own** licenses. Our MIT license does not relicense somebody else's work. See [the license table](research/open-source-stack.md) before borrowing component code.

Contributions: [CONTRIBUTING.md](CONTRIBUTING.md). Please share before/after evidence and avoid generic prompt spam.

## Four open research sources and 64 new original workflows

Use the [Style Laboratory](docs/styles.html) to explore **24 website-specific** plus **24 app-specific** original visual languages, with A/B/C compositions, editable product names and complete copyable prompts. The [Skills Workbench](docs/skills.html) provides **16** additional original agent craft prompts and a three-workflow composer. There are now **151 original prompt recipes** across the repo and **135 visual studies** (87 existing + 48 new styles), not 151 complete production templates.

The four sources are [Emil Kowalski](https://github.com/emilkowalski/skills), [UI Prompt Explorer](https://github.com/zhangchenchen/UIPromptExplorer), [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), and [Claude Design Skillstack](https://github.com/freshtechbro/claudedesignskills). See [license and research notes](research/agent-skill-resources.md). UI Prompt Explorer's repository LICENSE says Apache-2.0 although its README says MIT. Source components and assets are not copied into this MIT catalog.
