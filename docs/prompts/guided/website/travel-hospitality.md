# Website Design Blueprint · Travel / hotel booking

**Design track:** WEBSITE ONLY · **Group:** Commerce · **Audience:** Travelers weighing destinations, rooms and dates

**The actual visitor job:** Understand rooms, total cost, location and change policy.

## The product-specific design thesis

A calm travel decision board with honest date and cost context. This is creative direction, not a copied website or universal high-conversion template.

**Example concept:** build a sample travel / hotel booking for a clearly hypothetical product. Mark all mock content *illustrative*. Never invent customer quotes, data, certification, logos, teammates, transaction results or published app screenshots.

## Exactly which sections, in which order, and WHY

1. **Header and navigation** (`navigation`): Help users reach the right page without guessing. **Placement reason:** Orient users before the next decision. [Use the standalone section prompt](../../website/sections/navigation.md).
2. **Hero section** (`hero`): Say what this product does, for whom, and why this specific product exists. **Placement reason:** Answer the main arrival question immediately. [Use the standalone section prompt](../../website/sections/hero.md).
3. **Visual gallery** (`gallery`): Show authored media without overwhelming browse and download. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/gallery.md).
4. **Commerce product detail** (`product-detail`): Answer fit, delivery, variants and trust questions. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/product-detail.md).
5. **Comparison table** (`comparison`): Help visitor choose fairly between realistic options. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/comparison.md).
6. **Frequently asked questions** (`faq`): Remove concrete friction and objections before signup. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/faq.md).
7. **Website checkout** (`checkout`): Make the transaction secure, transparent and reversible. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/checkout.md).
8. **Footer and global utility** (`footer`): Make site closure, policy and secondary navigation reliable. **Placement reason:** End with trustworthy secondary destinations and required information. [Use the standalone section prompt](../../website/sections/footer.md).

**What NOT to include by default:** empty client logo walls, stock testimonials, fake metrics, generic AI chat, autoplay audio, effects competing with content, gratuitous repeated card sections.

## 3 design directions to compare before implementation

A. **Editorial-first:** make content/typography the main evidence. Original asymmetry, credible copy, strong scan hierarchy, restrained 2D motion.
B. **Demonstration-first:** foreground the real product/task (screenshots or functional demo), with concrete outcome and operational detail.
C. **Domain-structural:** derive composition from understand rooms, total cost, location and change policy, not a generic template. Show an alternate information architecture with useful navigation.

Show ASCII wireframes for desktop/tablet/mobile; compare hierarchy, information density, accessibility, asset licensing, implementation cost and time-to-task. Choose based on the user's job, not the prettiest gradient.

## Use optional AI / 3D, or intentionally leave them out

**AI placement decision:** Optional itinerary helper only when it uses verified opening times and can cite details. Ask whether search, direct controls or documentation would serve visitors better. If AI truly qualifies, follow [website AI guide](../../../../guides/website/AI-INTEGRATION.md) and disclose local vs cloud, data sent, model confidence, source provenance, error/recovery and optional login.

**3D decision:** Optional 360 room tour with photo/list accessibility fallback. If included, run a user-controlled single-effect implementation with real scene benefit, accessible equivalent, performance budget, static poster and reduced-motion behavior. Use [web 3D guide](../../../../guides/website/3D-AND-MOTION.md), not an endless canvas backdrop.

## Implementation skills used

Booking UX, dates/time zones, media licensing, pricing transparency. Choose components deliberately using [the evidence / open-source register](../../../../research/EVIDENCE-ATLAS.md); check individual source license before copying. Use the existing framework, routes, backend and brand tokens.

## Research anchors and limitations

- checkout: See [source register](../../../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.
- product-page: See [source register](../../../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.
- wcag: See [source register](../../../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.

**Specific product constraints:** Live inventory only when backend confirms it. Mark sample results; disclose taxes, deposit, cancellation, accessibility.

## Complete copyable instruction to give an AI coding agent

```text
Inspect my existing website/project first. This is a Travel / hotel booking for Travelers weighing destinations, rooms and dates.
The single visitor job is: Understand rooms, total cost, location and change policy.
Art direction: A calm travel decision board with honest date and cost context.
Build in this order: navigation → hero → gallery → product-detail → comparison → faq → checkout → footer.
For every section, read its matching prompts/website/sections/{id}.md file. Treat the section list as a starting hypothesis: remove any section without real content or a user-facing purpose.
Create three structurally different art directions and choose one with rationale.
Preserve all working features, routes, backend services, consent and payment boundaries.
Live inventory only when backend confirms it. Mark sample results; disclose taxes, deposit, cancellation, accessibility.
Optional AI: Optional itinerary helper only when it uses verified opening times and can cite details
Optional 3D: Optional 360 room tour with photo/list accessibility fallback
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
