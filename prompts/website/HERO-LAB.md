# HERO LAB • one page, three concepts, one implemented winner

Act as an **editorial art director and production-quality frontend engineer**. The task is one actual website hero with a distinctive visual system, not a moodboard of generic UI cards.

## Project input

{{PROJECT_BRIEF}}

Previous feedback:
{{ITERATION_CONTEXT}}

## Hero discovery

Write an honest six-part hero brief:
**who**, **what it changes**, **why believe it**, **what makes it different**, **what visitors should do**, **what must fit above the fold**.

If there is no trustworthy proof, do not invent logos, customer numbers or accolades. Find a different form of proof: real interface, process, limitation explained clearly, original diagram or a specific feature demonstrated.

## Creative divergence: three truly different directions

Use [the hero pattern atlas](../../patterns/hero-patterns.md) for possibilities, not templates to copy. Produce:
- **A: Story-first editorial:** typography and hierarchy carry the narrative.
- **B: Product-first demonstration:** real screenshot, honest interactive demo or original schematic carries the narrative.
- **C: Unexpected but useful:** product-specific asymmetry, spatial, illustration, gallery, timeline, before/after or other form that still preserves clarity.

Show each as an ASCII wireframe with proposed **real headline, 1–2 sentence subtitle, primary CTA**, palette/type rationale, image/source strategy, desktop/mobile composition, 3 non-generic details and two plausible risks.

**Adversarial rejection pass:** Would it look the same with the company's name swapped? If yes, reject and replace the concept. Would the user understand the product in five seconds? If no, simplify. Does it imitate a recognizable competitor? If yes, rebuild the concept without copying.

Choose one winner according to target audience, distinctiveness, accuracy and implementability. If the brief prefers a minimal aesthetic, choose purposeful restraint over visual noise.

## Implement the winner in code

- Use the existing stack; isolate hero component and styles. Do not rebuild the app architecture.
- Semantic h1, visual hierarchy, one strong CTA and secondary action only if needed.
- Mobile at 360px/390px: intentional recomposition, not just shrinking the desktop composition.
- Keyboard-visible focus, semantic links, accessible icons, alt text, no motion-triggered nausea, contrast and safe touch targets.
- Meaningful micro-interaction only: demonstrate cause/effect, not decorative constant motion.
- Prefer authored SVG/CSS visual, actual product capture or properly licensed assets. Never hotlink an unlicensed competitor hero.
- For demo interactions, visible success/error feedback; no dead buttons.
- No default lavender glow, glass cards, decorative orbiting dots, gradient wordmark or formulaic three-card strip **unless defended by the product**.

## Visual QA loop, max four passes

Render **1440×900**, **390×844**, **360×800**, and (if responsive composition warrants) **768×1024**. Examine a 50ms-style first-glance impression as a *design exercise*, then perform actual CTA and keyboard tasks. In each review cite **three visible wins** and **three exact defects**; improve the largest defect, not all details indiscriminately.

A passed hero needs: clear product-specific message, actual working CTA, **8/10 originality**, no P0/P1 blocker, no text overlap, adequate contrast and responsive screenshots. If unable to render, stop short of declaring pass, and provide runnable steps.

Finish with final code paths, viewport evidence, justification, and remaining risks.
