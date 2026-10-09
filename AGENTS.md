# Prompt-Vault agent instructions

This is a **public MIT prompt and original-code library**, not a mirror of third-party component galleries. Use the [license matrix](research/supplied-resources.md) before copying external assets/components.

## Routing
1. **Website:** use [prompts/website/LOOP.md](prompts/website/LOOP.md) for full site and [prompts/website/SECTIONS.md](prompts/website/SECTIONS.md) for a section. Website heroes, marketing copy and layouts should not be reused as an app design method.
2. **App UI/UX:** use [prompts/app/LOOP.md](prompts/app/LOOP.md) for app-wide flow and [prompts/app/FLOWS.md](prompts/app/FLOWS.md) for a specific user task. Preserve data/auth/sync/purchases and platform navigation.
3. **Animation:** use [prompts/shared/MOTION-DIRECTOR.md](prompts/shared/MOTION-DIRECTOR.md) and [prompts/motion/README.md](prompts/motion/README.md). Favor semantic state feedback and reduced-motion alternatives. A single page does not need 23 effects.
4. **Whole project:** use [prompts/shared/DESIGN-AUTOPILOT.md](prompts/shared/DESIGN-AUTOPILOT.md) to choose a subset of necessary sections and coordinate reviews.

## Invariants
- Don't label copied Canvas UI or Originkit catalog code MIT or vendor them into this repository. Treat gallery pictures and studio sprite skins as reference-only unless explicit rights verified.
- No fake proof, API integrations, payments, screenshot tests or accessibility certification. No silent paid services, GitHub Actions quotas or external model calls.
- Build and test actual behavior. Ensure primary task/CTA works for keyboard, touch and reduced motion.
- Derive a recognizable design language from real product context. Fail the logo-swap test on generic designs; reject repetitive card grids and effects without user purpose.
- Maximum **four improvement rounds** and a human-readable unresolved-issues report if proof is missing.
- Python scripts are **stdlib only**. Run tests manually with `python3 -m unittest discover -s tests -v`. Avoid adding CI automatically.

## Updating the catalog
Add matching machine catalog entry and markdown file, then update section index. Keep prompts self-contained. Add test coverage for new runner behavior. Preserve existing public names/links when possible.

## Design reference page

Maintain eight distinct original mini-studies and eight original standalone prompts at `prompts/references/`, mirrored in `docs/prompts/references/`. Catalogs: `catalog/open-source-references.json`, `docs/data/resources.json`. Frontend: `docs/resources.html`, `docs/resources.css`, `docs/resources.js`. Do not import source code, screenshots, visual identities or assets from upstream projects by default; respect license unknown/README-only cases. Keep website, app and motion categories distinct.

## New guided academy (2026)

- Only **Website** and **App** are primary tracks. Design disciplines
  including 3D, AI, animation, business research and upstream libraries
  are secondary tools inside these tracks.
- Maintain `docs/data/academy.json`, `docs/academy.html`,
  `docs/academy.js`, `docs/academy.css`,
  `research/design-academy-2026.md`, and `tests/test_academy.py`.
  Blueprint steps require placement reasons, recommended skills,
  inclusion criteria and actionable individual prompts.
- Include separate native iOS/App Store and Android/Play Store design
  and release considerations. Never imply simulated HTML screens are real
  device or store tests.
- Connect research-backed guidelines to source URLs with the finding
  *and* its limitations. Revenue benchmarks and top-grossing rankings
  must not imply causation, expected sales, or guaranteed retention.
- Distinguish hosted frontend Puter.js from on-device WebLLM and
  Transformers.js. Never claim hosted AI executes locally.
- The static academy is dependency-free and uses original specimen code.
  New assets may be MIT only if authored or legally licensed. Do not
  mirror restricted third-party UI templates or textures.
- Every new UI control must have a meaningful action. Test JS parsing,
  JSON schema/content invariants and relative links before shipping.
- Website browser screenshots and actual iOS/Android device QA must be
  reported as pending unless performed and evidenced.

## Concept Field Guide v2: source and contribution contract (October 2026)

- Keep exactly two primary design tracks: `website` and `app`.
  Add independent concept content to `docs/data/concepts-web.json` or
  `docs/data/concepts-app.json`, never an uncontrolled third track.
- Each concept has a unique ID, title, family, user purpose, explicit
  `useWhen` and `avoidWhen`, a safe original `preview` variant,
  cited `sources` by ID, suggested `skills`, `successSignal`,
  `accessibility`, and `recovery` requirements.
- Sources live in `docs/data/deep-research.json` and must describe
  what a finding informs AND what it cannot prove. Do not cite a
  research paper to justify a made-up conversion or revenue number.
  Researcher or author credit, DOI, platform rule and experiment
  applicability must be validated.
- New upstream references live in `docs/data/deep-resources.json`.
  Always keep licenseStatus: restricted/verified-permissive/reference/
  unverified. Unknown/source-visible does not imply MIT, Commons-Clause
  and tldraw SDK are NOT free to commercialize as a component catalog.
  Avoid vendoring third-party illustrations, models, screenshots,
  source files, logos or copyrighted reference text.
- Update `catalog/CONCEPT-INDEX.md` with descriptions and sources.
  Preserve the source-linked, reference-only distinction in
  `research/concept-field-guide.md`. New patterns should add unique
  insight rather than duplicate existing concepts.
- The original field-guide UI comprises `docs/concepts.html`,
  `docs/concepts.css` and `docs/concepts.js`. It must run with a
  local static HTTP server without paid services. Its HTML/CSS specimen
  variants are illustrative, not independent full sites/native apps.
  Their normal/success/error states must never imply real purchases,
  booked services, AI model inference or saved remote data.
- On concept changes run `tests/test_concept_field_guide.py`
  and the existing test suite where possible; check JS syntax,
  source link integrity, responsive/keyboard interactions and
  reductions in motion. Never claim physical device or browser
  testing without execution evidence.
