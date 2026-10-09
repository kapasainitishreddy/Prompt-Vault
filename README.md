# Prompt-Vault

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
