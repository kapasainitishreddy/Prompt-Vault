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
