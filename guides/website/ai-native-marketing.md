# Website Design Blueprint · AI-first product website

**Design track:** WEBSITE ONLY · **Group:** Product · **Audience:** People evaluating an assistant, creator or AI workflow

**The actual visitor job:** Understand data use, what AI can do, reliability and pricing.

## The product-specific design thesis

A transparent capability demonstrator, not magic chat bubbles. This is creative direction, not a copied website or universal high-conversion template.

**Example concept:** build a sample ai-first product website for a clearly hypothetical product. Mark all mock content *illustrative*. Never invent customer quotes, data, certification, logos, teammates, transaction results or published app screenshots.

## Exactly which sections, in which order, and WHY

1. **Header and navigation** (`navigation`): Help users reach the right page without guessing. **Placement reason:** Orient users before the next decision. [Use the standalone section prompt](../../prompts/website/sections/navigation.md).
2. **Hero section** (`hero`): Say what this product does, for whom, and why this specific product exists. **Placement reason:** Answer the main arrival question immediately. [Use the standalone section prompt](../../prompts/website/sections/hero.md).
3. **Interactive demo** (`interactive-demo`): Let visitors test real product behavior safely. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../prompts/website/sections/interactive-demo.md).
4. **How it works** (`how-it-works`): Explain sequence in fewer steps with no hidden prerequisites. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../prompts/website/sections/how-it-works.md).
5. **Features section** (`features`): Explain benefits with concrete capabilities not generic marketing. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../prompts/website/sections/features.md).
6. **Pricing section** (`pricing`): Make cost, scope and consequences unmistakable. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../prompts/website/sections/pricing.md).
7. **Frequently asked questions** (`faq`): Remove concrete friction and objections before signup. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../prompts/website/sections/faq.md).
8. **Contact section** (`contact`): Provide a real path to reach the right person. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../prompts/website/sections/contact.md).
9. **Footer and global utility** (`footer`): Make site closure, policy and secondary navigation reliable. **Placement reason:** End with trustworthy secondary destinations and required information. [Use the standalone section prompt](../../prompts/website/sections/footer.md).

**What NOT to include by default:** empty client logo walls, stock testimonials, fake metrics, generic AI chat, autoplay audio, effects competing with content, gratuitous repeated card sections.

## 3 design directions to compare before implementation

A. **Editorial-first:** make content/typography the main evidence. Original asymmetry, credible copy, strong scan hierarchy, restrained 2D motion.
B. **Demonstration-first:** foreground the real product/task (screenshots or functional demo), with concrete outcome and operational detail.
C. **Domain-structural:** derive composition from understand data use, what ai can do, reliability and pricing, not a generic template. Show an alternate information architecture with useful navigation.

Show ASCII wireframes for desktop/tablet/mobile; compare hierarchy, information density, accessibility, asset licensing, implementation cost and time-to-task. Choose based on the user's job, not the prettiest gradient.

## Use optional AI / 3D, or intentionally leave them out

**AI placement decision:** Core feature only when validated; model limitations, sources, permissions and user approval visible. Ask whether search, direct controls or documentation would serve visitors better. If AI truly qualifies, follow [website AI guide](AI-INTEGRATION.md) and disclose local vs cloud, data sent, model confidence, source provenance, error/recovery and optional login.

**3D decision:** No unless AI product creates/manipulates real spatial assets. If included, run a user-controlled single-effect implementation with real scene benefit, accessible equivalent, performance budget, static poster and reduced-motion behavior. Use [web 3D guide](3D-AND-MOTION.md), not an endless canvas backdrop.

## Implementation skills used

AI UX, prompt UX, consent, source-backed output, evaluation. Choose components deliberately using [the evidence / open-source register](../../research/EVIDENCE-ATLAS.md); check individual source license before copying. Use the existing framework, routes, backend and brand tokens.

## Research anchors and limitations

- ai-bots: See [source register](../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.
- ai-not-always: See [source register](../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.
- puter: See [source register](../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.
- webllm: See [source register](../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.

**Specific product constraints:** Show honest local/cloud route, trial/account requirements, model uncertainty, failure recovery and safety boundaries.

## Complete copyable instruction to give an AI coding agent

```text
Inspect my existing website/project first. This is a AI-first product website for People evaluating an assistant, creator or AI workflow.
The single visitor job is: Understand data use, what AI can do, reliability and pricing.
Art direction: A transparent capability demonstrator, not magic chat bubbles.
Build in this order: navigation → hero → interactive-demo → how-it-works → features → pricing → faq → contact → footer.
For every section, read its matching prompts/website/sections/{id}.md file. Treat the section list as a starting hypothesis: remove any section without real content or a user-facing purpose.
Create three structurally different art directions and choose one with rationale.
Preserve all working features, routes, backend services, consent and payment boundaries.
Show honest local/cloud route, trial/account requirements, model uncertainty, failure recovery and safety boundaries.
Optional AI: Core feature only when validated; model limitations, sources, permissions and user approval visible
Optional 3D: No unless AI product creates/manipulates real spatial assets
Use actual source links in this blueprint. Provide real content provenance.
Implement semantic navigation, authentic copy, 360px through 1440px reflow, focus, keyboard, screen reader names, reduced motion, clear errors, meaningful first CTA.
Render and test actual user task, negative path, screenshots and field performance if available. Never invent results.
Run separate visual-identity and task-success critics. Fix top 2–3 defects and retest, four rounds maximum. Stop on evidenced passing gates or list exact unverified blockers.
```

## Evidence-first QA before publishing

- Can a target visitor understand the product/creator and find a relevant example without special effects?
- Does the intended primary action work and preserve data/permissions?
- Is each section supported by real content? Unknown proof should be omitted, not invented.
- Does the identity survive a logo swap, or is it just a rearranged generic SaaS template?
- At 360/390/768/1440px, zoom 200%, keyboard-only and reduced motion: no hidden key content or broken controls.
- If AI or 3D: test unsupported browser, offline, reduced-motion, slow device, model download failure, missing 3D data and safe dismissal.
- Stop at four documented rounds; screenshots and device tests **unverified** unless actually run.
