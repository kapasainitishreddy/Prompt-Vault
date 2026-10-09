# Website Design Blueprint · Marketplace / store catalog

**Design track:** WEBSITE ONLY · **Group:** Commerce · **Audience:** Shoppers filtering large inventories

**The actual visitor job:** Search, narrow, compare and navigate back without losing filters.

## The product-specific design thesis

An efficient discovery index with useful distinctions. This is creative direction, not a copied website or universal high-conversion template.

**Example concept:** build a sample marketplace / store catalog for a clearly hypothetical product. Mark all mock content *illustrative*. Never invent customer quotes, data, certification, logos, teammates, transaction results or published app screenshots.

## Exactly which sections, in which order, and WHY

1. **Header and navigation** (`navigation`): Help users reach the right page without guessing. **Placement reason:** Orient users before the next decision. [Use the standalone section prompt](../../website/sections/navigation.md).
2. **Site search and filtering** (`search`): Get users to information quickly without visual clutter. **Placement reason:** Answer the main arrival question immediately. [Use the standalone section prompt](../../website/sections/search.md).
3. **Storefront catalog** (`storefront`): Enable filtering and comparing real merchandise. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/storefront.md).
4. **Features section** (`features`): Explain benefits with concrete capabilities not generic marketing. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/features.md).
5. **Commerce product detail** (`product-detail`): Answer fit, delivery, variants and trust questions. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/product-detail.md).
6. **Frequently asked questions** (`faq`): Remove concrete friction and objections before signup. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/faq.md).
7. **Website checkout** (`checkout`): Make the transaction secure, transparent and reversible. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/checkout.md).
8. **Footer and global utility** (`footer`): Make site closure, policy and secondary navigation reliable. **Placement reason:** End with trustworthy secondary destinations and required information. [Use the standalone section prompt](../../website/sections/footer.md).

**What NOT to include by default:** empty client logo walls, stock testimonials, fake metrics, generic AI chat, autoplay audio, effects competing with content, gratuitous repeated card sections.

## 3 design directions to compare before implementation

A. **Editorial-first:** make content/typography the main evidence. Original asymmetry, credible copy, strong scan hierarchy, restrained 2D motion.
B. **Demonstration-first:** foreground the real product/task (screenshots or functional demo), with concrete outcome and operational detail.
C. **Domain-structural:** derive composition from search, narrow, compare and navigate back without losing filters, not a generic template. Show an alternate information architecture with useful navigation.

Show ASCII wireframes for desktop/tablet/mobile; compare hierarchy, information density, accessibility, asset licensing, implementation cost and time-to-task. Choose based on the user's job, not the prettiest gradient.

## Use optional AI / 3D, or intentionally leave them out

**AI placement decision:** Optional semantic search only if ordinary facets fail and results stay explainable. Ask whether search, direct controls or documentation would serve visitors better. If AI truly qualifies, follow [website AI guide](../../../../guides/website/AI-INTEGRATION.md) and disclose local vs cloud, data sent, model confidence, source provenance, error/recovery and optional login.

**3D decision:** Keep listings fast; restrict 3D to a detail page as optional progressive enhancement. If included, run a user-controlled single-effect implementation with real scene benefit, accessible equivalent, performance budget, static poster and reduced-motion behavior. Use [web 3D guide](../../../../guides/website/3D-AND-MOTION.md), not an endless canvas backdrop.

## Implementation skills used

Filter architecture, inclusive comparison, persistent navigation, cart state. Choose components deliberately using [the evidence / open-source register](../../../../research/EVIDENCE-ATLAS.md); check individual source license before copying. Use the existing framework, routes, backend and brand tokens.

## Research anchors and limitations

- catalog-ux: See [source register](../../../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.
- product-page: See [source register](../../../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.
- checkout: See [source register](../../../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.

**Specific product constraints:** Search state should persist between catalog and detail. Transparent out-of-stock, pricing and sorting.

## Complete copyable instruction to give an AI coding agent

```text
Inspect my existing website/project first. This is a Marketplace / store catalog for Shoppers filtering large inventories.
The single visitor job is: Search, narrow, compare and navigate back without losing filters.
Art direction: An efficient discovery index with useful distinctions.
Build in this order: navigation → search → storefront → features → product-detail → faq → checkout → footer.
For every section, read its matching prompts/website/sections/{id}.md file. Treat the section list as a starting hypothesis: remove any section without real content or a user-facing purpose.
Create three structurally different art directions and choose one with rationale.
Preserve all working features, routes, backend services, consent and payment boundaries.
Search state should persist between catalog and detail. Transparent out-of-stock, pricing and sorting.
Optional AI: Optional semantic search only if ordinary facets fail and results stay explainable
Optional 3D: Keep listings fast; restrict 3D to a detail page as optional progressive enhancement
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
