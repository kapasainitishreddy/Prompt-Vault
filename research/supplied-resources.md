# User-supplied animation and visual-reference resources

**Reviewed October 8, 2026.** Use these to discover interaction ideas, not to clone visual identities or mirror component catalogs. All Prompt-Vault-authored prompts and examples are MIT. **External source files, brand art, datasets and example assets are not relicensed by Prompt-Vault.** Licenses and copy quotas may change. Verify the precise component and dependencies at adoption time.

## Seven resources from the UI collection

| Resource | Verified role / sample | Source & current reuse status | Prompt-Vault decision |
| --- | --- | --- | --- |
| [ObsidianUI](https://www.obsidianui.dev/developers) | Open React component library, including motion/scroll/cursor and glass treatments; [GitHub](https://github.com/Atharvsinh-codez/ObsidianUI) | GitHub lists **MIT**. Third-party fonts, assets, and dependencies have separate rights. | **Permissive reference**; include a component in a downstream project only after its manifest and licenses are inspected. We do not vendor it here. |
| [Canvas UI](https://canvasui.dev/) ([ASCII Sweep](https://canvasui.dev/docs/components/ascii-sweep)) | WebGL/WebGPU canvas-powered effects and real HTML interaction; ASCII panel transition | Official site calls license **MIT + Commons Clause** and restricts reselling/redistributing components themselves, including bundles or ports. [Source license](https://github.com/DavidHDev/canvas-ui/blob/main/LICENSE.md). **Not OSI open source.** Some HTML-in-canvas features depend on experimental browser support; test actual target browsers. | **Inspiration / conditional downstream use only**. Never redistribute its components in Prompt-Vault or an open component kit. Recreate a concept independently or use a static accessible fallback. |
| [VengeanceUI](https://github.com/Ashutoshx7/VengeanceUI) | React/Tailwind/Motion component library for animated landing sections | Repository documents **MIT**. User-shared spelling `venganceui.com` was not fetchable during review; GitHub repo is the stable reference. A particular “dissolve/crawl” effect was **not** independently verified by name, so treat that as an aesthetic prompt, not a guaranteed exported component. | **Permissive reference** with actual source/asset license check. Avoid unsupported demo claims. |
| [Bencho](https://bencho.dev/) ([license](https://bencho.dev/licence)) | React interaction blocks, including Todo Tower, reorder, sliders, upload, comparison and confirmation | **Blocks/code pane MIT**, but website, name/logo, some photos, fonts and brand assets are **not** part of the MIT grant. | **Permissive block reference** only. Repo contains original prompts and demos, not copied Bencho blocks. |
| [Oneko Studio](https://oneko.dhrv.pw/studio) | Configurable pixel cursor companion; pause, hide, custom skins and reduced-motion resting state | The studio's full source/skin license **was not established**. Independent inspiration [adryd325/oneko.js](https://github.com/adryd325/oneko.js/) is **MIT**, with its own copyright notice and asset history. | Reference the studio; use independently licensed code/assets only when their exact terms are checked. Never ship unknown studio skin files as MIT. |
| [Originkit](https://www.originkit.dev/docs/components) ([terms](https://www.originkit.dev/docs/licensing)) | Animated components, sections and templates with live previews, React/Next/Vite/Framer and CLI workflows | Its **catalog license restricts** redistribution in templates, starter kits, UI kits, snippet collections, competing libraries and design assets. Downstream apps/client websites are generally permitted. The [MIT plugin code](https://github.com/vellum-ai/originkit/blob/main/LICENSE) **does not override the catalog component terms**. Browse is free; source delivery has account/plan/usage limits. | **Inspiration / downstream product use with terms only**. No copying or mirroring the catalog into this repo; no claims all components are unrestricted open source. |
| [Kombai Gallery](https://kombai.com/gallery/web/) ([mobile](https://kombai.com/gallery/mobile/)) | 20,000+ curated web/mobile designs, category reference filters and agent prompts | The gallery says browsing/using designs as inspiration is free. Per-item source/asset rights and redistribution status **must be reviewed separately**. “Available to browse” is not permission to bundle images or designs. | **Reference discovery only**. Note composition/interaction ideas and create an original design. No screenshot archives or assets embedded here. |

### Important distinction

**Open design prompts are not the same thing as an unrestricted component archive.** This public MIT repository can freely include **our own prompts, scoring methods, CSS/HTML examples and original effects**. It cannot promise that the supplied third-party sources are all free to copy, resell or distribute.

To use a *reference*: (a) inspect its actual design, (b) write a short analysis of the behavior and information hierarchy, (c) choose **at least two independent other influences**, (d) author a different composition with product-specific content, (e) check licenses before copying code/assets. Keep a provenance note for copied snippets.

## Section/effect routing hints

- **Website hero and navigation:** ObsidianUI, VengeanceUI and original editorial layout; Canvas UI only as an optional conditional effect.
- **Interactive task, comparison, form, microfeedback:** Bencho for behavior reference.
- **Playful portfolio or mascot:** Oneko Studio as a design reference; opt-in, rest on touch/reduced-motion; licensed independent sprite only.
- **Animated component exploration:** Originkit preview before choosing; follow catalog restrictions.
- **Find 2–3 genuinely different compositions:** Kombai's categorized web/mobile galleries; document only the principles, not screenshot clones.

## Standards and papers governing safe animation

- Heer & Robertson (2007), [Animated Transitions in Statistical Data Graphics](https://doi.org/10.1109/TVCG.2007.70539). Controlled studies found selected transitions can improve graphical perception for *data graphics*. **Does not imply every decorative UI animation boosts conversion or task success.**
- Thomas & Calder (2001), [Applying cartoon animation techniques to graphical user interfaces](https://doi.org/10.1145/502907.502909). Work on animation as feedback for direct manipulation; not a mandate for endless motion.
- [WCAG 2.2: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide) requires user controls for qualifying auto-start movement; respect exact conditions, including the five-second rule.
- [WCAG 2.3.3: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions) is **AAA**, not AA. Our recipes often aim beyond AA by allowing optional motion to be disabled.
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion) for web UI.
- [web.dev: high-performance CSS animations](https://web.dev/articles/animations-guide) for compositor-friendly properties and performance tradeoffs.

### Source verification notes

This inventory does **not** verify every component on every site, every claim in the reels, or every browser/device combination. Canvas UI's own marketing says "100% open source" while its actual license adds Commons Clause; the license controls distribution decisions. User-provided link labels and counts are treated as leads rather than authoritative license statements.
