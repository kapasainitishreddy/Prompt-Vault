# Website Design Blueprint · B2B platform / integration site

**Design track:** WEBSITE ONLY · **Group:** Product · **Audience:** Engineering evaluators and purchasing stakeholders

**The actual visitor job:** Validate integration, risk, documentation and support.

## The product-specific design thesis

A systems map with real documented capabilities. This is creative direction, not a copied website or universal high-conversion template.

**Example concept:** build a sample b2b platform / integration site for a clearly hypothetical product. Mark all mock content *illustrative*. Never invent customer quotes, data, certification, logos, teammates, transaction results or published app screenshots.

## Exactly which sections, in which order, and WHY

1. **Header and navigation** (`navigation`): Help users reach the right page without guessing. **Placement reason:** Orient users before the next decision. [Use the standalone section prompt](../../website/sections/navigation.md).
2. **Hero section** (`hero`): Say what this product does, for whom, and why this specific product exists. **Placement reason:** Answer the main arrival question immediately. [Use the standalone section prompt](../../website/sections/hero.md).
3. **Integrations** (`integrations`): Explain exactly what connects, permissions and capabilities. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/integrations.md).
4. **Documentation and technical guides** (`documentation`): Get developer to a correct implementation quickly. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/documentation.md).
5. **Interactive demo** (`interactive-demo`): Let visitors test real product behavior safely. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/interactive-demo.md).
6. **Case study** (`case-study`): Prove a meaningful result from problem to change to measured outcome. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/case-study.md).
7. **Comparison table** (`comparison`): Help visitor choose fairly between realistic options. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/comparison.md).
8. **Pricing section** (`pricing`): Make cost, scope and consequences unmistakable. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/pricing.md).
9. **Contact section** (`contact`): Provide a real path to reach the right person. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/contact.md).
10. **Footer and global utility** (`footer`): Make site closure, policy and secondary navigation reliable. **Placement reason:** End with trustworthy secondary destinations and required information. [Use the standalone section prompt](../../website/sections/footer.md).

**What NOT to include by default:** empty client logo walls, stock testimonials, fake metrics, generic AI chat, autoplay audio, effects competing with content, gratuitous repeated card sections.

## 3 design directions to compare before implementation

A. **Editorial-first:** make content/typography the main evidence. Original asymmetry, credible copy, strong scan hierarchy, restrained 2D motion.
B. **Demonstration-first:** foreground the real product/task (screenshots or functional demo), with concrete outcome and operational detail.
C. **Domain-structural:** derive composition from validate integration, risk, documentation and support, not a generic template. Show an alternate information architecture with useful navigation.

Show ASCII wireframes for desktop/tablet/mobile; compare hierarchy, information density, accessibility, asset licensing, implementation cost and time-to-task. Choose based on the user's job, not the prettiest gradient.

## Use optional AI / 3D, or intentionally leave them out

**AI placement decision:** Searchable docs assistant alongside canonical docs links and code examples. Ask whether search, direct controls or documentation would serve visitors better. If AI truly qualifies, follow [website AI guide](../../../../guides/website/AI-INTEGRATION.md) and disclose local vs cloud, data sent, model confidence, source provenance, error/recovery and optional login.

**3D decision:** Only if an interactive topology is clearer than an accessible 2D diagram. If included, run a user-controlled single-effect implementation with real scene benefit, accessible equivalent, performance budget, static poster and reduced-motion behavior. Use [web 3D guide](../../../../guides/website/3D-AND-MOTION.md), not an endless canvas backdrop.

## Implementation skills used

Technical docs, architecture explanation, accessibility, API validation. Choose components deliberately using [the evidence / open-source register](../../../../research/EVIDENCE-ATLAS.md); check individual source license before copying. Use the existing framework, routes, backend and brand tokens.

## Research anchors and limitations

- heuristics: See [source register](../../../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.
- company-about: See [source register](../../../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.
- core-web-vitals: See [source register](../../../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.

**Specific product constraints:** Separate SDK docs from marketing promises. Include runnable snippets, auth scopes and real supported providers.

## Complete copyable instruction to give an AI coding agent

```text
Inspect my existing website/project first. This is a B2B platform / integration site for Engineering evaluators and purchasing stakeholders.
The single visitor job is: Validate integration, risk, documentation and support.
Art direction: A systems map with real documented capabilities.
Build in this order: navigation → hero → integrations → documentation → interactive-demo → case-study → comparison → pricing → contact → footer.
For every section, read its matching prompts/website/sections/{id}.md file. Treat the section list as a starting hypothesis: remove any section without real content or a user-facing purpose.
Create three structurally different art directions and choose one with rationale.
Preserve all working features, routes, backend services, consent and payment boundaries.
Separate SDK docs from marketing promises. Include runnable snippets, auth scopes and real supported providers.
Optional AI: Searchable docs assistant alongside canonical docs links and code examples
Optional 3D: Only if an interactive topology is clearer than an accessible 2D diagram
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
