# Four agent-design research repositories

Reviewed October 8–9, 2026. **These are external sources, not copied code, prompts or assets included in Prompt-Vault.** Prompts, UI studies and recipe texts produced inside Prompt-Vault remain originally authored and MIT licensed. Respect any upstream source notices and third-party license terms before reusing exact files.

## 1 · [Emil Kowalski's Skills](https://github.com/emilkowalski/skills)

**Actual repo license: MIT** (copyright Emil Kowalski 2026, retain notice if copying). Focused skills include `animate`, `animate-expo`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `animation-vocabulary`, `break-ui`, `prototype`, `pick-ui-library`, `mobile-native` and others.

**Takeaways for Prompt-Vault:** motion selection before motion implementation; choose entrance easing based on behavior; consider interruption/exit as first-class; respect native UI thread in React Native; test worst-case data and screen sizes; inspect component/library maturity before installation. Treat skill guidance as engineering opinions to validate, not empirical accessibility certification.

Original adaptations here: [Motion Judgment](../prompts/skills/motion-judgment.md), [Native Gesture and Motion](../prompts/skills/expo-motion.md), [Three-Direction Prototype](../prompts/skills/variant-studio.md), [Worst-Case UI Breaker](../prompts/skills/stress-test-interface.md), [Primitive Selector](../prompts/skills/component-choice.md).

## 2 · [UI Prompt Explorer](https://github.com/zhangchenchen/UIPromptExplorer)

Its `src/data/themes.ts` currently lists **eight** whimsical, sketch-inspired themes (gallery, dashboard, creative planner, portfolio, notebook, blog, commerce and chat), represented through detailed prompts and previews.

**IMPORTANT LICENSE DISCREPANCY:** The README ends with an **MIT** claim, but the repository's actual [LICENSE file](https://github.com/zhangchenchen/UIPromptExplorer/blob/main/LICENSE) contains the **Apache License 2.0**. For any copied source, follow **Apache-2.0 requirements** unless the author clarifies in writing; don't relabel copied material as MIT. Apache-2.0 may require copyright/license notices and handling changes/NOTICE files. Also review assets, photos, imported theme imagery and dependencies separately.

**Takeaways:** visual-theme discovery can be playful without sacrificing tasks. Sketch textures belong in nonsemantic layers. Use real text, mobile behavior and reduced motion rather than piling on doodles or page flips. Prompt-Vault authors **original** illustration-inspired variants but does **not** mirror any of those eight themes.

Original adaptations: [Illustrated Interaction](../prompts/skills/sketch-language.md), [Visual Theme Remix](../prompts/skills/style-remix.md), [Tactile Metaphor Audit](../prompts/skills/skeuomorphism-purpose.md).

## 3 · [UI UX Pro Max Skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

**Repo LICENSE: MIT** (copyright Next Level Builder, retain notice if copying). Its [catalog summary](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/src/ui-ux-pro-max/data/catalog-summary.json), marked verified August 26, 2026, reports **79 searchable styles**, **192 products/categories**, **192 palettes**, **74 font pairings**, and UX/motion/stack tables. These are the author's dataset counts, not counts of assets in Prompt-Vault.

**Takeaways:** sector/job fit before palette choice, systematic tokens and fallback type, accessibility checks, multiple design patterns, and an evidence-first design-system report. Avoid assuming every palette or Google font is automatically redistributable: check the exact family and its individual license (the source also provides font license metadata).

Original adaptations: [Industry and Audience Fit](../prompts/skills/industry-fit.md), [Tokens and Typography](../prompts/skills/tokens-and-type.md), [UX Pattern Reasoning](../prompts/skills/ux-pattern-match.md), [Design System QA](../prompts/skills/design-system-review.md).

## 4 · [Claude Design Skillstack](https://github.com/freshtechbro/claudedesignskills)

**Repo LICENSE: MIT** (copyright Claude Skills Project 2025, retain notice if copying). Readme advertises **22 individual technology plugins plus five bundles**, focusing on Three.js, GSAP/ScrollTrigger, R3F, Babylon, PixiJS, Lottie/Rive, Spline and other web animation technologies.

**Takeaways:** only introduce a heavy renderer when the content justifies it. Select the least complex capable layer: semantic HTML/CSS > SVG or Web Animations > 2D Canvas > 3D/WebGL. Test low-end GPUs, motion reduction, pointer/keyboard equivalents, loading/fallback and context loss. **The skill repository being MIT does not automatically grant rights to third-party engine packages, libraries, proprietary Spline/Rive assets, fonts or licensed 3D models.** Avoid installing the complete bundles by default.

Original adaptations: [3D and WebGL Viability](../prompts/skills/webgl-budget.md), [Scroll Story](../prompts/skills/scroll-story.md), [Shader Performance](../prompts/skills/shader-performance.md), [Animated Illustration](../prompts/skills/animated-illustrations.md).

## A useful sequence, not a kitchen sink

1. **Research** product job and real audience. Think of sector recommendations as hypotheses, not visual commandments.
2. **Explore** three meaningfully distinct original visual structures; adapt visual personality without copying a gallery's protected assets.
3. **Build** accessible interactions with existing primitives, then choose the minimal necessary motion.
4. **Stress-test** pathological real data, touch, keyboard, focus, RTL, text expansion, offline/error and reduce-motion behavior.
5. **Review** actual rendered screenshots plus tasks; fail on broken interactions, data loss or fake proof.
6. **Iterate** a maximum of four passes and publish unresolved concerns honestly.

All 16 skill recipe prompts are original in [prompts/skills](../prompts/skills/README.md). Their names describe our **adaptations**, not the original upstream skill files. They make no claim that we have installed, invoked or redistributed each original upstream skill. These concepts complement the [48 original visual language prompts](../prompts/styles/README.md), plus the 87 existing website/app/motion patterns.

## Citations and standards

- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) for baseline accessibility and motion-related requirements.
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion).
- [Heer & Robertson 2007](https://doi.org/10.1109/TVCG.2007.70539) for animation effects in statistical graphics, **not a blanket claim about marketing animation**.
- [Research evidence map](evidence.md) for first impressions, usability, and validated vs subjective design heuristics.
